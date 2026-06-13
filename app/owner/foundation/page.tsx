"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Textarea } from "@/app/ui/atoms/textarea";
import { Globe, Save, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { FoundationProfile } from "@/app/lib/types/entities";

const formSchema = z.object({
  name: z.string().min(1, "Nama Yayasan wajib diisi"),
  vision: z.string().min(1, "Visi wajib diisi"),
  mission: z.string().min(1, "Misi wajib diisi"),
  aboutUs: z.string().min(1, "Sejarah/Tentang Kami wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  phone: z.string().min(1, "Nomor Telepon wajib diisi"),
  email: z.string().email("Format email tidak valid").min(1, "Email wajib diisi"),
  logoUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FoundationProfilePage() {
  const { foundationProfile, updateFoundationProfile } = useYamutiStore();
  const [isPreview, setIsPreview] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      vision: "",
      mission: "",
      aboutUs: "",
      address: "",
      phone: "",
      email: "",
      logoUrl: "",
    },
  });

  useEffect(() => {
    if (foundationProfile) {
      reset(foundationProfile);
    }
  }, [foundationProfile, reset]);

  const onSubmit = (data: FormValues) => {
    updateFoundationProfile(data as FoundationProfile);
    alert("Profil Yayasan berhasil disimpan!");
  };

  return (
    <DashboardHeader headerTitle="Konfigurasi Profil Yayasan">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-primary/10 text-red-primary rounded-2xl">
              <Globe size={24} />
            </div>
            <div>
              <Txt variant="h4" weight="bold">
                Profil Yayasan
              </Txt>
              <Txt variant="caption" className="text-gray-400">
                Pengaturan identitas institusi, visi, dan misi yayasan.
              </Txt>
            </div>
          </div>
          <Btn
            variant={isPreview ? "transparent" : "red"}
            border={isPreview ? "border" : "none"}
            borderColor={isPreview ? "dark" : "red"}
            size="md"
            shape="rounded"
            className="gap-2"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye size={18} />
            {isPreview ? "Tutup Preview" : "Preview"}
          </Btn>
        </div>

        {isPreview ? (
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 space-y-8">
            <Txt variant="h3" weight="bold" className="text-center text-red-primary">
              Preview Landing Page (Tentang Kami)
            </Txt>
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <Txt variant="h4" weight="bold" className="text-gray-900 mb-2">Nama Yayasan</Txt>
                <Txt variant="body" className="text-gray-600">{foundationProfile?.name || "Belum diatur"}</Txt>
              </div>
              <div>
                <Txt variant="h4" weight="bold" className="text-gray-900 mb-2">Visi</Txt>
                <Txt variant="body" className="text-gray-600">{foundationProfile?.vision || "Belum diatur"}</Txt>
              </div>
              <div>
                <Txt variant="h4" weight="bold" className="text-gray-900 mb-2">Misi</Txt>
                <Txt variant="body" className="text-gray-600 whitespace-pre-wrap">{foundationProfile?.mission || "Belum diatur"}</Txt>
              </div>
              <div>
                <Txt variant="h4" weight="bold" className="text-gray-900 mb-2">Tentang Kami</Txt>
                <Txt variant="body" className="text-gray-600 whitespace-pre-wrap">{foundationProfile?.aboutUs || "Belum diatur"}</Txt>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Txt variant="h5" weight="bold" className="text-gray-900">Alamat</Txt>
                  <Txt variant="body" className="text-gray-600">{foundationProfile?.address || "Belum diatur"}</Txt>
                </div>
                <div>
                  <Txt variant="h5" weight="bold" className="text-gray-900">Kontak</Txt>
                  <Txt variant="body" className="text-gray-600">Email: {foundationProfile?.email || "-"}</Txt>
                  <Txt variant="body" className="text-gray-600">Telepon: {foundationProfile?.phone || "-"}</Txt>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Txt variant="body" weight="bold">Nama Yayasan</Txt>
                <Input
                  {...register("name")}
                  placeholder="Masukkan Nama Yayasan"
                  error={errors.name?.message}
                />
              </div>

              <div className="space-y-2">
                <Txt variant="body" weight="bold">Email Kontak</Txt>
                <Input
                  {...register("email")}
                  placeholder="email@yayasan.com"
                  error={errors.email?.message}
                />
              </div>

              <div className="space-y-2">
                <Txt variant="body" weight="bold">Nomor Telepon</Txt>
                <Input
                  {...register("phone")}
                  placeholder="08123456789"
                  error={errors.phone?.message}
                />
              </div>

              <div className="space-y-2">
                <Txt variant="body" weight="bold">Logo URL (Opsional)</Txt>
                <Input
                  {...register("logoUrl")}
                  placeholder="https://example.com/logo.png"
                  error={errors.logoUrl?.message}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Alamat Lengkap</Txt>
              <Textarea
                {...register("address")}
                placeholder="Masukkan Alamat Lengkap"
                rows={2}
                error={errors.address?.message}
              />
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Visi</Txt>
              <Textarea
                {...register("vision")}
                placeholder="Visi Yayasan"
                rows={3}
                error={errors.vision?.message}
              />
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Misi</Txt>
              <Textarea
                {...register("mission")}
                placeholder="Misi Yayasan (pisahkan dengan baris baru untuk daftar)"
                rows={4}
                error={errors.mission?.message}
              />
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Tentang Kami / Sejarah</Txt>
              <Textarea
                {...register("aboutUs")}
                placeholder="Ceritakan tentang yayasan..."
                rows={6}
                error={errors.aboutUs?.message}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Btn
                type="submit"
                variant="red"
                size="lg"
                shape="rounded"
                className="gap-2"
                disabled={isSubmitting}
              >
                <Save size={20} />
                {isSubmitting ? "Menyimpan..." : "Simpan Profil"}
              </Btn>
            </div>
          </form>
        )}
      </div>
    </DashboardHeader>
  );
}
