import type { LucideIcon } from "lucide-react";

export function AdminStatsCard({ label, value, icon: Icon, tone = "blue" }: { label: string; value: number | string; icon: LucideIcon; tone?: "blue" | "gold" | "green" | "red" }) {
  const tones = {
    blue: "bg-primary-blue/10 text-primary-blue",
    gold: "bg-gold/15 text-gold",
    green: "bg-success/10 text-success",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="rounded-[1.5rem] border border-royal/8 bg-white p-6 shadow-luxury">
      <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${tones[tone]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-black uppercase tracking-[0.16em] text-muted-text">{label}</p>
      <p className="mt-2 text-4xl font-black text-royal">{value}</p>
    </div>
  );
}
