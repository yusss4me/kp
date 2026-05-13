import { ReactNode, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'black' | 'white' | 'danger' | 'success' | 'warning' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  font?: 'jakarta' | 'roboto';
}

/**
 * Komponen teks kustom dengan berbagai varian, bobot, warna, dan font.
 * 
 * @param {ReactNode} children - Konten teks yang akan ditampilkan
 * @param {ElementType} as - Tag HTML yang akan digunakan (default: 'p')
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption'} variant - Varian ukuran dan gaya teks 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption'
 * @param {'light' | 'normal' | 'medium' | 'semibold' | 'bold'} weight - Ketebalan font teks 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
 * @param {'default' | 'black' | 'white' | 'danger' | 'success' | 'warning' | 'info'} color - Warna teks sesuai tema 'default' | 'black' | 'white' | 'danger' | 'success' | 'warning' | 'info'
 * @param {'left' | 'center' | 'right' | 'justify'} align - Perataan teks 'left' | 'center' | 'right' | 'justify'
 * @param {'jakarta' | 'roboto'} font - Jenis font yang digunakan 'jakarta' | 'roboto'
 * @param {string} className - Class tambahan Tailwind CSS
 * @returns {JSX.Element} Komponen teks yang telah diformat
 */
export const Txt = ({
  children,
  as: Component = 'p',
  variant = 'body',
  weight,
  color = 'default',
  align = 'left',
  font = 'jakarta',
  className,
  ...props
}: TextProps) => {
  
  const variants = {
    h1: 'text-4xl md:text-5xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl font-bold leading-tight',
    h3: 'text-2xl md:text-3xl font-semibold leading-snug',
    h4: 'text-xl md:text-2xl font-semibold leading-snug',
    h5: 'text-lg md:text-xl font-medium leading-relaxed',
    h6: 'text-base md:text-lg font-medium leading-relaxed',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    caption: 'text-xs leading-normal',
  };

  const colors = {
    default: 'text-foreground',
    
    black: 'text-lightdark-tertiary',
    white: 'text-lightdark-primary',
    danger: 'text-danger',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const fonts = {
    jakarta: 'font-sans',
    roboto: 'font-secondary',
  };

  return (
    <Component
      className={cn(
        variants[variant],
        fonts[font],
        color && colors[color],
        weight && weights[weight],
        align && aligns[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
