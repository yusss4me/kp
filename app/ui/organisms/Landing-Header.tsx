'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../atoms/container';
import { BrandLight } from "@/app/ui/molecules/brand";
import { Btn } from "@/app/ui/atoms/button";
import { X, Menu } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { NavLink } from "@/app/ui/molecules/navlink";
import {routes } from "@/app/lib/constants/routes";

export interface LandingHeaderProps {
  
  className?: string;
}

/**
 * LandingHeader
 * 
 * Komponen header navigasi untuk halaman landing.
 * Mendukung navigasi desktop, menu toggle mobile, serta tombol 
 * autentikasi (Masuk/Daftar).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {LandingHeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen LandingHeader
 */
export const LandingHeader: React.FC<LandingHeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#programs", label: "Program" },
    { href: "#tentang-kami", label: "Tentang Kami" },
  ];

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-red-primary">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <BrandLight />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/auth/">
              <Btn variant="light" textColor='dark' shape="circle" className="px-6">Masuk</Btn>
            </Link>
            <Link href="/auth/daftar">
              <Btn variant="red" shape="circle" border='border' borderColor="light" className="px-6 shadow-lg shadow-red-primary/20">Daftar</Btn>
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden text-lightdark-primary hover:text-red-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-20 z-40 bg-lightdark-tertiary/20 transition-all duration-300 md:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <nav className="flex flex-col p-3 gap-3 bg-lightdark-tertiary/50">
          {navLinks.map((link) => ( 
            <NavLink
              key={link.href}
              href={link.href}
              
              label={link.label}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-lightdark-tertiary hover:text-red-primary border-b border-gray-50 pb-2 rounded-none bg-transparent hover:bg-transparent px-0"
              activeClassName="text-red-primary border-red-primary"
            />
          ))}
          <div className="flex flex-col gap-4 pt-4">
            <Link href="/auth/" onClick={() => setIsMenuOpen(false)}>
              <Btn variant="light" textColor='dark' shape="circle" className="w-full py-4">Masuk</Btn>
            </Link>
            <Link href="/auth/daftar" onClick={() => setIsMenuOpen(false)}>
              <Btn variant="red" shape="circle" className="w-full py-4 shadow-lg shadow-red-primary/20">Daftar</Btn>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

