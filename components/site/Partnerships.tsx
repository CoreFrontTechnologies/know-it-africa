import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { Button } from "@/components/ui/Button";
import { partnerTypes, siteConfig } from "@/lib/constants";

export function Partnerships() {
  return (
    <SectionShell id="partnerships" className="bg-white afro-pattern">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionBadge label="Partnerships" />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-royal text-balance sm:text-5xl">
            Invite Know It Africa to your school or organization.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-text">
            We collaborate with schools, NGOs, ministries, embassies, communities, and businesses to deliver practical AI and digital skills programs.
          </p>
          <Button href={siteConfig.whatsapp} external className="mt-8" showArrow>Discuss Partnership</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {partnerTypes.map(({ label, icon: Icon }) => (
            <div key={label} className="rounded-3xl border border-royal/8 bg-white/85 p-6 shadow-luxury backdrop-blur transition duration-300 hover:-translate-y-1">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-royal">{label}</h3>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
