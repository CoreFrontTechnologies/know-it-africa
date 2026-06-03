import "server-only";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { RegistrationRecord } from "@/types/registration";

type PaymentVerificationInput = {
  transactionId?: string;
  txRef?: string;
  registrationId?: string;
  gatewayStatus?: string;
};

export type PaymentVerificationResult =
  | {
      state: "paid";
      registration: RegistrationRecord;
      registrationId: string;
      amountPaid: number;
      transactionId: string;
      message: string;
    }
  | {
      state: "pending" | "failed";
      registration: RegistrationRecord | null;
      registrationId?: string;
      message: string;
    };

function normalize(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

async function findRegistration({ registrationId, txRef }: { registrationId?: string; txRef?: string }) {
  const supabase = createSupabaseAdminClient();
  const query = supabase.from("registrations").select("*").limit(1);

  if (registrationId) {
    return query.eq("registration_id", registrationId).maybeSingle<RegistrationRecord>();
  }

  if (txRef) {
    return query.eq("payment_reference", txRef).maybeSingle<RegistrationRecord>();
  }

  return { data: null, error: null };
}

export async function verifyRegistrationPayment(input: PaymentVerificationInput): Promise<PaymentVerificationResult> {
  const transactionId = normalize(input.transactionId);
  const txRef = normalize(input.txRef);
  const registrationId = normalize(input.registrationId);
  const gatewayStatus = normalize(input.gatewayStatus)?.toLowerCase();

  let registration: RegistrationRecord | null = null;

  try {
    const { data, error } = await findRegistration({ registrationId, txRef });

    if (error) {
      console.error("Payment registration lookup error", error);
      return {
        state: "pending",
        registration: null,
        registrationId,
        message: "We could not load your registration yet. Please contact Know It Africa on WhatsApp if this continues.",
      };
    }

    registration = data;
  } catch (error) {
    console.error("Payment verification configuration error", error);
    return {
      state: "pending",
      registration: null,
      registrationId,
      message: "Payment verification is not configured yet. Please contact Know It Africa on WhatsApp for confirmation.",
    };
  }

  if (registration?.payment_status === "paid" && !transactionId) {
    return {
      state: "paid",
      registration,
      registrationId: registration.registration_id,
      amountPaid: Number(registration.amount),
      transactionId: registration.flutterwave_transaction_id ?? "Verified",
      message: "Your payment has already been confirmed.",
    };
  }

  if (gatewayStatus && ["cancelled", "canceled", "failed"].includes(gatewayStatus) && !transactionId) {
    if (registration) {
      await createSupabaseAdminClient()
        .from("registrations")
        .update({ payment_status: "failed" })
        .eq("id", registration.id);
    }

    return {
      state: "failed",
      registration,
      registrationId: registration?.registration_id ?? registrationId,
      message: "Flutterwave reported that this payment was not completed.",
    };
  }

  if (!transactionId) {
    return {
      state: "pending",
      registration,
      registrationId: registration?.registration_id ?? registrationId,
      message: "We are waiting for Flutterwave transaction details before confirming your payment.",
    };
  }

  let transaction;

  try {
    transaction = await verifyFlutterwaveTransaction(transactionId);
  } catch (error) {
    console.error("Flutterwave verification error", error);

    return {
      state: "pending",
      registration,
      registrationId: registration?.registration_id ?? registrationId,
      message: "We could not verify your Flutterwave transaction right now. Please contact Know It Africa if this takes too long.",
    };
  }

  if (!registration) {
    const { data } = await findRegistration({ txRef: transaction.txRef });
    registration = data;
  }

  if (!registration) {
    return {
      state: "pending",
      registration: null,
      registrationId,
      message: "Payment was received from Flutterwave, but we could not match it to a registration record yet.",
    };
  }

  const amountMatches = Number(transaction.amount) >= Number(registration.amount);
  const referenceMatches = transaction.txRef === registration.payment_reference;
  const currencyMatches = transaction.currency === "NGN";
  const successful = transaction.status === "successful";

  if (successful && amountMatches && referenceMatches && currencyMatches) {
    const { data, error } = await createSupabaseAdminClient()
      .from("registrations")
      .update({
        payment_status: "paid",
        payment_reference: transaction.txRef,
        flutterwave_transaction_id: String(transaction.id),
      })
      .eq("id", registration.id)
      .select("*")
      .single<RegistrationRecord>();

    if (error || !data) {
      console.error("Payment status update error", error);

      return {
        state: "pending",
        registration,
        registrationId: registration.registration_id,
        message: "Payment verified, but we could not update your registration status. Please contact Know It Africa.",
      };
    }

    return {
      state: "paid",
      registration: data,
      registrationId: data.registration_id,
      amountPaid: transaction.amount,
      transactionId: String(transaction.id),
      message: "Your registration has been received and your payment has been confirmed.",
    };
  }

  if (!successful) {
    await createSupabaseAdminClient()
      .from("registrations")
      .update({ payment_status: "failed", flutterwave_transaction_id: String(transaction.id) })
      .eq("id", registration.id);

    return {
      state: "failed",
      registration,
      registrationId: registration.registration_id,
      message: "Flutterwave could not confirm this payment as successful.",
    };
  }

  return {
    state: "pending",
    registration,
    registrationId: registration.registration_id,
    message: "We found your transaction, but the payment details did not fully match your registration. Please contact Know It Africa for manual review.",
  };
}
