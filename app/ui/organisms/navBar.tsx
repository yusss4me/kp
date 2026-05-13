"use client";

import { ProfileTemplate } from "../templates/profile";
import { Container } from "@/app/ui/atoms/container";
import { useState } from "react";
import { Btn } from "@/app/ui/atoms/button";
import Image from "next/image";
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
  { label: "Jelajahi", href: "/home/explore", icon: Compass },
  { label: "Aktivitas", href: "/home/donasi", icon: HandCoins },
  { label: "Broadcast", href: "/home/broadcast", icon: MessageCircleMore },
  { label: "Profil", href: "/home/profile", icon: User, hideOnDesktop: true },
];

interface NavbarProps {
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
            <Image
              src="/logo/yamuti.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
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
              variant="orange">
              {isProfileOpen ? <X size={20} /> : <User size={20} />}
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
        {/* <Container className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-red-primary border-b border-white/10 z-50">
          <Container className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-red-primary font-black text-sm">
              Y
            </div>
            <Txt weight="bold" color="white" className="tracking-tight">
              YAMUTI
            </Txt>
          </Container>

          <Container className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <User size={18} className="text-white" />
          </Container>
        </Container> */}

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
      <div className="md:hidden h-16" />
    </>
  );
};
