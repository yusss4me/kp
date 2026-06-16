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
          <Input label="Nama Lengkap" {...register("name")} error={errors.name?.message} className="bg-gray-50/50" />
          <Input label="Tanggal Lahir" type="date" {...register("birthDate")} error={errors.birthDate?.message} className="bg-gray-50/50" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
              <input type="checkbox" {...register("kategori_bayi")} className="h-5 w-5 rounded" />
              <label className="text-sm font-bold text-gray-700">Kategori Bayi</label>
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
