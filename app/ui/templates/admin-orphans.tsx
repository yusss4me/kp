'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/app/ui/organisms/DashboardHeader';
import { OrphanFilter } from '@/app/ui/organisms/OrphanFilter';
import { OrphanCard } from '@/app/ui/molecules/OrphanCard';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Pencil } from 'lucide-react';
import type { Orphan } from '@/app/lib/types/entities';
import { routes } from '@/app/lib/constants/routes';

export type { Orphan as OrphanData };

interface AdminOrphansTemplateProps {
  orphans: Orphan[];
  onDelete?: (id: number) => void;
  addUrl: string;
  editUrl: (id: string | number) => string;
}

export function AdminOrphansTemplate({ orphans, onDelete, addUrl, editUrl }: AdminOrphansTemplateProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrphans = orphans.filter((orphan) =>
    orphan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardHeader headerTitle="Manajemen Anak Asuh">
      <div className="space-y-10">
        <div className="space-y-2 px-2">
          <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Data Anak Asuh</Txt>
          <Txt variant="body" className="text-gray-500 max-w-2xl">
            Kelola data profil, status, dan riwayat perkembangan setiap anak asuh di Yayasan Yamuti secara sistematis.
          </Txt>
        </div>

        <OrphanFilter
          onSearch={(q) => setSearchQuery(q)}
          onAddClick={() => {}}
          addHref={addUrl}
        />

        {filteredOrphans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOrphans.map((orphan) => (
              <div key={orphan.id} className="relative group/card">
                <OrphanCard
                  id={orphan.id}
                  name={orphan.name}
                  age={0}
                  gender={orphan.kategori_bayi ? "Laki-laki" : "Laki-laki"}
                  status={orphan.status}
                  detailHref={editUrl(orphan.id)}
                />
                <div className="flex gap-2 mt-3">
                  <Link href={editUrl(orphan.id)} className="flex-1">
                    <Btn variant="light" size="sm" shape="rounded" className="w-full gap-1 text-xs font-bold">
                      <Pencil size={14} /> Edit
                    </Btn>
                  </Link>
                  {onDelete && (
                    <Btn
                      type="button"
                      variant="light"
                      size="sm"
                      shape="rounded"
                      className="flex-1 text-red-primary bg-red-50 text-xs font-bold"
                      onClick={() => {
                        if (confirm(`Hapus data ${orphan.name}?`)) onDelete(orphan.id);
                      }}
                    >
                      Hapus
                    </Btn>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center bg-white rounded-[40px] border border-dashed border-gray-200">
            <Txt variant="body" className="text-gray-400 font-medium italic">
              Tidak ada data anak asuh yang ditemukan dengan nama &quot;{searchQuery}&quot;
            </Txt>
          </div>
        )}
      </div>
    </DashboardHeader>
  );
}
