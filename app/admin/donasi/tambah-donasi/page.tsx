"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminProgramFormTemplate } from "@/app/ui/templates/admin-program-form";
import { programFormToEntity, useYamutiStore } from "@/app/lib/stores/yamuti-store";

const programSchema = z.object({
  title: z.string().min(10, "Judul minimal 10 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  location: z.string().min(1, "Lokasi harus diisi"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  targetAmount: z.number({ message: "Target dana harus angka" }).min(100000, "Minimal target Rp 100.000"),
  deadline: z.string().min(1, "Batas waktu harus diisi"),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function TambahDonasiPage() {
  const router = useRouter();
  const addProgram = useYamutiStore((s) => s.addProgram);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
  });

  const onSubmit = async (data: ProgramFormValues) => {
    addProgram(programFormToEntity(data));
    router.push("/admin/donasi");
  };

  return (
    <AdminProgramFormTemplate
      title="Buat Program Donasi"
      subtitle="Isi detail program di bawah ini untuk memulai penggalangan dana baru."
      form={form}
      onSubmit={onSubmit}
    />
  );
}
