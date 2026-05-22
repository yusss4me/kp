'use client';
import React from 'react';
import { DiscoverCard } from '@/app/ui/molecules/discoverCard';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';

interface DiscoverItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface DiscoverSectionProps {
  items: DiscoverItem[];
}

/**
 * DiscoverSection
 * 
 * Komponen bagian eksplorasi yang menampilkan daftar konten menarik 
 * dalam format kartu horizontal yang dapat digeser (scroller).
 * 
 * @param {DiscoverItem[]} items - Daftar item konten yang akan ditampilkan di bagian eksplorasi
 * @param {DiscoverSectionProps} props - Properti komponen
 * @returns {JSX.Element} Komponen DiscoverSection
 */
export const DiscoverSection: React.FC<DiscoverSectionProps> = ({ items }) => {
  return (
    <Container className="py-6 overflow-hidden flex flex-col">
      {/* Header Section (Molekul) */}
      <Container className="flex justify-between items-end px-4 mb-6">
        <Container className="space-y-1 flex flex-col">
          <Txt variant="h2" weight="bold" color='dark' className="text-2xl font-black tracking-tight">Discover</Txt>
          <Txt variant="small" color='dark' className="text-gray-400">Jelajahi berbagai program kebaikan</Txt>
        </Container>
        <Btn 
          variant="transparent" 
          textColor="red" 
          size="sm"
          className="text-xs font-black hover:underline uppercase tracking-widest border-none p-0"
        >
          See All
        </Btn>
      </Container>

      {/* Horizontal Scroller (Container Organisme) */}
      <Container className="flex flex-col md:flex-row flex-nowrap md:flex-wrap gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide snap-x snap-mandatory md:overflow-x-visible">
        {items.map((item) => (
          <Container key={item.id} className="min-w-[280px] md:min-w-0 md:flex-1 snap-center flex flex-col">
            <DiscoverCard
              title={item.title}
              category={item.category}
              image={item.image}
            />
          </Container>
        ))}
      </Container>
    </Container>
  );
};