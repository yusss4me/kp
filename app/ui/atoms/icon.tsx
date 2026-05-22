import { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export interface IconProps extends LucideProps {
  /** @param {LucideIcon} icon - Komponen icon dari lucide-react */
  icon: LucideIcon;
  /** @param {'default' | 'red' | 'light' | 'current' | 'danger' | 'success' | 'warning' | 'info' | 'dark'} color - Warna icon */
  color?: 'default' | 'red' | 'light' | 'current' | 'danger' | 'success' | 'warning' | 'info' | 'dark';
  /** @param {number | string} size - Ukuran icon (pixel atau string) */
  size?: number | string;
}

/** 
 * Icon (Icn)
 * 
 * Komponen pembungkus Lucide Icon untuk standarisasi warna, ukuran, 
 * dan radius di seluruh aplikasi.
 * 
 * @param {IconProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Icon
 */
export const Icn = ({
  icon: Icon,
  color = 'default',
  size = 20,
  className,
  ...props
}: IconProps) => {
  const colors = {
    default: 'text-lightdark-tertiary',
    red: 'text-red-primary',
    light: 'text-lightdark-primary',
    current: 'text-current',
    danger: 'text-danger',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info',
    dark: 'text-lightdark-tertiary',
  };

  return (
    <Icon
      size={size}
      className={cn(
        'shrink-0 transition-colors',
        colors[color],
        className
      )}
      {...props}
    />
  );
};
