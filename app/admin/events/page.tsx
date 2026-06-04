import Link from "next/link";
import { CalendarDays, Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EventRecord } from "@/types/platform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Events & Programs | Know It Africa Admin" };

async function getEvents() {
  try {
    const { data, error } = await createSupabaseAdminClient().from("events").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as EventRecord[];
  } catch (error) {
    console.error("Events fetch failed", error);
    return [];
  }
}

function statusClass(status: string) {
  if (status === "registration_open") return "bg-success/10 text-success";
  if (status === "archived" || status === "completed") return "bg-slate-100 text-slate-600";
  if (status === "draft") return "bg-gold/15 text-royal";
  return "bg-primary-blue/10 text-primary-blue";
}

export default async function AdminEventsPage() {
  const user = await requireAdminUser();
  const events = await getEvents();

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Events & Programs</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Manage learning events</h1>
          <p className="mt-2 text-sm font-semibold text-muted-text">Create, publish, close, and archive Know It Africa programs.</p>
        </div>
        <Link href="/admin/events/new" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black text-royal shadow-gold"><Plus className="h-4 w-4" /> New Event</Link>
      </div>
      <section className="rounded-[2rem] bg-white p-6 shadow-luxury">
        <div className="grid gap-4">
          {events.map((event) => (
            <Link key={event.id} href={`/admin/events/${event.id}/edit`} className="grid gap-4 rounded-3xl border border-slate-100 p-5 transition hover:border-primary-blue/20 hover:bg-soft-blue lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black text-royal">{event.title}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-black capitalize ${statusClass(event.status)}`}>{event.status.replaceAll("_", " ")}</span>
                  {event.featured ? <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-black text-royal">Featured</span> : null}
                </div>
                <p className="mt-2 text-sm font-semibold text-muted-text">{event.short_description ?? event.slug}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-black text-primary-blue">
                <span>₦{Number(event.price).toLocaleString("en-NG")}</span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {event.start_date ?? "No date"}</span>
              </div>
            </Link>
          ))}
          {events.length === 0 ? <p className="py-10 text-center font-bold text-muted-text">No events yet. Create your first event to enable dynamic registration.</p> : null}
        </div>
      </section>
    </AdminLayout>
  );
}
