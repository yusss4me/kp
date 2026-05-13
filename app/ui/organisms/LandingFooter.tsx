'use client';
import React from 'react';
import Link from 'next/link';
import { BrandLight } from "@/app/ui/molecules/brand";
import { Txt } from "@/app/ui/atoms/text";
import { Mail, Phone, MapPin } from "lucide-react";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-lightdark-tertiary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <BrandLight />
            <Txt variant="body" color="white" className="opacity-60 max-w-sm">
              Yamuti Foundation berkomitmen untuk membangun masa depan yang lebih baik melalui pemberdayaan masyarakat, pendidikan, dan aksi sosial yang berkelanjutan.
            </Txt>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <Txt variant="h6" weight="bold" color="white">Tautan Cepat</Txt>
            <ul className="space-y-4">
              <li>
                <Link href="#programs" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Program Donasi</Link>
              </li>
              <li>
                <Link href="#tentang-kami" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/donasi-rutin" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Donasi Rutin</Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Jadi Relawan</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Txt variant="h6" weight="bold" color="white">Kontak Kami</Txt>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm opacity-60">
                <Mail size={18} className="text-red-primary" />
                info@yamuti.org
              </li>
              <li className="flex items-center gap-3 text-sm opacity-60">
                <Phone size={18} className="text-red-primary" />
                +62 812-3456-7890
              </li>
              <li className="flex items-start gap-3 text-sm opacity-60">
                <MapPin size={18} className="text-red-primary mt-1" />
                Jl. Raya Cisarua No. 123, Bogor, Jawa Barat
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <Txt variant="caption" color="white" className="opacity-40">
            © 2026 Yamuti Foundation. Seluruh hak cipta dilindungi.
          </Txt>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100">Kebijakan Privasi</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
