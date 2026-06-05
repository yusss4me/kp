"use client";

import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Container } from "@/app/ui/atoms/container";
import { ChevronLeft, Save, Trash2 } from "lucide-react";
import type { VisitBooking } from "@/app/lib/types/entities";

export type BookingFormInput = {
  visitor: string;
  date: string;
  time: string;
  type: string;
  status: VisitBooking["status"];
};

interface AdminBookingFormTemplateProps {
  title: string;
  isEdit?: boolean;
  form: UseFormReturn<BookingFormInput>;
  onSubmit: (data: BookingFormInput) => void;
  onDelete?: () => void;
}

export function AdminBookingFormTemplate({
  title,
  isEdit,
  form,
  onSubmit,
  onDelete,
}: AdminBookingFormTemplateProps) {
  const { register, formState: { isSubmitting } } = form;

  return (
    <DashboardHeader headerTitle={isEdit ? `Edit: ${title}` : "Booking Kunjungan Baru"}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8 pb-20">
        <div className="flex justify-between items-center">
          <Link href="/admin/kunjungan" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary group">
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
          <Input label="Nama Pengunjung" {...register("visitor")} className="bg-gray-50/50" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tanggal" type="date" {...register("date")} className="bg-gray-50/50" />
            <Input label="Waktu" type="time" {...register("time")} className="bg-gray-50/50" />
          </div>
          <Input label="Tipe Kunjungan" placeholder="Personal / Grup" {...register("type")} className="bg-gray-50/50" />
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Status</label>
            <select {...register("status")} className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-none text-sm font-medium">
              <option value="Menunggu">Menunggu</option>
              <option value="Dikonfirmasi">Dikonfirmasi</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </Container>

        <Btn type="submit" variant="red" isLoading={isSubmitting} className="w-full gap-2 py-4 rounded-2xl">
          <Save size={18} />
          {isEdit ? "Simpan Perubahan" : "Buat Booking"}
        </Btn>
      </form>
    </DashboardHeader>
  );
}
