import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Btn } from '../atoms/button';
import { Txt } from '../atoms/text';
import { Container } from '../atoms/container';
import { cn } from '@/app/lib/utils';

export interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
  className?: string;
}

/**
 * ErrorDisplay
 * 
 * Komponen untuk menampilkan pesan kesalahan secara visual 
 * dengan opsi tombol coba lagi.
 * 
 * @param {string} title - Judul pesan kesalahan
 * @param {string} message - Detail pesan kesalahan
 * @param {() => void} onRetry - Handler untuk mencoba ulang proses (opsional)
 * @param {boolean} fullPage - Apakah ditampilkan memenuhi layar (full page)
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ErrorDisplayProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ErrorDisplay
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
        !fullPage && "bg-danger/5 rounded-3xl border border-danger/10",
        className
      )}
    >
      <div className="p-4 bg-danger/10 rounded-full">
        <AlertCircle className="w-12 h-12 text-danger" />
      </div>
      
      <div className="space-y-2">
        <Txt variant="h3" weight="bold" color="danger" align='center'>
          {title}
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral" align='center'>
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
