import React from 'react';

import { Img } from '@/app/ui/atoms/image';
import { Btn } from '@/app/ui/atoms/button';
import { Container } from '@/app/ui/atoms/container';
import { Txt } from '@/app/ui/atoms/text';

export interface DiscoverCardProps {
  title: string;
  image: string;
  category: string;
  onClick?: () => void;
}

/**
 * DiscoverCard
 * 
 * Komponen kartu horizontal kecil untuk menampilkan konten yang ditemukan 
 * di bagian eksplorasi.
 * 
 * @param {string} title - Judul konten yang ditemukan
 * @param {string} image - URL gambar sampul
 * @param {string} category - Label kategori konten
 * @param {() => void} onClick - Handler saat kartu diklik
 * @param {DiscoverCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen DiscoverCard
 */
export const DiscoverCard: React.FC<DiscoverCardProps> = ({ title, image, category, onClick }) => {
  return (
    <Btn 
      onClick={onClick}
      variant='light'
      textColor='dark'
      border='border'
      shape='rounded'
      borderColor='light'
      className="flex-col min-w-[240px] overflow-hidden shadow-sm  active:scale-95 transition-transform"
    >
      <Container className="relative h-32 w-full">
        <Img src={image} alt={title} width={500} height={500} className="w-full h-full object-cover" />
        <Txt className="absolute top-3 left-3 bg-lightdark-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight">
          {category}
        </Txt>
      </Container>
      <Container variant='transparent' padding='md'>
        <Txt color='current' className="font-bold leading-tight line-clamp-2">
          {title}
        </Txt>
      </Container>
    </Btn>
  );
};