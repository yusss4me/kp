


import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** @param {ReactNode} children - Konten yang akan dibungkus oleh container */
  children?: ReactNode;
  /** @param {'light' | 'red' | 'transparent' | 'dark' | 'danger' | 'success' | 'warning' | 'info'} variant - Varian warna latar belakang */
  variant?: 'light' | 'red' | 'transparent' | 'dark' | 'danger' | 'success' | 'warning' | 'info';
  /** @param {'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} shadow - Bayangan container */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** @param {'none' | 'sm' | 'md' | 'lg' | 'xl'} padding - Padding internal container */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** @param {'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'rounded' | 'full'} radius - Radius sudut container */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'rounded' | 'full';
  /** @param {'none' | 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} border - Ketebalan border */
  border?: 'none' | 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** @param {'left' | 'right' | 'center'} position - Perataan konten internal */
  position?: 'left' | 'right' | 'center';
  /** @param {'dark' | 'red' | 'light' | 'danger' | 'success' | 'warning' | 'info'} bordercolor - Warna border */
  bordercolor?: 'dark' | 'red' | 'light' | 'danger' | 'success' | 'warning' | 'info';
  /** @param {'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none'} gap - Jarak antar elemen internal */
  gap?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'|'none';
  
  
  
}


/**
 * Container
 * 
 * Komponen pembungkus serbaguna untuk mengatur layout, latar belakang, 
 * bayangan, border, dan padding secara konsisten.
 * 
 * @param {ContainerProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Container
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
  gap = 'default',
  
  className, 
  ...props 
}: ContainerProps) => {
  
  const variants = {
    light: 'bg-lightdark-primary',
    red: 'bg-red-primary',
    transparent: 'bg-transparent',
    dark: 'bg-lightdark-tertiary',
    danger: 'bg-danger',
    success: 'bg-success',
    warning: 'bg-warning',
    info: 'bg-info',
   
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
    rounded: 'rounded',
    full: 'rounded-full',
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
    red: 'border-red-primary',
    dark: 'border-lightdark-neutral',
    light: 'border-lightdark-primary',
    danger: 'border-danger',
    success: 'border-success',
    warning: 'border-warning',
    info: 'border-info',
  };

  const gaps = {
    default: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-10',
    '2xl': 'gap-12',
    none: 'gap-0',
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
        positions[position],
        gaps[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
