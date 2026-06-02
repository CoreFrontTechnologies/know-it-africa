import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { Card } from "@/components/ui/Card";
import { values } from "@/lib/constants";

export function About() {
  return (
    <SectionShell id="about" className="afro-pattern bg-white">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <SectionBadge label="About Know It Africa" />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-royal text-balance sm:text-5xl">
            A movement for African digital excellence.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-muted-text">
          <p>
            Know It Africa exists to bridge the gap between African potential and global opportunity. We help learners understand technology, use AI confidently, and build practical solutions for school, work, and business.
          </p>
          <p>
            Through structured bootcamps, school programs, and innovation partnerships, we are helping Africans move from passive technology users to creators, builders, and leaders.
          </p>
        </div>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ title, text, icon: Icon }) => (
          <Card key={title} className="transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-black text-royal">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-text">{text}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
