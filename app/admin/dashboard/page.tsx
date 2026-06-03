import Link from "next/link";
import { Clock3, CreditCard, Users, XCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { RegistrationRecord } from "@/types/registration";

async function getDashboardData() {
  const supabase = createSupabaseAdminClient();
  const [total, paid, pending, failed, recent] = await Promise.all([
    supabase.from("registrations").select("id", { count: "exact", head: true }),
    supabase.from("registrations").select("id", { count: "exact", head: true }).eq("payment_status", "paid"),
    supabase.from("registrations").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
    supabase.from("registrations").select("id", { count: "exact", head: true }).eq("payment_status", "failed"),
    supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  return {
    total: total.count ?? 0,
    paid: paid.count ?? 0,
    pending: pending.count ?? 0,
    failed: failed.count ?? 0,
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
        <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Registration overview</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatsCard label="Total registrations" value={data.total} icon={Users} />
        <AdminStatsCard label="Paid students" value={data.paid} icon={CreditCard} tone="green" />
        <AdminStatsCard label="Pending payments" value={data.pending} icon={Clock3} tone="gold" />
        <AdminStatsCard label="Failed payments" value={data.failed} icon={XCircle} tone="red" />
      </div>
      <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-luxury">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-royal">Recent registrations</h2>
          <Link href="/admin/registrations" className="rounded-full bg-soft-blue px-4 py-2 text-xs font-black text-primary-blue">View all</Link>
        </div>
        <div className="grid gap-3">
          {data.recent.map((registration) => (
            <Link key={registration.id} href={`/admin/registrations/${registration.id}`} className="grid gap-2 rounded-2xl border border-slate-100 p-4 transition hover:border-primary-blue/20 hover:bg-soft-blue sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="font-black text-royal">{registration.full_name}</p>
                <p className="text-sm font-semibold text-muted-text">{registration.registration_id} • {registration.student_phone}</p>
              </div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-black capitalize text-royal">{registration.payment_status.replace("_", " ")}</span>
            </Link>
          ))}
          {data.recent.length === 0 ? <p className="py-6 text-center font-bold text-muted-text">No registrations yet.</p> : null}
        </div>
      </section>
    </AdminLayout>
  );
}
