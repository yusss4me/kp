import { StatCard } from '../molecules/StatCard';
import { Users, Wallet, Box, Heart } from 'lucide-react';

export interface SummaryGridProps {
  className?: string;
}

/**
 * SummaryGrid
 * 
 * Komponen grid yang menampilkan kumpulan kartu statistik (StatCard).
 * Memberikan ringkasan cepat mengenai jumlah anak asuh, saldo kas, 
 * stok logistik, dan jumlah donatur aktif.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {SummaryGridProps} props - Properti komponen
 * @returns {JSX.Element} Komponen SummaryGrid
 */
export const SummaryGrid = ({}: SummaryGridProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Anak Asuh" 
        value="48" 
        icon={Users} 
        trend={{ value: 2, isUp: true }}
        color="info" 
      />
      <StatCard 
        label="Kas Yayasan" 
        value="Rp 12.5M" 
        icon={Wallet} 
        trend={{ value: 0, isUp: true }}
        color="success" 
      />
      <StatCard 
        label="Stok Beras" 
        value="120 Kg" 
        icon={Box} 
        trend={{ value: 5, isUp: false }}
        color="warning" 
      />
      <StatCard 
        label="Donatur Aktif" 
        value="156" 
        icon={Heart} 
        trend={{ value: 12, isUp: true }}
        color="primary" 
      />
    </section>
  );
};