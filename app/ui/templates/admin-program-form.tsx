"use client";

import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { DashboardHeader } from '@/app/ui/organisms/DashboardHeader';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Input } from '@/app/ui/atoms/input';
import { Textarea } from '@/app/ui/atoms/textarea';
import { Container } from '@/app/ui/atoms/container';
import { ChevronLeft, Save, Image as ImageIcon, Target, Info, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface AdminProgramFormValues {
  title: string;
  category: string;
  location: string;
  description: string;
  targetAmount: number;
  deadline: string;
}

interface AdminProgramFormTemplateProps {
  title: string;
  subtitle: string;
  isEdit?: boolean;
  form: UseFormReturn<AdminProgramFormValues>;
  onSubmit: (data: AdminProgramFormValues) => void;
  programImage?: string;
  onDelete?: () => void;
  backUrl: string;
}

export function AdminProgramFormTemplate({
  title,
  subtitle,
  isEdit,
  form,
  onSubmit,
  programImage,
  onDelete,
  backUrl,
}: AdminProgramFormTemplateProps) {
  const { register, formState: { errors, isSubmitting } } = form;

  return (
    <DashboardHeader headerTitle={isEdit ? `Edit: ${title}` : "Program Baru"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 pb-20">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href={backUrl} className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group">
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-red-50 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <Txt weight="bold">Kembali ke Daftar</Txt>
          </Link>
          
          {isEdit && onDelete && (
            <Btn type="button" variant="light" size="sm" onClick={onDelete} className="text-red-primary bg-red-50 hover:bg-red-100 border-none gap-2 px-4">
              <Trash2 size={18} />
              Hapus Program
            </Btn>
          )}
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <Txt variant="h2" weight="bold">{title}</Txt>
          <Txt className="text-gray-500">{subtitle}</Txt>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Container radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Info size={20} />
                  </div>
                  <Txt weight="bold" className="text-lg">Informasi Dasar</Txt>
                </div>

                <Input
                  label="Judul Program"
                  placeholder={!isEdit ? "Contoh: Beasiswa Pendidikan Anak Yatim" : undefined}
                  className="bg-gray-50/50"
                  {...register("title")}
                  error={errors.title?.message as string}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Kategori"
                    placeholder={!isEdit ? "Pilih Kategori" : undefined}
                    className="bg-gray-50/50"
                    {...register("category")}
                    error={errors.category?.message as string}
                  />
                  <Input
                    label="Lokasi"
                    placeholder={!isEdit ? "Contoh: Tasikmalaya, Jawa Barat" : undefined}
                    className="bg-gray-50/50"
                    {...register("location")}
                    error={errors.location?.message as string}
                  />
                </div>

                <Textarea
                  label="Deskripsi Program"
                  placeholder={!isEdit ? "Jelaskan secara detail mengenai program ini..." : undefined}
                  className="bg-gray-50/50"
                  {...register("description")}
                  error={errors.description?.message as string}
                />
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                  <div className="p-2.5 bg-red-50 text-red-primary rounded-xl">
                    <Target size={20} />
                  </div>
                  <Txt weight="bold" className="text-lg">Target & Durasi</Txt>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Target Dana (Rp)"
                    placeholder="0"
                    type="number"
                    className="bg-gray-50/50"
                    {...register("targetAmount", { valueAsNumber: true })}
                    error={errors.targetAmount?.message as string}
                  />
                  <Input
                    label="Batas Waktu"
                    type="date"
                    className="bg-gray-50/50"
                    {...register("deadline")}
                    error={errors.deadline?.message as string}
                  />
                </div>
              </div>
            </Container>
          </div>

          {/* Sidebar Area (Media & Preview) */}
          <div className="space-y-6">
            <Container  radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                  <ImageIcon size={20} />
                </div>
                <Txt weight="bold">Media Program</Txt>
              </div>

              {isEdit && programImage ? (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden group border-2 border-transparent hover:border-red-primary/30 transition-all cursor-pointer">
                  <Image src={programImage} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 bg-white rounded-full shadow-lg">
                      <ImageIcon className="text-red-primary" size={24} />
                    </div>
                    <Txt variant="caption" weight="bold" className="text-white mt-3">Ganti Foto</Txt>
                  </div>
                </div>
              ) : (
                <div className="aspect-video w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 group hover:border-red-primary/30 hover:bg-red-50/10 transition-all cursor-pointer">
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-gray-400 group-hover:text-red-primary" size={24} />
                  </div>
                  <Txt variant="caption" weight="bold" className="text-gray-400 group-hover:text-red-primary">Klik untuk Unggah Foto</Txt>
                </div>
              )}

              <Txt variant="caption" className="text-gray-400 text-center block">
                {isEdit ? "Klik pada gambar untuk mengganti media." : "Rekomendasi ukuran: 1200 x 675 px (16:9)"}
              </Txt>
            </Container>

            <Container variant="red" radius="2xl" className="p-8 shadow-lg shadow-red-primary/20 space-y-4">
              <Txt weight="bold" className="text-white">
                {isEdit ? "Perbarui Program" : "Siap untuk Publikasi?"}
              </Txt>
              <Txt variant="caption" className="text-white/80">
                {isEdit 
                  ? "Pastikan semua data sudah benar sebelum menyimpan perubahan." 
                  : "Program akan langsung muncul di halaman utama setelah disimpan."}
              </Txt>
              <Btn
                type="submit"
                variant="light"
                isLoading={isSubmitting}
                className="w-full gap-2 mt-2 bg-white text-red-primary border-none hover:bg-red-50"
              >
                <Save size={18} />
                {isEdit ? "Simpan Perubahan" : "Simpan Program"}
              </Btn>
              {!isEdit && (
                <Btn type="button" variant="red" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Pratinjau Halaman
                </Btn>
              )}
            </Container>
          </div>
        </div>
      </form>
    </DashboardHeader>
  );
}
