"use client";
import React from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  FileCheck,
  Users,
  FileText,
  Settings,
  History,
  Info,
  LogOut,
  BarChart3,
  Globe,
} from "lucide-react";
import { ProfileListItem } from "../molecules/ListItem";
import { Txt } from "../atoms/text";

export const AdminProfileMenuGroup: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-24 px-6 mt-8">
      {/* Management Section */}
      <div className="space-y-4">
        <Txt weight="bold" className="text-gray-900 ml-2">
          Manajemen Yayasan
        </Txt>
        <div className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
          <ProfileListItem
            icon={<LayoutDashboard size={18} />}
            label="Kelola Program"
          />
          <ProfileListItem
            icon={<FileCheck size={18} />}
            label="Verifikasi Donasi"
          />
          <ProfileListItem icon={<Users size={18} />} label="Kelola Donatur" />
        </div>
      </div>

      {/* Reports & Data Section */}
      <div className="space-y-4">
        <Txt weight="bold" className="text-gray-900 ml-2">
          Laporan & Data
        </Txt>
        <div className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
          <ProfileListItem
            icon={<BarChart3 size={18} />}
            label="Statistik Dampak"
          />
          <ProfileListItem
            icon={<FileText size={18} />}
            label="Laporan Keuangan"
          />
          <ProfileListItem icon={<History size={18} />} label="Log Aktivitas" />
        </div>
      </div>

      {/* System Section */}
      <div className="space-y-4">
        <Txt weight="bold" className="text-gray-900 ml-2">
          Sistem
        </Txt>
        <div className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
          <ProfileListItem
            icon={<Globe size={18} />}
            label="Konfigurasi Website"
          />
          <ProfileListItem
            icon={<Settings size={18} />}
            label="Pengaturan Akun"
          />
          <ProfileListItem icon={<Info size={18} />} label="Bantuan Teknis" />
        </div>
      </div>

      <button className="w-full py-4 rounded-[24px] bg-red-50 text-red-primary font-black text-sm transition-all active:scale-95 mb-8 flex items-center justify-center gap-2">
        <LogOut size={18} />
        Keluar Panel Admin
      </button>
    </div>
  );
};
