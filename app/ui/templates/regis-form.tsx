"use client";

import Link from "next/link";
import { useState } from "react";
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

// Menambahkan field untuk step 2 (nik, foto_identitas)
const regisSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  confirmPassword: z.string(),
  no_whatsapp: z.string().min(10, "Nomor WhatsApp minimal 10 karakter"),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit").optional().or(z.literal('')),
  foto_identitas: z.any().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi kata sandi tidak cocok",
  path: ["confirmPassword"],
});

type RegisFormValues = z.infer<typeof regisSchema>;

export interface RegisFormProps {
  className?: string;
}

export default function RegisForm({ }: RegisFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisFormValues>({
    resolver: zodResolver(regisSchema),
    defaultValues: {
      nik: "",
    }
  });

  const nextStep = async () => {
    // Validasi field step 1 saja
    const isStep1Valid = await trigger(["fullName", "email", "no_whatsapp", "password", "confirmPassword"]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("foto_identitas", e.target.files[0]);
    } else {
      setValue("foto_identitas", undefined);
    }
  };

  const onSubmit = async (data: RegisFormValues) => {
    // Pada step 2, kita bisa wajibkan NIK dan foto identitas manual atau biarkan optional tergantung policy.
    // Di sini kita anggap opsional/sudah divalidasi zod.
    
    const { success, error } = await useAuthStore.getState().registerDonaturApi(
      data.fullName,
      data.email,
      data.password,
      data.confirmPassword,
      data.no_whatsapp,
      data.nik || undefined,
      data.foto_identitas
    );
    
    if (success) {
      if (useAuthStore.getState().isAuthenticated) {
        router.push(routes.user.root());
      } else {
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
          {step === 1 ? "Langkah 1: Informasi Akun Dasar" : "Langkah 2: Lengkapi Identitas"}
        </Txt>
        <div className="flex w-full items-center justify-center gap-2 mt-2">
          <div className={`h-2 w-1/2 rounded-full ${step >= 1 ? "bg-red-primary" : "bg-gray-200"}`} />
          <div className={`h-2 w-1/2 rounded-full ${step >= 2 ? "bg-red-primary" : "bg-gray-200"}`} />
        </div>
      </Container>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {errors.root && (
          <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
            {errors.root.message}
          </div>
        )}

        {/* --- STEP 1 --- */}
        <div className={step === 1 ? "flex flex-col gap-5" : "hidden"}>
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
            type="button"
            variant="red"
            size="lg"
            shape="rounded"
            onClick={nextStep}
            className="w-full mt-4 py-4 font-bold text-lg shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30"
          >
            Berikutnya
          </Btn>
        </div>

        {/* --- STEP 2 --- */}
        <div className={step === 2 ? "flex flex-col gap-5" : "hidden"}>
          <Input
            label="NIK (Nomor Induk Kependudukan)"
            placeholder="Masukkan 16 digit NIK"
            className="focus:ring-2 focus:ring-red-primary/10 transition-all"
            {...register("nik")}
            error={errors.nik?.message}
            maxLength={16}
          />
          
          <Container className="flex flex-col gap-2">
            <Txt variant="body" weight="bold" className="text-lightdark-secondary">
              Upload Foto Identitas (KTP/Lainnya)
            </Txt>
            <input 
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-primary hover:file:bg-red-100 border border-gray-300 rounded-lg p-2 text-sm text-gray-500 cursor-pointer"
            />
            {errors.foto_identitas?.message && (
              <span className="text-red-500 text-sm">{errors.foto_identitas.message as string}</span>
            )}
            <Txt variant="small" className="text-gray-400 mt-1">Format yang didukung: JPG, JPEG, PNG.</Txt>
          </Container>

          <div className="flex gap-4 mt-4">
            <Btn
              type="button"
              variant="outline"
              size="lg"
              shape="rounded"
              onClick={prevStep}
              className="w-1/3 py-4 font-bold"
            >
              Kembali
            </Btn>
            <Btn
              type="submit"
              variant="red"
              size="lg"
              shape="rounded"
              isLoading={isSubmitting}
              className="w-2/3 py-4 shadow-xl shadow-red-primary/20 hover:shadow-red-primary/30 font-bold text-lg"
            >
              Daftar Sekarang
            </Btn>
          </div>
        </div>
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
