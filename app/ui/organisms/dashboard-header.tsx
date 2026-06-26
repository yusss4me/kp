
import React from "react";
import { Txt } from "../atoms/text";
import { User } from "lucide-react";
import { Avatar } from "../atoms/avatar";

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
 *
 * Catatan: Notifikasi (Bell) dan pencarian (Search) sudah ditangani oleh
 * komponen Navbar, sehingga tidak perlu diduplikasi di sini.
 *
 * @param {React.ReactNode} children - Konten utama yang akan ditampilkan di dalam template
 * @param {string} headerTitle - Judul yang ditampilkan pada bagian header portal
 * @param {DashboardTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen DashboardTemplate
 */
export const DashboardHeader = ({
  children,
  headerTitle,
  portalLabel = "Portal Manajemen",
  user = { name: "Admin Yayasan", role: "Administrator" },
}: DashboardTemplateProps) => {
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

          {/* Kanan: Info pengguna + avatar (non-interaktif, hanya tampilan) */}
          <div className="flex items-center gap-2.5 shrink-0">
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
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-5 py-6 md:px-10 md:py-8 max-w-7xl mx-auto">{children}</div>
    </main>
  );
};
