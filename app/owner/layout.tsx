'use client';

import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { 
  LayoutDashboard, 
  Compass
} from "lucide-react";
import { routes } from "@/app/lib/constants/routes";

/**
 * OWNER_LINKS
 * Definisi navigasi khusus untuk role Owner.
 */
const OWNER_LINKS: NavLink[] = [
  { label: "Dashboard", href: routes.owner.root(), icon: LayoutDashboard },
  { label: "Akses Cepat", href: routes.owner.quickAccess.root(), icon: Compass },
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
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      {/* Sidebar Navigasi */}
      <Navbar 
        links={OWNER_LINKS} 
        user={{ 
          name: user?.name || "Owner Yamuti", 
          role: "Pemilik Yayasan",
          image: user?.image || ""
        }} 
      />
      
      {/* Konten Utama */}
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
