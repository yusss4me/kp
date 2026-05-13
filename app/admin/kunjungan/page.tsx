import React from 'react';
import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { BookingList } from '@/app/ui/organisms/BookingList';
import { StatCard } from '@/app/ui/molecules/StatCard';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Calendar, Users, CheckCircle, Plus } from 'lucide-react';

export default function BookingPage() {
  return (
    <DashboardTemplate headerTitle="Manajemen Kunjungan">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Jadwal Kunjungan</Txt>
            <Txt variant="body" className="text-gray-500">
              Atur dan pantau jadwal kunjungan donatur atau tamu institusi secara terorganisir.
            </Txt>
          </div>
          <Btn variant="red" shape="circle" className="gap-2 px-8 shadow-lg shadow-red-primary/20">
            <Plus size={20} />
            Booking Baru
          </Btn>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Kunjungan Bulan Ini" 
            value="24" 
            icon={Calendar} 
            color="primary" 
          />
          <StatCard 
            label="Menunggu Konfirmasi" 
            value="5" 
            icon={Users} 
            color="secondary" 
          />
          <StatCard 
            label="Kunjungan Selesai" 
            value="18" 
            icon={CheckCircle} 
            color="success" 
          />
        </div>

        {/* Booking List Section */}
        <BookingList />
      </div>
    </DashboardTemplate>
  );
}
