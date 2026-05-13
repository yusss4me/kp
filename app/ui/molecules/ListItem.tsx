// components/molecules/ProfileListItem.tsx

'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Btn } from '../atoms/button';
import Link from 'next/link';

interface ListItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

/**
 * Komponen item daftar untuk menu profil atau navigasi.
 * Dapat bertindak sebagai tautan (Link) atau tombol biasa.
 * 
 * @param {React.ReactNode} icon - Icon yang ditampilkan di sebelah kiri label
 * @param {string} label - Teks label yang ditampilkan
 * @param {string} href - URL tujuan jika item ini adalah tautan (opsional)
 * @returns {JSX.Element} Komponen item daftar
 */
export const ListItem: React.FC<ListItemProps> = ({ icon, label, href }) => {
  const content = (
    <div className="w-full flex items-center justify-between py-4 border-b border-gray-50 group active:bg-gray-50 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="text-gray-600 group-hover:text-red-primary transition-colors">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-red-primary group-hover:translate-x-1 transition-all" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
        {content}
      </Link>
    );
  }

  return (
    <Btn 
      variant="light"
      className="w-full p-0 h-auto"
    >
      {content}
    </Btn>
  );
};