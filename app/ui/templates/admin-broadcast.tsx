import React from 'react';
import { DashboardHeader } from '@/app/ui/organisms/dashboard-header';
import { BroadcastEditor } from '@/app/ui/organisms/BroadcastEditor';
import { StatCard } from '@/app/ui/molecules/stat-card';
import { Txt } from '@/app/ui/atoms/text';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

export interface BroadcastStat {
  label: string;
  value: string;
  icon: any;
  color: any;
}

export interface BroadcastTemplate {
  nama_template: string;
  isi: string;
}

interface AdminBroadcastTemplateProps {
  stats: BroadcastStat[];
  templates: BroadcastTemplate[];
}

export function AdminBroadcastTemplate({ stats, templates }: AdminBroadcastTemplateProps) {
  return (
    <DashboardHeader headerTitle="Broadcast WhatsApp">
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
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Broadcast Form */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <BroadcastEditor templatePesan={templates} />
        </div>
      </div>
    </DashboardHeader>
  );
}
