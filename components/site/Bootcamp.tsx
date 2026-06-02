import { Check } from "lucide-react";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { Button } from "@/components/ui/Button";
import { bootcampTopics, siteConfig } from "@/lib/constants";

export function Bootcamp() {
  return (
    <SectionShell id="bootcamp" className="bg-white">
      <div className="overflow-hidden rounded-[2rem] bg-royal p-6 text-white shadow-luxury pattern-grid sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionBadge label="Current Activity / Event" dark />
            <h2 className="mt-5 text-4xl font-black tracking-tight text-balance sm:text-5xl">{siteConfig.programTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              A practical bootcamp for students and young learners who want to understand AI, software development, and modern digital tools.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {['Beginner Friendly', 'Hands-on Projects', 'Mentorship', 'WhatsApp Learning Group'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/85">{tag}</span>
              ))}
            </div>
            <Button href="/registration" className="mt-9" showArrow>Register for Bootcamp</Button>
          </div>
          <div className="rounded-[1.7rem] bg-white p-6 text-royal shadow-2xl sm:p-8">
            <h3 className="text-2xl font-black">What learners will cover</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {bootcampTopics.map((topic, index) => (
                <div key={topic} className="flex gap-3 rounded-2xl bg-soft-blue p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-xs font-black text-royal">{index + 1}</span>
                  <span className="text-sm font-bold leading-6 text-slate-700">{topic}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm font-bold text-primary-blue">
              <Check className="h-5 w-5 text-gold" /> Includes final practical project and certificate.
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
