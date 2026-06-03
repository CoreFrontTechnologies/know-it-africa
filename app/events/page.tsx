import { CalendarDays, CheckCircle2, Clock3, Inbox, MapPin, Sparkles } from "lucide-react";
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
  blue: "from-[#03123B] via-primary-blue to-[#0B4DC2]",
  red: "from-[#250404] via-[#7A0B0B] to-[#B5121B]",
  navy: "from-[#020A22] via-royal to-primary-blue",
};

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-luxury transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className={cn("relative overflow-hidden bg-gradient-to-br p-6 text-white pattern-grid", toneClasses[event.tone])}>
        <div className="absolute inset-0 bg-royal/35" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <BrandMark className="bg-white" />
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-royal shadow-gold">{event.status}</span>
        </div>
        <div className="relative z-10">
          <p className="mt-8 w-fit rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-gold ring-1 ring-white/20">{event.audience}</p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white drop-shadow">{event.title}</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white">{event.summary}</p>
        </div>
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

function EmptyEvents({ title }: { title: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-primary-blue/25 bg-white p-8 text-center shadow-luxury">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-soft-blue text-primary-blue">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-2xl font-black text-royal">No {title.toLowerCase()} yet</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-muted-text">
        We only publish confirmed Know It Africa events. Check back soon or contact the team to discuss school, community, or corporate AI training partnerships.
      </p>
      <div className="mt-5 flex justify-center">
        <Button href="/contact" variant="navy">Discuss an Event</Button>
      </div>
    </div>
  );
}

function EventGroup({ title, description, events }: { title: string; description: string; events: EventItem[] }) {
  return (
    <section className="mt-16">
      <div className="mb-6 max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-primary-blue"><Sparkles className="h-4 w-4 text-gold" /> {title}</p>
        <p className="mt-4 text-lg font-semibold leading-8 text-muted-text">{description}</p>
      </div>
      {events.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      ) : (
        <EmptyEvents title={title} />
      )}
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
              <p className="mt-6 text-lg leading-8 text-white/85">Browse confirmed upcoming opportunities, review past programs, and watch for future event announcements from Know It Africa.</p>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EventGroup title="Upcoming Events" description="Open or scheduled events learners can register interest for now." events={upcomingEvents} />
            <EventGroup title="Past Events" description="Completed or archived bootcamps and classes from Know It Africa’s learning journey." events={pastEvents} />
            <EventGroup title="Future Events" description="Future events will appear here only when details are confirmed." events={futureEvents} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
