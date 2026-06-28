"use client";

import { ProfileTemplate } from "../templates/profile";
import { Container } from "@/app/ui/atoms/container";
import { useState } from "react";
import { Btn } from "@/app/ui/atoms/button";
import { Img } from "@/app/ui/atoms/image";
import { Icn } from "@/app/ui/atoms/Icn";
import { Txt } from "@/app/ui/atoms/text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageCircleMore,
  User,
  Compass,
  HandCoins,
  LucideIcon,
  X,
  LayoutDashboard,
  Users,
  Heart,
  Package,
  Wallet,
  Calendar,
  Share2,
  Box,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { NavLink as NavLinkMolecule } from "@/app/ui/molecules/navlink";
import { PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";
import { routes } from "@/app/lib/constants/routes";
import { NotificationBell } from "@/app/ui/organisms/notification-bell";

/**
 * Navigation link type definition.
 */
export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;

  hideOnDesktop?: boolean;
}

/**
 * Default navigation links for donors.
 */
const DEFAULT_LINKS: NavLink[] = [
  { label: "Beranda", href: routes.user.root(), icon: Home },
  { label: "Aktivitas", href: routes.user.aktivitas.root(), icon: HandCoins },
];

export interface NavbarProps {
  links?: NavLink[];
  user?: {
    name: string;
    role: string;
    image: string;
  };
  amountProgramUser?: string;
  amountVisitUser?: string;
  amountDonatedUser?: string;
  className?: string;
  profileMenuGroups?: any;
  onLogout?: () => void;
}

/**
 * Navbar component that adapts between a Sidebar for Desktop
 * and a Header/Bottom-Navigation split for Mobile.
 */
/**
 * Navbar
 * 
 * Komponen navigasi utama yang adaptif antara Sidebar untuk Desktop 
 * dan Split Header/Bottom-Navigation untuk Mobile.
 * Menangani routing, status aktif tautan, dan overlay profil pengguna.
 * 
 * @param {NavLink[]} links - Daftar tautan navigasi
 * @param {object} user - Data pengguna yang sedang login
 * @param {NavbarProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Navbar
 */
export const Navbar = ({
  links = DEFAULT_LINKS,
  user = { name: "M. Ardiansyah", role: "Donatur Tetap", image: "/logo/yamuti.png" },
  amountProgramUser = "0",
  amountVisitUser = "0",
  amountDonatedUser = "Rp 0",
  className = "",
  profileMenuGroups,
  onLogout,
}: NavbarProps) => {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter links for desktop view
  const desktopLinks = links.filter((link) => !link.hideOnDesktop);

  return (
    <>
      {/* Desktop View: Sidebar Layout */}
      <Container
        role="complementary"
        aria-label="Sidebar navigasi"
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen w-28 z-50 shrink-0",
          "bg-red-primary border-r border-white/10",
          "p-4 justify-between shadow-2xl",
        )}
      >
        {/* Top Section: Branding & Header */}
        <Container className="flex flex-col gap-6">
          <Container className="flex items-center justify-center">
            <Img
              src="/logo/yamuti.png"
              alt="Logo"
              w={50}
              h={50}
              rounded="full"
              aspect="square"
            />
          </Container>

          {/* Notification Bell (Desktop) */}
          <div className="flex items-center justify-center">
            <NotificationBell />
          </div>

          {/* Middle Section: Navigation Links */}
          <nav aria-label="Navigasi utama" className="flex flex-col items-center w-full gap-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {desktopLinks.map((link) => (
              <div key={link.href} className="w-full flex justify-center">
                <NavLinkMolecule
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  iconSize={20}
                  showLabel={true}
                  direction="col"
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 w-[76px] h-[76px] rounded-2xl transition-all duration-300",
                    "text-white/70 hover:bg-white/15 hover:text-white",
                  )}
                  activeClassName="bg-white text-red-primary shadow-xl shadow-black/10 hover:bg-white"
                  labelClassName="text-[10px] font-medium leading-none text-center"
                />
              </div>
            ))}
          </nav>
        </Container>

      </Container>

      {/* Mobile View: Top Header + Bottom Navigation */}
      <Container className="md:hidden flex flex-col">
        {/* Mobile Top Header: Logo + Notification Bell */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-red-primary/90 backdrop-blur-xl border-b border-white/10 shadow-sm">
          <Img src="/logo/yamuti.png" alt="Logo" w={32} h={32} rounded="full" aspect="square" />
          <NotificationBell />
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <nav
          aria-label="Navigasi mobile"
          className={cn(
            "fixed bottom-0 left-0 w-full z-50 px-2 flex items-center justify-around",
            "bg-red-primary backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]",
            "h-[60px] pb-safe",
          )}
        >
          {links.slice(0, 5).map((link) => (
            <NavLinkMolecule
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              iconSize={20}
              direction="col"
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl transition-all duration-300 min-w-0",
                "text-white/60 hover:bg-white/10 active:scale-95",
              )}
              activeClassName="bg-white/15 text-white"
              labelClassName="text-[9px] font-semibold uppercase tracking-wide truncate w-full text-center"
            />
          ))}
        </nav>
      </Container>

      {/* Mobile Top Header Spacer */}
      <div className="md:hidden" />
    </>
  );
};
