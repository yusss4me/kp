// components/atoms/CalendarDay.tsx
import React from 'react';

interface CalendarDayProps {
  day: number;
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

/**
 * Komponen satu sel hari dalam kalender.
 * 
 * @param {number} day - Angka tanggal yang akan ditampilkan
 * @param {boolean} isCurrentMonth - Apakah tanggal ini termasuk bulan yang sedang ditampilkan
 * @param {boolean} isSelected - Apakah tanggal ini sedang dipilih
 * @param {Function} onClick - Handler saat tanggal diklik
 * @returns {JSX.Element} Komponen sel hari kalender
 */
export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  isCurrentMonth = true, 
  isSelected = false,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors
        ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
        ${isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
      `}
    >
      {day}
    </button>
  );
};