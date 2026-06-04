"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function boolValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function numberOrNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

function textOrNull(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || null;
}

async function logAction(action: string, entityType: string, entityId: string, details?: Record<string, unknown>) {
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
    console.warn("Activity log failed", error);
  }
}

function eventPayload(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Event title is required.");

  const explicitSlug = String(formData.get("slug") ?? "").trim();
  const slug = explicitSlug ? slugify(explicitSlug) : slugify(title);

  return {
    title,
    slug,
    short_description: textOrNull(formData.get("short_description")),
    full_description: textOrNull(formData.get("full_description")),
    category: textOrNull(formData.get("category")),
    status: String(formData.get("status") ?? "draft"),
    price: numberOrNull(formData.get("price")) ?? 12250,
    currency: String(formData.get("currency") ?? "NGN"),
    start_date: textOrNull(formData.get("start_date")),
    end_date: textOrNull(formData.get("end_date")),
    registration_deadline: textOrNull(formData.get("registration_deadline")),
    venue: textOrNull(formData.get("venue")),
    delivery_mode: textOrNull(formData.get("delivery_mode")),
    whatsapp_group_note: textOrNull(formData.get("whatsapp_group_note")),
    certificate_available: boolValue(formData.get("certificate_available")),
    featured: boolValue(formData.get("featured")),
    max_students: numberOrNull(formData.get("max_students")),
    cover_image_url: textOrNull(formData.get("cover_image_url")),
  };
}

export async function createEventAction(formData: FormData) {
  await requireAdminUser();
  const payload = eventPayload(formData);
  const supabase = createSupabaseAdminClient();

  if (payload.featured) {
    await supabase.from("events").update({ featured: false }).eq("featured", true);
  }

  const { data, error } = await supabase.from("events").insert(payload).select("id").single();
  if (error) throw new Error(error.message);

  await logAction("event.created", "events", data.id, { title: payload.title, status: payload.status });
  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect(`/admin/events/${data.id}/edit`);
}

export async function updateEventAction(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Event ID is required.");

  const payload = eventPayload(formData);
  const supabase = createSupabaseAdminClient();

  if (payload.featured) {
    await supabase.from("events").update({ featured: false }).neq("id", id).eq("featured", true);
  }

  const { error } = await supabase.from("events").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  await logAction("event.updated", "events", id, { title: payload.title, status: payload.status });
  revalidatePath("/events");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${id}/edit`);
}

export async function addEventModuleAction(formData: FormData) {
  await requireAdminUser();
  const eventId = String(formData.get("event_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!eventId || !title) throw new Error("Event and module title are required.");

  const { error } = await createSupabaseAdminClient().from("event_modules").insert({
    event_id: eventId,
    title,
    description: textOrNull(formData.get("description")),
    activity: textOrNull(formData.get("activity")),
    sort_order: numberOrNull(formData.get("sort_order")) ?? 0,
  });
  if (error) throw new Error(error.message);

  await logAction("event_module.created", "events", eventId, { title });
  revalidatePath(`/admin/events/${eventId}/edit`);
}

export async function deleteEventAction(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Event ID is required.");

  const supabase = createSupabaseAdminClient();
  const { data: event } = await supabase.from("events").select("title").eq("id", id).maybeSingle<{ title: string }>();

  const { error: unlinkError } = await supabase.from("registrations").update({ event_id: null }).eq("event_id", id);
  if (unlinkError) throw new Error(unlinkError.message);

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await logAction("event.deleted", "events", id, { title: event?.title ?? "Deleted event" });
  revalidatePath("/events");
  revalidatePath("/registration");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}
