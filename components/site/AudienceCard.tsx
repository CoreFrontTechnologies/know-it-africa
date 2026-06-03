import { CheckCircle2, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function AudienceCard({
  title,
  text,
  bullets,
  icon: Icon,
}: {
  title: string;
  text: string;
  bullets: string[];
  icon: LucideIcon;
}) {
  return (
    <Card className="transition duration-300 hover:-translate-y-2">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-royal text-gold">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-2xl font-black text-royal">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-text">{text}</p>
      <div className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-gold" /> {bullet}
          </div>
        ))}
      </div>
    </Card>
  );
}
