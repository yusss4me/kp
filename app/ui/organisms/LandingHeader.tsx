'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../atoms/container';
import { BrandLight } from "@/app/ui/molecules/brand";
import { Btn } from "@/app/ui/atoms/button";
import { X, Menu } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { NavLink } from "@/app/ui/molecules/navlink";

export const LandingHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#programs", label: "Program" },
    { href: "#tentang-kami", label: "Tentang Kami" },
    { href: "#bantuan", label: "Bantuan" },
  ];

  return (
    <Container variant='red' className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-100">
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
            <Link href="/auth/masuk">
              <Btn variant="light" shape="circle" className="px-6">Masuk</Btn>
            </Link>
            <Link href="/auth/daftar">
              <Btn variant="orange" shape="circle" className="px-6 shadow-lg shadow-red-primary/20">Daftar</Btn>
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
        "fixed inset-0 top-20 z-40 bg-white transition-all duration-300 md:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <nav className="flex flex-col p-3 gap-3 bg-orange-primary">
          {navLinks.map((link) => ( 
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-semibold text-lightdark-tertiary hover:text-orange-primary border-b border-gray-50 pb-2 rounded-none bg-transparent hover:bg-transparent px-0"
              activeClassName="text-orange-primary border-orange-primary"
            />
          ))}
          <div className="flex flex-col gap-4 pt-4">
            <Link href="/auth/masuk" onClick={() => setIsMenuOpen(false)}>
              <Btn variant="light" shape="circle" className="w-full py-4">Masuk</Btn>
            </Link>
            <Link href="/auth/daftar" onClick={() => setIsMenuOpen(false)}>
              <Btn variant="red" shape="circle" className="w-full py-4 shadow-lg shadow-red-primary/20">Daftar</Btn>
            </Link>
          </div>
        </nav>
      </div>
    </Container>
  );
};

