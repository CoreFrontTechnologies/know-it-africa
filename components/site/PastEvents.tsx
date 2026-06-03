import { BadgePercent, CalendarDays, CheckCircle2, Clock3, MapPin, Trophy, UsersRound } from "lucide-react";
import { pastEvents } from "@/lib/constants";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { BrandMark } from "@/components/site/BrandMark";
import { cn } from "@/lib/utils";

const toneClasses = {
  blue: "from-royal via-primary-blue to-[#0B4DC2]",
  red: "from-[#4A0C0C] via-[#8B1010] to-[#D71920]",
  navy: "from-royal via-[#0B2A72] to-primary-blue",
};

export function PastEvents() {
  return (
    <SectionShell id="events" className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <SectionBadge label="Past & Featured Events" />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-royal sm:text-5xl">
            Real bootcamps, real learners, practical AI outcomes.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-text">
            Know It Africa has hosted and promoted intensive AI and software development experiences for students, kids, and youths with practical training, certification, product thinking, and career leverage.
          </p>
        </div>
        <div className="rounded-[2rem] border border-gold/25 bg-soft-blue p-6 shadow-luxury sm:p-8">
          <div className="flex items-center gap-4">
            <BrandMark size="lg" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Event Archive</p>
              <p className="mt-1 text-2xl font-black text-royal">AI • Software Development • Innovation</p>
            </div>
          </div>
          <p className="mt-5 text-sm font-semibold leading-7 text-muted-text">
            Details below were structured from the supplied event flyers so the website can show a polished event history without exposing raw WhatsApp flyer links.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pastEvents.map((event) => (
          <article key={event.title} className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-luxury transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className={cn("relative min-h-64 overflow-hidden bg-gradient-to-br p-6 text-white pattern-grid", toneClasses[event.tone])}>
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <BrandMark className="bg-white/95" />
                <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-gold ring-1 ring-white/15">
                  {event.status}
                </span>
              </div>
              <div className="relative z-10 mt-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">{event.audience}</p>
                <h3 className="mt-3 text-3xl font-black leading-tight tracking-tight">{event.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/76">{event.summary}</p>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-3 text-sm font-bold text-royal">
                <div className="flex items-center gap-3 rounded-2xl bg-light-bg p-3">
                  <CalendarDays className="h-4 w-4 text-primary-blue" /> {event.date}
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-light-bg p-3">
                  <Clock3 className="h-4 w-4 text-primary-blue" /> {event.time}
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-light-bg p-3">
                  <MapPin className="h-4 w-4 text-primary-blue" /> {event.venue}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {event.priceNotes.map((note) => (
                  <div key={note} className="rounded-2xl bg-gold/15 p-4 text-sm font-black text-royal">
                    <BadgePercent className="mb-2 h-4 w-4 text-primary-blue" /> {note}
                  </div>
                ))}
                <div className="rounded-2xl bg-soft-blue p-4 text-sm font-black text-royal">
                  <UsersRound className="mb-2 h-4 w-4 text-primary-blue" /> {event.slots}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-primary-blue">
                  <Trophy className="h-4 w-4 text-gold" /> Key benefits
                </div>
                <div className="grid gap-2">
                  {event.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm font-bold text-muted-text">
                      <CheckCircle2 className="h-4 w-4 text-success" /> {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
