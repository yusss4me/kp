// components/organisms/CategoryList.tsx
'use client';
import React, { useState } from 'react';
import { Book, Heart, Users, GraduationCap, LucideIcon } from 'lucide-react';
import { CategoryCard } from '@/app/ui/molecules/categoryCard';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';

export interface CategoryListProps {
  id?: string;
  title?: string;
  icon?: LucideIcon;
  className?: string;
}

/**
 * CategoryList
 * 
 * Komponen daftar kategori horizontal yang dapat digeser.
 * Berisi daftar kartu kategori untuk memfilter program berdasarkan minat.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {CategoryListProps} props - Properti komponen
 * @returns {JSX.Element} Komponen CategoryList
 */
export const CategoryList: React.FC<CategoryListProps> = ({ id, title, icon, className }) => {
  const [activeTab, setActiveTab] = useState('Pendidikan');

  const categories = [
    { id: '1', name: 'Pendidikan', icon: GraduationCap },
    { id: '2', name: 'Kemanusiaan', icon: Heart },
    { id: '3', name: 'Pemberdayaan', icon: Users },
    { id: '4', name: 'Literasi', icon: Book },
  ];

  return (
    <Container className="space-y-4 flex flex-col">
      <Container className="flex justify-between items-center px-1">
        <Txt weight="bold" className="text-gray-900">Kategori</Txt>
        <Btn 
          variant="transparent" 
          textColor="red" 
          size="sm"
          className="text-[10px] font-black uppercase tracking-widest border-none p-0"
        >
          Semua
        </Btn>
      </Container>
      <Container padding='xl' className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            label={cat.name}
            iconCard={cat.icon}
            colorScheme={activeTab === cat.name ? 'red' : 'light'}
            isActive={activeTab === cat.name}
            onClick={() => setActiveTab(cat.name)}
          />
        ))}
      </Container>
    </Container>
  );
};