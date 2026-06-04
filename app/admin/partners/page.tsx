import { Handshake, Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PartnerRecord } from "@/types/platform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Partners | Know It Africa Admin" };

async function getPartners() {
  try {
    const { data, error } = await createSupabaseAdminClient().from("partners").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as PartnerRecord[];
  } catch (error) {
    console.error("Partners fetch failed", error);
    return [];
  }
}

export default async function AdminPartnersPage() {
  const user = await requireAdminUser();
  const partners = await getPartners();

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Partners</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Institution partners</h1>
          <p className="mt-2 text-sm font-semibold text-muted-text">Manage school, community, business, NGO, and innovation partners.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-soft-blue px-5 py-3 text-sm font-black text-primary-blue" type="button"><Plus className="h-4 w-4" /> CRUD coming next</button>
      </div>
      <section className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-luxury md:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <article key={partner.id} className="rounded-3xl border border-slate-100 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-primary-blue"><Handshake className="h-5 w-5" /></div>
            <h2 className="mt-4 font-black text-royal">{partner.name}</h2>
            <p className="mt-2 text-sm font-semibold text-muted-text">{partner.type ?? "Partner"} • {partner.status}</p>
          </article>
        ))}
        {partners.length === 0 ? <p className="py-10 text-center font-bold text-muted-text md:col-span-2 xl:col-span-3">No partners have been added yet.</p> : null}
      </section>
    </AdminLayout>
  );
}
