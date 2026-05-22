import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils'; // Menggunakan helper cn yang kita bahas sebelumnya

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'red' | 'light' | 'transparent';
  textColor?: 'red' | 'light' | 'dark' | 'darkred';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'circle' | 'rounded';
  borderColor?: 'red' | 'light' | 'dark';
  border?: 'border' | 'none';
  isLoading?: boolean;
  
}

/**
 * Button (Btn)
 * 
 * Komponen tombol dasar dengan berbagai varian warna, ukuran, dan bentuk.
 * Mendukung status loading dan kustomisasi border.
 * 
 * @param {ReactNode} children - Konten di dalam tombol (teks atau icon)
 * @param {'red' | 'light' | 'transparent'} variant - Varian warna background tombol
 * @param {'red' | 'light' | 'dark'} textColor - Warna teks tombol
 * @param {'sm' | 'md' | 'lg'} size - Ukuran tombol
 * @param {'square' | 'circle' | 'rounded'} shape - Bentuk sudut tombol
 * @param {'red' | 'light' | 'dark'} borderColor - Warna border tombol
 * @param {'border' | 'none'} border - Ketebalan border
 * @param {boolean} isLoading - Status loading tombol
 * @param {ButtonProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Tombol
 */
export const Btn = ({ 
  children,  
  variant = 'red', 
  textColor, 
  size = 'sm', 
  shape = 'circle',
  border = 'none',
  borderColor = 'red',
  className, 
  isLoading,
  ...props 
}: ButtonProps) => {
  
  const computedTextColor = textColor || (
    variant === 'red' || variant === 'light' ? 'light' : 'dark'
  );

  const variants = {
    red: 'bg-red-primary hover:bg-red-secondary',
    light: 'bg-red-secondary hover:bg-red-primary',
    transparent: 'bg-transparent',
  };

  const textVariants = {
    red: 'text-red-primary hover:text-red-secondary',
    light: 'text-lightdark-primary hover:text-lightdark-tertiary',
    dark: 'text-lightdark-tertiary hover:text-lightdark-primary',
    darkred: 'text-lightdark-tertiary hover:text-red-primary',
    
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base', // Ukuran standar yang nyaman
    lg: 'px-8 py-4 text-lg font-bold', // Sangat cocok untuk pengguna gaptek
  };

  const borders = {
    border: 'border',
    none: 'border-none',
  }
  const borderColors = {
    red: 'border-red-primary hover:border-red-secondary',
    light: 'border-lightdark-primary',
    dark: 'border-lightdark-tertiary hover:border-lightdark-primary',
    
  }
  const shapes = {
    square: 'rounded-none',
    circle: 'rounded-full',
    rounded: 'rounded-md',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-300 active:scale-95 disabled:opacity-50 cursor-pointer',
        variants[variant],
        textVariants[computedTextColor],
        sizes[size],
        borders[border],
        borderColors[borderColor],
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