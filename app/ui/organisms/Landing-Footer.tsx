'use client';
import React, { useEffect, useState } from 'react';
import { BrandLight } from "@/app/ui/molecules/brand";
import { Txt } from "@/app/ui/atoms/text";
import { Lnk } from "@/app/ui/atoms/link";
import { Icn } from "@/app/ui/atoms/Icn";
import { Mail, Phone, MapPin } from "lucide-react";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export interface LandingFooterProps {
  className?: string;
}

/**
 * LandingFooter
 * 
 * Komponen footer untuk halaman landing.
 * Berisi deskripsi brand, tautan navigasi cepat, informasi kontak yayasan, 
 * dan informasi hak cipta.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {LandingFooterProps} props - Properti komponen
 * @returns {JSX.Element} Komponen LandingFooter
 */
export const LandingFooter: React.FC<LandingFooterProps> = () => {
  const { foundationProfile } = useYamutiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-lightdark-tertiary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <BrandLight />
            <Txt variant="body" color="light" className="opacity-60 max-w-sm">
              Yamuti Foundation berkomitmen untuk membangun masa depan yang lebih baik melalui pemberdayaan masyarakat, pendidikan, dan aksi sosial yang berkelanjutan.
            </Txt>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <Txt variant="h6" weight="bold" color="light">Tautan Cepat</Txt>
            <ul className="space-y-4">
              <li>
                <Lnk href="#programs" variant="default" color="light" className="text-sm opacity-60 hover:opacity-100">Program Donasi</Lnk>
              </li>
              <li>
                <Lnk href="#tentang-kami" variant="default" color="light" className="text-sm opacity-60 hover:opacity-100">Tentang Kami</Lnk>
              </li>
              <li>
                <Lnk href="/donasi-rutin" variant="default" color="light" className="text-sm opacity-60 hover:opacity-100">Donasi Rutin</Lnk>
              </li>
              <li>
                <Lnk href="/volunteer" variant="default" color="light" className="text-sm opacity-60 hover:opacity-100">Jadi Relawan</Lnk>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Txt variant="h6" weight="bold" color="light">Kontak Kami</Txt>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm opacity-60">
                <Icn icon={Mail} size={18} color="current" className="text-red-primary" />
                info@yamuti.org
              </li>
              <li className="flex items-center gap-3 text-sm opacity-60">
                <Icn icon={Phone} size={18} color="current" className="text-red-primary" />
                +62 812-3456-7890
              </li>
              <li>
                <a 
                  href="https://maps.app.goo.gl/RKtcchKJMf968yi66" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Icn icon={MapPin} size={18} color="current" className="text-red-primary mt-1 flex-shrink-0" />
                  <span>{mounted && foundationProfile ? foundationProfile.address : 'Buka Peta'}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <Txt variant="caption" color="light" className="opacity-40">
            © 2026 Yamuti Foundation. Seluruh hak cipta dilindungi.
          </Txt>
          <div className="flex gap-6">
            <Lnk href="/privacy" color="light" variant="muted" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100">Kebijakan Privasi</Lnk>
            <Lnk href="/terms" color="light" variant="muted" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100">Syarat & Ketentuan</Lnk>
          </div>
        </div>
      </div>
    </footer>
  );
};
