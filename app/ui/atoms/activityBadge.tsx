import React from 'react';

export interface ActivityBadgeProps {
  type: 'pemberdayaan' | 'pendidikan' | 'kemanusiaan';
}

/**
 * ActivityBadge
 * 
 * Komponen badge aktivitas kecil berbentuk lingkaran berwarna.
 * Digunakan untuk indikator kategori pada kartu atau daftar.
 * 
 * @param {'pemberdayaan' | 'pendidikan' | 'kemanusiaan'} type - yang menentukan warna badge
 * @param {ActivityBadgeProps} props - Properti komponen
 * @returns {JSX.Element} Badge aktivitas berwarna
 */
export const ActivityBadge: React.FC<ActivityBadgeProps> = ({ type }) => {
  const colors = {
    pemberdayaan: 'bg-success',
    pendidikan: 'bg-info',
    kemanusiaan: 'bg-red-primary',
  };

  return (
    <div className={`w-2 h-2 rounded-full ${colors[type]}`} />
  );
};