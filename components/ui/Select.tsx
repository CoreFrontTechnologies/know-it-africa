import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  helperText?: string;
  options: readonly string[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder = "Select an option", className, id, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <label className="block" htmlFor={selectId}>
        <span className="mb-2 block text-sm font-black text-royal">{label}</span>
        <span className="relative block">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-2xl border bg-white px-4 py-3 pr-11 text-sm font-semibold text-dark-text shadow-sm outline-none transition focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10",
              error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200",
              className,
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
        </span>
        {helperText && !error ? (
          <span id={`${selectId}-helper`} className="mt-2 block text-xs font-semibold text-muted-text">
            {helperText}
          </span>
        ) : null}
        {error ? (
          <span id={`${selectId}-error`} className="mt-2 block text-xs font-bold text-red-600">
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

Select.displayName = "Select";
