'use client';

import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FilePieChart, 
  Globe, 
  Settings,
  Activity
} from "lucide-react";

/**
 * OWNER_LINKS
 * Definisi navigasi khusus untuk role Owner.
 */
const OWNER_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/owner", icon: LayoutDashboard },
  { label: "Kelola Admin", href: "/owner/admins", icon: ShieldCheck },
  { label: "Laporan Keuangan", href: "/owner/reports", icon: FilePieChart },
  { label: "Profil Yayasan", href: "/owner/foundation", icon: Globe },
  { label: "Log Aktivitas", href: "/owner/donations", icon: Activity },
  { label: "Pengaturan", href: "/owner/settings", icon: Settings },
];

/**
 * Owner Layout
 * Menyediakan struktur dashboard dengan Sidebar (Navbar) untuk role Owner.
 */
export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      {/* Sidebar Navigasi */}
      <Navbar 
        links={OWNER_LINKS} 
        user={{ 
          name: "Bpk. Owner Yamuti", 
          role: "Pemilik Yayasan" 
        }} 
      />
      
      {/* Konten Utama */}
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
