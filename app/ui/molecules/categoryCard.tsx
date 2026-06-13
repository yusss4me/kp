// components/molecules/CategoryCard.tsx

import { Btn } from "@/app/ui/atoms/button";
import { Txt } from "@/app/ui/atoms/text";
import { Icn } from "@/app/ui/atoms/Icn";
import { LucideIcon } from 'lucide-react';

// Definisi interface untuk type-safety
export interface CategoryCardProps {
  label: string;
  iconCard: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  colorScheme?: 'red' | 'light' | 'dark' | 'transparent';
}

/**
 * CategoryCard
 * 
 * Komponen kartu kategori berbentuk tombol dengan icon dan label.
 * Digunakan untuk filter atau navigasi berdasarkan kategori program.
 * 
 * @param {string} label - Label nama kategori
 * @param {LucideIcon} iconCard - Icon kategori dari lucide-react
 * @param {boolean} isActive - Apakah kategori ini sedang aktif/dipilih
 * @param {() => void} onClick - Handler saat kartu kategori diklik
 * @param {'red' | 'light' | 'dark' | 'transparent'} colorScheme - Skema warna tema kartu
 * @param {CategoryCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen CategoryCard
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  label, 
  iconCard, 
  isActive = false, 
  onClick,
  colorScheme = 'light'
}) => {

  return (
    <Btn
      variant={isActive ? "red" : "light"}
      size="sm"
      shape="rounded"
      textColor={isActive ? "light" : "red"}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-4 min-w-[120px] gap-3 transition-all duration-300 shadow-lg
        ${isActive ? 'ring-2 ring-offset-2 ring-red-primary/50 shadow-lg scale-105' : 'hover:scale-105 hover:shadow-md'}
      `}
    >
      {/* Container Ikon */}
      <div className={`p-3 rounded-2xl ${isActive ? 'bg-white/20' : 'bg-white/10'} backdrop-blur-sm`}>
        <Icn icon={iconCard} size={20} color="current" />
      </div>
      
      {/* Label (Atom Txt) */}
      <Txt 
        variant="caption" 
        weight="bold" 
        color="current"
        className="uppercase tracking-widest text-[10px]"
      >
        {label}
      </Txt>
    </Btn>
  );
};