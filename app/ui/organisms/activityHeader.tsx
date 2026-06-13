'use client';
import { useState } from "react";
import { Btn } from "../atoms/button";
import { Txt } from "../atoms/text";
import { ActivitySwitcher, ActivityType } from "../molecules/activitySwitcher";
import { DonationCard } from "../molecules/donationCard";
import { Container } from "../atoms/container";
import { Input } from "../atoms/input"; 
import { Package, ArrowLeft, Plus, ArrowDownWideNarrow } from "lucide-react";
import { Icn } from "../atoms/Icn";
import { SearchGroup } from "../molecules/search-group";

export const ActivityHeader = ()=> {
    const [activeActivity, setActiveActivity] = useState<ActivityType>('program');

    const campaigns = [
    {
      id: "prog-1",
      name: "Beasiswa Anak Yatim Piatu",
      categoryTag: "EDU",
      description: "Bantu biaya sekolah untuk 50 anak yatim di Tasikmalaya.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
      target: 50000000,
      raised: 32500000
    },
    {
      id: "prog-2",
      name: "Sembako Jum'at Berkah",
      categoryTag: "SOC",
      description: "Program berbagi pangan untuk lansia dhuafa setiap pekan.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      target: 10000000,
      raised: 7800000
    },
    {
      id: "prog-3",
      name: "Pembangunan Masjid Al-Ikhlas",
      categoryTag: "BLD",
      description: "Renovasi atap dan tempat wudhu masjid di pelosok desa.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      target: 150000000,
      raised: 45000000
    }
  ];

    const renderContent = () => {
        switch (activeActivity) {
          case 'program':
            return (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                  <Txt weight="bold" className="text-gray-900">Program Aktif</Txt>
                  <Btn variant="transparent" textColor="red" size="sm" shape="rounded" className="text-xs text-red-primary font-bold hover:underline">
                    Lihat semua
                  </Btn>
                </div>
                <div className="space-y-4">
                  {campaigns.map((camp, i) => (
                    <DonationCard key={i} {...camp} />
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      };
    return(
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
                {(activeActivity === 'program') && (
                  <div className="flex items-center gap-3 ">
                    <SearchGroup placeholder='Cari program...'/>
                    <Btn variant="transparent" size="sm" shape="rounded" className="p-3.5 bg-white/10 text-white backdrop-blur-sm">
                      <Icn icon={ArrowDownWideNarrow} size={20} color="current" className="text-white" />
                    </Btn>
                  </div>
                )}
              </div>
    );
}