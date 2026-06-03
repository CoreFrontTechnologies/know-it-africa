import { Download } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PaymentStatus, RegistrationRecord } from "@/types/registration";

type RegistrationsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function normalize(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

async function getRegistrations({ search, status }: { search?: string; status?: string }) {
  const supabase = createSupabaseAdminClient();
  let query = supabase.from("registrations").select("*").order("created_at", { ascending: false });

  if (status) query = query.eq("payment_status", status as PaymentStatus);
  if (search) {
    const term = search.replaceAll("%", "").trim();
    query = query.or(`full_name.ilike.%${term}%,student_phone.ilike.%${term}%,registration_id.ilike.%${term}%,event_title.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Registrations fetch failed", error);
    return [];
  }

  return (data ?? []) as RegistrationRecord[];
}

export const dynamic = "force-dynamic";

export const metadata = { title: "Registrations | Know It Africa Admin" };

export default async function AdminRegistrationsPage({ searchParams }: RegistrationsPageProps) {
  const user = await requireAdminUser();
  const params = (await searchParams) ?? {};
  const search = normalize(params.q);
  const status = normalize(params.status);
  const registrations = await getRegistrations({ search, status });

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Registrations</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">All student registrations</h1>
          <p className="mt-2 text-sm font-semibold text-muted-text">Search by name, phone, registration ID, or event. Filter by payment status.</p>
        </div>
        <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(["Registration ID,Full name,Event,Phone,Class,Area,Payment Status,Date", ...registrations.map((item) => [item.registration_id, item.full_name, item.event_title, item.student_phone, item.class_category, item.area_of_interest, item.payment_status, item.created_at].map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))].join("\n"))}`} download="know-it-africa-registrations.csv" className="inline-flex items-center justify-center gap-2 rounded-full bg-royal px-5 py-3 text-sm font-black text-white">
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>
      <RegistrationsTable registrations={registrations} search={search} status={status} />
    </AdminLayout>
  );
}
