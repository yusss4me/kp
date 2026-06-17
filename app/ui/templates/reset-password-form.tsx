"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { PasswordField } from "@/app/ui/molecules/password-field";
import { useAuthStore } from "@/app/lib/stores/auth-store";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    passwordConfirmation: z.string().min(6, "Konfirmasi kata sandi minimal 6 karakter"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Kata sandi tidak cocok",
    path: ["passwordConfirmation"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

/**
 * ResetPasswordFormContent
 *
 * Inner component that reads token and email from URL search params.
 * Must be wrapped in Suspense when used in a page.
 */
function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [step, setStep] = useState<"form" | "success">("form");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // If no token or email in URL, show error
  if (!token || !email) {
    return (
      <Container className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white">
        <Container className="flex flex-col items-center gap-4">
          <Txt
            variant="h2"
            weight="bold"
            align="center"
            font="jakarta"
            className="tracking-tight text-lightdark-tertiary"
          >
            Tautan Tidak Valid
          </Txt>
          <Txt variant="body" className="text-lightdark-neutral text-center">
            Tautan reset password tidak valid atau telah kedaluwarsa. Silakan minta tautan baru.
          </Txt>
        </Container>
        <Link href="/auth/lupa-password">
          <Btn
            variant="red"
            size="lg"
            shape="rounded"
            className="w-full py-4 font-bold text-lg"
          >
            Minta Tautan Baru
          </Btn>
        </Link>
      </Container>
    );
  }

  const onSubmit = async (data: ResetPasswordValues) => {
    setApiError("");
    const store = useAuthStore.getState();
    const { success, message, error } = await store.resetPasswordApi(
      token,
      email,
      data.password,
      data.passwordConfirmation
    );

    if (success) {
      setStep("success");
    } else {
      setApiError(error || "Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  // Success step
  if (step === "success") {
    return (
      <Container className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white">
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
            Password Berhasil Diubah!
          </Txt>
          <Txt variant="body" className="text-lightdark-neutral text-center">
            Kata sandi Anda telah berhasil diperbarui. Silakan login dengan kata sandi baru Anda.
          </Txt>
        </Container>

        <Link href="/auth">
          <Btn
            variant="red"
            size="lg"
            shape="rounded"
            className="w-full py-4 font-bold text-lg"
          >
            <ArrowLeft size={18} />
            Masuk Sekarang
          </Btn>
        </Link>
      </Container>
    );
  }

  // Form step
  return (
    <Container className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white">
      <Container className="flex flex-col items-center gap-2">
        <Txt
          variant="h2"
          weight="bold"
          align="center"
          font="jakarta"
          className="tracking-tight text-lightdark-tertiary"
        >
          Buat Kata Sandi Baru
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral text-center">
          Masukkan kata sandi baru Anda di bawah ini.
        </Txt>
      </Container>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {apiError && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {apiError}
          </div>
        )}
        <PasswordField
          label="Kata Sandi Baru"
          placeholder="Masukkan kata sandi baru"
          {...register("password")}
          error={errors.password?.message}
        />
        <PasswordField
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi baru"
          {...register("passwordConfirmation")}
          error={errors.passwordConfirmation?.message}
        />

        <Btn
          type="submit"
          variant="red"
          size="lg"
          shape="rounded"
          isLoading={isSubmitting}
          className="w-full mt-2 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
        >
          {isSubmitting ? "Memproses..." : "Reset Kata Sandi"}
        </Btn>
      </form>

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

/**
 * ResetPasswordForm Template
 *
 * Wraps ResetPasswordFormContent in Suspense to handle the
 * useSearchParams() requirement in Next.js App Router.
 */
export default function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <Container className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white">
          <Container className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-red-primary border-t-transparent rounded-full animate-spin" />
            <Txt variant="body" className="text-lightdark-neutral">
              Memuat...
            </Txt>
          </Container>
        </Container>
      }
    >
      <ResetPasswordFormContent />
    </Suspense>
  );
}
