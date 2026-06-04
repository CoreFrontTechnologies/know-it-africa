import { CalendarDays, Facebook, Globe, Mail, MessageCircle, Phone, Send, Twitter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { siteConfig } from "@/lib/constants";

const contactActions = [
  { label: "Primary phone", value: siteConfig.phonePrimary, href: `tel:${siteConfig.phonePrimary}`, icon: Phone },
  { label: "WhatsApp", value: siteConfig.whatsappDisplay, href: siteConfig.whatsapp, icon: MessageCircle },
  { label: "Support email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "Secondary phone", value: siteConfig.phoneSecondary, href: `tel:${siteConfig.phoneSecondary}`, icon: Phone },
];

const socialLinks = [
  { label: "Facebook", value: "Know It Africa on Facebook", href: siteConfig.facebook, icon: Facebook },
  { label: "X / Twitter", value: siteConfig.social, href: siteConfig.x, icon: Twitter },
  { label: "Website", value: siteConfig.website, href: `https://${siteConfig.website}`, icon: Globe },
];

export function Contact({ compact = false }: { compact?: boolean }) {
  return (
    <SectionShell id="contact" className={compact ? "bg-light-bg" : "bg-white"}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="rounded-[2rem] bg-royal p-7 text-white shadow-luxury pattern-grid sm:p-10">
          <SectionBadge label="Contact Know It Africa" dark />
          <h2 className="mt-5 text-4xl font-black tracking-tight text-balance sm:text-5xl">
            Talk to the right team before you register, partner, or sponsor.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/74">
            Use the official phone, WhatsApp, email, and social channels below for event registration support, school partnerships, sponsorship, payment confirmation, and media enquiries.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.whatsapp} external>
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="white" external>
              <Send className="h-4 w-4" /> Email Support
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-royal/8 bg-white p-5 shadow-luxury sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactActions.map(({ label, value, href, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="rounded-3xl border border-slate-100 bg-light-bg p-5 transition hover:-translate-y-0.5 hover:border-primary-blue/20 hover:bg-soft-blue">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-primary-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-blue">{label}</p>
                <p className="mt-2 break-words text-base font-black text-royal">{value}</p>
              </a>
            ))}
          </div>

          <div className="mt-5 rounded-3xl bg-royal p-6 text-white pattern-grid">
            <div className="flex gap-4">
              <CalendarDays className="h-6 w-6 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Event Venues</p>
                <p className="mt-2 text-white/78">Training venues are announced on each event page because locations may change by program.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {socialLinks.map(({ label, value, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-3xl border border-slate-100 p-5 transition hover:bg-soft-blue">
                <Icon className="mb-3 h-5 w-5 text-primary-blue" />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-blue">{label}</p>
                <p className="mt-2 text-sm font-bold text-muted-text">{value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
