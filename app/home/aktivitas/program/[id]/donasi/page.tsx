"use client";

import { useState } from "react";
import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Input } from "@/app/ui/atoms/input";
import { Btn } from "@/app/ui/atoms/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiClient } from "@/app/lib/api/client";
import { FormActionTemplate } from "@/app/ui/templates/form-action";
import { useToast } from "@/app/ui/providers/toast-provider";
import { useRouter } from "next/navigation";

const donasiSchema = z.object({
  nama_donatur: z.string().min(3, "Nama minimal 3 karakter"),
  no_whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  gross_amount: z.number({ message: "Nominal harus angka" }).min(10000, "Minimal donasi Rp 10.000"),
  payment_type: z.string().min(1, "Metode pembayaran harus dipilih"),
});

type DonasiFormValues = z.infer<typeof donasiSchema>;

export default function Page({ params }: { params: { id: string } }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DonasiFormValues>({
    resolver: zodResolver(donasiSchema),
  });

  const { addToast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: DonasiFormValues) => {
    try {
      // In case backend expects the id of the program/activity being donated to
      const payload = {
        ...data,
        activity_id: params.id,
      };
      // For now we send payload, if backend ignores activity_id it's fine,
      // but the crucial part was payment_type missing
      const response = await apiClient.post("/donasi", payload);
      const snapToken = response.data?.snap_token || "Simulasi-Token-123";
      
      addToast({
        variant: "success",
        message: "Donasi berhasil dibuat!",
      });

      // Redirect to success page with query params
      const queryParams = new URLSearchParams({
        name: data.nama_donatur,
        amount: data.gross_amount.toString(),
        method: data.payment_type,
        token: snapToken,
      });
      router.push(`/donasi/${queryParams.toString() ? `success?${queryParams.toString()}` : "success"}`);
    } catch (error) {
      console.error("Gagal mengirim donasi", error);
      addToast({
        variant: "error",
        message: "Gagal mengirim donasi, silakan coba lagi.",
      });
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
        // title={data.title}
        // description={data.description}
        // src={data.src}
        onSubmit={handleSubmit(onSubmit)}
        // fields={[
        //     {
        //         name: "nama_donatur",
        //         label: "Nama Lengkap",
        //         type: "text",
        //         placeholder: "Masukkan Nama Anda",
        //         Props:{...register("nama_donatur")}
                
        //     },
        //     {
        //         name: "no_whatsapp",
        //         label: "No. WhatsApp",
        //         type: "text",
        //         placeholder: "081234567890",
        //         Props:{...register("no_whatsapp")}
        //     },
        //     {
        //         name: "gross_amount",
        //         label: "Nominal Donasi (Rp)",
        //         type: "number",
        //         placeholder: "Contoh: 50000",
        //         Props:{...register("gross_amount")}
        //     },
        //     {
        //         name: "payment_type",
        //         label: "Metode Pembayaran",
        //         type: "select",
        //         placeholder: "Pilih Metode Pembayaran",
        //         options: [
        //             { value: "1", label: "Transfer Bank (VA)" },
        //             { value: "2", label: "GoPay" },
        //             { value: "3", label: "QRIS" },
        //             { value: "4", label: "Saldo Dompet Kebaikan" },
        //         ],
        //         error: errors.payment_type?.message
        //         Props:{...register("payment_type")}
        //     }
        // ]} 
        className="p-6 md:p-10 shadow-2xl shadow-black/10 border border-white/20 rounded-2xl bg-white relative z-20">
        
          
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
