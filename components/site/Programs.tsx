import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { ProgramCard } from "@/components/site/ProgramCard";
import { programs } from "@/lib/constants";

export function Programs() {
  return (
    <SectionShell id="programs" className="bg-light-bg">
      <div className="mx-auto max-w-3xl text-center">
        <SectionBadge label="Our Programs" />
        <h2 className="mt-5 text-4xl font-black tracking-tight text-royal text-balance sm:text-5xl">
          Practical learning paths for the future of Africa.
        </h2>
        <p className="mt-5 text-lg leading-8 text-muted-text">
          Each program is designed to be beginner-friendly, practical, and relevant to real opportunities in education, career, and business.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((program, index) => (
          <ProgramCard key={program.title} index={index} {...program} />
        ))}
      </div>
    </SectionShell>
  );
}
