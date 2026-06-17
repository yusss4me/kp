"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/app/ui/atoms/input";
import { Txt } from "@/app/ui/atoms/text";
import { PasswordField } from "@/app/ui/molecules/password-field";
import { Container } from "@/app/ui/atoms/container";
import { Btn } from "@/app/ui/atoms/button";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { routes } from "@/app/lib/constants/routes";

const regisSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  confirmPassword: z.string(),
  no_whatsapp: z.string().min(10, "Nomor WhatsApp minimal 10 karakter"),
  
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok",
  path: ["confirmPassword"],
});

type RegisFormValues = z.infer<typeof regisSchema>;

export interface RegisFormProps {
  className?: string;
}

/**
 * RegisForm
 * 
 * Template untuk halaman pendaftaran akun baru.
 * Menyediakan formulir input data diri lengkap (nama, email, kata sandi) 
 * dengan validasi konfirmasi kata sandi.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {RegisFormProps} props - Properti komponen
 * @returns {JSX.Element} Komponen RegisForm
 */
export default function RegisForm({}: RegisFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisFormValues>({
    resolver: zodResolver(regisSchema),
  });

  const onSubmit = async (data: RegisFormValues) => {
    const { success, error } = await useAuthStore.getState().registerDonaturApi(
      data.fullName,
      data.email,
      data.password,
      data.confirmPassword,
      data.no_whatsapp,
      
    );
    if (success) {
      // If auto-login succeeded, redirect to home
      if (useAuthStore.getState().isAuthenticated) {
        router.push(routes.user.root());
      } else {
        // Registration succeeded but no auto-login — redirect to donor login
        router.push("/auth/donatur");
      }
    } else {
      setError("root", { message: error || "Pendaftaran gagal. Silakan coba lagi." });
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
          Daftar Akun Baru
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral text-center">
          Lengkapi data di bawah untuk bergabung dengan kami
        </Txt>
      </Container>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {errors.root && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {errors.root.message}
          </div>
        )}
        <Input
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          className="focus:ring-2 focus:ring-red-primary/10 transition-all"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <Input
          label="Email"
          placeholder="Masukkan Email"
          type="email"
          className="focus:ring-2 focus:ring-red-primary/10 transition-all"
          {...register("email")}
          error={errors.email?.message}
        />
          <Input
            label="Nomor WhatsApp"
            placeholder="Contoh: 081234567890"
            className="focus:ring-2 focus:ring-red-primary/10 transition-all"
            {...register("no_whatsapp")}
            error={errors.no_whatsapp?.message}
          />
        
        <PasswordField 
          label="Kata Sandi" 
          placeholder="Masukkan Kata Sandi" 
          {...register("password")}
          error={errors.password?.message}
        />
        
        <PasswordField
          label="Konfirmasi Kata Sandi"
          placeholder="Masukkan Konfirmasi Kata Sandi"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        
        <Btn
          type="submit"
          variant="red"
          size="lg"
          shape="rounded"
          isLoading={isSubmitting}
          className="w-full mt-4 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 active:scale-[0.98] transition-all font-bold text-lg"
        >
          Daftar Sekarang
        </Btn>
      </form>

      <Container className="text-center border-t border-lightdark-secondary pt-6">
        <Txt variant="body" className="text-lightdark-neutral">
          Sudah punya akun?{" "}
          <Link
            href="/auth/donatur"
            className="text-red-primary font-bold hover:text-red-tertiary transition-colors hover:underline"
          >
            Login di Sini
          </Link>
        </Txt>
      </Container>
    </Container>
  );
}
