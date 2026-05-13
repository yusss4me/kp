"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../atoms/input";
import { Txt } from "../atoms/text";
import { PasswordField } from "../molecules/password-field";
import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";

const regisSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok",
  path: ["confirmPassword"],
});

type RegisFormValues = z.infer<typeof regisSchema>;

export default function RegisForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisFormValues>({
    resolver: zodResolver(regisSchema),
  });

  const onSubmit = async (data: RegisFormValues) => {
    console.log("Registration data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Pendaftaran berhasil (Simulasi)");
  };

  return (
    <Container
      variant="white"
      radius="2xl"
      padding="none"
      className="w-full flex flex-col gap-8 p-6 md:p-10 shadow-2xl shadow-black/5"
    >
      <Container className="flex flex-col items-center gap-2">
        <Txt
          variant="h2"
          weight="bold"
          color="black"
          align="center"
          font="jakarta"
          className="tracking-tight"
        >
          Daftar Akun Baru
        </Txt>
        <Txt variant="body" className="text-lightdark-neutral text-center">
          Lengkapi data di bawah untuk bergabung dengan kami
        </Txt>
      </Container>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
            href="/auth/masuk"
            className="text-red-primary font-bold hover:text-red-tertiary transition-colors hover:underline"
          >
            Login di Sini
          </Link>
        </Txt>
      </Container>
    </Container>
  );
}
