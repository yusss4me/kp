'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from './ui/molecules/error-display';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorDisplay 
      fullPage
      title="Terjadi Masalah"
      message="Kami minta maaf atas ketidaknyamanan ini. Sepertinya ada masalah teknis yang sedang kami tangani."
      onRetry={() => reset()}
    />
  );
}
