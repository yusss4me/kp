'use client';
import { Navbar, NavLink } from "@/app/ui/organisms/nav-bar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Compass,
  Grip,
  User
} from "lucide-react";
import { routes } from "@/app/lib/constants/routes";
import { ADMIN_PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";
import { BroadcastBubble } from "@/app/ui/organisms/broadcast-bubble";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((s) => s.user);
  const t = useTranslations("nav");

  const ADMIN_LINKS: NavLink[] = [
    { label: t("dashboard"), href: routes.admin.root(), icon: LayoutDashboard },
    { label: t("activity"), href: routes.admin.quickAccess.root(), icon: Grip },
    { label: t("explore"), href: routes.admin.explore.root(), icon: Compass },
    { label: "Profil", href: routes.admin.profile.root(), icon: User, hideOnDesktop: true },
  ];

  const router = useRouter();

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    router.push("/auth");
  };

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
        onLogout={handleLogout}
      />
      <main className="flex-grow pb-24 md:pb-0 relative">
        {children}
        <BroadcastBubble />
      </main>
    </div>
  );
}
