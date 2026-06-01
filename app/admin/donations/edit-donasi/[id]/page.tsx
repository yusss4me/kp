"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardTemplate } from '@/app/ui/organisms/DashboardHeader';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Input } from '@/app/ui/atoms/input';
import { Textarea } from '@/app/ui/atoms/textarea';
import { Container } from '@/app/ui/atoms/container';
import { ChevronLeft, Save, Image as ImageIcon, Target, Info, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const programSchema = z.object({
  title: z.string().min(10, "Judul minimal 10 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  location: z.string().min(1, "Lokasi harus diisi"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  targetAmount: z.number({ message: "Target dana harus angka" }).min(100000, "Minimal target Rp 100.000"),
  deadline: z.string().min(1, "Batas waktu harus diisi"),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function EditDonasiPage() {
  const params = useParams();
  const id = params.id;

  // Mock existing data
  const programData = {
    title: 'Pembangunan Asrama Baru',
    category: 'Pembangunan',
    location: 'Tasikmalaya',
    targetAmount: 50000000,
    deadline: '2026-12-31',
    description: 'Kami berencana membangun asrama baru untuk menampung lebih banyak anak yatim. Program ini sangat krusial bagi kenyamanan mereka. Dana yang terkumpul akan digunakan sepenuhnya untuk material bangunan dan upah pekerja.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: programData
  });

  const onSubmit = async (data: ProgramFormValues) => {
    console.log("Updated program data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Perubahan berhasil disimpan (Simulasi)");
  };

  return (
    <DashboardTemplate headerTitle={`Edit: ${programData.title}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 pb-20">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/admin/donations" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group">
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-red-50 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <Txt weight="bold">Kembali ke Daftar</Txt>
          </Link>

          <Btn type="button" variant="light" size="sm" className="text-red-primary bg-red-50 hover:bg-red-100 border-none gap-2 px-4">
            <Trash2 size={18} />
            Hapus Program
          </Btn>
        </div>

        {/* Header Title */}
        <div className="space-y-1">
          <Txt variant="h2" weight="bold">Edit Program Donasi</Txt>
          <Txt className="text-gray-500">ID Program: <span className="font-mono text-gray-900 bg-gray-100 px-2 py-0.5 rounded-lg">{id}</span></Txt>
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
                  className="bg-gray-50/50"
                  {...register("title")}
                  error={errors.title?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Kategori"
                    className="bg-gray-50/50"
                    {...register("category")}
                    error={errors.category?.message}
                  />
                  <Input
                    label="Lokasi"
                    className="bg-gray-50/50"
                    {...register("location")}
                    error={errors.location?.message}
                  />
                </div>

                <Textarea
                  label="Deskripsi Program"
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

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden group border-2 border-transparent hover:border-red-primary/30 transition-all cursor-pointer">
                <img src={programData.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 bg-white rounded-full shadow-lg">
                    <ImageIcon className="text-red-primary" size={24} />
                  </div>
                  <Txt variant="caption" weight="bold" className="text-white mt-3">Ganti Foto</Txt>
                </div>
              </div>

              <Txt variant="caption" className="text-gray-400 text-center block">Klik pada gambar untuk mengganti media.</Txt>
            </Container>

            <Container variant="red" radius="2xl" className="p-8 shadow-lg shadow-red-primary/20 space-y-4">
              <Txt weight="bold" className="text-white">Perbarui Program</Txt>
              <Txt variant="caption" className="text-white/80">Pastikan semua data sudah benar sebelum menyimpan perubahan.</Txt>
              <Btn
                type="submit"
                variant="light"
                isLoading={isSubmitting}
                className="w-full gap-2 mt-2 bg-white text-red-primary border-none hover:bg-red-50"
              >
                <Save size={18} />
                Simpan Perubahan
              </Btn>
            </Container>
          </div>
        </div>
      </form>
    </DashboardTemplate>
  );
}
