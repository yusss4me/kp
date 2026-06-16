import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "@/app/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

/**
 * Checkbox
 *
 * Komponen checkbox atom dengan dukungan label dan pesan error.
 * Menggunakan icon Check dari lucide-react sebagai indikator visual.
 *
 * @param {string} label - Teks label di samping checkbox
 * @param {string} error - Pesan kesalahan di bawah checkbox
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id: propId, ...props }, ref) => {
    const autoId = useId();
    const inputId = propId || autoId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              aria-invalid={error ? true : undefined}
              aria-describedby={errorId}
              className={cn(
                "peer h-5 w-5 appearance-none rounded-md border-2 transition-all cursor-pointer",
                "border-lightdark-neutral bg-lightdark-secondary",
                "checked:bg-red-primary checked:border-red-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary/30",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
              )}
              {...props}
            />
            <Check
              size={14}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "text-white pointer-events-none",
                "opacity-0 peer-checked:opacity-100 transition-opacity"
              )}
              strokeWidth={3}
            />
          </div>
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-lightdark-tertiary cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <span id={errorId} className="text-sm text-danger ml-1" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
