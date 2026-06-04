import Link from "next/link";
import { CalendarDays, Clock3, CreditCard, LineChart, Users, Wallet, XCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EventRecord } from "@/types/platform";
import type { RegistrationRecord } from "@/types/registration";

async function getDashboardData() {
  const supabase = createSupabaseAdminClient();
  const [total, paid, pending, failed, recent, revenue, activeEvents, upcomingEvents] = await Promise.all([
    supabase.from("registrations").select("id", { count: "exact", head: true }),
    supabase.from("registrations").select("id", { count: "exact", head: true }).eq("payment_status", "paid"),
    supabase.from("registrations").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
    supabase.from("registrations").select("id", { count: "exact", head: true }).eq("payment_status", "failed"),
    supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("registrations").select("amount").in("payment_status", ["paid", "manually_confirmed"]),
    supabase.from("events").select("*").eq("status", "registration_open").order("featured", { ascending: false }).limit(1),
    supabase.from("events").select("*").in("status", ["published", "registration_open"]).order("start_date", { ascending: true }).limit(4),
  ]);

  const revenueValue = (revenue.data ?? []).reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
  const totalCount = total.count ?? 0;
  const paidCount = paid.count ?? 0;

  return {
    total: totalCount,
    paid: paidCount,
    pending: pending.count ?? 0,
    failed: failed.count ?? 0,
    revenue: revenueValue,
    conversion: totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0,
    activeEvent: ((activeEvents.data ?? []) as EventRecord[])[0] ?? null,
    upcomingEvents: (upcomingEvents.data ?? []) as EventRecord[],
    recent: (recent.data ?? []) as RegistrationRecord[],
  };
}

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Dashboard | Know It Africa" };

export default async function AdminDashboardPage() {
  const user = await requireAdminUser();
  const data = await getDashboardData();

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Platform overview</h1>
        <p className="mt-2 text-sm font-semibold text-muted-text">Registrations, revenue, payment status, and current events at a glance.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatsCard label="Total registrations" value={data.total} icon={Users} />
        <AdminStatsCard label="Paid registrations" value={data.paid} icon={CreditCard} tone="green" />
        <AdminStatsCard label="Pending payments" value={data.pending} icon={Clock3} tone="gold" />
        <AdminStatsCard label="Failed payments" value={data.failed} icon={XCircle} tone="red" />
        <AdminStatsCard label="Total revenue" value={`₦${data.revenue.toLocaleString("en-NG")}`} icon={Wallet} tone="green" />
        <AdminStatsCard label="Conversion rate" value={`${data.conversion}%`} icon={LineChart} tone="gold" />
        <AdminStatsCard label="Active event" value={data.activeEvent ? "Open" : "None"} icon={CalendarDays} />
        <AdminStatsCard label="Upcoming events" value={data.upcomingEvents.length} icon={CalendarDays} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-luxury">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-royal">Recent registrations</h2>
            <Link href="/admin/registrations" className="rounded-full bg-soft-blue px-4 py-2 text-xs font-black text-primary-blue">View all</Link>
          </div>
          <div className="grid gap-3">
            {data.recent.map((registration) => (
              <Link key={registration.id} href={`/admin/registrations/${registration.id}`} className="grid gap-2 rounded-2xl border border-slate-100 p-4 transition hover:border-primary-blue/20 hover:bg-soft-blue sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-black text-royal">{registration.full_name}</p>
                  <p className="text-sm font-semibold text-muted-text">{registration.registration_id} • {registration.event_title ?? "Event not set"} • {registration.student_phone}</p>
                </div>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-black capitalize text-royal">{registration.payment_status.replace("_", " ")}</span>
              </Link>
            ))}
            {data.recent.length === 0 ? <p className="py-6 text-center font-bold text-muted-text">No registrations yet.</p> : null}
          </div>
        </section>

        <section className="rounded-[2rem] bg-royal p-6 text-white shadow-luxury pattern-grid">
          <h2 className="text-2xl font-black">Current active event</h2>
          {data.activeEvent ? (
            <div className="mt-5 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="text-xl font-black">{data.activeEvent.title}</p>
              <p className="mt-2 text-sm font-semibold text-white/70">{data.activeEvent.short_description ?? data.activeEvent.slug}</p>
              <div className="mt-5 grid gap-3 text-sm font-black text-white/80">
                <span>Fee: ₦{Number(data.activeEvent.price ?? 0).toLocaleString("en-NG")}</span>
                <span>Venue: {data.activeEvent.venue ?? "Not set"}</span>
                <span>Date: {data.activeEvent.start_date ?? "Not set"}</span>
              </div>
              <Link href={`/admin/events/${data.activeEvent.id}/edit`} className="mt-5 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-royal">Edit event</Link>
            </div>
          ) : (
            <div className="mt-5 rounded-3xl bg-white/10 p-5 text-sm font-semibold text-white/70 ring-1 ring-white/10">
              No registration-open event is active. Create or open an event to enable public registration.
              <Link href="/admin/events/new" className="mt-4 inline-flex rounded-full bg-gold px-4 py-2 text-sm font-black text-royal">Create event</Link>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
