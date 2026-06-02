import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label className="block" htmlFor={inputId}>
        <span className="mb-2 block text-sm font-black text-royal">{label}</span>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-2xl border bg-white px-4 py-3 text-sm font-semibold text-dark-text shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10",
            error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200",
            className,
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {helperText && !error ? (
          <span id={`${inputId}-helper`} className="mt-2 block text-xs font-semibold text-muted-text">
            {helperText}
          </span>
        ) : null}
        {error ? (
          <span id={`${inputId}-error`} className="mt-2 block text-xs font-bold text-red-600">
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

Input.displayName = "Input";
