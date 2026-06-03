import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "gold" | "navy" | "outline" | "white" | "ghost";
  className?: string;
  showArrow?: boolean;
  external?: boolean;
};

const variants = {
  gold: "bg-gold text-royal shadow-gold hover:-translate-y-0.5 hover:shadow-xl",
  navy: "bg-royal text-white shadow-luxury hover:-translate-y-0.5 hover:bg-primary-blue",
  outline: "border border-white/25 bg-white/10 text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/18",
  white: "bg-white text-royal shadow-luxury hover:-translate-y-0.5 hover:bg-soft-blue",
  ghost: "text-royal hover:bg-soft-blue",
};

export function Button({
  children,
  href,
  variant = "gold",
  className,
  showArrow = false,
  external = false,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/35",
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" /> : null}
    </>
  );

  if (!href) return <button className={classes}>{content}</button>;

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
