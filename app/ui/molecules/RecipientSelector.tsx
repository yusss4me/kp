'use client';
import { Container } from '../atoms/container';
import { Icn } from '../atoms/icon';
import { Txt } from '../atoms/text';
import React from 'react';
import { Users, ChevronDown } from 'lucide-react';

export interface RecipientSelectorProps {
  selectedGroup: string;
  count: number;
}

/**
 * RecipientSelector
 * 
 * Komponen untuk menampilkan dan memilih grup penerima siaran.
 * Menampilkan label grup dan jumlah target penerima.
 * 
 * @param {string} selectedGroup - Nama grup penerima yang dipilih
 * @param {number} count - Jumlah orang dalam grup tersebut
 * @param {RecipientSelectorProps} props - Properti komponen
 * @returns {JSX.Element} Komponen RecipientSelector
 */
export const RecipientSelector: React.FC<RecipientSelectorProps> = ({ selectedGroup, count }) => {
  return (
    <Container gap='md' className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl">
      <Container gap='default' className="flex items-center gap-3">
        <Container className="p-2 bg-red-primary rounded-lg text-white">
          <Users size={20} />
        </Container>
        <Container gap='default' display="grid">
          <Txt className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Kirim Ke</Txt>
          <Txt className="font-bold text-gray-900">{selectedGroup}</Txt>
        </Container>
      </Container>
      <div className="text-right">
        <span className="bg-red-primary text-white text-[10px] px-2 py-1 rounded-full font-bold">
          {count} Orang
        </span>
      </div>
    </Container>
  );
};