// components/organisms/CategoryList.tsx
'use client';
import React, { useState } from 'react';
import { Book, Heart, Users, GraduationCap } from 'lucide-react';
import { CategoryCard } from '@/app/ui/molecules/categoryCard';
import { Txt } from '../atoms/text';

export const CategoryList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pendidikan');

  const categories = [
    { id: '1', name: 'Pendidikan', icon: <GraduationCap size={20} />, color: 'blue' },
    { id: '2', name: 'Kemanusiaan', icon: <Heart size={20} />, color: 'red' },
    { id: '3', name: 'Pemberdayaan', icon: <Users size={20} />, color: 'green' },
    { id: '4', name: 'Literasi', icon: <Book size={20} />, color: 'purple' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <Txt weight="bold" className="text-gray-900">Kategori</Txt>
        <button className="text-[10px] font-black text-red-primary uppercase tracking-widest">Semua</button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            label={cat.name}
            icon={cat.icon}
            colorScheme={cat.color as any}
            isActive={activeTab === cat.name}
            onClick={() => setActiveTab(cat.name)}
          />
        ))}
      </div>
    </div>
  );
};