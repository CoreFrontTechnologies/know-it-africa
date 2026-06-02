"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={cn("relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28", className)}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </motion.section>
  );
}
