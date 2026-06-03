import { CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/Button";
import { futureEvents, pastEvents, upcomingEvents, type EventItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Events | Know It Africa",
  description: "Explore upcoming, past, and future Know It Africa AI education and digital innovation events.",
};

const toneClasses = {
  blue: "from-royal via-primary-blue to-[#0B4DC2]",
  red: "from-[#4A0C0C] via-[#8B1010] to-[#D71920]",
  navy: "from-royal via-[#0B2A72] to-primary-blue",
};

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-luxury">
      <div className={cn("bg-gradient-to-br p-6 text-white pattern-grid", toneClasses[event.tone])}>
        <div className="flex items-start justify-between gap-4">
          <BrandMark className="bg-white/95" />
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-gold ring-1 ring-white/15">{event.status}</span>
        </div>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-gold">{event.audience}</p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight">{event.title}</h2>
        <p className="mt-4 text-sm font-semibold leading-7 text-white/75">{event.summary}</p>
      </div>
      <div className="space-y-5 p-6">
        <div className="grid gap-3 text-sm font-bold text-royal">
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3"><CalendarDays className="h-4 w-4 text-primary-blue" /> {event.date}</span>
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3"><Clock3 className="h-4 w-4 text-primary-blue" /> {event.time}</span>
          <span className="flex items-center gap-3 rounded-2xl bg-light-bg p-3"><MapPin className="h-4 w-4 text-primary-blue" /> {event.venue}</span>
        </div>
        <div className="grid gap-2">
          {event.benefits.map((benefit) => (
            <span key={benefit} className="flex items-center gap-2 text-sm font-bold text-muted-text"><CheckCircle2 className="h-4 w-4 text-success" /> {benefit}</span>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {event.priceNotes.map((note) => <div key={note} className="rounded-2xl bg-gold/15 p-4 text-sm font-black text-royal">{note}</div>)}
          <div className="rounded-2xl bg-soft-blue p-4 text-sm font-black text-royal">{event.slots}</div>
        </div>
        {event.registrationOpen ? <Button href={`/registration?event=${event.slug}`} className="w-full justify-center">Register for this event</Button> : null}
      </div>
    </article>
  );
}

function EventGroup({ title, description, events }: { title: string; description: string; events: EventItem[] }) {
  return (
    <section className="mt-16">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">{title}</p>
        <p className="mt-2 text-lg font-semibold leading-8 text-muted-text">{description}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => <EventCard key={event.slug} event={event} />)}
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-light-bg">
        <section className="pattern-grid bg-royal px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Know It Africa Events</p>
              <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">Choose the right AI learning experience.</h1>
              <p className="mt-6 text-lg leading-8 text-white/75">Browse upcoming registration opportunities, review past programs, and see future event directions for schools, youths, and businesses.</p>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EventGroup title="Upcoming Events" description="Open or scheduled events learners can register interest for now." events={upcomingEvents} />
            <EventGroup title="Past Events" description="Completed or archived bootcamps and classes from Know It Africa’s learning journey." events={pastEvents} />
            <EventGroup title="Future Events" description="Planned event formats and partnership-ready programs being developed next." events={futureEvents} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
