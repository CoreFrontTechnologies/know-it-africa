import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { events } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { BrandMark } from "@/components/site/BrandMark";
import { cn } from "@/lib/utils";

const toneClasses = {
  blue: "from-[#03123B] via-primary-blue to-[#0B4DC2]",
  red: "from-[#250404] via-[#7A0B0B] to-[#B5121B]",
  navy: "from-[#020A22] via-royal to-primary-blue",
};

const featuredEvents = events.filter((event) => event.category !== "future").slice(0, 3);

export function PastEvents() {
  return (
    <SectionShell id="events" className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <SectionBadge label="Events" />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-royal sm:text-5xl">
            Explore upcoming, past, and future Know It Africa events.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-text">
            Registration is now event-based, so learners and partners can choose the exact bootcamp, workshop, or school program they want to join.
          </p>
        </div>
        <div className="rounded-[2rem] border border-gold/25 bg-soft-blue p-6 shadow-luxury sm:p-8">
          <div className="flex items-center gap-4">
            <BrandMark size="lg" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Event System</p>
              <p className="mt-1 text-2xl font-black text-royal">Upcoming • Past • Future</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/events" showArrow>View All Events</Button>
            <Button href="/registration" variant="navy">Register for an Event</Button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featuredEvents.map((event) => (
          <article key={event.slug} className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-luxury transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className={cn("relative overflow-hidden bg-gradient-to-br p-6 text-white pattern-grid", toneClasses[event.tone])}>
              <div className="absolute inset-0 bg-royal/35" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <BrandMark className="bg-white/95" />
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-royal shadow-gold">
                  {event.status}
                </span>
              </div>
              <div className="relative z-10">
                <p className="mt-8 w-fit rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-gold ring-1 ring-white/20">{event.audience}</p>
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white drop-shadow">{event.title}</h3>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm font-semibold leading-7 text-muted-text">{event.summary}</p>
              <div className="grid gap-2 text-sm font-bold text-royal">
                <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary-blue" /> {event.date}</span>
                <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary-blue" /> {event.time}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-blue" /> {event.venue}</span>
              </div>
              <div className="grid gap-2">
                {event.benefits.slice(0, 3).map((benefit) => (
                  <span key={benefit} className="flex items-center gap-2 text-sm font-bold text-muted-text">
                    <CheckCircle2 className="h-4 w-4 text-success" /> {benefit}
                  </span>
                ))}
              </div>
              {event.registrationOpen ? (
                <Button href={`/registration?event=${event.slug}`} className="w-full justify-center">Register Now</Button>
              ) : (
                <Button href="/events" variant="ghost" className="w-full justify-center">
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
