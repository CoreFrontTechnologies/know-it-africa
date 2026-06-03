import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-10 w-10 rounded-xl p-1.5",
  md: "h-12 w-12 rounded-2xl p-1.5",
  lg: "h-16 w-16 rounded-[1.35rem] p-2",
};

export function BrandMark({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return (
    <span className={cn("grid shrink-0 place-items-center bg-white shadow-luxury ring-1 ring-royal/10", sizeClasses[size], className)}>
      <Image src="/brand/know-it-africa-logo.svg" alt="Know It Africa logo" width={96} height={96} className="h-full w-full object-contain" />
    </span>
  );
}
