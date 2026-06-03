import { Globe, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { SectionBadge } from "@/components/site/SectionBadge";
import { SectionShell } from "@/components/site/SectionShell";
import { siteConfig } from "@/lib/constants";

const contacts = [
  { label: "WhatsApp", value: siteConfig.whatsappDisplay, icon: MessageCircle },
  { label: "Email", value: siteConfig.email, icon: Mail },
  { label: "Website", value: siteConfig.website, icon: Globe },
  { label: "Social", value: siteConfig.social, icon: Share2 },
];

export function Contact() {
  return (
    <SectionShell id="contact" className="bg-white">
      <div className="rounded-[2rem] border border-royal/8 bg-light-bg p-5 shadow-luxury sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.6rem] bg-white p-6 sm:p-8">
            <SectionBadge label="Contact Know It Africa" />
            <h2 className="mt-5 text-4xl font-black tracking-tight text-royal text-balance sm:text-5xl">
              Ready to register or partner with us?
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-text">
              Contact Know It Africa for bootcamp registration, school programs, partnerships, payment confirmation, or general enquiries.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contacts.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-royal/8 bg-light-bg p-4">
                  <div className="mb-3 flex items-center gap-3 text-sm font-black text-primary-blue">
                    <Icon className="h-4 w-4 text-gold" /> {label}
                  </div>
                  <p className="text-sm font-bold text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.6rem] bg-royal p-7 text-white pattern-grid sm:p-9">
            <h3 className="text-3xl font-black">Office / Training Info</h3>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Training Venue</p>
                  <p className="mt-2 text-white/78">{siteConfig.venue}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Phone</p>
                  <p className="mt-2 text-white/78">{siteConfig.phone}</p>
                </div>
              </div>
            </div>
            <div className="mt-9 rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Motto</p>
              <p className="mt-3 text-2xl font-black leading-tight">{siteConfig.motto}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
