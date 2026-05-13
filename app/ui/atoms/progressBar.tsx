// components/molecules/ProgressBar.tsx
import React from 'react';
import { cn } from '@/app/lib/utils';

interface ProgressBarProps {
  current: number;
  target: number;
}

/**
 * Komponen Progress Bar untuk menampilkan progres donasi atau pencapaian target.
 * 
 * @param {number} current - Nilai progres saat ini
 * @param {number} target - Nilai target yang ingin dicapai
 * @returns {JSX.Element} Komponen Progress Bar dengan label jumlah terkumpul
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ current, target }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="w-full space-y-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-500 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        <span className="font-bold text-gray-900">${current}</span>
        <span className="text-gray-500 font-medium">Raised of ${target}</span>
      </div>
    </div>
  );
};