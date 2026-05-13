import React from 'react';
import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { BroadcastEditor } from '@/app/ui/organisms/BroadcastEditor';
import { StatCard } from '@/app/ui/molecules/StatCard';
import { Txt } from '@/app/ui/atoms/text';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function BroadcastPage() {
  return (
    <DashboardTemplate headerTitle="Broadcast WhatsApp">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="space-y-2 px-2">
          <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Layanan Pesan Massal</Txt>
          <Txt variant="body" className="text-gray-500 max-w-2xl">
            Kirimkan informasi kegiatan, laporan, atau ucapan secara massal ke nomor WhatsApp donatur dengan mudah dan cepat.
          </Txt>
        </div>

        {/* Broadcast Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Pesan Terkirim (Bulan Ini)" 
            value="1.240" 
            icon={CheckCircle} 
            color="success" 
          />
          <StatCard 
            label="Sisa Kuota Blast" 
            value="8.760" 
            icon={MessageSquare} 
            color="primary" 
          />
          <StatCard 
            label="Pesan Terjadwal" 
            value="2" 
            icon={Clock} 
            color="secondary" 
          />
        </div>

        {/* Broadcast Form */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
           <BroadcastEditor />
        </div>
      </div>
    </DashboardTemplate>
  );
}
