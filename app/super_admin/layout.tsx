'use client';

import { Navbar, NavLink } from "@/app/ui/organisms/nav-bar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Compass,
  User
} from "lucide-react";
import { routes } from "@/app/lib/constants/routes";
import { OWNER_PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";
import { useRouter } from "next/navigation";

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
  const t = useTranslations("nav");

  const OWNER_LINKS: NavLink[] = [
    { label: t("dashboard"), href: routes.owner.root(), icon: LayoutDashboard },
    { label: t("activity"), href: routes.owner.quickAccess.root(), icon: Compass },
    { label: t("explore"), href: routes.owner.explore.root(), icon: Compass },
    { label: "Profil", href: routes.owner.profile.root(), icon: User, hideOnDesktop: true },
  ];

  const router = useRouter();

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    router.push("/auth");
  };

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
        profileMenuGroups={OWNER_PROFILE_MENU_GROUPS}
        onLogout={handleLogout}
      />

      {/* Konten Utama */}
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
    </div>
  );
}
