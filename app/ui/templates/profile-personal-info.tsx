"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Textarea } from "@/app/ui/atoms/textarea";
import { User, Camera, Save } from "lucide-react";
import { updateProfile } from "@/app/lib/api/services/auth";
import { useAuthStore } from "@/app/lib/stores/auth-store";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Nama depan minimal 2 karakter"),
  lastName: z.string().min(2, "Nama belakang minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export interface ProfilePersonalInfoTemplateProps {
  defaultValues?: Partial<PersonalInfoValues>;
}

export function ProfilePersonalInfoTemplate({ defaultValues }: ProfilePersonalInfoTemplateProps) {
  const authStore = useAuthStore((s) => s);
  const user = authStore.user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.name?.split(" ")[0] || "Donatur",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "Yamuti",
      email: user?.email || "donatur@yamuti.org",
      phoneNumber: user?.phone || "081234567890",
      address: user?.address || "Jl. Kebaikan No. 123, Jakarta",
      ...defaultValues,
    },
  });

  const onSubmit = async (data: PersonalInfoValues) => {
    try {
      const updatedData = await updateProfile({
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phoneNumber,
        address: data.address,
      });
      // Update store state
      authStore.setAuth({ user: { ...user, ...updatedData } as any, token: authStore.token || "", isAuthenticated: true });
      alert("Profil berhasil diperbarui!");
    } catch (e) {
      alert("Gagal memperbarui profil.");
    }
  };

  return (
    <ProfileSubpageTemplate
      backHref="/home/profil/settings"
      backLabel="Kembali ke Pengaturan"
      title="Informasi Pribadi"
      description="Perbarui data diri Anda"
      icon={User}
      maxWidth="3xl"
    >
      <Container variant="light" radius="2xl" padding="xl" shadow="sm" className="border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-50">
            <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={40} className="text-gray-400" />
              <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-red-primary text-white rounded-full flex items-center justify-center shadow-lg">
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Nama Depan" {...register("firstName")} error={errors.firstName?.message} />
            <Input label="Nama Belakang" {...register("lastName")} error={errors.lastName?.message} />
            <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
            <Input label="Nomor Telepon" {...register("phoneNumber")} error={errors.phoneNumber?.message} />
          </div>

          <Textarea label="Alamat" rows={3} {...register("address")} error={errors.address?.message} />

          <div className="flex justify-end pt-4">
            <Btn type="submit" variant="red" isLoading={isSubmitting} className="gap-2 px-8 rounded-xl shadow-lg shadow-red-primary/20">
              <Save size={18} /> Simpan Perubahan
            </Btn>
          </div>
        </form>
      </Container>
    </ProfileSubpageTemplate>
  );
}
