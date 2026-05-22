import React, { useState } from 'react';
import { CalendarHeader } from '../molecules/calenderHeader';
import { CalendarDay } from '../atoms/calenderDay';
import { ActivityBadge } from '../atoms/activityBadge';
import { Activity } from '../../types/activity';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';

export interface ActivityCalendarProps {
  activities: Activity[];
}

/**
 * ActivityCalendar
 * 
 * Komponen kalender interaktif untuk memantau jadwal aktivitas yayasan.
 * Terdiri dari kalender bulanan dan panel detail yang menampilkan 
 * informasi program pada tanggal yang dipilih.
 * 
 * @param {Activity[]} activities - Daftar aktivitas yang akan ditampilkan pada kalender
 * @param {ActivityCalendarProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ActivityCalendar
 */
export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ activities }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Contoh sederhana: Generate 30 hari untuk April 2026
  const days = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    return `2026-04-${day.toString().padStart(2, '0')}`;
  });

  return (
    <Container className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-2xl">
      {/* Container Kalender */}
      <Container className="w-full max-w-sm bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <CalendarHeader 
          monthName="April" 
          year={2026} 
          onPrev={() => {}} 
          onNext={() => {}} 
        />
        
        <Container className="p-4 flex flex-col">
          <Container className="grid grid-cols-7 gap-2">
            {days.map((dateStr) => {
              const dayNumber = parseInt(dateStr.split('-')[2]);
              const dayActivities = activities.filter(a => a.date === dateStr);
              
              return (
                <Container key={dateStr} className="flex flex-col items-center gap-1">
                  <CalendarDay 
                    day={dayNumber} 
                    isSelected={selectedDate === dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                  />
                  {/* Menampilkan indikator aktivitas (Molekul) */}
                  <Container className="flex gap-0.5">
                    {dayActivities.map(act => (
                      <ActivityBadge key={act.id} type={act.type} />
                    ))}
                  </Container>
                </Container>
              );
            })}
          </Container>
        </Container>
      </Container>

      {/* Detail Panel: Menampilkan info program yang berjalan */}
      <Container className="flex-1 bg-white p-6 rounded-2xl border shadow-sm flex flex-col">
        <Txt variant="h5" weight="bold" className="mb-4 text-gray-800">
          Program Terjadwal {selectedDate && `: ${selectedDate}`}
        </Txt>
        <Container className="space-y-3 flex flex-col">
          {selectedDate && activities.filter(a => a.date === selectedDate).length > 0 ? (
            activities.filter(a => a.date === selectedDate).map(act => (
              <Container key={act.id} className="p-3 border-l-4 border-red-600 bg-red-50 rounded-r-lg flex flex-col">
                <Txt weight="semibold" className="text-gray-900">{act.title}</Txt>
                <Txt variant="small" className="text-gray-600 capitalize">{act.type}</Txt>
              </Container>
            ))
          ) : (
            <Txt className="text-gray-400 italic">Tidak ada aktivitas pada tanggal ini.</Txt>
          )}
        </Container>
      </Container>
    </Container>
  );
};