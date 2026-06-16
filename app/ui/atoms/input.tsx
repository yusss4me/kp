import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/app/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Input
 * 
 * Komponen Input teks dasar dengan dukungan label, pesan validasi, 
 * elemen suffix, dan status loading.
 * 
 * @param {string} label - Label teks di atas input
 * @param {string} error - Pesan kesalahan di bawah input
 * @param {React.ReactNode} suffix - Elemen tambahan di sisi kanan (misal: icon)
 * @param {boolean} isLoading - Status loading/proses pada input
 * @param {InputProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Input yang telah diformat
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, suffix, className, isLoading, id: propId, ...props }, ref) => {
    const autoId = useId();
    const inputId = propId || autoId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="text-md font-semibold text-lightdark-tertiary ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all border-lightdark-tertiary',
              'focus:border-lightdark-neutral bg-lightdark-secondary text-lightdark-tertiary outline-none',
              'placeholder:text-lightdark-neutral hover:border-lightdark-neutral',
              error ? 'border-danger' : 'border-lightdark-secondary',
              suffix && 'pr-14',
              isLoading && 'opacity-70 pointer-events-none animate-pulse',
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-1 flex items-center justify-center h-[calc(100%-8px)] w-fit overflow-hidden rounded-lg p-4 text-lightdark-tertiary">
              {suffix}
            </div>
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

Input.displayName = 'Input';

/**
 * Skeleton placeholder for the Input component.
 * Matches the sizing and border radius of the Input atom.
 */
export const InputSkeleton = ({
  hasLabel = true,
  className,
}: {
  hasLabel?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {hasLabel && (
        <div className="h-4 w-20 bg-lightdark-neutral/20 animate-pulse rounded ml-1" />
      )}
      <div className="h-[52px] w-full bg-lightdark-neutral/10 animate-pulse rounded-xl border-2 border-transparent" />
    </div>
  );
};