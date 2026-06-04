import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventForm } from "@/components/admin/EventForm";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "New Event | Know It Africa Admin" };

export default async function NewEventPage() {
  const user = await requireAdminUser();
  return (
    <AdminLayout email={user.email}>
      <Link href="/admin/events" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-primary-blue"><ArrowLeft className="h-4 w-4" /> Back to events</Link>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Create Event</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">New event or program</h1>
      </div>
      <EventForm />
    </AdminLayout>
  );
}
