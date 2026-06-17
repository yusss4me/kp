'use client';
import { Navbar, NavLink } from "@/app/ui/organisms/nav-bar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Compass,
} from "lucide-react";
import { routes } from "@/app/lib/constants/routes";
import { ADMIN_PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((s) => s.user);
  const t = useTranslations("nav");

  const ADMIN_LINKS: NavLink[] = [
    { label: t("dashboard"), href: routes.admin.root(), icon: LayoutDashboard },
    { label: t("activity"), href: routes.admin.quickAccess.root(), icon: Compass },
    { label: t("explore"), href: routes.admin.explore.root(), icon: Compass },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50">
      <Navbar
        links={ADMIN_LINKS}
        user={{
          image: user?.image || "",
          name: user?.name || "Admin Yamuti",
          role: "Administrator"
        }}
        profileMenuGroups={ADMIN_PROFILE_MENU_GROUPS}
      />
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
