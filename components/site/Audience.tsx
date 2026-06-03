import { MessageCircle } from "lucide-react";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { AudienceCard } from "@/components/site/AudienceCard";
import { Button } from "@/components/ui/Button";
import { audience, siteConfig } from "@/lib/constants";

export function Audience() {
  return (
    <SectionShell className="bg-light-bg">
      <div className="mx-auto max-w-3xl text-center">
        <SectionBadge label="Who We Serve" />
        <h2 className="mt-5 text-4xl font-black tracking-tight text-royal text-balance sm:text-5xl">
          Future-ready learning for students, schools, and businesses.
        </h2>
        <p className="mt-5 text-lg leading-8 text-muted-text">
          Know It Africa delivers practical digital skills programs for learners, institutions, and organizations that want to compete confidently in the age of AI.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {audience.map((item) => (
          <AudienceCard key={item.title} {...item} />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-6 rounded-[2rem] bg-royal p-7 text-white shadow-luxury sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div>
          <h3 className="text-2xl font-black">Not sure where you fit?</h3>
          <p className="mt-2 text-white/72">Speak with Know It Africa and we’ll guide you to the right program.</p>
        </div>
        <Button href={siteConfig.whatsapp} external>
          <MessageCircle className="h-4 w-4" /> Talk to Us on WhatsApp
        </Button>
      </div>
    </SectionShell>
  );
}
