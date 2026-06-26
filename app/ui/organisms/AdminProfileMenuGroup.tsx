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
import { ListItem } from "../molecules/ListItem";
import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";
import { Icn } from "../atoms/Icn";
import { Container } from "../atoms/container";


export interface AdminProfileMenuGroupProps {
  className?: string;
  onLogout?: () => void;
}

/**
 * AdminProfileMenuGroup
 * 
 * Komponen grup menu navigasi khusus untuk Administrator.
 * Mengelompokkan aksi manajemen berdasarkan kategori (Manajemen Yayasan, 
 * Laporan & Data, Sistem) dan tombol keluar panel admin.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {AdminProfileMenuGroupProps} props - Properti komponen
 * @returns {JSX.Element} Komponen AdminProfileMenuGroup
 */
export const AdminProfileMenuGroup: React.FC<AdminProfileMenuGroupProps> = ({ onLogout }) => {
  return (
    <Container gap="lg" padding='md' className="flex-col pb-24 px-6 mt-8 w-full">
      {/* Management Section */}
      <div className="space-y-4">
        <Txt weight="bold" color="dark" className=" ml-2">
          Manajemen Yayasan
        </Txt>
        <Container variant="light" padding="md" radius="lg" shadow="sm" className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
          <ListItem icon={LayoutDashboard} label="Kelola Program" />
          <ListItem icon={FileCheck} label="Verifikasi Donasi" />
          <ListItem icon={Users} label="Kelola Donatur" />
        </Container>
      </div>

      {/* Reports & Data Section */}
      <div className="space-y-4">
        <Txt weight="bold" color="dark" className=" ml-2">
          Laporan & Data
        </Txt>
        <Container variant="light" padding="md" radius="lg" shadow="sm" className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
          <ListItem icon={BarChart3} label="Statistik Dampak" />
          <ListItem icon={FileText} label="Laporan Keuangan" />
          <ListItem icon={History} label="Log Aktivitas" />
        </Container>
      </div>

      {/* System Section */}
      <div className="space-y-4">
        <Txt weight="bold" color="dark" className=" ml-2">
          Sistem
        </Txt>
        <Container variant="light" padding="md" radius="lg" shadow="sm" className="bg-white rounded-[32px] border border-gray-100 p-2 shadow-sm">
          <ListItem icon={Globe} label="Konfigurasi Website" />
          <ListItem icon={Settings} label="Pengaturan Akun" />
          <ListItem icon={Info} label="Bantuan Teknis" />
        </Container>
      </div>

      <Btn
        variant="light"
        textColor="red"
        size="lg"
        shape="rounded"
        className="w-full py-4 rounded-[24px] bg-red-50 text-red-primary font-black text-sm mb-8 gap-2"
        onClick={onLogout}
      >
        <Icn icon={LogOut} size={18} color="current" />
        Keluar Panel Admin
      </Btn>
    </Container>
  );
};
