"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminProgramFormTemplate } from "@/app/ui/templates/admin-program-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";
import { createKampanye } from "@/app/lib/api/services/programs";
import { useToast } from "@/app/ui/providers/toast-provider";

const programSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  category: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  targetAmount: z.number({ message: "Target dana harus angka" }).min(0, "Minimal target Rp 0"),
  deadline: z.string().optional(),
  thumbnail: z.any().optional(),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function TambahDonasiPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: "",
      category: "",
      location: "",
      description: "",
      targetAmount: 0,
      deadline: "",
    },
  });

  const onSubmit = async (data: ProgramFormValues) => {
    try {
      const response = await createKampanye({
        judul: data.title,
        target_donasi: data.targetAmount,
        deskripsi: data.description || undefined,
        tanggal_berakhir: data.deadline || undefined,
        tanggal_mulai: new Date().toISOString().split("T")[0],
        thumbnail: data.thumbnail,
      });

      if (response && response.success) {
        addToast({
          variant: "success",
          message: response.message || "Kampanye baru berhasil dibuat",
        });
        await fetchPrograms();
        router.push(routes.admin.donasi.root());
      } else {
        addToast({
          variant: "error",
          message: "Gagal membuat kampanye",
        });
      }
    } catch (err: any) {
      console.error(err);
      addToast({
        variant: "error",
        message: err.message || "Terjadi kesalahan saat membuat kampanye",
      });
    }
  };

  return (
    <AdminProgramFormTemplate
      title="Buat Program Donasi"
      subtitle="Isi detail program di bawah ini untuk memulai penggalangan dana baru."
      form={form}
      onSubmit={onSubmit}
      backUrl={routes.admin.donasi.root()}
    />
  );
}
