import { createEventAction, updateEventAction } from "@/app/admin/events/actions";
import type { EventRecord } from "@/types/platform";

const statuses = ["draft", "published", "registration_open", "registration_closed", "completed", "archived"];

export function EventForm({ event }: { event?: EventRecord | null }) {
  const action = event ? updateEventAction : createEventAction;

  return (
    <form action={action} className="space-y-6 rounded-[2rem] bg-white p-6 shadow-luxury">
      {event ? <input type="hidden" name="id" value={event.id} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-black text-royal">Event title</span>
          <input required name="title" defaultValue={event?.title ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Slug</span>
          <input name="slug" defaultValue={event?.slug ?? ""} placeholder="auto-generated if blank" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Status</span>
          <select name="status" defaultValue={event?.status ?? "draft"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10">
            {statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Category</span>
          <input name="category" defaultValue={event?.category ?? "Bootcamp"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Price</span>
          <input name="price" type="number" min="0" defaultValue={event?.price ?? 12250} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Currency</span>
          <input name="currency" defaultValue={event?.currency ?? "NGN"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Max students</span>
          <input name="max_students" type="number" min="0" defaultValue={event?.max_students ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Start date</span>
          <input name="start_date" type="date" defaultValue={event?.start_date ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">End date</span>
          <input name="end_date" type="date" defaultValue={event?.end_date ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Registration deadline</span>
          <input name="registration_deadline" type="date" defaultValue={event?.registration_deadline ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-black text-royal">Delivery mode</span>
          <input name="delivery_mode" defaultValue={event?.delivery_mode ?? "Physical"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-black text-royal">Venue</span>
          <input name="venue" defaultValue={event?.venue ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-black text-royal">Short description</span>
          <textarea name="short_description" defaultValue={event?.short_description ?? ""} className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-black text-royal">Full description</span>
          <textarea name="full_description" defaultValue={event?.full_description ?? ""} className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-black text-royal">WhatsApp group note</span>
          <textarea name="whatsapp_group_note" defaultValue={event?.whatsapp_group_note ?? ""} className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-black text-royal">Cover image URL</span>
          <input name="cover_image_url" defaultValue={event?.cover_image_url ?? ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10" />
        </label>
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm font-black text-royal">
          <input type="checkbox" name="featured" defaultChecked={event?.featured ?? false} /> Featured event
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-black text-royal">
          <input type="checkbox" name="certificate_available" defaultChecked={event?.certificate_available ?? true} /> Certificate available
        </label>
      </div>
      <button className="rounded-full bg-gold px-6 py-3 text-sm font-black text-royal shadow-gold">{event ? "Save Event" : "Create Event"}</button>
    </form>
  );
}
