'use client';
import { Navbar, NavLink } from "@/app/ui/organisms/navBar";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { 
  LayoutDashboard, 
  Compass
} from "lucide-react";
import { routes } from "@/app/lib/constants/routes";
import image from "next/image";

const ADMIN_LINKS: NavLink[] = [
  { label: "Dashboard", href: routes.admin.root(), icon: LayoutDashboard },
  { label: "Akses Cepat", href: routes.admin.quickAccess.root(), icon: Compass },
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
          image: user?.image || "",
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
