import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isLoading?: boolean;
}

/**
 * Komponen Textarea dengan label, pesan error, dan loading state.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, isLoading, ...props }, ref) => {
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
            'placeholder:text-lightdark-tertiary/40 hover:border-lightdark-tertiary/80',
            'min-h-[150px] resize-y',
            error ? 'border-danger' : 'border-lightdark-secondary',
            isLoading && 'opacity-70 pointer-events-none animate-pulse',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-danger ml-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
