"use client"
import React, { useState } from 'react';
import { SlidersHorizontal, ArrowDownWideNarrow, Package, Calendar, ArrowLeft, Plus } from 'lucide-react';
import { ActivitySwitcher, ActivityType } from '../molecules/activitySwitcher';
import { DonationCard } from '../molecules/donationCard';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Input } from '../atoms/input';
import { Btn } from '../atoms/button';
import { Icn } from '../atoms/icon';
import { SearchGroup } from '../molecules/search-group';
import { ButtonList } from '../molecules/buttonList';
import { ActivityAnak } from '../organisms/activity-anak';
import { ActivityProgram } from '../organisms/activity-program';
import { ActivityBarangForm } from '../organisms/activity-barangForm';
import { ActivityKunjungan } from '../organisms/activity-kunjungan';


export interface ActivityClientTemplateProps {
  campaigns: {
    name: string;
    categoryTag: string;
    description: string;
    image: string;
    target: number;
    raised: number;
  }[];
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
export const ActivityClientTemplate: React.FC<ActivityClientTemplateProps> = ({campaigns}) => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>('program');

  const renderContent = () => {
    switch (activeActivity) {
      case 'anak':
        return (
          <ActivityAnak campaigns={campaigns}/>
        );
      case 'program':
        return (
          <ActivityProgram campaigns={campaigns} />
        );
      case 'barang':
        return (
          <ActivityBarangForm />
        );

      case 'kunjungan':
        return (
          <ActivityKunjungan />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Search Header Area */}
      <div className="bg-red-primary p-8 rounded-b-[40px] space-y-8 shadow-xl">
        <div className="flex justify-between items-center text-white">
          <Btn variant="transparent" size="sm" shape="rounded" className="p-2.5 bg-white/10 hover:bg-white/20"><Icn icon={ArrowLeft} color="light" /></Btn>
          <Txt variant="h6" weight="bold" color="light">Aktivitas Kami</Txt>
          <Btn variant="transparent" size="sm" shape="rounded" className="p-2.5 bg-white/10 hover:bg-white/20"><Icn icon={Plus} color="light" /></Btn>
        </div>

        {/* Activity Switcher */}
        <ActivitySwitcher
          activeActivity={activeActivity}
          onActivityChange={setActiveActivity}
        />

        {/* Filter/Sort Area (Only for donations) */}
        {(activeActivity === 'anak' || activeActivity === 'program') && (
          <div className="flex items-center gap-3 ">
            <SearchGroup placeholder='Cari program...'/>
            <Btn variant="transparent" size="sm" shape="rounded" className="p-3.5 bg-white/10 text-white backdrop-blur-sm">
              <Icn icon={ArrowDownWideNarrow} size={20} color="current" className="text-white" />
            </Btn>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};