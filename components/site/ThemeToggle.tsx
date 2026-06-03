"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/site/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "group relative inline-flex h-11 w-[5.65rem] items-center rounded-full border border-royal/10 bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-luxury",
        isDark && "border-white/15 bg-royal",
        className,
      )}
    >
      <span className="absolute left-3 text-gold transition-opacity duration-300">
        <Sun className="h-4 w-4" />
      </span>
      <span className="absolute right-3 text-white/80 transition-opacity duration-300">
        <Moon className="h-4 w-4" />
      </span>
      <span
        className={cn(
          "relative z-10 grid h-9 w-9 place-items-center rounded-full bg-gold text-royal shadow-gold transition duration-300",
          isDark ? "translate-x-[2.75rem]" : "translate-x-0",
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}
