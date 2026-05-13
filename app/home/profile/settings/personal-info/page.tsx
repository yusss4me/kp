"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { User, ChevronLeft, Camera, Save } from "lucide-react";
import Link from "next/link";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Textarea } from "@/app/ui/atoms/textarea";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Nama depan minimal 2 karakter"),
  lastName: z.string().min(2, "Nama belakang minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "M.",
      lastName: "Ardiansyah",
      email: "ardiansyah@email.com",
      phoneNumber: "081234567890",
      address: "Jl. Raya Tasikmalaya No. 123",
    }
  });

  const onSubmit = async (data: PersonalInfoValues) => {
    console.log("Personal info data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Profil berhasil diperbarui (Simulasi)");
  };

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
        <Link href="/home/profile/settings" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Pengaturan</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-primary">
            <User size={24} />
          </div>
          <Txt variant="h2" weight="bold" className="text-2xl">Profil Pengguna</Txt>
        </div>

        <Container variant="white" radius="2xl" padding="xl" shadow="sm" className="border border-gray-100 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
                <img src="/images/person-2.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button type="button" className="absolute bottom-0 right-0 w-10 h-10 bg-red-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <Txt variant="small" className="text-gray-400">Rasio 1:1, Maksimal 2MB</Txt>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Nama Depan" 
              placeholder="Masukkan Nama Depan" 
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input 
              label="Nama Belakang" 
              placeholder="Masukkan Nama Belakang" 
              {...register("lastName")}
              error={errors.lastName?.message}
            />
            <Input 
              label="Email" 
              placeholder="Masukkan Email" 
              {...register("email")}
              error={errors.email?.message}
            />
            <Input 
              label="Nomor Telepon" 
              placeholder="Masukkan Nomor Telepon" 
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />
          </div>

          <Textarea
            label="Alamat Lengkap"
            placeholder="Masukkan alamat lengkap Anda..."
            className="min-h-[100px] rounded-2xl"
            {...register("address")}
            error={errors.address?.message}
          />

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-50">
            <Btn type="button" variant="light" className="px-6 rounded-xl">Batal</Btn>
            <Btn 
              type="submit"
              variant="red" 
              isLoading={isSubmitting}
              className="px-8 rounded-xl gap-2 shadow-lg shadow-red-primary/20"
            >
              <Save size={18} /> Simpan Perubahan
            </Btn>
          </div>
        </Container>
      </form>
    </Container>
  );
}
