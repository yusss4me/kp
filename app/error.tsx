'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ErrorDisplay } from './ui/molecules/error-display';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorDisplay 
      fullPage
      title={t('error')}
      message={t('error')}
      onRetry={() => reset()}
    />
  );
}
