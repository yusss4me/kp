// components/molecules/CalendarHeader.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarHeaderProps {
  monthName: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * CalendarHeader
 * 
 * Komponen header untuk kalender yang menampilkan bulan, tahun, 
 * dan tombol navigasi antar bulan.
 * 
 * @param {string} monthName - Nama bulan yang ditampilkan (misal: "Januari")
 * @param {number} year - Angka tahun yang ditampilkan
 * @param {() => void} onPrev - Handler untuk menavigasi ke bulan sebelumnya
 * @param {() => void} onNext - Handler untuk menavigasi ke bulan berikutnya
 * @param {CalendarHeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen CalendarHeader
 */
export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  monthName, year, onPrev, onNext 
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <span className="font-semibold text-gray-700">
        {monthName} {year}
      </span>
      <div className="flex gap-2">
        <button onClick={onPrev} className="p-1 hover:bg-gray-100 rounded-md">
          <ChevronLeft size={20} />
        </button>
        <button onClick={onNext} className="p-1 hover:bg-gray-100 rounded-md">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};