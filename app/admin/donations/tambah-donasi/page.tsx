"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Input } from '@/app/ui/atoms/input';
import { Textarea } from '@/app/ui/atoms/textarea';
import { Container } from '@/app/ui/atoms/container';
import { ChevronLeft, Save, Image as ImageIcon, Target, Calendar, Info } from 'lucide-react';
import Link from 'next/link';

const programSchema = z.object({
  title: z.string().min(10, "Judul minimal 10 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  location: z.string().min(1, "Lokasi harus diisi"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  targetAmount: z.number({ message: "Target dana harus angka" }).min(100000, "Minimal target Rp 100.000"),
  deadline: z.string().min(1, "Batas waktu harus diisi"),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function TambahDonasiPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
  });

  const onSubmit = async (data: ProgramFormValues) => {
    console.log("New program data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Program berhasil dibuat (Simulasi)");
  };

  return (
    <DashboardTemplate headerTitle="Program Baru">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 pb-20">
        {/* Navigation */}
        <Link href="/admin/donations" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group">
          <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-red-50 transition-colors">
            <ChevronLeft size={20} />
          </div>
          <Txt weight="bold">Kembali ke Daftar</Txt>
        </Link>

        {/* Header Title */}
        <div className="space-y-1">
          <Txt variant="h2" weight="bold">Buat Program Donasi</Txt>
          <Txt className="text-gray-500">Isi detail program di bawah ini untuk memulai penggalangan dana baru.</Txt>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Container variant="white" radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Info size={20} />
                  </div>
                  <Txt weight="bold" className="text-lg">Informasi Dasar</Txt>
                </div>
                
                <Input 
                  label="Judul Program" 
                  placeholder="Contoh: Beasiswa Pendidikan Anak Yatim" 
                  className="bg-gray-50/50"
                  {...register("title")}
                  error={errors.title?.message}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Kategori" 
                    placeholder="Pilih Kategori" 
                    className="bg-gray-50/50"
                    {...register("category")}
                    error={errors.category?.message}
                  />
                  <Input 
                    label="Lokasi" 
                    placeholder="Contoh: Tasikmalaya, Jawa Barat" 
                    className="bg-gray-50/50"
                    {...register("location")}
                    error={errors.location?.message}
                  />
                </div>

                <Textarea
                  label="Deskripsi Program"
                  placeholder="Jelaskan secara detail mengenai program ini..."
                  className="bg-gray-50/50"
                  {...register("description")}
                  error={errors.description?.message}
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
                    error={errors.targetAmount?.message}
                  />
                  <Input 
                    label="Batas Waktu" 
                    type="date"
                    className="bg-gray-50/50"
                    {...register("deadline")}
                    error={errors.deadline?.message}
                  />
                </div>
              </div>
            </Container>
          </div>

          {/* Sidebar Area (Media & Preview) */}
          <div className="space-y-6">
             <Container variant="white" radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                    <ImageIcon size={20} />
                  </div>
                  <Txt weight="bold">Media Program</Txt>
                </div>
                
                <div className="aspect-video w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 group hover:border-red-primary/30 hover:bg-red-50/10 transition-all cursor-pointer">
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-gray-400 group-hover:text-red-primary" size={24} />
                  </div>
                  <Txt variant="caption" weight="bold" className="text-gray-400 group-hover:text-red-primary">Klik untuk Unggah Foto</Txt>
                </div>
                
                <Txt variant="caption" className="text-gray-400 text-center block">Rekomendasi ukuran: 1200 x 675 px (16:9)</Txt>
             </Container>

             <Container variant="red" radius="2xl" className="p-8 shadow-lg shadow-red-primary/20 space-y-4">
                <Txt weight="bold" className="text-white">Siap untuk Publikasi?</Txt>
                <Txt variant="caption" className="text-white/80">Program akan langsung muncul di halaman utama setelah disimpan.</Txt>
                <Btn 
                  type="submit"
                  variant="light" 
                  isLoading={isSubmitting}
                  className="w-full gap-2 mt-2 bg-white text-red-primary border-none hover:bg-red-50"
                >
                   <Save size={18} />
                   Simpan Program
                </Btn>
                <Btn type="button" variant="red" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                   Pratinjau Halaman
                </Btn>
             </Container>
          </div>
        </div>
      </form>
    </DashboardTemplate>
  );
}
