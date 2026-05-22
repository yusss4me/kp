"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Input } from "../atoms/input";
import { Btn } from "../atoms/button";

const forgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

/**
 * ForgotPasswordForm Template
 * 
 * Sesuai dengan hierarki Atomic Design, komponen ini menggabungkan berbagai atom 
 * untuk membentuk struktur halaman Lupa Kata Sandi.
 */
export interface ForgotPasswordFormProps {
  className?: string;
}

/**
 * ForgotPasswordForm
 * 
 * Template untuk halaman lupa kata sandi.
 * Menyediakan form input email untuk pengiriman instruksi pengaturan 
 * ulang kata sandi dengan validasi skema Zod.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ForgotPasswordFormProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ForgotPasswordForm
 */
export default function ForgotPasswordForm({}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    console.log("Forgot password data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Instruksi telah dikirim ke email Anda (Simulasi)");
  };

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
          Kirim Instruksi
        </Btn>
      </form>

      {/* Footer Bagian */}
      <Container className="text-center border-t border-lightdark-secondary pt-6">
        <Txt variant="body" className="text-lightdark-neutral">
          Ingat kata sandi Anda?{" "}
          <Link
            href="/auth/masuk"
            className="text-red-primary font-bold hover:text-red-tertiary transition-colors hover:underline"
          >
            Masuk Kembali
          </Link>
        </Txt>
      </Container>
    </Container>
  );
}
