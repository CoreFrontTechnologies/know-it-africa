"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/site/SectionBadge";
import { heroStats, siteConfig } from "@/lib/constants";
import { StatCard } from "@/components/site/StatCard";

export function Hero() {
  return (
    <section className="pattern-grid relative overflow-hidden bg-royal px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <motion.div
        className="absolute -left-28 top-14 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-primary-blue/70 blur-3xl"
        animate={{ y: [0, -28, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <SectionBadge label="AI • Software Development • Digital Innovation" dark />
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Building Africa’s Next Generation of <span className="text-gold">AI-Ready</span> Innovators.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
            Know It Africa equips students, young professionals, schools, and businesses with practical skills in Artificial Intelligence, software development, and digital innovation.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/registration" showArrow>Join Current Bootcamp</Button>
            <Button href="#partnerships" variant="outline" showArrow>Partner With Us</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat, index) => (
              <StatCard key={stat.value} value={stat.value} label={stat.label} delay={0.25 + index * 0.12} />
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-white/10 to-success/10 blur-2xl" />
          <motion.div
            className="relative rounded-[2rem] border border-white/18 bg-white/12 p-4 shadow-2xl backdrop-blur-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="rounded-[1.6rem] bg-white p-7 text-royal">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-gold/18 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-blue">Current Activity</span>
                <span className="rounded-full bg-success/12 px-3 py-1 text-xs font-black uppercase tracking-wider text-success">Open</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">{siteConfig.programTitle}</h2>
              <div className="mt-6 space-y-4 text-sm font-semibold text-slate-700">
                {[
                  "5-week intensive learning experience",
                  `Venue: ${siteConfig.venue}`,
                  "Certificate + practical project",
                  "WhatsApp group access after payment confirmation",
                ].map((item, index) => (
                  <div key={item} className="flex gap-3">
                    {index === 1 ? <MapPin className="h-5 w-5 shrink-0 text-gold" /> : <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 rounded-2xl bg-soft-blue p-4">
                <div className="flex items-center gap-3 text-sm font-bold text-primary-blue">
                  <ShieldCheck className="h-5 w-5 text-gold" /> Certificate + project-based learning
                </div>
              </div>
              <Button href="/registration" className="mt-7 w-full" showArrow>Open Registration Page</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
