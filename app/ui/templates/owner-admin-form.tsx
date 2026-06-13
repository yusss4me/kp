"use client";

import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Container } from "@/app/ui/atoms/container";
import { ChevronLeft, Save, Trash2 } from "lucide-react";
import type { OwnerAdmin } from "@/app/lib/types/entities";

export type OwnerAdminFormInput = {
  name: string;
  role: string;
  email: string;
  status: OwnerAdmin["status"];
};

interface OwnerAdminFormTemplateProps {
  title: string;
  isEdit?: boolean;
  form: UseFormReturn<OwnerAdminFormInput>;
  onSubmit: (data: OwnerAdminFormInput) => void;
  onDelete?: () => void;
  backUrl: string;
}

export function OwnerAdminFormTemplate({
  title,
  isEdit,
  form,
  onSubmit,
  onDelete,
  backUrl,
}: OwnerAdminFormTemplateProps) {
  const { register, formState: { isSubmitting } } = form;

  return (
    <DashboardHeader headerTitle={isEdit ? `Edit: ${title}` : "Admin Baru"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8 pb-20">
        <div className="flex justify-between items-center">
          <Link href={backUrl} className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary group">
            <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-red-50"><ChevronLeft size={20} /></div>
            <Txt weight="bold">Kembali</Txt>
          </Link>
          {isEdit && onDelete && (
            <Btn type="button" variant="light" size="sm" onClick={onDelete} className="text-red-primary bg-red-50 gap-2">
              <Trash2 size={18} /> Hapus
            </Btn>
          )}
        </div>

        <Container radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-6">
          <Input label="Nama Lengkap" {...register("name")} className="bg-gray-50/50" />
          <Input label="Peran / Jabatan" {...register("role")} className="bg-gray-50/50" />
          <Input label="Email" type="email" {...register("email")} className="bg-gray-50/50" />
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Status</label>
            <select {...register("status")} className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-none text-sm font-medium">
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </Container>

        <Btn type="submit" variant="red" isLoading={isSubmitting} className="w-full gap-2 py-4 rounded-2xl">
          <Save size={18} />
          {isEdit ? "Simpan Perubahan" : "Tambah Administrator"}
        </Btn>
      </form>
    </DashboardHeader>
  );
}
