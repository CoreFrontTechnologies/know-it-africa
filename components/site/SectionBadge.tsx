import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionBadge({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em]",
        dark
          ? "border-white/20 bg-white/10 text-gold"
          : "border-gold/30 bg-gold/10 text-primary-blue",
      )}
    >
      <Sparkles className="h-3.5 w-3.5 text-gold" />
      {label}
    </div>
  );
}
