import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { updateRegistrationAdminNotes, updateRegistrationPaymentStatus } from "@/app/admin/actions";
import { CopyButton } from "@/components/admin/CopyButton";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { siteConfig } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PaymentStatus, RegistrationRecord } from "@/types/registration";

type RegistrationDetailsPageProps = {
  params: Promise<{ id: string }>;
};

async function getRegistration(id: string) {
  const { data, error } = await createSupabaseAdminClient().from("registrations").select("*").eq("id", id).single<RegistrationRecord>();

  if (error) {
    console.error("Registration details fetch failed", error);
    return null;
  }

  return data;
}

function DetailItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-2xl bg-light-bg p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-blue">{label}</p>
      <p className="mt-2 break-words text-sm font-bold text-royal">{value ?? "—"}</p>
    </div>
  );
}

function statusBadge(status: PaymentStatus) {
  const classes: Record<PaymentStatus, string> = {
    paid: "bg-success/10 text-success",
    manually_confirmed: "bg-primary-blue/10 text-primary-blue",
    failed: "bg-red-100 text-red-600",
    cancelled: "bg-slate-100 text-slate-700",
    pending: "bg-gold/15 text-royal",
  };

  return classes[status];
}

function whatsappLink(registration: RegistrationRecord) {
  const message = `Hello Know It Africa, I have completed my registration and payment for the AI & Software Development Bootcamp.\n\nName: ${registration.full_name}\nRegistration ID: ${registration.registration_id}\n\nPlease confirm my payment and send me the official WhatsApp group access.`;

  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const dynamic = "force-dynamic";

export const metadata = { title: "Registration Details | Know It Africa Admin" };

export default async function RegistrationDetailsPage({ params }: RegistrationDetailsPageProps) {
  const user = await requireAdminUser();
  const { id } = await params;
  const registration = await getRegistration(id);

  if (!registration) {
    return (
      <AdminLayout email={user.email}>
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-luxury">
          <h1 className="text-3xl font-black text-royal">Registration not found</h1>
          <Link href="/admin/registrations" className="mt-5 inline-flex rounded-full bg-royal px-5 py-3 text-sm font-black text-white">Back to registrations</Link>
        </div>
      </AdminLayout>
    );
  }

  const detailGroups = [
    [
      ["Event", registration.event_title],
      ["Event Slug", registration.event_slug],
      ["Full Name", registration.full_name],
      ["Date of Birth", registration.date_of_birth],
      ["Gender", registration.gender],
      ["Home Address", registration.home_address],
      ["School Name", registration.school_name],
      ["Class / Intake", registration.class_category],
      ["State of Origin", registration.state_of_origin],
      ["LGA", registration.lga],
    ],
    [
      ["Student Phone", registration.student_phone],
      ["Guardian Name", registration.guardian_name],
      ["Guardian Occupation", registration.guardian_occupation],
      ["Guardian Phone", registration.guardian_phone],
      ["Guardian Email", registration.guardian_email],
      ["Preferred Contact", registration.preferred_contact_channel],
    ],
    [
      ["Preferred Class", registration.preferred_class_category],
      ["Area of Interest", registration.area_of_interest],
      ["Device Ownership", registration.device_ownership],
      ["Internet Access", registration.internet_access],
      ["Reason", registration.reason_for_joining],
    ],
  ];

  return (
    <AdminLayout email={user.email}>
      <Link href="/admin/registrations" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-primary-blue">
        <ArrowLeft className="h-4 w-4" /> Back to registrations
      </Link>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Registration details</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">{registration.full_name}</h1>
          <p className="mt-2 font-bold text-muted-text">{registration.registration_id}</p>
        </div>
        <span className={`w-fit rounded-full px-4 py-2 text-sm font-black capitalize ${statusBadge(registration.payment_status)}`}>{registration.payment_status.replace("_", " ")}</span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {detailGroups.map((group, index) => (
            <section key={index} className="rounded-[2rem] bg-white p-6 shadow-luxury">
              <h2 className="mb-5 text-2xl font-black text-royal">{["Student information", "Contact information", "Program details"][index]}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {group.map(([label, value]) => <DetailItem key={label} label={String(label)} value={value} />)}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] bg-royal p-6 text-white shadow-luxury pattern-grid">
            <h2 className="text-2xl font-black">Payment details</h2>
            <div className="mt-5 space-y-3">
              <DetailItem label="Amount" value={`₦${Number(registration.amount).toLocaleString("en-NG")}`} />
              <DetailItem label="Payment Status" value={registration.payment_status.replace("_", " ")} />
              <DetailItem label="Payment Reference" value={registration.payment_reference} />
              <DetailItem label="Flutterwave Transaction" value={registration.flutterwave_transaction_id} />
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-luxury">
            <h2 className="text-2xl font-black text-royal">Admin actions</h2>
            <div className="mt-5 grid gap-3">
              {([
                ["paid", "Mark as paid manually"],
                ["pending", "Mark as pending"],
                ["failed", "Mark as failed"],
                ["cancelled", "Mark as cancelled"],
                ["manually_confirmed", "Mark manually confirmed"],
              ] as [PaymentStatus, string][]).map(([status, label]) => (
                <form key={status} action={updateRegistrationPaymentStatus}>
                  <input type="hidden" name="registrationId" value={registration.id} />
                  <input type="hidden" name="paymentStatus" value={status} />
                  <button className="w-full rounded-full bg-soft-blue px-4 py-3 text-sm font-black text-primary-blue transition hover:bg-primary-blue hover:text-white">{label}</button>
                </form>
              ))}

              <form action={updateRegistrationAdminNotes} className="rounded-3xl border border-slate-100 p-4">
                <input type="hidden" name="registrationId" value={registration.id} />
                <label className="text-sm font-black text-royal" htmlFor="adminNotes">Admin notes</label>
                <textarea id="adminNotes" name="adminNotes" defaultValue={registration.admin_notes ?? ""} className="mt-3 min-h-28 w-full rounded-2xl border border-slate-200 p-3 text-sm font-semibold text-royal outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" placeholder="Add internal notes for follow-up, payment confirmation, or WhatsApp access." />
                <button className="mt-3 w-full rounded-full bg-royal px-4 py-3 text-sm font-black text-white">Save admin note</button>
              </form>
              <a href={whatsappLink(registration)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-black text-royal">
                <MessageCircle className="h-4 w-4" /> Open WhatsApp chat
              </a>
              <CopyButton value={`Hello Know It Africa, I have completed my registration and payment for the AI & Software Development Bootcamp.\n\nName: ${registration.full_name}\nRegistration ID: ${registration.registration_id}\n\nPlease confirm my payment and send me the official WhatsApp group access.`} />
              <textarea readOnly value={`Hello Know It Africa, I have completed my registration and payment for the AI & Software Development Bootcamp.\n\nName: ${registration.full_name}\nRegistration ID: ${registration.registration_id}\n\nPlease confirm my payment and send me the official WhatsApp group access.`} className="min-h-36 rounded-2xl border border-slate-200 p-3 text-xs font-semibold text-muted-text" />
            </div>
          </section>
        </aside>
      </div>
    </AdminLayout>
  );
}
