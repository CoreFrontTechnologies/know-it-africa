"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PaymentStatus } from "@/types/registration";

const allowedStatuses: PaymentStatus[] = ["pending", "paid", "failed", "manually_confirmed"];

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin");
}

export async function updateRegistrationPaymentStatus(formData: FormData) {
  await requireAdminUser();

  const registrationId = String(formData.get("registrationId") ?? "");
  const paymentStatus = String(formData.get("paymentStatus") ?? "") as PaymentStatus;

  if (!registrationId || !allowedStatuses.includes(paymentStatus)) {
    throw new Error("Invalid payment status update request.");
  }

  const { error } = await createSupabaseAdminClient()
    .from("registrations")
    .update({ payment_status: paymentStatus })
    .eq("id", registrationId);

  if (error) {
    console.error("Manual payment update failed", error);
    throw new Error("Could not update payment status.");
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/registrations");
  revalidatePath(`/admin/registrations/${registrationId}`);
}
