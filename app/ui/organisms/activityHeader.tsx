'use client';
import { useState } from "react";
import { Btn } from "../atoms/button";
import { Txt } from "../atoms/text";
import { ActivitySwitcher, ActivityType } from "../molecules/activitySwitcher";
import { DonationCard } from "../molecules/donationCard";
import { Container } from "../atoms/container";
import { Input } from "../atoms/input"; 
import { Package, ArrowLeft, Plus, ArrowDownWideNarrow } from "lucide-react";
import { Icn } from "../atoms/icon";
import { SearchGroup } from "../molecules/search-group";

export const ActivityHeader = ()=> {
    const [activeActivity, setActiveActivity] = useState<ActivityType>('program');

    const campaigns = [
    {
      name: "Beasiswa Anak Yatim Piatu",
      categoryTag: "EDU",
      description: "Bantu biaya sekolah untuk 50 anak yatim di Tasikmalaya.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
      target: 50000000,
      raised: 32500000
    },
    {
      name: "Sembako Jum'at Berkah",
      categoryTag: "SOC",
      description: "Program berbagi pangan untuk lansia dhuafa setiap pekan.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      target: 10000000,
      raised: 7800000
    },
    {
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
          case 'anak':
            return (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                  <Txt weight="bold" className="text-gray-900">Donasi Anak Asuh</Txt>
                  <Btn variant="transparent" textColor="red" size="sm" shape="rounded" className="text-xs text-red-primary font-bold hover:underline">
                    Lihat semua
                  </Btn>
                </div>
                <div className="space-y-4">
                  {campaigns.filter(c => c.categoryTag === "EDU").map((camp, i) => (
                    <DonationCard key={i} {...camp} />
                  ))}
                </div>
              </div>
            );
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
          case 'barang':
            return (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Container className="p-6 border border-gray-100 shadow-sm space-y-6 rounded-2xl bg-white">
                  <div className="flex items-center gap-4 text-red-primary">
                    <div className="p-3 bg-red-50 rounded-2xl text-red-primary">
                      <Icn icon={Package} size={24} color="current" />
                    </div>
                    <div>
                      <Txt weight="bold" className="text-gray-900">Sumbangan Barang</Txt>
                      <Txt variant="caption" className="text-gray-500">Kirimkan barang layak pakai untuk yang membutuhkan</Txt>
                    </div>
                  </div>
    
                  <div className="space-y-4 pt-2">
                    <Input label="Jenis Barang" placeholder="Contoh: Pakaian, Buku, Sembako" />
                    <Input label="Estimasi Berat/Jumlah" placeholder="Contoh: 5 kg / 2 Dus" />
                    <Input label="Alamat Penjemputan" placeholder="Masukkan alamat lengkap" />
                    <Btn variant="red" size="lg" className="w-full mt-4">Ajukan Penjemputan</Btn>
                  </div>
                </Container>
    
                <div className="bg-red-secondary p-4 rounded-2xl border border-red-primary/10 flex gap-3">
                  <div className="text-red-primary pt-1">ℹ️</div>
                  <Txt variant="caption" className="text-red-primary/90 font-medium">
                    Barang akan kami salurkan ke panti asuhan dan keluarga dhuafa binaan YAMUTI.
                  </Txt>
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
                {(activeActivity === 'anak' || activeActivity === 'program') && (
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