'use client';
import React from 'react';
import { Btn } from '../atoms/button';

export type ActivityType = 'anak' | 'program' | 'barang' | 'kunjungan';

export interface ActivitySwitcherProps {
  activeActivity: ActivityType;
  onActivityChange: (activity: ActivityType) => void;
}

/**
 * ActivitySwitcher
 * 
 * Komponen navigasi tab untuk beralih antar jenis aktivitas (Anak, Program, Barang, Kunjungan).
 * 
 * @param {ActivityType} activeActivity - Jenis aktivitas yang sedang aktif/terpilih
 * @param {(activity: ActivityType) => void} onActivityChange - Handler saat aktivitas diubah
 * @param {ActivitySwitcherProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ActivitySwitcher
 */

export const ActivitySwitcher: React.FC<ActivitySwitcherProps> = ({ 
  activeActivity, 
  onActivityChange 
}) => {
  const activities: { id: ActivityType; label: string }[] = [
    { id: 'anak', label: 'Donasi Anak' },
    { id: 'program', label: 'Donasi Program' },
    { id: 'barang', label: 'Barang' },
  ];

  return (
    <div className="flex bg-gray-100 rounded-2xl p-1 w-full overflow-x-auto scrollbar-hide">
      <div className="flex min-w-full gap-1">
        {activities.map((activity) => (
          <Btn
            key={activity.id}
            onClick={() => onActivityChange(activity.id)}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
              activeActivity === activity.id 
                ? 'bg-white text-red-primary shadow-md' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            {activity.label}
          </Btn>
        ))}
      </div>
    </div>
  );
};
