"use client";

import { motion } from "framer-motion";

export function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      className="rounded-3xl border border-white/14 bg-white/10 p-5 backdrop-blur"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03 }}
    >
      <p className="text-2xl font-black text-gold">{value}</p>
      <p className="mt-1 text-sm font-semibold text-white/70">{label}</p>
    </motion.div>
  );
}
