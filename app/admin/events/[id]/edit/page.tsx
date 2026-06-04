import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { addEventModuleAction, deleteEventAction } from "@/app/admin/events/actions";
import { EventForm } from "@/components/admin/EventForm";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EventModuleRecord, EventRecord } from "@/types/platform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Event | Know It Africa Admin" };

type PageProps = { params: Promise<{ id: string }> };

async function getEvent(id: string) {
  const supabase = createSupabaseAdminClient();
  const [eventResult, modulesResult] = await Promise.all([
    supabase.from("events").select("*").eq("id", id).maybeSingle<EventRecord>(),
    supabase.from("event_modules").select("*").eq("event_id", id).order("sort_order", { ascending: true }),
  ]);

  return {
    event: eventResult.data,
    modules: (modulesResult.data ?? []) as EventModuleRecord[],
  };
}

export default async function EditEventPage({ params }: PageProps) {
  const user = await requireAdminUser();
  const { id } = await params;
  const { event, modules } = await getEvent(id);

  if (!event) {
    return <AdminLayout email={user.email}><div className="rounded-[2rem] bg-white p-8 shadow-luxury">Event not found.</div></AdminLayout>;
  }

  return (
    <AdminLayout email={user.email}>
      <Link href="/admin/events" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-primary-blue"><ArrowLeft className="h-4 w-4" /> Back to events</Link>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Edit Event</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">{event.title}</h1>
      </div>
      <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
        <EventForm event={event} />
        <aside className="space-y-6">
          <section className="rounded-[2rem] bg-white p-6 shadow-luxury">
            <h2 className="text-2xl font-black text-royal">Modules</h2>
            <div className="mt-5 space-y-3">
              {modules.map((module) => (
                <div key={module.id} className="rounded-2xl bg-light-bg p-4">
                  <p className="font-black text-royal">{module.sort_order}. {module.title}</p>
                  <p className="mt-1 text-sm font-semibold text-muted-text">{module.description ?? module.activity ?? "No description"}</p>
                </div>
              ))}
              {modules.length === 0 ? <p className="text-sm font-bold text-muted-text">No modules yet.</p> : null}
            </div>
          </section>
          <form action={addEventModuleAction} className="rounded-[2rem] bg-white p-6 shadow-luxury">
            <input type="hidden" name="event_id" value={event.id} />
            <h2 className="text-2xl font-black text-royal">Add module</h2>
            <div className="mt-5 space-y-4">
              <input name="title" required placeholder="Module title" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold" />
              <textarea name="description" placeholder="Description" className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold" />
              <input name="activity" placeholder="Activity / project" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold" />
              <input name="sort_order" type="number" defaultValue={modules.length + 1} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold" />
              <button className="rounded-full bg-gold px-5 py-3 text-sm font-black text-royal">Add Module</button>
            </div>
          </form>

          <form action={deleteEventAction} className="rounded-[2rem] border border-red-200 bg-red-50 p-6 shadow-luxury">
            <input type="hidden" name="id" value={event.id} />
            <h2 className="text-2xl font-black text-red-700">Delete event</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-red-700/80">Delete this event only when it was created by mistake. Existing registrations keep their event name for records.</p>
            <button className="mt-5 rounded-full bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700">Delete Event</button>
          </form>
        </aside>
      </div>
    </AdminLayout>
  );
}
