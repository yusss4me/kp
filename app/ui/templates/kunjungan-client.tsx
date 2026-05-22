"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft } from "lucide-react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Input } from "../atoms/input";
import { Btn } from "../atoms/button";

const visitSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  institution: z.string().optional(),
  purpose: z.string().min(5, "Keperluan minimal 5 karakter"),
  visitDate: z.string().min(1, "Tanggal harus dipilih"),
  visitTime: z.string().min(1, "Waktu harus dipilih"),
  participantCount: z.number({ message: "Jumlah peserta harus angka" }).min(1, "Minimal 1 peserta"),
});

type VisitFormValues = z.infer<typeof visitSchema>;

/**
 * KunjunganClientTemplate
 * 
 * Template halaman kunjungan untuk role Klien/Donatur.
 * Mengikuti gaya visual halaman donasi dan beranda klien.
 */
export interface KunjunganClientTemplateProps {
  className?: string;
}

/**
 * KunjunganClientTemplate
 * 
 * Template halaman pengajuan kunjungan untuk role Klien/Donatur.
 * Menyediakan formulir lengkap untuk mendata rencana kunjungan silaturahmi 
 * ke yayasan dengan validasi skema Zod.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {KunjunganClientTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen KunjunganClientTemplate
 */
export const KunjunganClientTemplate = ({}: KunjunganClientTemplateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
  });

  const onSubmit = async (data: VisitFormValues) => {
    console.log("Visit request data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Pengajuan kunjungan berhasil dikirim! (Simulasi)");
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header Area */}
      <div className="bg-red-primary p-8 rounded-b-[40px] space-y-8 shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-20 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />

        <div className="relative z-10 flex justify-between items-center text-white">
          <Link href="/home" className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
            <ChevronLeft size={20} />
          </Link>
          <h2 className="font-bold text-lg">Program Kunjungan</h2>
          <div className="w-10" /> {/* Spacer untuk keseimbangan */}
        </div>
        
        <div className="relative z-10 text-center space-y-1 pb-6">
          <Txt variant="h4" color="white" weight="bold">Ajukan Kunjungan</Txt>
          <Txt variant="small" className="text-white/70">Jalin silaturahmi lebih dekat dengan kami</Txt>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="px-6 -mt-12 relative z-20">
        <Container
          className="p-6 md:p-10 shadow-2xl shadow-black/10 border border-white/20 rounded-2xl bg-white"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <Input 
                  label="Nama Lengkap" 
                  placeholder="Masukkan Nama Lengkap Anda" 
                  className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                  {...register("fullName")}
                  error={errors.fullName?.message}
                />
                <Input 
                  label="Instansi / Perusahaan" 
                  placeholder="Nama Instansi (Kosongkan jika pribadi)" 
                  className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                  {...register("institution")}
                  error={errors.institution?.message}
                />
                <Input 
                  label="Keperluan Kunjungan" 
                  placeholder="Contoh: Penyerahan Donasi, Silaturahmi, dll" 
                  className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                  {...register("purpose")}
                  error={errors.purpose?.message}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Tanggal Kunjungan" 
                    type="date" 
                    className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                    {...register("visitDate")}
                    error={errors.visitDate?.message}
                  />
                  <Input 
                    label="Waktu" 
                    type="time" 
                    className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                    {...register("visitTime")}
                    error={errors.visitTime?.message}
                  />
                </div>
                
                <Input 
                  label="Jumlah Peserta" 
                  type="number" 
                  placeholder="Contoh: 3" 
                  className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                  {...register("participantCount", { valueAsNumber: true })}
                  error={errors.participantCount?.message}
                />
              </div>

              <Btn
                type="submit"
                variant="red"
                size="lg"
                shape="rounded"
                isLoading={isSubmitting}
                className="w-full py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
              >
                Kirim Pengajuan
              </Btn>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Txt variant="caption" className="text-lightdark-neutral">
                Pengajuan Anda akan diproses dalam waktu maksimal 1x24 jam. Kami akan menghubungi Anda melalui nomor terdaftar.
              </Txt>
            </div>
          </form>
        </Container>
      </div>

      {/* Info Section */}
      <div className="px-8 mt-4">
        <Txt variant="body" weight="bold" className="mb-2">Informasi Penting</Txt>
        <ul className="list-disc list-inside text-sm text-lightdark-neutral space-y-1">
          <li>Kunjungan dapat dilakukan setiap hari kerja (08:00 - 16:00).</li>
          <li>Mohon membawa kartu identitas yang berlaku.</li>
          <li>Konfirmasi akan dikirimkan melalui WhatsApp/Email.</li>
        </ul>
      </div>
    </div>
  );
};
