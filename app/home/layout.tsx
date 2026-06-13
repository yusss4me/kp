'use client';

import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { Home, HandCoins, MessageCircleMore, User } from "lucide-react";

import { routes } from "@/app/lib/constants/routes";

const HOME_LINKS: NavLink[] = [
  { label: "Beranda", href: routes.user.root(), icon: Home },
  { label: "Aktivitas", href: routes.user.aktivitas.root(), icon: HandCoins },
  { label: "Broadcast", href: routes.user.aktivitas.broadcast.root(), icon: MessageCircleMore },
  { label: "Profil", href: routes.user.aktivitas.profile.root(), icon: User, hideOnDesktop: true },
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
