'use client';

import React, { useState } from 'react';
import { DashboardTemplate } from '@/app/ui/organisms/DashboardHeader';
import { OrphanFilter } from '@/app/ui/organisms/OrphanFilter';
import { OrphanCard } from '@/app/ui/molecules/OrphanCard';
import { Txt } from '@/app/ui/atoms/text';

const MOCK_ORPHANS = [
  { id: 1, name: "Ahmad Fauzi", age: 10, gender: "Laki-laki" as const, status: "Baru" as const },
  { id: 2, name: "Siti Aminah", age: 8, gender: "Perempuan" as const, status: "Aktif" as const },
  { id: 3, name: "Budi Santoso", age: 12, gender: "Laki-laki" as const, status: "Aktif" as const },
  { id: 4, name: "Laila Sari", age: 9, gender: "Perempuan" as const, status: "Aktif" as const },
  { id: 5, name: "Hafiz Ramadhan", age: 11, gender: "Laki-laki" as const, status: "Alumni" as const },
  { id: 6, name: "Nayla Putri", age: 7, gender: "Perempuan" as const, status: "Aktif" as const },
  { id: 7, name: "Rizky Pratama", age: 13, gender: "Laki-laki" as const, status: "Aktif" as const },
  { id: 8, name: "Zahra Aulia", age: 6, gender: "Perempuan" as const, status: "Baru" as const },
];

export default function OrphansPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrphans = MOCK_ORPHANS.filter(orphan =>
    orphan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardTemplate headerTitle="Manajemen Anak Asuh">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="space-y-2 px-2">
          <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Data Anak Asuh</Txt>
          <Txt variant="body" className="text-gray-500 max-w-2xl">
            Kelola data profil, status, dan riwayat perkembangan setiap anak asuh di Yayasan Yamuti secara sistematis.
          </Txt>
        </div>

        {/* Filter & Search */}
        <OrphanFilter
          onSearch={(q) => setSearchQuery(q)}
          onAddClick={() => alert('Fitur Tambah Anak akan segera hadir!')}
        />

        {/* Orphans Grid */}
        {filteredOrphans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOrphans.map((orphan) => (
              <OrphanCard
                key={orphan.id}
                name={orphan.name}
                age={orphan.age}
                gender={orphan.gender}
                status={orphan.status}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Txt className="text-4xl">🔎</Txt>
            </div>
            <Txt variant="body" className="text-gray-400 font-medium italic">
              Tidak ada data anak asuh yang ditemukan dengan nama "{searchQuery}"
            </Txt>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
}
