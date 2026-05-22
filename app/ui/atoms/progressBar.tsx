// components/molecules/ProgressBar.tsx
import React from 'react';
import { cn } from '@/app/lib/utils';

export interface ProgressBarProps {
  current: number;
  target: number;
}

/**
 * ProgressBar
 * 
 * Komponen visual untuk menampilkan progres donasi atau pencapaian target 
 * dalam bentuk grafik batang.
 * 
 * @param {number} current - Nilai progres saat ini
 * @param {number} target - Nilai target yang ingin dicapai
 * @param {ProgressBarProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Progress Bar dengan label statistik
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ current, target }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="w-full space-y-2">
      <div className="w-full bg-red-secondary rounded-full h-2.5">
        <div 
          className="bg-red-primary h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        <span className="font-bold text-lightdark-neutral">${current}</span>
        <span className="text-lightdark-neutral font-medium">Raised of ${target}</span>
      </div>
    </div>
  );
};