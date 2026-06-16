import React from 'react';
import Link from 'next/link';
import { Search, Plus, Filter } from 'lucide-react';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { Input } from '../atoms/input';

export interface OrphanFilterProps {
  onSearch: (query: string) => void;
  onAddClick: () => void;
  addHref?: string;
}

/**
 * OrphanFilter
 * 
 * Komponen filter untuk mencari dan mengelola data anak asuh.
 * Terdiri dari input pencarian, tombol filter, dan tombol aksi 
 * untuk menambah data anak baru.
 * 
 * @param {(query: string) => void} onSearch - Handler saat kueri pencarian berubah
 * @param {() => void} onAddClick - Handler saat tombol tambah anak diklik
 * @param {OrphanFilterProps} props - Properti komponen
 * @returns {JSX.Element} Komponen OrphanFilter
 */
export const OrphanFilter = ({ onSearch, onAddClick, addHref }: OrphanFilterProps) => {
  return (
    <Container className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-[28px] border border-gray-100 shadow-sm">
      <Container className="relative flex-grow w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
        <Input 
          type="text" 
          placeholder="Cari nama anak asuh..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-primary/20 text-sm font-medium transition-all"
        />
      </Container>
      
      <Container className="flex items-center gap-2 w-full md:w-auto">
        <Btn 
          variant="light" 
          className="flex-1 md:flex-none gap-2 h-12 rounded-2xl border border-gray-100"
        >
          <Filter size={18} />
          Filter
        </Btn>
        {addHref ? (
          <Link href={addHref} className="flex-1 md:flex-none">
            <Btn variant="red" className="w-full gap-2 h-12 rounded-2xl shadow-lg shadow-red-primary/20">
              <Plus size={18} />
              Tambah Anak
            </Btn>
          </Link>
        ) : (
          <Btn variant="red" onClick={onAddClick} className="flex-1 md:flex-none gap-2 h-12 rounded-2xl shadow-lg shadow-red-primary/20">
            <Plus size={18} />
            Tambah Anak
          </Btn>
        )}
      </Container>
    </Container>
  );
};
