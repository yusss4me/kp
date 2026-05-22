// components/molecules/QuickActionCard.tsx

'use client';
import React from 'react';
import { Btn } from '../atoms/button';
import { Icn } from '../atoms/icon';
import { Txt } from '../atoms/text';
import { LucideIcon } from 'lucide-react';

export interface QuickActionCardProps {
  Icon: LucideIcon;
  label: string;
  
}

/**
 * QuickActionCard
 * 
 * Komponen kartu aksi cepat berbentuk tombol dengan icon dan label.
 * Digunakan untuk navigasi cepat atau fitur utama di dashboard.
 * 
 * @param {React.ReactNode} icon - Icon yang ditampilkan di tengah kartu
 * @param {string} label - Label teks singkat untuk aksi
 * @param {string} bgColor - Warna latar belakang (Tailwind class, misal: 'bg-orange-100')
 * @param {QuickActionCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen QuickActionCard
 */
export const QuickActionCard: React.FC<QuickActionCardProps> = ({ Icon, label}) => {
  return (
    <Btn variant='light' className={`flex-1 p-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-80 transition-opacity`}>
      <Icn icon={Icon} color='dark' size='lg' />
      <Txt variant='small' color='black'>{label}</Txt>
    </Btn>
  );
};