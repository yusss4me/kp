'use client';

import React from 'react';
import { Users, ChevronDown } from 'lucide-react';

interface RecipientSelectorProps {
  selectedGroup: string;
  count: number;
}

export const RecipientSelector: React.FC<RecipientSelectorProps> = ({ selectedGroup, count }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-600 rounded-lg text-white">
          <Users size={20} />
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-green-700 tracking-wider">Kirim Ke</p>
          <p className="font-bold text-gray-900">{selectedGroup}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="bg-green-600 text-white text-[10px] px-2 py-1 rounded-full font-bold">
          {count} Orang
        </span>
      </div>
    </div>
  );
};