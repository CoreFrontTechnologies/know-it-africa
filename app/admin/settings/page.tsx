import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Settings | Know It Africa" };

export default async function AdminSettingsPage() {
  const user = await requireAdminUser();

  const settings = [
    ["Program title", siteConfig.programTitle],
    ["Program fee", siteConfig.programFee],
    ["WhatsApp number", siteConfig.whatsappDisplay],
    ["Registration status", "Open"],
    ["Venue", siteConfig.venue],
    ["Contact email", siteConfig.email],
    ["Alternate email", siteConfig.secondaryEmail],
    ["Payment status labels", "pending, paid, failed, manually_confirmed"],
  ];

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Settings</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Program settings</h1>
        <p className="mt-2 text-sm font-semibold text-muted-text">Placeholder settings page. Values currently come from config constants until editable settings are added.</p>
      </div>
      <section className="rounded-[2rem] bg-white p-6 shadow-luxury">
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-light-bg p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-blue">{label}</p>
              <p className="mt-2 font-black text-royal">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
