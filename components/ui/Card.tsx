import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-white/70 bg-white p-6 shadow-luxury", className)}>
      {children}
    </div>
  );
}
