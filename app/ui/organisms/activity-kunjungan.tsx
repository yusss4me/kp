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
import { createKunjungan } from "@/app/lib/api/services/kunjungan";

const visitSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  institution: z.string().optional(),
  purpose: z.string().min(5, "Keperluan minimal 5 karakter"),
  visitDate: z.string().min(1, "Tanggal harus dipilih"),
  visitTime: z.string().regex(/^\d{2}:00$/, "Waktu kunjungan hanya diperbolehkan tepat per jam (misal: 08:00, 10:00)").min(1, "Waktu harus dipilih"),
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
  isUser: boolean;
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
export const ActivityKunjungan = ({isUser}: KunjunganClientTemplateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
  });

  const onSubmit = async (data: VisitFormValues) => {
    try {
      const payload = {
        nama_pengunjung: data.fullName,
        nomor_telepon: data.phone,
        tujuan_kunjungan: data.purpose,
        slot_waktu: `${data.visitDate}T${data.visitTime}:00Z`,
      };
      // API: POST /kunjungan
      await createKunjungan(payload);
      alert("Pengajuan kunjungan berhasil dikirim!");
    } catch (error) {
      console.error("Visit request failed", error);
      alert("Gagal mengirim pengajuan, silakan coba lagi.");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header Area */}
      

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
                  disabled={isUser}
                />
                <Input 
                  label="No. WhatsApp / Telepon" 
                  type="tel"
                  placeholder="081234567890" 
                  className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                  {...register("phone")}
                  error={errors.phone?.message}
                  disabled={isUser}
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
                    step="3600"
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
