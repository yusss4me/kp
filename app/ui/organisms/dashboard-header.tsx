"use client";

import React, { useState, useRef, useEffect } from "react";
import { Txt } from "../atoms/text";
import { User } from "lucide-react";
import { Avatar } from "../atoms/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";
import { routes } from "@/app/lib/constants/routes";

export interface DashboardTemplateProps {
  children: React.ReactNode;
  headerTitle: string;
  portalLabel?: string;
  user?: {
    name: string;
    role: string;
    image?: string;
  };
}

/**
 * DashboardTemplate
 *
 * Template layout utama untuk portal manajemen/dashboard.
 * Menyediakan struktur header statis dengan informasi profil pengguna,
 * serta area konten utama.
 */
export const DashboardHeader = ({
  children,
  headerTitle,
  portalLabel = "Portal Manajemen",
  user = { name: "Admin Yayasan", role: "Administrator" },
}: DashboardTemplateProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getProfileLink = () => {
    const lowerRole = user.role.toLowerCase();
    if (lowerRole.includes("super") || lowerRole.includes("owner") || lowerRole.includes("pemilik")) {
      return routes.super_admin.profile.root();
    }
    if (lowerRole.includes("admin")) {
      return routes.admin.profile.root();
    }
    return routes.user.aktivitas.profile.root(); // Default to donatur
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    setIsLogoutModalOpen(false);
    const lowerRole = user.role.toLowerCase();
    await useAuthStore.getState().logout();
    
    // Redirect logic as requested
    if (lowerRole.includes("admin") || lowerRole.includes("super") || lowerRole.includes("owner") || lowerRole.includes("pemilik")) {
      router.push("/auth");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Top Header Section */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-5 py-3 md:px-10 md:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto gap-3">
          
          {/* Kiri: Label portal & judul halaman */}
          <div className="space-y-0.5 min-w-0">
            <Txt
              variant="caption"
              className="text-gray-400 font-bold uppercase tracking-widest hidden sm:block"
            >
              {portalLabel}
            </Txt>
            <Txt variant="h4" weight="bold" className="text-gray-900 truncate">
              {headerTitle}
            </Txt>
          </div>

          {/* Kanan: Info pengguna + avatar */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 shrink-0 hover:bg-gray-50 rounded-full py-1 pl-3 pr-1 -mr-1 transition-colors cursor-pointer outline-none"
            >
              <div className="hidden md:flex flex-col text-right">
                <Txt variant="small" weight="bold" className="leading-none text-gray-800">
                  {user.name}
                </Txt>
                <Txt variant="caption" className="text-gray-400 mt-0.5">
                  {user.role}
                </Txt>
              </div>
              {user.image ? (
                <Avatar src={user.image} alt={user.name} size={36} />
              ) : (
                <div
                  className="w-9 h-9 rounded-xl bg-red-primary flex items-center justify-center text-white shrink-0 shadow-md shadow-red-primary/20"
                  aria-hidden="true"
                >
                  <User size={18} />
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-gray-100 py-3 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {/* Header Dropdown (Avatar + Name) */}
                <div className="px-5 py-4 flex flex-col items-center border-b border-gray-100">
                  {user.image ? (
                    <Avatar src={user.image} alt={user.name} size={64} className="mb-3" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-red-primary flex items-center justify-center text-white shrink-0 shadow-md mb-3">
                      <User size={32} />
                    </div>
                  )}
                  <Txt variant="body" weight="bold" className="text-gray-900 text-center">
                    {user.name}
                  </Txt>
                </div>
                
                {/* Action Links */}
                <div className="px-3 pt-3 flex flex-col gap-1">
                  <Link 
                    href={getProfileLink()} 
                    className="px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-red-primary hover:bg-red-50 rounded-xl transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Lihat Profil
                  </Link>
                  <button 
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-red-primary hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-5 py-6 md:px-10 md:py-8 max-w-7xl mx-auto">{children}</div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari sesi ini?"
        confirmText="Ya, Keluar"
        cancelText="Batal"
        variant="danger"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </main>
  );
};
