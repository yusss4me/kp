'use client';

import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { Home, HandCoins, MessageCircleMore, User } from "lucide-react";

const HOME_LINKS: NavLink[] = [
  { label: "Beranda", href: "/home", icon: Home },
  { label: "Aktivitas", href: "/home/aktivitas", icon: HandCoins },
  { label: "Broadcast", href: "/home/broadcast", icon: MessageCircleMore },
  { label: "Profil", href: "/home/profil", icon: User, hideOnDesktop: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      <Navbar
        links={HOME_LINKS}
        user={{
          name: user?.name || "Donatur Yamuti",
          role: "Donatur",
          image: "/logo/yamuti.png",
        }}
      />
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
