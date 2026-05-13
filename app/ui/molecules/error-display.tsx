import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Btn } from '../atoms/button';
import { Txt } from '../atoms/text';
import { Container } from '../atoms/container';
import { cn } from '@/app/lib/utils';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
  className?: string;
}

/**
 * ErrorDisplay component to show error messages with a retry option.
 * 
 * @param {string} title - The title of the error (default: 'Oops! Terjadi Kesalahan')
 * @param {string} message - The error message (default: 'Mohon maaf, sistem sedang mengalami kendala. Silakan coba beberapa saat lagi.')
 * @param {() => void} onRetry - Function to call when retry button is clicked
 * @param {boolean} fullPage - Whether to display as a full page or inline (default: false)
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} ErrorDisplay component
 */
export const ErrorDisplay = ({
  title = 'Oops! Terjadi Kesalahan',
  message = 'Mohon maaf, sistem sedang mengalami kendala. Silakan coba beberapa saat lagi.',
  onRetry,
  fullPage = false,
  className,
}: ErrorDisplayProps) => {
  const content = (
    <Container 
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 space-y-6 max-w-md mx-auto",
        !fullPage && "bg-red-primary/5 rounded-3xl border border-red-primary/10",
        className
      )}
    >
      <div className="p-4 bg-red-primary/10 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-primary" />
      </div>
      
      <div className="space-y-2">
        <Txt variant="h3" weight="bold" color="black">
          {title}
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral">
          {message}
        </Txt>
      </div>

      {onRetry && (
        <Btn 
          variant="red" 
          size="md" 
          onClick={onRetry}
          className="gap-2 px-8"
        >
          <RefreshCcw className="w-4 h-4" />
          Coba Lagi
        </Btn>
      )}
    </Container>
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center w-full px-6">
        {content}
      </div>
    );
  }

  return content;
};
