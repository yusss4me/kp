import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils'; // Menggunakan helper cn yang kita bahas sebelumnya

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'red' | 'orange' | 'pink' | 'light' | 'dark' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'circle' | 'rounded';
  border?: 'border' | 'none';
  isLoading?: boolean;
}

/**
 * Komponen Button (Btn) kustom dengan berbagai varian warna, ukuran, dan bentuk.
 * 
 * @param {ReactNode} children - Konten di dalam tombol (teks atau icon)
 * @param {'red' | 'orange' | 'pink' | 'light' | 'dark' | 'transparent'} variant - Varian warna tombol 'red' | 'orange' | 'pink' | 'light' | 'dark' | 'transparent'
 * @param {'sm' | 'md' | 'lg'} size - Ukuran tombol (kecil, menengah, besar) 'sm' | 'md' | 'lg'
 * @param {'square' | 'circle' | 'rounded'} shape - Bentuk sudut tombol 'square' | 'circle' | 'rounded'
 * @param {'border' | 'none'} border - Border tombol 'border' | 'none'
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ButtonHTMLAttributes} props - Atribut standar HTML button lainnya
 * @returns {JSX.Element} Komponen Tombol
 */
export const Btn = ({ 
  children,  
  variant = 'red', 
  size = 'sm', 
  shape = 'circle',
  border = 'none',
  className, 
  isLoading,
  ...props 
}: ButtonProps) => {
  
  const variants = {
    red: 'bg-red-primary text-red-secondary hover:text-red-neutral hover:bg-red-tertiary cursor-pointer border border-red-secondary',
    orange: 'bg-orange-primary text-orange-secondary hover:text-orange-neutral hover:bg-orange-tertiary cursor-pointer border border-orange-secondary',
    pink: 'bg-pink-primary text-pink-secondary hover:text-pink-tertiary hover:bg-pink-neutral cursor-pointer border border-pink-secondary',
    light: 'bg-lightdark-primary text-lightdark-tertiary hover:text-lightdark-neutral hover:bg-lightdark-secondary cursor-pointer border border-lightdark-tertiary',
    dark: 'bg-lightdark-tertiary text-lightdark-primary hover:text-lightdark-secondary hover:bg-lightdark-neutral cursor-pointer border border-lightdark-tertiary',
    transparent: 'bg-transparent text-lightdark-primary hover:text-red-primary hover:bg-red-secondary cursor-pointer border border-gray-secondary',
    
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base', // Ukuran standar yang nyaman
    lg: 'px-8 py-4 text-lg font-bold', // Sangat cocok untuk pengguna gaptek
  };

  const borders = {
    border: 'border',
    none: 'border-none',
  }

  const shapes = {
    square: 'rounded-none',
    circle: 'rounded-full',
    rounded: 'rounded-md',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-300 active:scale-95 disabled:opacity-50',
        variants[variant],
        sizes[size],
        borders[border],
        shapes[shape],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * Skeleton placeholder for the Button component.
 * Matches the sizing and shape of the Btn atom.
 */
export const BtnSkeleton = ({
  size = 'sm',
  shape = 'circle',
  className,
}: Pick<ButtonProps, 'size' | 'shape' | 'className'>) => {
  const sizes = {
    sm: 'h-[38px] w-24',
    md: 'h-[50px] w-32',
    lg: 'h-[62px] w-40',
  };

  const shapes = {
    square: 'rounded-none',
    circle: 'rounded-full',
    rounded: 'rounded-md',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-lightdark-neutral/20',
        sizes[size],
        shapes[shape],
        className
      )}
    />
  );
};