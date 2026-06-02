import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ProgramCard({
  title,
  text,
  icon: Icon,
  index,
}: {
  title: string;
  text: string;
  icon: LucideIcon;
  index: number;
}) {
  return (
    <Card className="group relative overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-primary-blue to-royal" />
      <div className="mb-6 flex items-center justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-royal text-gold transition group-hover:scale-110">
          <Icon className="h-7 w-7" />
        </div>
        <span className="text-5xl font-black text-soft-blue">0{index + 1}</span>
      </div>
      <h3 className="text-xl font-black text-royal">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-text">{text}</p>
    </Card>
  );
}
