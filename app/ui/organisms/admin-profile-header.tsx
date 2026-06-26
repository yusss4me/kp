'use client';
import React from 'react';
import { ShieldCheck, LayoutDashboard, Clock, Wallet } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Container } from '../atoms/container';
import { Img } from '../atoms/image';
import { Icn } from '../atoms/Icn';
import { Btn } from '../atoms/button';
import { Badge } from '../atoms/badge';
import { MilestoneCard } from '../molecules/milestoneCard';

export interface AdminProfileHeaderProps {
  className?: string;
  title: string;
  subtitle: string;
  image: string;
  totalDonasi: string;
  programAktif: string;
  menungguVerifikasi: string;
}

/**
 * AdminProfileHeader
 * 
 * Komponen header khusus untuk halaman profil Administrator.
 * Menampilkan foto profil admin, status verifikasi shield, dan ringkasan 
 * statistik admin (Total Donasi, Program Aktif, Menunggu Verifikasi).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {AdminProfileHeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen AdminProfileHeader
 */
export const AdminProfileHeader: React.FC<AdminProfileHeaderProps> = (props) => {
    const { title, subtitle, image, totalDonasi, programAktif, menungguVerifikasi, className } = props;
  return (
    <Container variant='red' padding='md' radius='lg' shadow='xl' className="relative overflow-hidden w-full">
      {/* Decorative element */}
      
      
      <Container gap='lg' className="items-center relative z-10">
        <MilestoneCard 
        image={image} 
        title={title} 
        range={subtitle}/>
      </Container>

      {/* Admin Quick Stats Card */}
      <Container className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        
        <Container className="flex-col bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <Icn icon={Wallet} size={16} color="light"  />
          <Txt variant="h5" weight="bold" color="light">{totalDonasi}</Txt>
          <Txt variant="caption" weight="bold" color="light" className="opacity-60 uppercase tracking-wider">
            Total Donasi
          </Txt>
        </Container>
        <Container className="flex-col bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <Icn icon={LayoutDashboard} size={16} color="light" />
          <Txt variant="h5" weight="bold" color="light">{programAktif}</Txt>
          <Txt variant="caption" weight="bold" color="light" className="opacity-60 uppercase tracking-wider">
            Program Aktif
          </Txt>
        </Container>
        <Container className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center justify-between">
          
          <Container className="flex items-center gap-3">
            <Container className="bg-warning/20 p-2 rounded-xl">
              <Icn icon={Clock} size={16} color="light" />
            </Container>
            <Container>
              <Txt variant="small" weight="bold" color="light">{menungguVerifikasi}</Txt>
              <Txt variant="caption" color="light" className="opacity-60">Verifikasi Donasi</Txt>
            </Container>
          </Container>
          <Btn
            variant="light"
            size="sm"
            shape="rounded"
            className="px-4 py-2 bg-white text-red-primary text-[10px] font-black uppercase tracking-wider"
          >
            Proses
          </Btn>
        </Container>
      </Container>
    </Container>
  );
};
