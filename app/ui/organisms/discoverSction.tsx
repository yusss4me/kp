'use client';
import React from 'react';
import { DiscoverCard } from '@/app/ui/molecules/discoverCard';

interface DiscoverItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface DiscoverSectionProps {
  items: DiscoverItem[];
}

export const DiscoverSection: React.FC<DiscoverSectionProps> = ({ items }) => {
  return (
    <section className="py-6 overflow-hidden">
      {/* Header Section (Molekul) */}
      <div className="flex justify-between items-end px-4 mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Discover</h2>
          <p className="text-sm text-gray-400">Jelajahi berbagai program kebaikan</p>
        </div>
        <button className="text-xs font-black text-red-primary hover:underline uppercase tracking-widest">
          See All
        </button>
      </div>

      {/* Horizontal Scroller (Container Organisme) */}
      <div className="flex flex-nowrap md:flex-wrap gap-6 overflow-x-auto px-4 pb-8 scrollbar-hide snap-x snap-mandatory md:overflow-x-visible">
        {items.map((item) => (
          <div key={item.id} className="min-w-[280px] md:min-w-0 md:flex-1 snap-center">
            <DiscoverCard
              title={item.title}
              category={item.category}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </section>

  );
};