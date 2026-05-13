// components/molecules/CalendarHeader.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  monthName: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

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