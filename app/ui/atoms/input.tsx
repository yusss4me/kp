import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Komponen Input teks dengan label, pesan error, dan suffix opsional.
 * 
 * @param {string} label - Label teks di atas input
 * @param {string} error - Pesan kesalahan di bawah input
 * @param {React.ReactNode} suffix - Elemen yang ditampilkan di sisi kanan input (misal: icon)
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {InputHTMLAttributes} props - Atribut standar HTML input lainnya
 * @returns {JSX.Element} Komponen Input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, suffix, className, isLoading, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-lightdark-tertiary ml-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all border-lightdark-tertiary',
              'focus:border-lightdark-neutral bg-lightdark-secondary text-lightdark-tertiary outline-none',
              'placeholder:text-lightdark-tertiary/40 hover:border-lightdark-tertiary/80',
              error ? 'border-danger' : 'border-lightdark-secondary',
              suffix && 'pr-14',
              isLoading && 'opacity-70 pointer-events-none animate-pulse',
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-1 flex items-center justify-center h-[calc(100%-8px)] w-fit overflow-hidden rounded-lg">
              {suffix}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-danger ml-1">{error}</span>}
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