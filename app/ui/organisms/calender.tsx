// components/organisms/Calendar.tsx
"use client";
import React, { useState } from 'react';
import { CalendarHeader } from '../molecules/calenderHeader';
import { CalendarDay } from '../atoms/calenderDay';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';

export interface CalendarProps {
  className?: string;
}

/**
 * Calendar
 * 
 * Komponen kalender dasar untuk menampilkan tanggal dalam sebulan.
 * Memungkinkan pengguna untuk memilih tanggal tertentu.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {CalendarProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Calendar
 */
export const Calendar: React.FC<CalendarProps> = () => {
  const [selectedDate, setSelectedDate] = useState<number>(24);
  
  // Dummy data untuk hari dalam seminggu
  const daysOfWeek = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];
  
  // Dummy data tanggal (Misal: April 2026)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Container className="w-80 bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col">
      <CalendarHeader 
        monthName="April" 
        year={2026} 
        onPrev={() => {}} 
        onNext={() => {}} 
      />
      
      <Container className="p-4 flex flex-col">
        {/* Grid Hari */}
        <Container className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day, idx) => (
            <Container key={`${day}-${idx}`} className="text-center py-2 justify-center">
              <Txt variant="caption" weight="bold" className="text-gray-400">
                {day}
              </Txt>
            </Container>
          ))}
        </Container>
        
        {/* Grid Tanggal */}
        <Container className="grid grid-cols-7 gap-1">
          {days.map((d) => (
            <CalendarDay 
              key={d} 
              day={d} 
              isSelected={d === selectedDate}
              onClick={() => setSelectedDate(d)}
            />
          ))}
        </Container>
      </Container>
    </Container>
  );
};