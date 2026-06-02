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
          <SectionBadge label="Independent Registration Page" dark />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-balance sm:text-5xl">
            Register, pay, and confirm your bootcamp access.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/72">
            Registration happens on a dedicated page. Student details are securely saved to the database before payment, then learners are redirected to Flutterwave checkout.
          </p>
          <div className="mt-8 space-y-3">
            {registrationSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-black text-royal">{index + 1}</span>
                <p className="text-sm font-semibold leading-6 text-white/82">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-7 text-royal shadow-2xl sm:p-9">
          <h3 className="text-2xl font-black">Registration + Flutterwave Flow</h3>
          <p className="mt-3 leading-7 text-muted-text">
            The form collects student details, creates a registration ID, stores the record, and connects the learner to Flutterwave payment.
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
            <Button href="/registration" showArrow>Open Registration Page</Button>
            <Button href={siteConfig.whatsapp} variant="navy" external>Confirm Payment</Button>
          </div>
          <div className="mt-6 flex gap-3 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm font-bold leading-6 text-primary-blue">
            <ShieldAlert className="h-5 w-5 shrink-0 text-gold" /> The WhatsApp group link should not be public. Send it privately after payment is verified.
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
