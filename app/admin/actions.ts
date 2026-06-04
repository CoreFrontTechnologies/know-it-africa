"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PaymentStatus } from "@/types/registration";

const allowedStatuses: PaymentStatus[] = ["pending", "paid", "failed", "cancelled", "manually_confirmed"];

async function logAdminAction(action: string, entityType: string, entityId: string, details?: Record<string, unknown>) {
  try {
    const user = await requireAdminUser();
    await createSupabaseAdminClient().from("admin_activity_logs").insert({
      admin_id: user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details ?? {},
    });
  } catch (error) {
    console.warn("Admin activity log failed", error);
  }
}

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

  await logAdminAction("registration.payment_status_updated", "registrations", registrationId, { payment_status: paymentStatus });
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/registrations");
  revalidatePath(`/admin/registrations/${registrationId}`);
}

export async function updateRegistrationAdminNotes(formData: FormData) {
  await requireAdminUser();

  const registrationId = String(formData.get("registrationId") ?? "");
  const adminNotes = String(formData.get("adminNotes") ?? "").trim();

  if (!registrationId) throw new Error("Registration ID is required.");

  const { error } = await createSupabaseAdminClient()
    .from("registrations")
    .update({ admin_notes: adminNotes || null })
    .eq("id", registrationId);

  if (error) {
    console.error("Admin note update failed", error);
    throw new Error("Could not update admin note.");
  }

  await logAdminAction("registration.note_updated", "registrations", registrationId);
  revalidatePath(`/admin/registrations/${registrationId}`);
}
