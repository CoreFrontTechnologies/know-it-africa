import Link from "next/link";
import { Eye, Search } from "lucide-react";
import type { RegistrationRecord } from "@/types/registration";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function statusClass(status: string) {
  const classes: Record<string, string> = {
    paid: "bg-success/10 text-success",
    manually_confirmed: "bg-primary-blue/10 text-primary-blue",
    failed: "bg-red-100 text-red-600",
    pending: "bg-gold/15 text-royal",
  };

  return classes[status] ?? classes.pending;
}

export function RegistrationsTable({ registrations, search, status }: { registrations: RegistrationRecord[]; search?: string; status?: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-luxury sm:p-6">
      <form className="mb-6 grid gap-3 md:grid-cols-[1fr_220px_auto]" action="/admin/registrations">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
          <input name="q" defaultValue={search} placeholder="Search name, phone, or registration ID" className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </div>
        <select name="status" defaultValue={status ?? ""} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="manually_confirmed">Manually confirmed</option>
        </select>
        <button className="rounded-full bg-royal px-6 py-3 text-sm font-black text-white">Apply</button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-[0.14em] text-muted-text">
              <th className="px-3 py-4">Registration ID</th>
              <th className="px-3 py-4">Full name</th>
              <th className="px-3 py-4">Phone</th>
              <th className="px-3 py-4">Class</th>
              <th className="px-3 py-4">Interest</th>
              <th className="px-3 py-4">Payment</th>
              <th className="px-3 py-4">Date</th>
              <th className="px-3 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration.id} className="border-b border-slate-100 last:border-0">
                <td className="px-3 py-4 font-black text-primary-blue">{registration.registration_id}</td>
                <td className="px-3 py-4 font-bold text-royal">{registration.full_name}</td>
                <td className="px-3 py-4 text-muted-text">{registration.student_phone}</td>
                <td className="px-3 py-4 text-muted-text">{registration.class_category}</td>
                <td className="px-3 py-4 text-muted-text">{registration.area_of_interest}</td>
                <td className="px-3 py-4"><span className={`rounded-full px-3 py-1 text-xs font-black capitalize ${statusClass(registration.payment_status)}`}>{registration.payment_status.replace("_", " ")}</span></td>
                <td className="px-3 py-4 text-muted-text">{formatDate(registration.created_at)}</td>
                <td className="px-3 py-4">
                  <Link href={`/admin/registrations/${registration.id}`} className="inline-flex items-center gap-2 rounded-full bg-soft-blue px-3 py-2 text-xs font-black text-primary-blue">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                </td>
              </tr>
            ))}
            {registrations.length === 0 ? (
              <tr><td colSpan={8} className="px-3 py-10 text-center font-bold text-muted-text">No registrations found.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
