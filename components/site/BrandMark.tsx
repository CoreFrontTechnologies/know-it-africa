import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export function BrandMark({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return (
    <span className={cn("grid shrink-0 place-items-center", sizeClasses[size], className)}>
      <Image src="/brand/know-it-africa-logo.svg" alt="Know It Africa logo" width={128} height={128} className="h-full w-full object-contain drop-shadow-sm" priority />
    </span>
  );
}
