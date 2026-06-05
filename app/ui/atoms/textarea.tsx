import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  isLoading?: boolean;
  value?: string | number;
}

/**
 * Textarea
 * 
 * Komponen input area teks multi-baris dengan dukungan label, 
 * pesan validasi, dan status loading.
 * 
 * @param {string} label - Label teks di atas textarea
 * @param {string} error - Pesan kesalahan di bawah textarea
 * @param {string} placeholder - Teks petunjuk di dalam textarea
 * @param {boolean} isLoading - Status loading/proses pada textarea
 * @param {TextareaProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Textarea yang telah diformat
 */

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, placeholder, className, isLoading, value, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-lightdark-tertiary ml-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 transition-all border-lightdark-tertiary',
            'focus:border-lightdark-neutral bg-lightdark-secondary text-lightdark-tertiary outline-none',
            'placeholder:text-lightdark-neutral hover:border-lightdark-neutral',
            'min-h-[150px] resize-y',
            error ? 'border-danger' : 'border-lightdark-secondary',
            isLoading && 'opacity-70 pointer-events-none animate-pulse',
            className
          )}
          placeholder={placeholder}
          {...props}
        />
        {error && <span className="text-xs text-danger ml-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
