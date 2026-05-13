// components/molecules/QuickActionCard.tsx

'use client';
import React from 'react';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  bgColor: string; // Misal: 'bg-orange-100'
}

export const QuickActionCard: React.FC<QuickActionProps> = ({ icon, label, bgColor }) => {
  return (
    <button className={`flex-1 ${bgColor} p-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-80 transition-opacity`}>
      {icon}
      <span className="text-xs font-bold text-gray-800">{label}</span>
    </button>
  );
};