  "use client";

import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Container } from "@/app/ui/atoms/container";
import { ChevronLeft, Save, Trash2 } from "lucide-react";
import type { OrphanFormInput } from "@/app/lib/stores/yamuti-store";

interface AdminOrphanFormTemplateProps {
  title: string;
  subtitle: string;
  isEdit?: boolean;
  form: UseFormReturn<OrphanFormInput>;
  onSubmit: (data: OrphanFormInput) => void;
  onDelete?: () => void;
  backUrl: string;
}

export function AdminOrphanFormTemplate({
  title,
  subtitle,
  isEdit,
  form,
  onSubmit,
  onDelete,
  backUrl,
}: AdminOrphanFormTemplateProps) {
  const { register, formState: { errors, isSubmitting } } = form;

  return (
    <DashboardHeader headerTitle={isEdit ? `Edit: ${title}` : "Anak Asuh Baru"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8 pb-20">
        <div className="flex justify-between items-center">
          <Link href={backUrl} className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group">
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-red-50 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <Txt weight="bold">Kembali ke Daftar</Txt>
          </Link>
          {isEdit && onDelete && (
            <Btn type="button" variant="light" size="sm" onClick={onDelete} className="text-red-primary bg-red-50 hover:bg-red-100 border-none gap-2 px-4">
              <Trash2 size={18} />
              Hapus Data
            </Btn>
          )}
        </div>

        <div className="space-y-1">
          <Txt variant="h2" weight="bold">{title}</Txt>
          <Txt className="text-gray-500">{subtitle}</Txt>
        </div>

        <Container radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-6">
          {/* Data Identitas */}
          <div className="space-y-1 pb-2 border-b border-gray-100">
            <Txt weight="bold" className="text-gray-700">Data Identitas</Txt>
          </div>

          <Input label="Nama Lengkap" {...register("name")} error={errors.name?.message} className="bg-gray-50/50" />
          <Input label="NIK (Nomor Induk Kependudukan)" placeholder="Contoh: 3201234567890001" {...register("nik")} error={errors.nik?.message} className="bg-gray-50/50" />
          <Input label="No. KK (Kartu Keluarga)" placeholder="Contoh: 3201234567890001" {...register("no_kk")} error={errors.no_kk?.message} className="bg-gray-50/50" />
          <Input label="No. Akte Kelahiran" placeholder="Contoh: 3201/2010/..." {...register("no_akte")} error={errors.no_akte?.message} className="bg-gray-50/50" />
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Foto Identitas (Opsional)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  form.setValue("foto_identitas", e.target.files[0]);
                } else {
                  form.setValue("foto_identitas", null);
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-primary hover:file:bg-red-100"
            />
          </div>

          {/* Data Pribadi */}
          <div className="space-y-1 pt-2 pb-2 border-b border-gray-100">
            <Txt weight="bold" className="text-gray-700">Data Pribadi</Txt>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Tempat Lahir" placeholder="Contoh: Tasikmalaya" {...register("tempat_lahir")} error={errors.tempat_lahir?.message} className="bg-gray-50/50" />
            <Input label="Tanggal Lahir" type="date" {...register("birthDate")} error={errors.birthDate?.message} className="bg-gray-50/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Jenis Kelamin</label>
              <select {...register("jenis_kelamin")} className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-none text-sm font-medium">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.jenis_kelamin && <p className="text-xs text-red-500">{errors.jenis_kelamin.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Status</label>
              <select {...register("status")} className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-none text-sm font-medium">
                <option value="Baru">Baru</option>
                <option value="Aktif">Aktif</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
            <input type="checkbox" {...register("kategori_bayi")} className="h-5 w-5 rounded" />
            <label className="text-sm font-bold text-gray-700">Kategori Bayi</label>
          </div>

          <Input label="Catatan (opsional)" {...register("notes")} className="bg-gray-50/50" />
        </Container>

        <Btn type="submit" variant="red" isLoading={isSubmitting} className="w-full gap-2 py-4 rounded-2xl shadow-lg shadow-red-primary/20">
          <Save size={18} />
          {isEdit ? "Simpan Perubahan" : "Tambah Anak Asuh"}
        </Btn>
      </form>
    </DashboardHeader>
  );
}
