'use client';
import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Package, 
  Wallet, 
  Calendar, 
  Share2, 
  MessageSquareText 
} from "lucide-react";

const ADMIN_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Anak Asuh", href: "/admin/anak-asuh", icon: Users },
  { label: "Donasi", href: "/admin/donasi", icon: Heart },
  { label: "Broadcast", href: "/admin/broadcast", icon: MessageSquareText },
  { label: "Keuangan", href: "/admin/keuangan", icon: Wallet },
  { label: "Inventaris", href: "/admin/inventaris", icon: Package },
  { label: "Kunjungan", href: "/admin/kunjungan", icon: Calendar },
  { label: "CMS", href: "/admin/cms", icon: Share2 },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      <Navbar 
        links={ADMIN_LINKS} 
        user={{ 
          name: user?.name || "Admin Yamuti", 
          role: "Administrator" 
        }} 
      />
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
