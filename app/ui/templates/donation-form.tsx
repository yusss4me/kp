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
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";

const donasiSchema = z.object({
  nama_donatur: z.string().min(3, "Nama minimal 3 karakter").optional().or(z.literal("")),
  no_whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid").optional().or(z.literal("")),
  gross_amount: z.number({ message: "Nominal harus angka" }).min(10000, "Minimal donasi Rp 10.000"),
});

type DonasiFormValues = z.infer<typeof donasiSchema>;

export interface DonationFormTemplateProps {
  /** The program/activity ID being donated to */
  activityId: string;
  isUser?: boolean;
}

/**
 * DonationFormTemplate
 *
 * Shared donation checkout form used by both the public (/donasi/[id])
 * and donatur (/home/aktivitas/program/[id]/donasi) routes.
 */
export function DonationFormTemplate({ activityId, isUser }: DonationFormTemplateProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DonasiFormValues>({
    resolver: zodResolver(donasiSchema),
  });

  const { addToast } = useToast();
  const router = useRouter();

  // Fetch program data for display
  const program = useYamutiStore((s) => s.getProgramById(activityId));
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);
  const user = useAuthStore((s) => s.user);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<DonasiFormValues | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const onFormSubmit = (data: DonasiFormValues) => {
    setPendingData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingData) return;
    setIsConfirmOpen(false);
    const data = pendingData;
    try {
      const payload: any = {
        ...data,
        kampanye_id: activityId,
      };
      
      if (isUser && user) {
        payload.nama_donatur = user.name || data.nama_donatur;
        payload.no_whatsapp = user.phone || data.no_whatsapp;
      }

      const response = await apiClient.post("/donasi", payload);
      const snapToken = response.data?.data?.snap_token || response.data?.snap_token;

      if (!snapToken) {
        throw new Error("Gagal memuat pembayaran. Token tidak ditemukan dari server.");
      }

      // Memanggil Midtrans Snap Pop-up
      window.snap.pay(snapToken, {
        onSuccess: function(result: any) {
          addToast({
            variant: "success",
            message: "Pembayaran donasi berhasil!",
          });
          const queryParams = new URLSearchParams({
            name: payload.nama_donatur || "",
            amount: payload.gross_amount.toString(),
          });
          if (isUser) {
            router.push(`/user/aktivitas/program/${activityId}/donasi/success?${queryParams.toString()}`);
          } else {
            router.push(`/donasi/success?${queryParams.toString()}`);
          }
        },
        onPending: function(result: any) {
          addToast({
            variant: "success",
            message: "Menunggu pembayaran diselesaikan.",
          });
          const queryParams = new URLSearchParams({
            name: payload.nama_donatur || "",
            amount: payload.gross_amount.toString(),
          });
          if (isUser) {
            router.push(`/user/aktivitas/program/${activityId}/donasi/success?${queryParams.toString()}`);
          } else {
            router.push(`/donasi/success?${queryParams.toString()}`);
          }
        },
        onError: function(result: any) {
          addToast({
            variant: "error",
            message: "Pembayaran gagal. Silakan coba lagi.",
          });
        },
        onClose: function() {
          addToast({
            variant: "error",
            message: "Anda menutup pop-up sebelum menyelesaikan pembayaran.",
          });
        }
      });
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

  const formContent = (
    <>
    <FormActionTemplate
      onSubmit={handleSubmit(onFormSubmit)}
      className={isUser ? "" : "p-6 md:p-10 shadow-2xl shadow-black/10 border border-white/20 rounded-2xl bg-white relative z-20"}
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
      
      {!isUser && (
        <>
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
        </>
      )}

      <Input
        label="Nominal Donasi (Rp)"
        type="number"
        placeholder="Contoh: 50000"
        {...register("gross_amount", { valueAsNumber: true })}
        error={errors.gross_amount?.message}
      />



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
    <ConfirmationModal
      isOpen={isConfirmOpen}
      title="Konfirmasi Donasi"
      message="Apakah Anda yakin ingin melanjutkan pembayaran donasi dengan nominal ini?"
      confirmText="Ya, Lanjutkan"
      cancelText="Batal"
      variant="info"
      onConfirm={handleConfirm}
      onCancel={() => setIsConfirmOpen(false)}
    />
    </>
  );

  if (isUser) {
    return formContent;
  }

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

        {formContent}
      </div>

      <LandingFooter />
    </main>
  );
}
