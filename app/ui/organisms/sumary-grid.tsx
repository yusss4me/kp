import { StatCard } from '../molecules/stat-card';
import { Users, Wallet, Box, Heart } from 'lucide-react';

export const SummaryGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Anak Asuh" 
        value="48" 
        icon={Users} 
        trend="+2 bulan ini"
        colorVariant="blue" 
      />
      <StatCard 
        label="Kas Yayasan" 
        value="Rp 12.5M" 
        icon={Wallet} 
        trend="Stabil"
        colorVariant="emerald" 
      />
      <StatCard 
        label="Stok Beras" 
        value="120 Kg" 
        icon={Box} 
        trend="Sisa 5 hari"
        colorVariant="amber" 
      />
      <StatCard 
        label="Donatur Aktif" 
        value="156" 
        icon={Heart} 
        trend="+12 hari ini"
        colorVariant="blue" 
      />
    </section>
  );
};