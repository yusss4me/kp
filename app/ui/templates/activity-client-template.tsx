"use client"
import React, { useState } from 'react';
import { ArrowDownWideNarrow } from 'lucide-react';
import { ActivitySwitcher, ActivityType } from '../molecules/activitySwitcher';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Icn } from '../atoms/icon';
import { SearchGroup } from '../molecules/search-group';
import { ActivityAnak } from '../organisms/activity-anak';
import { ActivityProgram } from '../organisms/activity-program';
import { ActivityBarangForm } from '../organisms/activity-barangForm';
import { ActivityKunjungan } from '../organisms/activity-kunjungan';
import { DashboardHeader } from '../organisms/DashboardHeader';


export interface ActivityClientTemplateProps {
  campaigns: {
    name: string;
    categoryTag: string;
    description: string;
    image: string;
    target: number;
    raised: number;
  }[];
  user?: {
    name: string;
    role: string;
  };
  className?: string;
}

/**
 * ActivityClientTemplate
 * 
 * Komponen utama untuk menampilkan daftar donasi dan aktivitas yayasan.
 * Memungkinkan pengguna beralih antara melihat program donasi, donasi anak asuh, 
 * pengajuan sumbangan barang, hingga penjadwalan kunjungan.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ActivityClientTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ActivityClientTemplate
 */
export const ActivityClientTemplate: React.FC<ActivityClientTemplateProps> = ({
  campaigns,
  user = { name: "Donatur Yamuti", role: "Donatur" },
}) => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>('program');

  const renderContent = () => {
    switch (activeActivity) {
      case 'anak':
        return <ActivityAnak />;
      case 'program':
        return <ActivityProgram />;
      case 'barang':
        return <ActivityBarangForm />;
      case 'kunjungan':
        return <ActivityKunjungan isUser={true} />;
      default:
        return null;
    }
  };

  return (
    <DashboardHeader
      user={user}
      headerTitle="Aktivitas Donasi"
      portalLabel="Portal Donatur"
    >
      <div className="space-y-8">
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="space-y-1">
            <Txt variant="h3" weight="bold" className="text-gray-900">
              Pilih Jenis Aktivitas
            </Txt>
            <Txt variant="body" className="text-gray-500">
              Kelola donasi program, anak asuh, sumbangan barang, atau jadwal kunjungan Anda.
            </Txt>
          </div>

          <ActivitySwitcher
            activeActivity={activeActivity}
            onActivityChange={setActiveActivity}
          />

          {(activeActivity === 'anak' || activeActivity === 'program') && (
            <div className="flex items-center gap-3">
              <SearchGroup placeholder="Cari program..." />
              <Btn variant="light" size="sm" shape="rounded" className="p-3.5 shrink-0">
                <Icn icon={ArrowDownWideNarrow} size={20} color="current" />
              </Btn>
            </div>
          )}
        </div>

        {renderContent()}
      </div>
    </DashboardHeader>
  );
};
