import React, { useState } from 'react';
import { CalendarHeader } from '../molecules/calenderHeader';
import { CalendarDay } from '../atoms/calenderDay';
import { ActivityBadge } from '../atoms/activityBadge';
import { Activity } from '../../types/activity';

interface ActivityCalendarProps {
  activities: Activity[];
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ activities }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Contoh sederhana: Generate 30 hari untuk April 2026
  const days = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    return `2026-04-${day.toString().padStart(2, '0')}`;
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-2xl">
      {/* Container Kalender */}
      <div className="w-full max-w-sm bg-white border rounded-2xl shadow-sm overflow-hidden">
        <CalendarHeader 
          monthName="April" 
          year={2026} 
          onPrev={() => {}} 
          onNext={() => {}} 
        />
        
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {days.map((dateStr) => {
              const dayNumber = parseInt(dateStr.split('-')[2]);
              const dayActivities = activities.filter(a => a.date === dateStr);
              
              return (
                <div key={dateStr} className="flex flex-col items-center gap-1">
                  <CalendarDay 
                    day={dayNumber} 
                    isSelected={selectedDate === dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                  />
                  {/* Menampilkan indikator aktivitas (Molekul) */}
                  <div className="flex gap-0.5">
                    {dayActivities.map(act => (
                      <ActivityBadge key={act.id} type={act.type} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Panel: Menampilkan info program yang berjalan */}
      <div className="flex-1 bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          Program Terjadwal {selectedDate && `: ${selectedDate}`}
        </h3>
        <div className="space-y-3">
          {selectedDate && activities.filter(a => a.date === selectedDate).length > 0 ? (
            activities.filter(a => a.date === selectedDate).map(act => (
              <div key={act.id} className="p-3 border-l-4 border-red-600 bg-red-50 rounded-r-lg">
                <p className="font-semibold text-gray-900">{act.title}</p>
                <p className="text-sm text-gray-600 capitalize">{act.type}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">Tidak ada aktivitas pada tanggal ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};