"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Input } from "../atoms/input";
import { Btn } from "../atoms/button";
import { PasswordField } from "../molecules/password-field";

import { apiClient } from "@/app/lib/api/client";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  className?: string;
}

/**
 * LoginForm
 * 
 * Template untuk halaman masuk (login).
 * Menyediakan form input nama pengguna dan kata sandi dengan 
 * validasi keamanan dasar.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {LoginFormProps} props - Properti komponen
 * @returns {JSX.Element} Komponen LoginForm
 */
export default function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { success, error } = await useAuthStore.getState().loginApi(data.email, data.password);
    if (success) {
      const role = useAuthStore.getState().user?.role || "admin";
      if (role === "owner") {
        router.push("/owner");
      } else {
        router.push("/admin");
      }
    } else {
      setError("root", { message: error || "Email atau password salah" });
    }
  };

  return (
    <Container
      className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5 rounded-2xl bg-white"
    >
      <Container className="flex flex-col items-center gap-2">
        <Txt
          variant="h2"
          weight="bold"
          align="center"
          font="jakarta"
          className="tracking-tight text-lightdark-tertiary"
        >
          Selamat Datang Kembali
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral text-center">
          Silakan masuk ke akun Anda untuk melanjutkan
        </Txt>
      </Container>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {errors.root && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {errors.root.message}
          </div>
        )}
        <Input
          label="Alamat Email"
          type="email"
          placeholder="admin@yamuti.org"
          className="transition-all focus:ring-2 focus:ring-red-primary/10"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordField 
          label="Kata Sandi" 
          placeholder="Masukkan Kata Sandi" 
          {...register("password")}
          error={errors.password?.message}
        />

        <Container className="flex justify-end -mt-2">
          <Link href="/auth/lupa-password">
            <Txt
              variant="small"
              className="text-red-primary hover:text-red-tertiary transition-colors cursor-pointer font-semibold"
            >
              Lupa Kata Sandi?
            </Txt>
          </Link>
        </Container>
        
        <Btn
          type="submit"
          variant="red"
          size="lg"
          shape="rounded"
          isLoading={isSubmitting}
          className="w-full mt-2 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
        >
          Masuk Sekarang
        </Btn>
      </form>

      <Container className="text-center border-t border-lightdark-secondary pt-6">
        <Txt variant="body" className="text-lightdark-neutral">
          Belum punya akun?{" "}
          <Link
            href="/auth/daftar"
            className="text-red-primary font-bold hover:text-red-tertiary transition-colors hover:underline"
          >
            Daftar Sekarang
          </Link>
        </Txt>
      </Container>
    </Container>
  );
}
