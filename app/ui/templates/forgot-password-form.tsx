"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Input } from "@/app/ui/atoms/input";
import { Btn } from "@/app/ui/atoms/button";
import { useAuthStore } from "@/app/lib/stores/auth-store";

const forgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

/**
 * ForgotPasswordForm Template
 * 
 * Sesuai dengan hierarki Atomic Design, komponen ini menggabungkan berbagai atom 
 * untuk membentuk struktur halaman Lupa Kata Sandi.
 * 
 * Flow:
 * 1. User memasukkan email → panggil API forgot-password
 * 2. Tampilkan pesan sukses dengan instruksi untuk cek email
 */
export interface ForgotPasswordFormProps {
  className?: string;
}

/**
 * ForgotPasswordForm
 * 
 * Template untuk halaman lupa kata sandi.
 * Menyediakan form input email untuk pengiriman instruksi pengaturan 
 * ulang kata sandi dengan validasi skema Zod dan integrasi API.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ForgotPasswordFormProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ForgotPasswordForm
 */
export default function ForgotPasswordForm({}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setApiError("");
    const store = useAuthStore.getState();
    const { success, message, error } = await store.forgotPasswordApi(data.email);
    
    if (success) {
      setSubmittedEmail(data.email);
      setStep("success");
    } else {
      setApiError(error || "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  // Success step: show instructions
  if (step === "success") {
    return (
      <Container
        className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white"
      >
        <Container className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <Txt
            variant="h2"
            weight="bold"
            align="center"
            font="jakarta"
            className="tracking-tight text-lightdark-tertiary"
          >
            Email Terkirim!
          </Txt>
          <Txt variant="body" className="text-lightdark-neutral text-center">
            Kami telah mengirimkan instruksi untuk mengatur ulang kata sandi ke{" "}
            <span className="font-semibold text-lightdark-tertiary">{submittedEmail}</span>.
            Silakan cek inbox atau folder spam Anda.
          </Txt>
        </Container>

        <Container className="flex flex-col gap-3 mt-2">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <Mail size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <Txt variant="small" className="font-semibold text-blue-700">
                Tips:
              </Txt>
              <ul className="text-sm text-blue-600 list-disc list-inside space-y-1">
                <li>Klik tautan di email untuk mengatur ulang kata sandi</li>
                <li>Tautan berlaku selama 60 menit</li>
                <li>Jika tidak menemukan email, cek folder spam</li>
              </ul>
            </div>
          </div>

          <Link href="/auth">
            <Btn
              variant="transparent"
              textColor="dark"
              border="border"
              borderColor="dark"
              size="lg"
              shape="rounded"
              className="w-full mt-2 py-4 font-bold text-lg"
            >
              <ArrowLeft size={18} />
              Kembali ke Login
            </Btn>
          </Link>
        </Container>
      </Container>
    );
  }

  // Form step: enter email
  return (
    <Container
      className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white"
    >
      {/* Header Bagian */}
      <Container className="flex flex-col items-center gap-2">
        <Txt
          variant="h2"
          weight="bold"
          align="center"
          font="jakarta"
          className="tracking-tight text-lightdark-tertiary"
        >
          Lupa Kata Sandi?
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral text-center">
          Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
        </Txt>
      </Container>

      {/* Form Bagian */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {apiError && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {apiError}
          </div>
        )}
        <Input
          label="Alamat Email"
          placeholder="Masukkan Email Terdaftar"
          type="email"
          className="transition-all focus:ring-2 focus:ring-red-primary/10"
          {...register("email")}
          error={errors.email?.message}
        />

        <Btn
          type="submit"
          variant="red"
          size="lg"
          shape="rounded"
          isLoading={isSubmitting}
          className="w-full mt-2 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Instruksi"}
        </Btn>
      </form>

      {/* Footer Bagian */}
      <Container className="text-center border-t border-lightdark-secondary pt-6">
        <Txt variant="body" className="text-lightdark-neutral">
          Ingat kata sandi Anda?{" "}
          <Link
            href="/auth"
            className="text-red-primary font-bold hover:text-red-tertiary transition-colors hover:underline"
          >
            Masuk Kembali
          </Link>
        </Txt>
      </Container>
    </Container>
  );
}
