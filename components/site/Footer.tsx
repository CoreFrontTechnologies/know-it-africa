import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-royal px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.8fr_1fr_0.8fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-sm font-black text-royal">KI</div>
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
            <Link href="/registration" className="block text-sm text-white/70 transition hover:text-gold">Registration</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gold">Contact</h3>
          <div className="space-y-3 text-sm text-white/70">
            <p>{siteConfig.whatsappDisplay}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.website}</p>
            <p>{siteConfig.venue}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-gold">Social</h3>
          <div className="mb-5 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
              <span key={index} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/75">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
          <p className="text-sm text-white/70">{siteConfig.social}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/55">
        © 2026 Know It Africa. All rights reserved.
      </div>
    </footer>
  );
}
