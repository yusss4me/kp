import React from 'react';

interface ActivityBadgeProps {
  type: 'pemberdayaan' | 'pendidikan' | 'kemanusiaan';
}

/**
 * Komponen badge aktivitas kecil berbentuk lingkaran berwarna.
 * 
 * @param {'pemberdayaan' | 'pendidikan' | 'kemanusiaan'} type - Jenis aktivitas yang menentukan warna badge
 * @returns {JSX.Element} Badge aktivitas berwarna
 */
export const ActivityBadge: React.FC<ActivityBadgeProps> = ({ type }) => {
  const colors = {
    pemberdayaan: 'bg-green-primary',
    pendidikan: 'bg-blue-primary',
    kemanusiaan: 'bg-red-primary',
  };

  return (
    <div className={`w-2 h-2 rounded-full ${colors[type]}`} />
  );
};