"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Input } from "../atoms/input";
import { Btn } from "../atoms/button";
import { createKunjungan } from "@/app/lib/api/services/kunjungan";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { InteractiveCalendar } from "./interactive-calendar";

const visitSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter").optional().or(z.literal("")),
  phone: z.string().min(10, "Nomor telepon tidak valid").optional().or(z.literal("")),
  
  purpose: z.string().min(5, "Keperluan minimal 5 karakter"),
  visitDate: z.string().min(1, "Tanggal harus dipilih"),
  visitTime: z.string().regex(/^\d{2}:00$/, "Waktu kunjungan hanya diperbolehkan tepat per jam (misal: 08:00, 10:00)").min(1, "Waktu harus dipilih"),
  
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
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
  });

  const visitDate = watch("visitDate");
  const visitTime = watch("visitTime");

  const onSubmit = async (data: VisitFormValues) => {
    try {
      const payload = {
        nama_tamu: isUser && user ? user.name || "Donatur" : data.fullName || "Donatur",
        no_whatsapp: isUser && user ? user.phone || "080000000000" : data.phone || "",
        jumlah_pengunjung: 1,
        maksud: data.purpose,
        slot_waktu: `${data.visitDate}T${data.visitTime}:00Z`,
      };
      // API: POST /kunjungan
      const response = await createKunjungan(payload);
      
      // Redirect to the detail page (which acts as pending initially)
      const visitId = response?.id || response?.data?.id || response?.kunjungan?.id;
      
      if (visitId) {
        if (isUser) {
          router.push(`/user/aktivitas/kunjungan/${visitId}`);
        } else {
          router.push(`/kunjungan/${visitId}`);
        }
      } else if (response) {
        // Fallback if response is successful but no ID is returned
        alert("Pengajuan kunjungan berhasil dikirim! Kami akan menghubungi Anda.");
        if (isUser) {
          router.push("/user/aktivitas/kunjungan");
        } else {
          router.push("/");
        }
      } else {
        throw new Error("Gagal terhubung ke server. Silakan coba lagi nanti.");
      }
    } catch (error: any) {
      console.error("Visit request failed", error);
      // Handle 422 Laravel validation errors
      const status = error?.response?.status;
      const validationErrors = error?.response?.data?.errors;
      if (status === 422 && validationErrors && typeof validationErrors === "object") {
        const messages = Object.values(validationErrors).flat().join(", ");
        alert(`Validasi gagal: ${messages}`);
      } else {
        alert(error?.response?.data?.message || "Gagal mengirim pengajuan, silakan coba lagi.");
      }
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
                {!isUser && (
                  <>
                    <Input 
                      label="Nama Lengkap" 
                      placeholder="Masukkan Nama Lengkap Anda" 
                      className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                      {...register("fullName")}
                      error={errors.fullName?.message}
                    />
                    <Input 
                      label="No. WhatsApp / Telepon" 
                      type="tel"
                      placeholder="081234567890" 
                      className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                      {...register("phone")}
                      error={errors.phone?.message}
                    />
                  </>
                )}
                
                <Input 
                  label="Keperluan Kunjungan" 
                  placeholder="Contoh: Penyerahan Donasi, Silaturahmi, dll" 
                  className="focus:ring-2 focus:ring-red-primary/10 transition-all"
                  {...register("purpose")}
                  error={errors.purpose?.message}
                />
                
                <div className="flex flex-col gap-2">
                  <Txt variant="body" weight="bold" className="text-gray-700">Pilih Jadwal Kunjungan</Txt>
                  <InteractiveCalendar 
                    selectedDate={visitDate ? new Date(visitDate) : null}
                    onSelectDate={(date) => {
                      setValue("visitDate", format(date, "yyyy-MM-dd"), { shouldValidate: true });
                    }}
                    selectedTime={visitTime || null}
                    onSelectTime={(time) => {
                      setValue("visitTime", time, { shouldValidate: true });
                    }}
                  />
                  {(errors.visitDate || errors.visitTime) && (
                    <Txt variant="caption" className="text-red-500 mt-1">
                      {errors.visitDate?.message || errors.visitTime?.message}
                    </Txt>
                  )}
                </div>
                
                
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
                Pengajuan Anda akan diproses dalam waktu maksimal 1x24 jam. Kami akan menghubungi Anda melalui nomor yang Anda berikan.
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
