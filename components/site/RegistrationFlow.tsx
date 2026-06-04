import { ShieldAlert } from "lucide-react";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { Button } from "@/components/ui/Button";
import { registrationFlowCards, registrationSteps, siteConfig } from "@/lib/constants";

export function RegistrationFlow() {
  return (
    <SectionShell className="bg-royal text-white pattern-grid">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionBadge label="Simple Registration" dark />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-balance sm:text-5xl">
            Reserve your seat and receive your joining details.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/80">
            Register for the event that fits your learning goals, complete payment securely, and our team will privately confirm the next steps for you.
          </p>
          <div className="mt-8 space-y-3">
            {registrationSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-black text-royal">{index + 1}</span>
                <p className="text-sm font-semibold leading-6 text-white/90">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-7 text-royal shadow-2xl sm:p-9">
          <h3 className="text-2xl font-black">How registration works</h3>
          <p className="mt-3 leading-7 text-slate-700">
            The process is built to be quick, secure, and easy for learners, parents, schools, and partners.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {registrationFlowCards.map(([label, text]) => (
              <div key={label} className="rounded-2xl bg-soft-blue p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/registration" showArrow>Start Registration</Button>
            <Button href={siteConfig.whatsapp} variant="navy" external>Ask a Question</Button>
          </div>
          <div className="mt-6 flex gap-3 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm font-bold leading-6 text-primary-blue">
            <ShieldAlert className="h-5 w-5 shrink-0 text-gold" /> Official group access is shared privately after registration and payment confirmation.
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
