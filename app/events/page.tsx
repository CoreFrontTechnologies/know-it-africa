import { CalendarDays, CheckCircle2, Clock3, Inbox, MapPin, Sparkles, Users } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/Button";
import { getPublicEvents, type PublicEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events | Know It Africa",
  description: "Explore upcoming, current, and past Know It Africa AI education and digital innovation events.",
};

const toneClasses = {
  active: "from-[#020A22] via-royal to-primary-blue",
  completed: "from-[#03123B] via-primary-blue to-[#0B4DC2]",
  closed: "from-[#111827] via-[#334155] to-[#475569]",
};

function formatDate(date?: string | null) {
  if (!date) return "Date to be confirmed";
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));
}

function eventTone(event: PublicEvent) {
  if (event.status === "registration_open") return "active";
  if (event.status === "completed") return "completed";
  return "closed";
}

function eventLabel(event: PublicEvent) {
  if (event.status === "registration_open") return "Registration Open";
  if (event.status === "completed") return "Past Event";
  if (event.status === "registration_closed") return "Registration Closed";
  return event.status.replaceAll("_", " ");
}

function EventCard({ event }: { event: PublicEvent }) {
  const modules = event.modules ?? [];
  const isOpen = event.status === "registration_open";

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-luxury transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-[#0B173C]">
      <div className={cn("relative overflow-hidden bg-gradient-to-br p-6 text-white pattern-grid", toneClasses[eventTone(event)])}>
        <div className="absolute inset-0 bg-royal/25" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <BrandMark className="bg-white" />
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-royal shadow-gold">{eventLabel(event)}</span>
        </div>
        <div className="relative z-10">
          <p className="mt-8 w-fit rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary-blue shadow-sm">
            {event.category ?? "AI Education"}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white drop-shadow">{event.title}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/95">{event.short_description ?? event.full_description ?? "Practical AI and digital innovation training from Know It Africa."}</p>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="grid gap-3 text-sm font-bold text-royal dark:text-white">
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3 dark:bg-white/10"><CalendarDays className="h-4 w-4 text-primary-blue dark:text-gold" /> {formatDate(event.start_date)}</span>
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3 dark:bg-white/10"><Clock3 className="h-4 w-4 text-primary-blue dark:text-gold" /> {event.delivery_mode ?? "Physical"}</span>
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3 dark:bg-white/10"><MapPin className="h-4 w-4 text-primary-blue dark:text-gold" /> {event.venue ?? "Venue to be confirmed"}</span>
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3 dark:bg-white/10"><Users className="h-4 w-4 text-primary-blue dark:text-gold" /> {event.max_students ? `${event.max_students} slots` : "Limited seats"}</span>
        </div>
        <div className="grid gap-2">
          {(modules.length > 0 ? modules.slice(0, 5).map((module) => module.title) : ["AI literacy", "Software development", "Practical projects", "Certificate"]).map((benefit) => (
            <span key={benefit} className="flex items-center gap-2 text-sm font-bold text-muted-text dark:text-white/75"><CheckCircle2 className="h-4 w-4 text-success" /> {benefit}</span>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-gold/15 p-4 text-sm font-black text-royal dark:text-gold">Fee: {event.currency} {Number(event.price ?? 0).toLocaleString("en-NG")}</div>
          <div className="rounded-2xl bg-soft-blue p-4 text-sm font-black text-royal dark:bg-white/10 dark:text-white">Certificate: {event.certificate_available ? "Available" : "Not listed"}</div>
        </div>
        {isOpen ? <Button href={`/registration?event=${event.slug}`} className="w-full justify-center">Register for this event</Button> : null}
      </div>
    </article>
  );
}

function EmptyEvents({ title }: { title: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-primary-blue/25 bg-white p-8 text-center shadow-luxury dark:border-white/15 dark:bg-[#0B173C]">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-soft-blue text-primary-blue dark:bg-white/10 dark:text-gold">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-2xl font-black text-royal dark:text-white">No {title.toLowerCase()} right now</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-muted-text dark:text-white/70">
        We only publish confirmed Know It Africa events. Check back soon or contact the team to discuss school, community, or corporate AI training partnerships.
      </p>
      <div className="mt-5 flex justify-center">
        <Button href="/contact" variant="navy">Discuss an Event</Button>
      </div>
    </div>
  );
}

function EventGroup({ title, description, events }: { title: string; description: string; events: PublicEvent[] }) {
  return (
    <section className="mt-16">
      <div className="mb-6 max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-primary-blue dark:text-gold"><Sparkles className="h-4 w-4 text-gold" /> {title}</p>
        <p className="mt-4 text-lg font-semibold leading-8 text-muted-text dark:text-white/70">{description}</p>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      ) : (
        <EmptyEvents title={title} />
      )}
    </section>
  );
}

export default async function EventsPage() {
  const events = await getPublicEvents();
  const currentEvents = events.filter((event) => event.status === "registration_open" || event.status === "published");
  const pastEvents = events.filter((event) => event.status === "completed" || event.status === "archived");
  const futureEvents: PublicEvent[] = [];

  return (
    <>
      <Header />
      <main id="main-content" className="bg-light-bg dark:bg-[#050B1F]">
        <section className="pattern-grid bg-royal px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Know It Africa Events</p>
              <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">Choose the right AI learning experience.</h1>
              <p className="mt-6 text-lg leading-8 text-white/85">Browse current opportunities, review completed programs, and watch for future event announcements from Know It Africa.</p>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EventGroup title="Current & Upcoming Events" description="Confirmed events learners can register for or prepare to join." events={currentEvents} />
            <EventGroup title="Past Events" description="Completed or archived bootcamps and classes from Know It Africa’s learning journey." events={pastEvents} />
            <EventGroup title="Future Events" description="No mock events are listed here. Future events will appear only when the team confirms the details." events={futureEvents} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
