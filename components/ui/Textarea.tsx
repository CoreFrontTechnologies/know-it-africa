import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <label className="block" htmlFor={textareaId}>
        <span className="mb-2 block text-sm font-black text-royal">{label}</span>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-36 w-full resize-y rounded-2xl border bg-white px-4 py-3 text-sm font-semibold text-dark-text shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10",
            error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200",
            className,
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {helperText && !error ? (
          <span id={`${textareaId}-helper`} className="mt-2 block text-xs font-semibold text-muted-text">
            {helperText}
          </span>
        ) : null}
        {error ? (
          <span id={`${textareaId}-error`} className="mt-2 block text-xs font-bold text-red-600">
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

Textarea.displayName = "Textarea";
