import { HTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle' | 'rounded';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton
 * 
 * Komponen placeholder yang berdenyut (pulsing) untuk ditampilkan 
 * selama proses loading data.
 * 
 * @param {'rectangle' | 'circle' | 'rounded'} variant - Bentuk skeleton
 * @param {string | number} width - Lebar skeleton (pixel atau string)
 * @param {string | number} height - Tinggi skeleton (pixel atau string)
 * @param {SkeletonProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Skeleton
 */
export const Skeleton = ({
  variant = 'circle',
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
        'animate-pulse bg-lightdark-neutral',
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
