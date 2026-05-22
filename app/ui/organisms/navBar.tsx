"use client";

import { ProfileTemplate } from "../templates/profile";
import { Container } from "@/app/ui/atoms/container";
import { useState } from "react";
import { Btn } from "@/app/ui/atoms/button";
import { Img } from "@/app/ui/atoms/image";
import { Icn } from "@/app/ui/atoms/icon";
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
  { label: "Beranda", href: "/home", icon: Home },
  { label: "Aktivitas", href: "/home/donasi", icon: HandCoins },
  { label: "Broadcast", href: "/home/broadcast", icon: MessageCircleMore },
  { label: "Profil", href: "/home/profile", icon: User, hideOnDesktop: true },
];

export interface NavbarProps {
  links?: NavLink[];
  user?: {
    name: string;
    role: string;
  };
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
  user = { name: "M. Ardiansyah", role: "Donatur Tetap" },
}: NavbarProps) => {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter links for desktop view
  const desktopLinks = links.filter((link) => !link.hideOnDesktop);

  return (
    <>
      {/* Desktop View: Sidebar Layout */}
      <Container
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen w-28 z-50 shrink-0",
          "bg-red-primary border-r border-white/10",
          "p-4 justify-between shadow-2xl",
        )}
      >
        {/* Top Section: Branding & Header */}
        <Container className="flex flex-col gap-10">
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

          {/* Middle Section: Navigation Links */}
          <nav className="flex flex-col items-center w-full gap-2 overflow-y-auto custom-scrollbar">
            {desktopLinks.map((link) => (
              <NavLinkMolecule
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                iconSize={15}
                showLabel={false}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-4 rounded-full transition-all duration-300 relative",
                  "text-white/70 hover:bg-white/10 hover:text-white",
                )}
                activeClassName="bg-white text-red-primary shadow-xl shadow-black/10 hover:bg-white"
              />
            ))}
          </nav>
        </Container>

        {/* Bottom Section: User Profile */}
        <Container className="pt-6 border-t border-white/10">
          <Container className="flex items-center justify-center p-3">
            <Btn onClick={() => setIsProfileOpen(!isProfileOpen)}
            variant="transparent"
            className="text-white hover:bg-white/10 rounded-full p-3">
            {isProfileOpen
              ? <Icn icon={X} size={25} color="current" />
              : <Icn icon={User} size={25} color="current" />}
          </Btn>
          </Container>
        </Container>

        {/* Profile Overlay (Desktop Fly-out) */}
        {isProfileOpen && (
          <div className="absolute left-full top-0 h-screen w-[400px] bg-black/20 backdrop-blur-sm z-[60] animate-in slide-in-from-left-4 duration-300">
            <div className="h-full " onClick={(e) => e.stopPropagation()}>
              <ProfileTemplate isFlyout={true} />
            </div>
            {/* Close trigger for clicking outside the card but within the flyout area */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setIsProfileOpen(false)} 
            />
          </div>
        )}
      </Container>

      {/* Mobile View: Top Header + Bottom Navigation */}
      <Container className="md:hidden flex flex-col">
        {/* Mobile Top Header: Logo Branding */}

        {/* Mobile Bottom Navigation Bar */}
        <Container
          className={cn(
            "fixed bottom-0 left-0 w-full h-20 z-50 px-4 flex items-center justify-around",
            "bg-red-primary border-t border-white/10 pb-2",
          )}
        >
          {links.slice(0, 5).map((link) => (
            <NavLinkMolecule
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              iconSize={22}
              direction="col"
              className={cn(
                "p-2 rounded-xl transition-all duration-300 min-w-[64px]",
                "text-white/60 hover:bg-white/5",
              )}
              activeClassName="bg-white text-red-primary shadow-lg hover:bg-white"
              labelClassName="text-[9px] uppercase tracking-wider"
            />
          ))}
        </Container>
      </Container>

      {/* Mobile Top Header Spacer */}
      <div className="md:hidden" />
    </>
  );
};
