


import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: 'white' | 'red' | 'orange' | 'pink' | 'transparent' | 'black';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  border?: 'none' | 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  position?: 'left' | 'right' | 'center';
  bordercolor?: 'dark' | 'light' | 'danger' | 'success' | 'warning' | 'info';
}


/**
 * 
 * @param {'white' | 'red' | 'orange' | 'pink' | 'transparent' | 'black'} variant - Warna background container dengan value | white | red | orange | pink | transparent | black
 * @param {'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} shadow - Bayangan container dengan value | none | sm | md | lg | xl | 2xl
 * @param {'none' | 'sm' | 'md' | 'lg' | 'xl'} padding - Padding container dengan value | none | sm | md | lg | xl
 * @param {'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} radius - Radius sudut container dengan value | none | sm | md | lg | xl | 2xl | full
 * @param {'none' | 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} border - Border container dengan value | none | default | sm | md | lg | xl | 2xl
 * @param {'left' | 'right' | 'center'} position - Posisi konten container dengan value | left | right | center
 * @param {'dark' | 'light' | 'danger' | 'success' | 'warning' | 'info'} bordercolor - Warna border container
 * @param {ReactNode} children - Konten yang akan dibungkus oleh container
 * @param {string} className - Class tambahan untuk container
 * @returns {JSX.Element} - Container yang dibungkus oleh props yang diberikan
 */
export const Container = ({ 
  children, 
  variant = 'transparent', 
  shadow = 'none',
  padding = 'none',
  radius = 'none',
  border = 'none',
  position = 'left',
  bordercolor = 'dark',
  className, 
  ...props 
}: BoxProps) => {
  
  const variants = {
    white: 'bg-lightdark-primary',
    red: 'bg-red-primary',
    orange: 'bg-orange-primary',
    pink: 'bg-pink-primary',
    transparent: 'bg-transparent',
    black: 'bg-lightdark-tertiary',
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const positions = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  };

  const radii = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    'full': 'rounded-full',
  };

  const borders = {
    none: 'border-0',
    default: 'border',
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-6',
    xl: 'border-8',
    '2xl': 'border-12',
  };

  

  

  const bordercolors = {
    dark: 'border-lightdark-neutral',
    light: 'border-lightdark-primary',
    danger: 'border-danger',
    success: 'border-success',
    warning: 'border-warning',
    info: 'border-info',
  };

  return (
    <div
      className={cn(
        variants[variant],
        shadows[shadow],
        paddings[padding],
        radii[radius],
        borders[border],
        bordercolors[bordercolor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
