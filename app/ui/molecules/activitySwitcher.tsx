'use client';
import React from 'react';

export type ActivityType = 'anak' | 'program' | 'barang' | 'kunjungan';

interface ActivitySwitcherProps {
  activeActivity: ActivityType;
  onActivityChange: (activity: ActivityType) => void;
}

export const ActivitySwitcher: React.FC<ActivitySwitcherProps> = ({ 
  activeActivity, 
  onActivityChange 
}) => {
  const activities: { id: ActivityType; label: string }[] = [
    { id: 'anak', label: 'Donasi Anak' },
    { id: 'program', label: 'Donasi Program' },
    { id: 'barang', label: 'Barang' },
    { id: 'kunjungan', label: 'Kunjungan' },
  ];

  return (
    <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-1 shadow-inner w-full overflow-x-auto scrollbar-hide">
      <div className="flex min-w-full gap-1">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => onActivityChange(activity.id)}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
              activeActivity === activity.id 
                ? 'bg-white text-red-primary shadow-lg scale-[1.02]' 
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {activity.label}
          </button>
        ))}
      </div>
    </div>
  );
};
