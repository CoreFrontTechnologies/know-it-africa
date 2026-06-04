import Link from "next/link";
import { Facebook, Mail, MessageCircle, Phone, Twitter } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { BrandMark } from "@/components/site/BrandMark";

const footerSocialLinks = [
  { label: "Facebook", href: siteConfig.facebook, icon: Facebook },
  { label: "X", href: siteConfig.x, icon: Twitter },
  { label: "WhatsApp", href: siteConfig.whatsapp, icon: MessageCircle },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-royal px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.8fr_1fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="text-lg font-black">{siteConfig.name}</p>
              <p className="text-sm text-white/65">{siteConfig.motto}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/70">
            A premium African AI education and digital innovation brand helping learners become creators, builders, and globally relevant leaders.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gold">Quick links</h3>
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block text-sm text-white/70 transition hover:text-gold">
                {link.label}
              </a>
            ))}
            <Link href="/events" className="block text-sm text-white/70 transition hover:text-gold">Events</Link>
            <Link href="/registration" className="block text-sm text-white/70 transition hover:text-gold">Registration</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gold">Official contact</h3>
          <div className="space-y-3 text-sm text-white/70">
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-gold">
              <MessageCircle className="h-4 w-4" /> {siteConfig.whatsappDisplay}
            </a>
            <a href={`tel:${siteConfig.phoneSecondary}`} className="flex items-center gap-2 transition hover:text-gold">
              <Phone className="h-4 w-4" /> {siteConfig.phoneSecondary}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 transition hover:text-gold">
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
            <p className="text-white/55">Event venues are shown on each event page.</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gold">Social</h3>
          <div className="mb-5 flex gap-3">
            {footerSocialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/75 transition hover:-translate-y-0.5 hover:bg-gold hover:text-royal">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-white/70">{siteConfig.social}</p>
          <a href={`https://${siteConfig.website}`} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-white/70 transition hover:text-gold">{siteConfig.website}</a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/55">
        © 2026 Know It Africa. All rights reserved.
      </div>
    </footer>
  );
}
