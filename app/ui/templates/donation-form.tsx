"use client";

import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Input } from "@/app/ui/atoms/input";
import { Btn } from "@/app/ui/atoms/button";
import { Img } from "@/app/ui/atoms/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiClient } from "@/app/lib/api/client";
import { FormActionTemplate } from "@/app/ui/templates/form-action";
import { useToast } from "@/app/ui/providers/toast-provider";
import { useRouter } from "next/navigation";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useEffect } from "react";

const donasiSchema = z.object({
  nama_donatur: z.string().min(3, "Nama minimal 3 karakter"),
  no_whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  gross_amount: z.number({ message: "Nominal harus angka" }).min(10000, "Minimal donasi Rp 10.000"),
  payment_type: z.string().min(1, "Metode pembayaran harus dipilih"),
});

type DonasiFormValues = z.infer<typeof donasiSchema>;

export interface DonationFormTemplateProps {
  /** The program/activity ID being donated to */
  activityId: string;
}

/**
 * DonationFormTemplate
 *
 * Shared donation checkout form used by both the public (/donasi/[id])
 * and donatur (/home/aktivitas/program/[id]/donasi) routes.
 */
export function DonationFormTemplate({ activityId }: DonationFormTemplateProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DonasiFormValues>({
    resolver: zodResolver(donasiSchema),
  });

  const { addToast } = useToast();
  const router = useRouter();

  // Fetch program data for display
  const program = useYamutiStore((s) => s.getProgramById(activityId));
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);
  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const onSubmit = async (data: DonasiFormValues) => {
    try {
      const payload = {
        ...data,
        activity_id: activityId,
      };
      const response = await apiClient.post("/donasi", payload);
      const snapToken = response.data?.snap_token || "Simulasi-Token-123";

      addToast({
        variant: "success",
        message: "Donasi berhasil dibuat!",
      });

      const queryParams = new URLSearchParams({
        name: data.nama_donatur,
        amount: data.gross_amount.toString(),
        method: data.payment_type,
        token: snapToken,
      });
      router.push(`/donasi/success?${queryParams.toString()}`);
    } catch (error: any) {
      console.error("Gagal mengirim donasi", error);
      const status = error?.response?.status;
      const validationErrors = error?.response?.data?.errors;
      if (status === 422 && validationErrors && typeof validationErrors === "object") {
        const messages = Object.values(validationErrors).flat().join(", ");
        addToast({ variant: "error", message: `Validasi gagal: ${messages}` });
      } else {
        addToast({
          variant: "error",
          message: error?.response?.data?.message || "Gagal mengirim donasi, silakan coba lagi.",
        });
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <LandingHeader />

      <div className="flex-grow max-w-4xl w-full mx-auto pt-24 px-4 pb-24">
        <Container className="text-center mb-10">
          <Txt variant="h2" weight="bold" className="text-red-primary mb-4">
            Mulai Berdonasi
          </Txt>
          <Txt variant="body" className="text-gray-600 max-w-2xl mx-auto">
            Setiap rupiah yang Anda berikan akan sangat berarti bagi anak-anak asuh kami.
          </Txt>
        </Container>

        <FormActionTemplate
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-10 shadow-2xl shadow-black/10 border border-white/20 rounded-2xl bg-white relative z-20"
        >
          {/* Program Info */}
          <div className="px-4 py-4 bg-gray-50 rounded-2xl mb-6 border border-gray-100">
            <div className='flex items-center gap-4'>
              <Img
                src={program?.image || "/images/no-image.png"}
                alt={program?.title || "Program Donasi"}
                w={60}
                h={60}
                rounded="lg"
                className="object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 truncate">{program?.title || "Program Donasi"}</h1>
                {program?.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{program.description}</p>
                )}
              </div>
            </div>
          </div>
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan Nama Anda"
            {...register("nama_donatur")}
            error={errors.nama_donatur?.message}
          />

          <Input
            label="No. WhatsApp"
            type="tel"
            placeholder="081234567890"
            {...register("no_whatsapp")}
            error={errors.no_whatsapp?.message}
          />

          <Input
            label="Nominal Donasi (Rp)"
            type="number"
            placeholder="Contoh: 50000"
            {...register("gross_amount", { valueAsNumber: true })}
            error={errors.gross_amount?.message}
          />

          <div className="flex flex-col gap-2">
            <Txt variant="small" weight="bold" className="text-gray-700">Metode Pembayaran</Txt>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all text-sm"
              {...register("payment_type")}
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="bank_transfer">Transfer Bank (VA)</option>
              <option value="gopay">GoPay</option>
              <option value="qris">QRIS</option>
            </select>
            {errors.payment_type && (
              <span className="text-red-500 text-xs mt-1">{errors.payment_type.message}</span>
            )}
          </div>

          <Btn
            type="submit"
            variant="red"
            size="lg"
            className="mt-4 py-4 w-full text-lg shadow-xl shadow-red-primary/20"
            isLoading={isSubmitting}
          >
            Donasi Sekarang
          </Btn>
        </FormActionTemplate>
      </div>

      <LandingFooter />
    </main>
  );
}
