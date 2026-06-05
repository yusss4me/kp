"use client";
import React from "react";
import {
  User,
  CreditCard,
  Info,
  Share2,
  Star,
  HelpCircle,
  Settings,
  ChevronRight,
  History,
  Heart,
  Wallet,
  MessageCircle,
} from "lucide-react";
import { ListItem } from "../molecules/ListItem";
import { Txt } from "../atoms/text";
import { Img } from "../atoms/image";
import { Icn } from "../atoms/icon";
import { Btn } from "../atoms/button";

import { Container } from "../atoms/container";

export interface ProfileMenuGroupProps {
  className?: string;
}

/**
 * ProfileMenuGroup
 * 
 * Komponen grup menu navigasi untuk profil pengguna umum (Donatur).
 * Menampilkan header profil dengan statistik dampak personal (Program, Terdonasi) 
 * dan daftar aksi akun yang dikelompokkan (Aktivitas Saya, Dukungan, Lainnya).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ProfileMenuGroupProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ProfileMenuGroup
 */
export const ProfileMenuGroup: React.FC<ProfileMenuGroupProps> = () => {
  return (
    <Container className="flex flex-col gap-8 pb-24">
      {/* Profile Header */}
      <Container className="bg-red-primary p-8 rounded-b-[40px] shadow-xl relative overflow-hidden flex flex-col">
        {/* Decorative element */}
        <Container className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
 
        <Container className="flex items-center gap-6 relative z-10">
          <Container className="relative">
            <Img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
              alt="M. Ardiansyah"
              w={80}
              h={80}
              rounded="lg"
              aspect="square"
              className="w-20 h-20 rounded-[28px] border-4 border-white/20 shadow-xl"
            />
            <Container className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-red-primary" />
          </Container>
          <Container className="space-y-1 flex flex-col">
            <Txt variant="h5" weight="bold" color="light">
              M. Ardiansyah
            </Txt>
            <Container className="flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full border border-white/10">
              <Txt variant="caption" weight="bold" className="text-[10px] text-white uppercase tracking-widest">
                Donatur Tetap
              </Txt>
            </Container>
          </Container>
        </Container>
 
        {/* Impact Summary Card */}
        <Container className="mt-8 grid grid-cols-2 gap-4">
          <Container className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex flex-col">
            <Icn icon={Heart} size={16} color="current" className="text-white/60 mb-2" />
            <Txt variant="h5" weight="bold" color="light">12</Txt>
            <Txt variant="caption" weight="bold" color="light" className="opacity-60 uppercase tracking-wider">Program</Txt>
          </Container>
          <Container className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex flex-col">
            <Icn icon={Wallet} size={16} color="current" className="text-white/60 mb-2" />
            <Txt variant="h5" weight="bold" color="light">Rp 2.4jt</Txt>
            <Txt variant="caption" weight="bold" color="light" className="opacity-60 uppercase tracking-wider">Terdonasi</Txt>
          </Container>
        </Container>
      </Container>
 
      {/* Menu Sections */}
      <Container className="px-6 space-y-8 flex flex-col">
        <Container className="space-y-4 flex flex-col">
          <Txt weight="bold" className="text-gray-900 ml-2">
            Aktivitas Saya
          </Txt>
          <Container className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm flex flex-col">
            <ListItem icon={History} label="Riwayat Donasi" />
            <ListItem icon={Wallet} label="Metode Pembayaran" />
            <ListItem icon={Heart} label="Program Favorit" />
          </Container>
        </Container>
 
        <Container className="space-y-4 flex flex-col">
          <Txt weight="bold" className="text-gray-900 ml-2">
            Dukungan
          </Txt>
          <Container className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm flex flex-col">
            <ListItem icon={MessageCircle} label="Hubungi Kami" />
            <ListItem icon={HelpCircle} label="Pusat Bantuan" />
            <ListItem icon={Info} label="Tentang YAMUTI" />
          </Container>
        </Container>
 
        <Container className="space-y-4 flex flex-col">
          <Txt weight="bold" className="text-gray-900 ml-2">
            Lainnya
          </Txt>
          <Container className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm flex flex-col">
            <ListItem icon={Settings} label="Pengaturan Akun" />
            <ListItem icon={Share2} label="Bagikan Aplikasi" />
            <ListItem icon={Star} label="Beri Rating" />
          </Container>
        </Container>
 
        <Btn
          variant="transparent"
          textColor="red"
          size="lg"
          shape="rounded"
          className="w-full py-4 rounded-[24px] bg-red-50 text-red-primary font-black text-sm mb-8"
        >
          Keluar Akun
        </Btn>
      </Container>
    </Container>
  );
};
