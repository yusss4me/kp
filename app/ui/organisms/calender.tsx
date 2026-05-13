// components/organisms/Calendar.tsx
"use client";
import React, { useState } from 'react';
import { CalendarHeader } from '../molecules/calenderHeader';
import { CalendarDay } from '../atoms/calenderDay';

export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(24);
  
  // Dummy data untuk hari dalam seminggu
  const daysOfWeek = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];
  
  // Dummy data tanggal (Misal: April 2026)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-80 bg-white border rounded-xl shadow-lg overflow-hidden">
      <CalendarHeader 
        monthName="April" 
        year={2026} 
        onPrev={() => {}} 
        onNext={() => {}} 
      />
      
      <div className="p-4">
        {/* Grid Hari */}
        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid Tanggal */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => (
            <CalendarDay 
              key={d} 
              day={d} 
              isSelected={d === selectedDate}
              onClick={() => setSelectedDate(d)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};