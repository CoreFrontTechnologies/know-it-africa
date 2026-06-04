import { MessageSquareQuote, Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { TestimonialRecord } from "@/types/platform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Testimonials | Know It Africa Admin" };

async function getTestimonials() {
  try {
    const { data, error } = await createSupabaseAdminClient().from("testimonials").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as TestimonialRecord[];
  } catch (error) {
    console.error("Testimonials fetch failed", error);
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const user = await requireAdminUser();
  const testimonials = await getTestimonials();

  return (
    <AdminLayout email={user.email}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Testimonials</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-royal">Learner stories</h1>
          <p className="mt-2 text-sm font-semibold text-muted-text">Manage published learner, parent, school, and partner testimonials.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-soft-blue px-5 py-3 text-sm font-black text-primary-blue" type="button"><Plus className="h-4 w-4" /> CRUD coming next</button>
      </div>
      <section className="grid gap-4 rounded-[2rem] bg-white p-6 shadow-luxury">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="rounded-3xl border border-slate-100 p-5">
            <div className="flex items-center gap-3"><MessageSquareQuote className="h-5 w-5 text-primary-blue" /><h2 className="font-black text-royal">{testimonial.name}</h2><span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-black text-royal">{testimonial.status}</span></div>
            <p className="mt-3 text-sm font-semibold leading-7 text-muted-text">{testimonial.content}</p>
          </article>
        ))}
        {testimonials.length === 0 ? <p className="py-10 text-center font-bold text-muted-text">No testimonials have been added yet.</p> : null}
      </section>
    </AdminLayout>
  );
}
