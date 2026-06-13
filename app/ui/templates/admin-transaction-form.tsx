"use client";

import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Container } from "@/app/ui/atoms/container";
import { ChevronLeft, Save } from "lucide-react";

export type TransactionFormInput = {
  type: "Income" | "Expense";
  category: string;
  amountRaw: number;
  date: string;
};

interface AdminTransactionFormTemplateProps {
  form: UseFormReturn<TransactionFormInput>;
  onSubmit: (data: TransactionFormInput) => void;
  backUrl: string;
}

export function AdminTransactionFormTemplate({ form, onSubmit, backUrl }: AdminTransactionFormTemplateProps) {
  const { register, formState: { errors, isSubmitting } } = form;

  return (
    <DashboardHeader headerTitle="Transaksi Baru">
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8 pb-20">
        <Link href={backUrl} className="inline-flex items-center gap-2 text-gray-500 hover:text-red-primary group">
          <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-red-50"><ChevronLeft size={20} /></div>
          <Txt weight="bold">Kembali ke Keuangan</Txt>
        </Link>

        <Container radius="2xl" className="p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Tipe Transaksi</label>
            <select {...register("type")} className="w-full h-12 px-4 rounded-2xl bg-gray-50 border-none text-sm font-medium">
              <option value="Income">Pemasukan</option>
              <option value="Expense">Pengeluaran</option>
            </select>
          </div>
          <Input label="Kategori" {...register("category")} error={errors.category?.message} className="bg-gray-50/50" />
          <Input label="Nominal (Rp)" type="number" {...register("amountRaw", { valueAsNumber: true })} error={errors.amountRaw?.message} className="bg-gray-50/50" />
          <Input label="Tanggal" type="date" {...register("date")} error={errors.date?.message} className="bg-gray-50/50" />
        </Container>

        <Btn type="submit" variant="red" isLoading={isSubmitting} className="w-full gap-2 py-4 rounded-2xl">
          <Save size={18} />
          Catat Transaksi
        </Btn>
      </form>
    </DashboardHeader>
  );
}
