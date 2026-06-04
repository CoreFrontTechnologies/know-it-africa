"use server";

import { initializeFlutterwavePayment } from "@/lib/flutterwave";
import { getEventBySlug } from "@/lib/events";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { registrationSchema, type RegistrationFormValues } from "@/lib/validators/registration";

type RegistrationPayload = {
  registration_id: string;
  event_id: string | null;
  event_title: string;
  event_slug: string;
  currency: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  home_address: string;
  school_name: string;
  class_category: string;
  state_of_origin: string;
  lga: string;
  student_phone: string;
  guardian_name: string;
  guardian_occupation: string;
  guardian_phone: string;
  guardian_email: string;
  preferred_contact_channel: string;
  preferred_class_category: string;
  area_of_interest: string;
  device_ownership: string;
  internet_access: string;
  reason_for_joining: string;
  payment_status: "pending";
  payment_reference: string;
  amount: number;
};

export type CreateRegistrationResult =
  | {
      ok: true;
      registrationId: string;
      studentName: string;
      paymentStatus: "pending";
      amount: number;
      paymentReference: string;
      checkoutUrl: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<keyof RegistrationFormValues, string>>;
      registrationId?: string;
      paymentReference?: string;
    };

function generateRegistrationId() {
  const year = new Date().getFullYear();
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 5).toUpperCase();

  return `KIA-${year}-${random}`;
}


function generatePaymentReference(registrationId: string) {
  return `${registrationId}-${Date.now()}`;
}

function isUuid(value?: string | null) {
  return Boolean(value?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
}

function toRegistrationPayload(values: RegistrationFormValues, registrationId: string, paymentReference: string, event: Awaited<ReturnType<typeof getEventBySlug>>): RegistrationPayload {
  return {
    registration_id: registrationId,
    event_id: isUuid(event?.id) ? event?.id ?? null : null,
    event_title: event?.title ?? "AI & Software Development Bootcamp",
    event_slug: event?.slug ?? values.eventSlug,
    full_name: values.fullName,
    date_of_birth: values.dateOfBirth,
    gender: values.gender,
    home_address: values.homeAddress,
    school_name: values.schoolName,
    class_category: values.classCategory,
    state_of_origin: values.stateOfOrigin,
    lga: values.lga,
    student_phone: values.studentPhone,
    guardian_name: values.guardianName,
    guardian_occupation: values.guardianOccupation,
    guardian_phone: values.guardianPhone,
    guardian_email: values.guardianEmail,
    preferred_contact_channel: values.preferredContactChannel,
    preferred_class_category: values.preferredClassCategory,
    area_of_interest: values.areaOfInterest,
    device_ownership: values.deviceOwnership,
    internet_access: values.internetAccess,
    reason_for_joining: values.reasonForJoining,
    payment_status: "pending",
    payment_reference: paymentReference,
    amount: Number(event?.price ?? 12250),
    currency: event?.currency ?? "NGN",
  };
}

export async function createRegistration(values: RegistrationFormValues): Promise<CreateRegistrationResult> {
  const parsed = registrationSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce<Partial<Record<keyof RegistrationFormValues, string>>>(
      (accumulator, issue) => {
        const field = issue.path[0] as keyof RegistrationFormValues | undefined;

        if (field && !accumulator[field]) {
          accumulator[field] = issue.message;
        }

        return accumulator;
      },
      {},
    );

    return {
      ok: false,
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
    };
  }

  let supabase;

  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    console.error("Supabase configuration error", error);

    return {
      ok: false,
      message: "Online registration is temporarily unavailable. Please contact Know It Africa on WhatsApp for assistance.",
    };
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const registrationId = generateRegistrationId();
    const paymentReference = generatePaymentReference(registrationId);
    const selectedEvent = await getEventBySlug(parsed.data.eventSlug);

    if (!selectedEvent || selectedEvent.status !== "registration_open") {
      return {
        ok: false,
        message: "Registration is currently closed for the selected event. Please choose another event or contact Know It Africa.",
      };
    }

    const payload = toRegistrationPayload(parsed.data, registrationId, paymentReference, selectedEvent);

    const { error } = await supabase.from("registrations").insert(payload);

    if (!error) {
      try {
        const payment = await initializeFlutterwavePayment({
          amount: payload.amount,
          txRef: paymentReference,
          registrationId,
          studentName: parsed.data.fullName,
          studentPhone: parsed.data.studentPhone,
          guardianEmail: parsed.data.guardianEmail,
          programTitle: selectedEvent.title,
        });

        return {
          ok: true,
          registrationId,
          studentName: parsed.data.fullName,
          paymentStatus: "pending",
          amount: payload.amount,
          paymentReference: payment.paymentReference,
          checkoutUrl: payment.checkoutUrl,
        };
      } catch (paymentError) {
        console.error("Flutterwave initialization error", paymentError);

        return {
          ok: false,
          message:
            "Your registration was received, but we could not open the payment page right now. Please contact Know It Africa on WhatsApp with your registration ID.",
          registrationId,
          paymentReference,
        };
      }
    }

    if (error.code === "23505") {
      continue;
    }

    console.error("Registration insert error", error);

    return {
      ok: false,
      message: "We could not save your registration right now. Please try again or contact Know It Africa on WhatsApp.",
    };
  }

  return {
    ok: false,
    message: "We could not generate a unique registration ID. Please try again.",
  };
}
