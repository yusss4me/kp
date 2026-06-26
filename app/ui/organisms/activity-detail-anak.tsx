'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Calendar, MapPin, Edit } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { useYamutiStore } from '@/app/lib/stores/yamuti-store';
import { routes } from '@/app/lib/constants/routes';

export interface DetailAnakProps {
  id?: string;
  url: string;
}

export const DetailAnak = ({ id, url }: DetailAnakProps) => {
  const router = useRouter();
  const orphan = useYamutiStore((s) => (id ? s.getOrphanById(Number(id)) : undefined));

  if (id && !orphan) {
    return (
      <Container className="p-10 text-center">
        <Txt className="text-gray-500">Data anak asuh tidak ditemukan.</Txt>
      </Container>
    );
  }

  if (!orphan) {
    return (
      <Container className="p-10 text-center">
        <Txt className="text-gray-500">Pilih anak asuh untuk melihat detail.</Txt>
      </Container>
    );
  }

  const statusColor =
    orphan.status === 'Aktif'
      ? 'success'
      : orphan.status === 'Alumni'
        ? 'info'
        : 'warning';

  return (
    <Container className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-500 to-red-700 px-6 pt-8 pb-16 rounded-b-[32px]">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <Txt variant="h6" color="light" weight="bold">
            Detail Anak Asuh
          </Txt>
          <div className="w-10" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
            <User size={48} className="text-white" />
          </div>
          <div className="text-center">
            <Txt variant="h4" color="light" weight="bold">
              {orphan.name}
            </Txt>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge variant="solid" color={statusColor as 'success' | 'info' | 'warning'}>
                {orphan.status}
              </Badge>
              {/* <Badge variant="outline" color="secondary">
                {orphan.gender}
              </Badge> */}
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-6 -mt-8 space-y-4 flex-grow">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-xl">
              <User size={20} className="text-red-500" />
            </div>
            <div>
              <Txt variant="caption" className="text-gray-500">
                Nama Lengkap
              </Txt>
              <Txt variant="body" weight="bold" className="text-gray-800">
                {orphan.name}
              </Txt>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Calendar size={20} className="text-blue-500" />
            </div>
            <div>
              {/* <Txt variant="caption" className="text-gray-500">
                Usia
              </Txt>
              <Txt variant="body" weight="bold" className="text-gray-800">
                {orphan.age} tahun
              </Txt> */}
            </div>
          </div>

          <a href="https://maps.app.goo.gl/RKtcchKJMf968yi66" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors cursor-pointer group">
            <div className="p-2 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
              <MapPin size={20} className="text-green-500" />
            </div>
            <div>
              <Txt variant="caption" className="text-gray-500 block">
                Lokasi Asuh
              </Txt>
              <Txt variant="body" weight="bold" className="text-gray-800 group-hover:text-green-600 transition-colors">
                Yayasan Mutiara Titipan Ilahi
              </Txt>
            </div>
          </a>

          {/* {orphan.notes && (
            <div className="pt-2 border-t border-gray-100">
              <Txt variant="caption" className="text-gray-500">
                Catatan
              </Txt>
              <Txt variant="body" className="text-gray-700 mt-1">
                {orphan.notes}
              </Txt>
            </div>
          )} */}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-4">
        <Btn
          variant="red"
          size="md"
          onClick={() => router.push(routes.admin.anakAsuh.edit(Number(id)))}
          className="w-full h-14 font-bold rounded-2xl flex items-center justify-center gap-2"
        >
          <Edit size={20} />
          Edit Data Anak
        </Btn>
      </div>
    </Container>
  );
};
