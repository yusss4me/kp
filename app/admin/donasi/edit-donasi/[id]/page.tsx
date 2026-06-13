"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminProgramFormTemplate } from "@/app/ui/templates/admin-program-form";
import { programFormToEntity, useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const programSchema = z.object({
  title: z.string().min(10, "Judul minimal 10 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  location: z.string().min(1, "Lokasi harus diisi"),
  description: z.string().min(50, "Deskripsi minimal 50 karakter"),
  targetAmount: z.number({ message: "Target dana harus angka" }).min(100000, "Minimal target Rp 100.000"),
  deadline: z.string().min(1, "Batas waktu harus diisi"),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function EditDonasiPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const program = useYamutiStore((s) => s.getProgramById(id));
  const updateProgram = useYamutiStore((s) => s.updateProgram);
  const deleteProgram = useYamutiStore((s) => s.deleteProgram);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    values: program
      ? {
          title: program.title,
          category: program.category,
          location: program.location,
          description: program.description,
          targetAmount: program.targetAmount,
          deadline: program.deadline,
        }
      : undefined,
  });

  if (!program) {
    return <p className="p-10 text-center text-gray-500">Program tidak ditemukan.</p>;
  }

  const onSubmit = async (data: ProgramFormValues) => {
    updateProgram(id, programFormToEntity(data, { collectedAmount: program.collectedAmount, image: program.image }));
    router.push(routes.admin.donasi.root());
  };

  const onDelete = () => {
    if (confirm("Hapus program ini?")) {
      deleteProgram(id);
      router.push(routes.admin.donasi.root());
    }
  };

  return (
    <AdminProgramFormTemplate
      title={program.title}
      subtitle={`ID Program: ${id}`}
      isEdit
      form={form}
      onSubmit={onSubmit}
      onDelete={onDelete}
      programImage={program.image}
      backUrl={routes.admin.donasi.root()}
    />
  );
}
