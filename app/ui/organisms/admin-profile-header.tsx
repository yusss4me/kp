'use client';
import React from 'react';
import { ShieldCheck, LayoutDashboard, Clock, Wallet } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Container } from '../atoms/container';
import { Img } from '../atoms/image';
import { Icn } from '../atoms/Icn';
import { Btn } from '../atoms/button';
import { Badge } from '../atoms/badge';
import { MilestoneCard } from '../molecules/milestoneCard';
import { Input } from '../atoms/input';

export interface AdminProfileHeaderProps {
  className?: string;
  title: string;
  subtitle: string;
  image: string;
  totalDonasi: string;
  programAktif: string;
  menungguVerifikasi: string;
  editing?: boolean;
  setEditing?: (editing: boolean) => void;
  isPreview?: boolean;
  setIsPreview?: (preview: boolean) => void;
  name?: string;
  setName?: (name: string) => void;
  onSave?: () => void;
  onImageUpload?: () => void;
}

/**
 * AdminProfileHeader
 * 
 * Komponen header khusus untuk halaman profil Administrator.
 * Menampilkan foto profil admin, status verifikasi shield, dan ringkasan 
 * statistik admin (Total Donasi, Program Aktif, Menunggu Verifikasi).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {AdminProfileHeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen AdminProfileHeader
 */
export const AdminProfileHeader: React.FC<AdminProfileHeaderProps> = (props) => {
    const { title, subtitle, image, totalDonasi, programAktif, menungguVerifikasi, className } = props;
  return (
    <Container variant='red' padding='md' radius='lg' shadow='xl' className="relative overflow-hidden w-full">
      <Container gap='lg' className="items-center relative z-10 flex flex-col md:flex-row justify-between w-full">
        {props.editing && !props.isPreview ? (
          <div className="flex flex-col gap-4 w-full md:w-2/3 bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <Txt variant="h5" weight="bold" color="light">Edit Profil Admin</Txt>
            <div className="w-full">
              <label className="text-white text-sm mb-1 block">Nama Admin</label>
              <input
                type="text"
                value={props.name || ''}
                onChange={(e) => props.setName && props.setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-gray-900 border-none outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <div 
                className="relative cursor-pointer group"
                onClick={props.onImageUpload}
              >
                <Img src={props.image || "https://ui-avatars.com/api/?name=Admin"} width={64} height={64} className="rounded-full object-cover border-2 border-white/50 w-16 h-16" alt="Avatar" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] text-white font-bold">Ubah</span>
                </div>
              </div>
              <Txt variant="small" color="light">Klik foto untuk mengubah</Txt>
            </div>

            <div className="flex gap-2 mt-2">
              <Btn size="sm" variant="light" onClick={() => props.setEditing && props.setEditing(false)}>Batal</Btn>
              <Btn size="sm" variant="outline" onClick={() => props.setIsPreview && props.setIsPreview(true)}>Lihat Pratinjau (Preview)</Btn>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between w-full items-center">
            <MilestoneCard 
              image={image} 
              title={props.isPreview ? (props.name || title) : title} 
              range={subtitle}
            />
            <div className="flex gap-2 mt-4 md:mt-0">
              {props.isPreview ? (
                <>
                  <Btn size="sm" variant="light" onClick={() => props.setIsPreview && props.setIsPreview(false)}>Kembali Edit</Btn>
                  <Btn size="sm" variant="outline" onClick={props.onSave}>Simpan Profil</Btn>
                </>
              ) : (
                <Btn size="sm" variant="light" onClick={() => props.setEditing && props.setEditing(true)}>Edit Profil</Btn>
              )}
            </div>
          </div>
        )}
      </Container>

      {/* Admin Quick Stats Card */}
      <Container className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        
        <Container className="flex-col bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <Icn icon={Wallet} size={16} color="light"  />
          <Txt variant="h5" weight="bold" color="light">{totalDonasi}</Txt>
          <Txt variant="caption" weight="bold" color="light" className="opacity-60 uppercase tracking-wider">
            Total Donasi
          </Txt>
        </Container>
        <Container className="flex-col bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
          <Icn icon={LayoutDashboard} size={16} color="light" />
          <Txt variant="h5" weight="bold" color="light">{programAktif}</Txt>
          <Txt variant="caption" weight="bold" color="light" className="opacity-60 uppercase tracking-wider">
            Program Aktif
          </Txt>
        </Container>
        <Container className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center justify-between">
          
          <Container className="flex items-center gap-3">
            <Container className="bg-warning/20 p-2 rounded-xl">
              <Icn icon={Clock} size={16} color="light" />
            </Container>
            <Container>
              <Txt variant="small" weight="bold" color="light">{menungguVerifikasi}</Txt>
              <Txt variant="caption" color="light" className="opacity-60">Verifikasi Donasi</Txt>
            </Container>
          </Container>
          <Btn
            variant="light"
            size="sm"
            shape="rounded"
            className="px-4 py-2 bg-white text-red-primary text-[10px] font-black uppercase tracking-wider"
          >
            Proses
          </Btn>
        </Container>
      </Container>
    </Container>
  );
};
