"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/constants";
import { BrandMark } from "@/components/site/BrandMark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <BrandMark />
      <div className="leading-tight">
        <p className="text-base font-black tracking-tight text-royal">{siteConfig.name}</p>
        <p className="hidden text-[11px] font-semibold text-muted-text sm:block">{siteConfig.motto}</p>
      </div>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-royal/5 bg-white/78 backdrop-blur-2xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-royal">
        Skip to main content
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Brand />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-bold text-slate-700 transition hover:text-primary-blue">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Button href={siteConfig.whatsapp} variant="white" external className="border border-royal/10 px-4 py-2.5">
            <MessageCircle className="h-4 w-4 text-success" /> WhatsApp
          </Button>
          <Button href="/registration" className="px-4 py-2.5">Register Now</Button>
        </div>
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-royal/10 bg-white text-royal lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <motion.div
        className={cn("overflow-hidden border-t border-royal/5 bg-white lg:hidden", open ? "block" : "hidden")}
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
      >
        <div className="space-y-2 px-4 pb-5 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              onClick={() => setOpen(false)}
              href={link.href}
              className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-soft-blue"
            >
              {link.label}
            </a>
          ))}
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button href={siteConfig.whatsapp} variant="white" external className="border border-royal/10">
              <MessageCircle className="h-4 w-4 text-success" /> WhatsApp
            </Button>
            <Button href="/registration">Register Now</Button>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
