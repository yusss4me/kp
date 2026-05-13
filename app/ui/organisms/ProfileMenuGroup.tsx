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
import { ProfileListItem } from "../molecules/ListItem";
import { Txt } from "../atoms/text";

export const ProfileMenuGroup: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* Profile Header */}
      <div className="bg-red-primary p-8 rounded-b-[40px] shadow-xl relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
              className="w-20 h-20 rounded-[28px] object-cover border-4 border-white/20 shadow-xl"
              alt="M. Ardiansyah"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-red-primary" />
          </div>
          <div className="space-y-1">
            <Txt variant="h5" weight="bold" color="white">
              M. Ardiansyah
            </Txt>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full border border-white/10">
              <span className="text-[10px] text-white font-black uppercase tracking-widest">
                Donatur Tetap
              </span>
            </div>
          </div>
        </div>

        {/* Impact Summary Card */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
            <Heart size={16} className="text-white/60 mb-2" />
            <p className="text-white font-black text-lg">12</p>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
              Program
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
            <Wallet size={16} className="text-white/60 mb-2" />
            <p className="text-white font-black text-lg">Rp 2.4jt</p>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
              Terdonasi
            </p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-6 space-y-8">
        <div className="space-y-4">
          <Txt weight="bold" className="text-gray-900 ml-2">
            Aktivitas Saya
          </Txt>
          <div className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
            <ProfileListItem
              icon={<History size={18} />}
              label="Riwayat Donasi"
            />
            <ProfileListItem
              icon={<Wallet size={18} />}
              label="Metode Pembayaran"
            />
            <ProfileListItem
              icon={<Heart size={18} />}
              label="Program Favorit"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Txt weight="bold" className="text-gray-900 ml-2">
            Dukungan
          </Txt>
          <div className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
            <ProfileListItem
              icon={<MessageCircle size={18} />}
              label="Hubungi Kami"
            />
            <ProfileListItem
              icon={<HelpCircle size={18} />}
              label="Pusat Bantuan"
            />
            <ProfileListItem icon={<Info size={18} />} label="Tentang YAMUTI" />
          </div>
        </div>

        <div className="space-y-4">
          <Txt weight="bold" className="text-gray-900 ml-2">
            Lainnya
          </Txt>
          <div className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
            <ProfileListItem
              icon={<Settings size={18} />}
              label="Pengaturan Akun"
            />
            <ProfileListItem
              icon={<Share2 size={18} />}
              label="Bagikan Aplikasi"
            />
            <ProfileListItem icon={<Star size={18} />} label="Beri Rating" />
          </div>
        </div>

        <button className="w-full py-4 rounded-[24px] bg-red-50 text-red-primary font-black text-sm transition-all active:scale-95 mb-8">
          Keluar Akun
        </button>
      </div>
    </div>
  );
};
