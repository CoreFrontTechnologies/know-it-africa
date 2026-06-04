import "server-only";
import { events as fallbackEvents, registrationEvents, siteConfig } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EventItem } from "@/lib/constants";
import type { EventModuleRecord, EventRecord } from "@/types/platform";

export type PublicEvent = EventRecord & { modules?: EventModuleRecord[] };

function fallbackToPublicEvent(event: EventItem): PublicEvent {
  return {
    id: event.slug,
    title: event.title,
    slug: event.slug,
    short_description: event.summary,
    full_description: event.summary,
    category: event.category,
    status: event.registrationOpen ? "registration_open" : event.category === "past" ? "completed" : "published",
    price: event.registrationOpen ? 12250 : 0,
    currency: "NGN",
    start_date: event.date.includes("2026") ? "2026-06-13" : null,
    end_date: null,
    registration_deadline: null,
    venue: event.venue,
    delivery_mode: "Physical",
    whatsapp_group_note: "WhatsApp group access is sent privately after verified payment.",
    certificate_available: event.benefits.some((benefit) => benefit.toLowerCase().includes("certificate")),
    featured: event.registrationOpen,
    max_students: event.slots.includes("50") ? 50 : null,
    cover_image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    modules: event.benefits.map((benefit, index) => ({
      id: `${event.slug}-${index}`,
      event_id: event.slug,
      title: benefit,
      description: null,
      sort_order: index,
      activity: null,
      created_at: new Date().toISOString(),
    })),
  };
}

export function fallbackPublicEvents() {
  return fallbackEvents.map(fallbackToPublicEvent);
}

export function fallbackRegistrationEvents() {
  return registrationEvents.map(fallbackToPublicEvent);
}

function hasSupabaseAdminEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function getPublicEvents() {
  if (!hasSupabaseAdminEnv()) return fallbackPublicEvents();

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .in("status", ["published", "registration_open", "completed"])
      .order("featured", { ascending: false })
      .order("start_date", { ascending: true });

    if (error) throw error;
    return ((data ?? []) as PublicEvent[]).length > 0 ? ((data ?? []) as PublicEvent[]) : fallbackPublicEvents();
  } catch (error) {
    console.warn("Using fallback public events", error);
    return fallbackPublicEvents();
  }
}

export async function getRegistrationEvents() {
  if (!hasSupabaseAdminEnv()) return fallbackRegistrationEvents();

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "registration_open")
      .order("featured", { ascending: false })
      .order("start_date", { ascending: true });

    if (error) throw error;
    return ((data ?? []) as PublicEvent[]).length > 0 ? ((data ?? []) as PublicEvent[]) : fallbackRegistrationEvents();
  } catch (error) {
    console.warn("Using fallback registration events", error);
    return fallbackRegistrationEvents();
  }
}

export async function getFeaturedEvent() {
  const events = await getRegistrationEvents();
  return events.find((event) => event.featured) ?? events[0] ?? null;
}

export async function getEventBySlug(slug?: string | null) {
  const normalizedSlug = slug?.trim();

  if (!hasSupabaseAdminEnv()) {
    const available = fallbackRegistrationEvents();
    return available.find((event) => event.slug === normalizedSlug) ?? available[0] ?? null;
  }

  try {
    if (normalizedSlug) {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase.from("events").select("*").eq("slug", normalizedSlug).maybeSingle();
      if (error) throw error;
      if (data) return data as PublicEvent;
    }
  } catch (error) {
    console.warn("Could not fetch event by slug", error);
  }

  const available = await getRegistrationEvents();
  return available.find((event) => event.slug === normalizedSlug) ?? available[0] ?? fallbackToPublicEvent({
    slug: "ai-software-development-bootcamp",
    category: "upcoming",
    status: "Registration Open",
    title: siteConfig.programTitle,
    audience: "For learners",
    summary: "A practical AI and software development bootcamp.",
    date: "Current cohort",
    time: "To be confirmed",
    venue: siteConfig.venue,
    slots: "Limited slots",
    priceNotes: [siteConfig.programFee],
    benefits: ["AI literacy", "Software development", "Certificate"],
    tone: "navy",
    registrationOpen: true,
  });
}

export async function getEventModules(eventId: string) {
  if (!hasSupabaseAdminEnv()) return [];

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("event_modules")
      .select("*")
      .eq("event_id", eventId)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return (data ?? []) as EventModuleRecord[];
  } catch (error) {
    console.warn("Could not fetch event modules", error);
    return [];
  }
}
