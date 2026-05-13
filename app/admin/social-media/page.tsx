import React from 'react';
import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { StatCard } from '@/app/ui/molecules/StatCard';
import { Share2, Plus, Image as ImageIcon, Send, Globe, MessageCircle } from 'lucide-react';

export default function SocialMediaPage() {
  return (
    <DashboardTemplate headerTitle="Manajemen Publikasi">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Auto Upload Konten</Txt>
            <Txt variant="body" className="text-gray-500">
              Jadwalkan dan publikasikan kegiatan yayasan ke berbagai kanal publikasi.
            </Txt>
          </div>
          <Btn variant="red" shape="circle" className="gap-2 px-8 shadow-lg shadow-red-primary/20">
            <Plus size={20} />
            Buat Konten Baru
          </Btn>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Postingan" value="256" icon={Share2} color="primary" />
          <StatCard label="Jangkauan Luas" value="12.4K" icon={Globe} color="secondary" />
          <StatCard label="Pesan Masuk" value="+42" icon={MessageCircle} color="success" />
        </div>

        {/* Platform Connection */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <Txt variant="h4" weight="bold" className="mb-6">Kanal Terhubung</Txt>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'WhatsApp Channel', icon: MessageCircle, status: 'Connected', color: 'text-green-600' },
              { name: 'Website Resmi', icon: Globe, status: 'Connected', color: 'text-blue-600' },
              { name: 'Portal Berita', icon: Share2, status: 'Connected', color: 'text-red-primary' },
            ].map((platform) => (
              <div key={platform.name} className="p-5 rounded-3xl border border-gray-50 flex items-center justify-between hover:bg-gray-50/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-white transition-colors">
                     <platform.icon className={platform.color} size={24} />
                  </div>
                  <Txt weight="bold" className="text-gray-900">{platform.name}</Txt>
                </div>
                <div className={`h-2.5 w-2.5 rounded-full ${platform.status === 'Connected' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <Txt weight="bold" className="text-xl text-gray-900">Buat Postingan Baru</Txt>
            <div className="space-y-4">
               <div>
                 <Txt variant="small" weight="bold" className="mb-2 block text-gray-400 uppercase tracking-widest">Caption Postingan</Txt>
                 <textarea 
                  className="w-full h-48 p-6 rounded-[32px] border-none bg-gray-50 focus:ring-2 focus:ring-red-primary/10 transition-all resize-none text-sm leading-relaxed"
                  placeholder="Ceritakan kegiatan yayasan hari ini..."
                 />
               </div>
               <div className="border-2 border-dashed border-gray-100 rounded-[32px] p-10 flex flex-col items-center justify-center gap-3 hover:bg-gray-50/50 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-primary/10 transition-colors">
                     <ImageIcon size={32} className="text-gray-300 group-hover:text-red-primary transition-colors" />
                  </div>
                  <Txt variant="body" weight="medium" className="text-gray-400 group-hover:text-gray-900">Klik atau seret gambar ke sini</Txt>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 flex flex-col">
            <Txt weight="bold" className="text-xl text-gray-900">Preview Postingan</Txt>
            <div className="flex-grow aspect-video bg-gray-50 rounded-[32px] flex flex-col items-center justify-center border border-gray-50 overflow-hidden relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <Txt variant="small" className="text-gray-400 font-medium italic relative z-10">Belum ada media yang diunggah</Txt>
            </div>
            <div className="flex gap-4">
              <Btn variant="light" shape="rounded" className="flex-1 py-4 font-bold border-gray-100">Simpan Draft</Btn>
              <Btn variant="red" shape="rounded" className="flex-1 py-4 gap-2 shadow-lg shadow-red-primary/20">
                <Send size={18} />
                Publikasikan
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
