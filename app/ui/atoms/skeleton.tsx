import { HTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle' | 'rounded';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton component to show a pulsing placeholder during loading.
 * 
 * @param {'rectangle' | 'circle' | 'rounded'} variant - Shape of the skeleton (default: 'rounded')
 * @param {string | number} width - Width of the skeleton
 * @param {string | number} height - Height of the skeleton
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Skeleton component
 */
export const Skeleton = ({
  variant = 'rounded',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) => {
  const variants = {
    rectangle: 'rounded-none',
    circle: 'rounded-full',
    rounded: 'rounded-xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-lightdark-neutral/20',
        variants[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};
