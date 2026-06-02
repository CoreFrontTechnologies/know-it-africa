import { ArrowLeft, BadgeCheck, CalendarDays, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SectionBadge } from "@/components/site/SectionBadge";
import { siteConfig } from "@/lib/constants";

const highlights = [
  { label: "5-week intensive training", icon: CalendarDays },
  { label: "Beginner-friendly learning", icon: Users },
  { label: "Certificate after completion", icon: BadgeCheck },
  { label: "Saved before payment", icon: CreditCard },
];

export const metadata = {
  title: "Register for the AI & Software Development Bootcamp | Know It Africa",
  description:
    "Register interest for Know It Africa's AI & Software Development Bootcamp. Phase 4 saves validated registrations to Supabase and redirects learners to Flutterwave checkout.",
};

export default function RegistrationPage() {
  return (
    <>
      <Header />
      <main className="bg-light-bg">
        <section className="pattern-grid relative overflow-hidden bg-royal px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary-blue/70 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/80 backdrop-blur transition hover:bg-white/15 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <div>
                <SectionBadge label="Bootcamp Registration" dark />
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Register for the {siteConfig.programTitle}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
                  Complete the form below so Know It Africa can save learner details securely, generate a registration ID, and keep payment status pending while redirecting to Flutterwave checkout.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">Current bootcamp</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {highlights.map(({ label, icon: Icon }) => (
                    <div key={label} className="rounded-2xl bg-white/10 p-4">
                      <Icon className="mb-3 h-5 w-5 text-gold" />
                      <p className="text-sm font-bold leading-6 text-white/82">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 rounded-[2rem] border border-royal/8 bg-white p-5 shadow-luxury sm:p-7">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-primary-blue">Phase 4 Registration + Payment</p>
                  <h2 className="mt-2 text-2xl font-black text-royal">Student registration details</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-text">
                    All required fields are validated with friendly messages. Submitting saves the registration in Supabase with payment status set to pending, creates a Flutterwave checkout link server-side, and redirects you to payment.
                  </p>
                </div>
                <div className="rounded-2xl bg-soft-blue px-5 py-4 text-right">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">Fee</p>
                  <p className="text-3xl font-black text-royal">{siteConfig.programFee}</p>
                </div>
              </div>
            </div>
            <RegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
