'use client';
import React from 'react';
import Link from 'next/link';
import { DiscoverCard } from '@/app/ui/molecules/discoverCard';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { routes } from '@/app/lib/constants/routes';

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
export const DiscoverSection: React.FC<DiscoverSectionProps> = ({ items  }) => {
  return (
    <Container className="py-6 overflow-hidden flex flex-col">
      {/* Header Section (Molekul) */}

      {/* Horizontal Scroller (Container Organisme) */}
      <Container className="flex flex-col md:flex-row flex-nowrap md:flex-wrap gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide snap-x snap-mandatory md:overflow-x-visible">
        {items.length === 0 ? (
          <div className="w-full py-8 text-center text-gray-500">
            <Txt variant="body">Belum ada program saat ini.</Txt>
          </div>
        ) : (
          items.map((item) => (
            <Container key={item.id} className="min-w-[280px] md:min-w-0 md:flex-1 snap-center flex flex-col">
              <DiscoverCard
                title={item.title}
                image={item.image}
                href={routes.visitor.donasi(item.id)}
              />
            </Container>
          ))
        )}
      </Container>
    </Container>
  );
};