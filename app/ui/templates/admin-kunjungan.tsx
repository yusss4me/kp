import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/app/ui/organisms/dashboard-header';
import type { VisitBooking } from '@/app/lib/types/entities';
import { BookingList } from '@/app/ui/organisms/BookingList';
import { StatCard } from '@/app/ui/molecules/stat-card';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Plus } from 'lucide-react';

export interface KunjunganStat {
  label: string;
  value: string;
  icon: any;
  color: any;
  trend?: { value: number; isUp: boolean };
}

interface AdminKunjunganTemplateProps {
  stats: KunjunganStat[];
  bookings: VisitBooking[];
  onDeleteBooking?: (id: number) => void;
  addUrl?: string;
  editUrl?: (id: number) => string;
}

export function AdminKunjunganTemplate({ stats, bookings, onDeleteBooking, addUrl, editUrl }: AdminKunjunganTemplateProps) {
  return (
    <DashboardHeader headerTitle="Manajemen Kunjungan">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Jadwal Kunjungan</Txt>
            <Txt variant="body" className="text-gray-500">
              Atur dan pantau jadwal kunjungan donatur atau tamu institusi secara terorganisir.
            </Txt>
          </div>
          {addUrl && (
            <Link href={addUrl}>
              <Btn variant="red" shape="circle" className="gap-2 px-8 shadow-lg shadow-red-primary/20">
                <Plus size={20} />
                Booking Baru
              </Btn>
            </Link>
          )}
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Booking List Section */}
        <BookingList bookings={bookings} onDelete={onDeleteBooking} editUrl={editUrl} />
      </div>
    </DashboardHeader>
  );
}
