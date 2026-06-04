import { CreditCard } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { RegistrationRecord } from "@/types/registration";

export const dynamic = "force-dynamic";
export const metadata = { title: "Payments | Know It Africa Admin" };

export default async function AdminPaymentsPage() {
  const user = await requireAdminUser();
  const { data } = await createSupabaseAdminClient().from("registrations").select("*").order("created_at", { ascending: false });
  const rows = (data ?? []) as RegistrationRecord[];
  const revenue = rows.filter((row) => row.payment_status === "paid" || row.payment_status === "manually_confirmed").reduce((sum, row) => sum + Number(row.amount ?? 0), 0);

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Payments</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Payment records</h1>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[2rem] bg-white p-6 shadow-luxury"><CreditCard className="h-6 w-6 text-gold" /><p className="mt-4 text-sm font-black text-muted-text">Total revenue</p><p className="mt-2 text-3xl font-black text-royal">₦{revenue.toLocaleString("en-NG")}</p></div>
        <div className="rounded-[2rem] bg-white p-6 shadow-luxury"><p className="text-sm font-black text-muted-text">Paid</p><p className="mt-2 text-3xl font-black text-success">{rows.filter((row) => row.payment_status === "paid").length}</p></div>
        <div className="rounded-[2rem] bg-white p-6 shadow-luxury"><p className="text-sm font-black text-muted-text">Pending</p><p className="mt-2 text-3xl font-black text-royal">{rows.filter((row) => row.payment_status === "pending").length}</p></div>
      </div>
      <section className="overflow-x-auto rounded-[2rem] bg-white p-6 shadow-luxury">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead><tr className="border-b text-xs font-black uppercase tracking-[0.14em] text-muted-text"><th className="py-3">Registration</th><th>Name</th><th>Event</th><th>Amount</th><th>Status</th><th>Reference</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row.id} className="border-b last:border-0"><td className="py-4 font-black text-primary-blue">{row.registration_id}</td><td>{row.full_name}</td><td>{row.event_title ?? "—"}</td><td>₦{Number(row.amount).toLocaleString("en-NG")}</td><td className="capitalize">{row.payment_status.replace("_", " ")}</td><td className="break-all text-muted-text">{row.payment_reference}</td></tr>)}</tbody>
        </table>
      </section>
    </AdminLayout>
  );
}
