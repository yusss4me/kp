'use client';

import { Navbar, NavLink } from "@/app/ui/organisms/nav-bar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useTranslations } from "next-intl";
import { Home, HandCoins, User } from "lucide-react";

import { routes } from "@/app/lib/constants/routes";
import { BroadcastBubble } from "@/app/ui/organisms/broadcast-bubble";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const t = useTranslations("nav");

  const HOME_LINKS: NavLink[] = [
    { label: t("home"), href: routes.user.root(), icon: Home },
    { label: t("activity"), href: routes.user.aktivitas.root(), icon: HandCoins },
    { label: t("profile"), href: routes.user.aktivitas.profile.root(), icon: User, hideOnDesktop: true },
  ];

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
      <main className="flex-grow pb-24 md:pb-0 relative">
        {children}
        <BroadcastBubble />
      </main>
    </div>
  );
}
