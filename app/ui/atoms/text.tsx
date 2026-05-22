import { ReactNode, ElementType, HTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'current' | 'default' | 'light' | 'dark' | 'grey' | 'red' | 'danger' | 'success' | 'warning' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  decoration?: 'none' | 'bold' | 'italic' | 'underline';
  font?: 'jakarta' | 'roboto';
}

/**
 * Text (Txt)
 * 
 * Komponen tipografi utama dengan berbagai varian ukuran, ketebalan, 
 * warna, dan jenis font yang terstandarisasi.
 * 
 * @param {ReactNode} children - Konten teks yang akan ditampilkan
 * @param {ElementType} as - Tag HTML yang akan digunakan (default: 'p')
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption'} variant - Varian ukuran dan gaya teks
 * @param {'light' | 'normal' | 'medium' | 'semibold' | 'bold'} weight - Ketebalan font teks
 * @param {'current' | 'default' | 'white' | 'black' | 'light' | 'grey' | 'red' | 'danger' | 'success' | 'warning' | 'info'} color - Warna teks sesuai tema
 * @param {'left' | 'center' | 'right' | 'justify'} align - Perataan teks
 * @param {'none' | 'bold' | 'italic' | 'underline'} decoration - Dekorasi gaya teks
 * @param {'jakarta' | 'roboto'} font - Jenis font yang digunakan
 * @param {TextProps} props - Properti komponen
 * @returns {JSX.Element} Komponen teks yang telah diformat
 */
export const Txt = ({
  children,
  as: Component = 'p',
  variant = 'body',
  weight,
  color = 'default',
  align = 'left',
  decoration = 'none',
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
    current: 'text-current',
    default: 'text-lightdark-tertiary',
    light: 'text-lightdark-primary',
   
    dark: 'text-lightdark-tertiary',
    grey: 'text-lightdark-neutral',
    red: 'text-red-primary',
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

  const decorations = {
    none: '',
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
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
        decoration && decorations[decoration],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
