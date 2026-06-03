"use server";

import { redirect } from "next/navigation";
import { initializeFlutterwavePayment } from "@/lib/flutterwave";
import { siteConfig } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { RegistrationRecord } from "@/types/registration";

function paymentReference(registrationId: string) {
  return `${registrationId}-${Date.now()}`;
}

export async function retryRegistrationPayment(formData: FormData) {
  const registrationId = String(formData.get("registrationId") ?? "").trim();

  if (!registrationId) {
    redirect("/registration");
  }

  const supabase = createSupabaseAdminClient();
  const { data: registration, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("registration_id", registrationId)
    .maybeSingle<RegistrationRecord>();

  if (error || !registration) {
    redirect(`/payment/failed?registration_id=${encodeURIComponent(registrationId)}&status=failed`);
  }

  const newReference = paymentReference(registration.registration_id);

  const { error: updateError } = await supabase
    .from("registrations")
    .update({ payment_reference: newReference, payment_status: "pending" })
    .eq("id", registration.id);

  if (updateError) {
    redirect(`/payment/failed?registration_id=${encodeURIComponent(registration.registration_id)}&status=failed`);
  }

  try {
    const payment = await initializeFlutterwavePayment({
      amount: Number(registration.amount),
      txRef: newReference,
      registrationId: registration.registration_id,
      studentName: registration.full_name,
      studentPhone: registration.student_phone ?? "",
      guardianEmail: registration.guardian_email ?? "info@knowitafrica.com",
      programTitle: siteConfig.programTitle,
    });

    redirect(payment.checkoutUrl);
  } catch (error) {
    console.error("Retry payment initialization failed", error);
    redirect(`/payment/failed?registration_id=${encodeURIComponent(registration.registration_id)}&status=failed`);
  }
}
