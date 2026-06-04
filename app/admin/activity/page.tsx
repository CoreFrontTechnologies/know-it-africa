import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ActivityLogRecord } from "@/types/platform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activity Logs | Know It Africa Admin" };

export default async function ActivityPage() {
  const user = await requireAdminUser();
  const { data } = await createSupabaseAdminClient().from("admin_activity_logs").select("*").order("created_at", { ascending: false }).limit(100);
  const logs = (data ?? []) as ActivityLogRecord[];
  return (
    <AdminLayout email={user.email}>
      <div className="mb-8"><p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Activity</p><h1 className="mt-2 text-4xl font-black text-royal">Admin activity logs</h1></div>
      <section className="rounded-[2rem] bg-white p-6 shadow-luxury">
        <div className="space-y-3">{logs.map((log) => <div key={log.id} className="rounded-2xl bg-light-bg p-4"><p className="font-black text-royal">{log.action}</p><p className="text-sm font-semibold text-muted-text">{log.entity_type ?? "system"} • {log.entity_id ?? "—"} • {new Date(log.created_at).toLocaleString()}</p></div>)}</div>
        {logs.length === 0 ? <p className="py-8 text-center font-bold text-muted-text">No activity yet.</p> : null}
      </section>
    </AdminLayout>
  );
}
