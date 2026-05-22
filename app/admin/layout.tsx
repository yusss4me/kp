'use client';
import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
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
  { label: "Anak Asuh", href: "/admin/orphans", icon: Users },
  { label: "Donasi", href: "/admin/donations", icon: Heart },
  { label: "Broadcast", href: "/admin/broadcast", icon: MessageSquareText },
  { label: "Keuangan", href: "/admin/finance", icon: Wallet },
  { label: "Inventaris", href: "/admin/inventory", icon: Package },
  { label: "Kunjungan", href: "/admin/kunjungan", icon: Calendar },
  { label: "Publikasi", href: "/admin/social-media", icon: Share2 },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navbar 
        links={ADMIN_LINKS} 
        user={{ name: "Admin Yamuti", role: "Super Administrator" }} 
      />
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
