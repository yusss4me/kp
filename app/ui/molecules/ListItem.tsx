// components/molecules/ProfileListItem.tsx

'use client';
import { Icn } from '../atoms/Icn';
import { Lnk } from '../atoms/link';
import { Container } from '../atoms/container';

import React from 'react';

import { Btn } from '../atoms/button';
import Link from 'next/link';
import { LucideIcon, ChevronRight } from 'lucide-react';

export interface ListItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
}

/**
 * ListItem
 * 
 * Komponen item daftar serbaguna untuk menu profil atau navigasi.
 * Mendukung mode tautan (Link) atau tombol (Button) biasa.
 * 
 * @param {React.ReactNode} icon - Icon yang ditampilkan di sebelah kiri label
 * @param {string} label - Teks label yang ditampilkan
 * @param {string} href - URL tujuan jika item ini adalah tautan (opsional)
 * @param {ListItemProps} props - Properti komponen
 * @returns {JSX.Element} Komponen item daftar
 */
export const ListItem: React.FC<ListItemProps> = ({ 
  icon:icon, 
  label, 
  href }) => {
  const content = (
    <Container 
    padding='md'
    className="w-full flex items-center justify-between  border-b border-gray-50 group active:bg-gray-50 transition-all cursor-pointer">
      <Container className="flex items-center gap-4">
        <Container className="text-gray-600 group-hover:text-red-primary transition-colors">
          <Icn icon={icon} size={20} color='current' />
        </Container>
        <span className="text-sm font-medium text-gray-800 group-hover:text-red-primary transition-colors">{label}</span>
      </Container>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-red-primary group-hover:translate-x-1 transition-all" />
    </Container>
  );

  if (href) {
    return (
      <Lnk href={href} className="block w-full">
        {content}
      </Lnk>
    );
  }

  return (
    <Btn 
      variant="light"
      className="w-full p-0 h-auto"
      textColor='darkred'
    >
      {content}
    </Btn>
  );
};
