"use client"
import React, { useState } from 'react';
import { SlidersHorizontal, ArrowDownWideNarrow, Package, Calendar, Heart, GraduationCap } from 'lucide-react';
import { ActivitySwitcher, ActivityType } from '../molecules/activitySwitcher';
import { DonationCard } from '../molecules/donationCard';
import { KunjunganClientTemplate } from '../templates/kunjungan-client';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Input } from '../atoms/input';
import { Btn } from '../atoms/button';

export const DonationList: React.FC = () => {
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
              <p className="font-bold text-gray-900">Donasi Anak Asuh</p>
              <button className="text-xs text-red-primary font-bold hover:underline">Lihat semua</button>
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
              <p className="font-bold text-gray-900">Program Aktif</p>
              <button className="text-xs text-red-primary font-bold hover:underline">Lihat semua</button>
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
            <Container variant="white" radius="2xl" className="p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4 text-red-primary">
                <div className="p-3 bg-red-50 rounded-2xl">
                  <Package size={24} />
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
            
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
              <div className="text-orange-500 pt-1">ℹ️</div>
              <Txt variant="caption" className="text-orange-800">
                Barang akan kami salurkan ke panti asuhan dan keluarga dhuafa binaan YAMUTI.
              </Txt>
            </div>
          </div>
        );
      case 'kunjungan':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* We only render the form part of the Kunjungan template here */}
             <Container
                variant="white"
                radius="2xl"
                padding="none"
                className="p-6 shadow-xl border border-gray-100 flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 text-red-primary">
                  <div className="p-3 bg-red-50 rounded-2xl">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <Txt weight="bold" className="text-gray-900">Jadwalkan Kunjungan</Txt>
                    <Txt variant="caption" className="text-gray-500">Silaturahmi langsung ke kantor/asrama kami</Txt>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input label="Nama Lengkap" placeholder="Masukkan Nama Lengkap Anda" />
                  <Input label="Keperluan" placeholder="Contoh: Silaturahmi, Penyerahan Donasi" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Tanggal" type="date" />
                    <Input label="Waktu" type="time" />
                  </div>
                  <Btn variant="red" size="lg" className="w-full mt-4">Kirim Pengajuan</Btn>
                </div>
              </Container>
          </div>
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
          <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all">←</button>
          <h2 className="font-bold text-lg">Aktivitas Kami</h2>
          <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all">⊕</button>
        </div>
        
        {/* Activity Switcher */}
        <ActivitySwitcher 
          activeActivity={activeActivity} 
          onActivityChange={setActiveActivity} 
        />

        {/* Filter/Sort Area (Only for donations) */}
        {(activeActivity === 'anak' || activeActivity === 'program') && (
          <div className="flex items-center gap-3">
             <button className="p-3.5 bg-white/10 rounded-2xl text-white backdrop-blur-sm"><SlidersHorizontal size={20}/></button>
             <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-white/60 text-sm italic">
                Cari program...
             </div>
             <button className="p-3.5 bg-white/10 rounded-2xl text-white backdrop-blur-sm"><ArrowDownWideNarrow size={20}/></button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="px-6">
        {renderContent()}
      </div>
    </div>
  );
};