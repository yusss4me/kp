'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '../ui/molecules/error-display';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 w-full h-full flex items-center justify-center p-6 bg-gray-50/50">
      <ErrorDisplay 
        title="Terjadi Masalah di Dasbor Owner"
        message="Sistem sedang mengalami kendala saat memuat halaman pengawasan ini. Silakan coba beberapa saat lagi."
        onRetry={() => reset()}
      />
    </div>
  );
}
