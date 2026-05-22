'use client';

import React from 'react';
import { Txt } from '../atoms/text';
import { Container } from '../atoms/container';
import { Img } from '../atoms/image';
import { Btn } from '../atoms/button';
import { MessageSquare, Calendar, ArrowRight, Share2 } from 'lucide-react';

interface UpdateItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  image?: string;
}

export interface UpdateListProps {
  className?: string;
}

/**
 * UpdateList
 * 
 * Komponen untuk menampilkan linimasa kabar terbaru (updates) dari yayasan.
 * Berisi daftar informasi progres program, laporan penyaluran, atau 
 * undangan kegiatan dalam bentuk kartu informatif.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {UpdateListProps} props - Properti komponen
 * @returns {JSX.Element} Komponen UpdateList
 */
export const UpdateList: React.FC<UpdateListProps> = () => {
  const updates: UpdateItem[] = [
    {
      id: '1',
      title: 'Laporan Penyaluran Sembako Maret 2026',
      content: 'Alhamdulillah, tim YAMUTI telah menyalurkan 100 paket sembako untuk lansia di wilayah Tasikmalaya Selatan. Terima kasih atas dukungan Anda.',
      date: '24 April 2026',
      category: 'Laporan',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Update Pembangunan Masjid Al-Ikhlas',
      content: 'Proses pengecoran tiang utama sudah selesai 100%. Saat ini sedang dalam tahap pemasangan rangka atap. Mohon doa restunya.',
      date: '20 April 2026',
      category: 'Progres',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Undangan Doa Bersama Anak Yatim',
      content: 'Kami mengundang Bapak/Ibu Donatur untuk hadir dalam acara doa bersama yang akan dilaksanakan pada hari Jumat pekan depan secara daring.',
      date: '18 April 2026',
      category: 'Undangan'
    }
  ];

  return (
    <Container className="flex flex-col gap-6 pb-24">
      {/* Header */}
      <Container className="bg-red-primary p-8 rounded-b-[40px] shadow-xl flex flex-col">
        <Container className="flex justify-between items-center text-white mb-6">
          <Txt variant="h5" weight="bold" color="white">Kabar Terbaru</Txt>
          <Container className="p-2 bg-white/10 rounded-xl">
            <MessageSquare size={20} />
          </Container>
        </Container>
        <Txt className="text-white/70 text-sm">
          Ikuti perkembangan program dan dampak yang Anda berikan melalui update rutin kami.
        </Txt>
      </Container>

      {/* List */}
      <Container className="px-6 space-y-8 flex flex-col">
        {updates.map((update) => (
          <Container key={update.id} className="group relative space-y-4 flex flex-col">
            {/* Date line */}
            <Container className="flex items-center gap-3">
                <Container className="w-2 h-2 rounded-full bg-red-primary shadow-[0_0_8px_#db1a1a]" />
                <Txt className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{update.date}</Txt>
                <Container className="h-px flex-1 bg-gray-100" />
            </Container>

            <Container className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                {update.image && (
                    <Img 
                      src={update.image} 
                      w={600} 
                      h={240} 
                      aspect="video"
                      rounded="none"
                      className="w-full h-40 object-cover" 
                      alt={update.title} 
                    />
                )}
                <Container className="p-6 space-y-3 flex flex-col">
                    <Container className="flex justify-between items-start">
                        <Txt variant="caption" weight="black" className="px-3 py-1 rounded-full bg-red-50 text-red-primary text-[10px] uppercase">
                            {update.category}
                        </Txt>
                        <Btn 
                          variant="transparent" 
                          textColor="dark"
                          className="text-gray-300 hover:text-red-primary transition-colors p-0 border-none bg-transparent"
                        >
                            <Share2 size={16} />
                        </Btn>
                    </Container>
                    <Txt variant="body" weight="bold" className="text-gray-900 text-lg leading-tight group-hover:text-red-primary transition-colors">
                        {update.title}
                    </Txt>
                    <Txt className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                        {update.content}
                    </Txt>
                    
                    <Btn 
                      variant="transparent" 
                      textColor="red"
                      size="sm"
                      className="flex items-center gap-2 text-red-primary text-xs font-bold pt-2 group-hover:gap-3 transition-all p-0 border-none"
                    >
                        Baca Selengkapnya <ArrowRight size={14} />
                    </Btn>
                </Container>
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};
