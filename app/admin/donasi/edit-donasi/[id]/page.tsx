"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminProgramFormTemplate } from "@/app/ui/templates/admin-program-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";
import { updateKampanye, deleteKampanye } from "@/app/lib/api/services/programs";
import { useToast } from "@/app/ui/providers/toast-provider";
import { useState } from "react";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";

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

export default function EditDonasiPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { addToast } = useToast();
  const program = useYamutiStore((s) => s.getProgramById(id));
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    values: program
      ? {
          title: program.title,
          category: program.category || "",
          location: program.location || "",
          description: program.description || "",
          targetAmount: program.targetAmount,
          deadline: program.deadline || "",
        }
      : undefined,
  });

  if (!program) {
    return <p className="p-10 text-center text-gray-500">Program tidak ditemukan.</p>;
  }

  const onSubmit = async (data: ProgramFormValues) => {
    try {
      const response = await updateKampanye(id, {
        judul: data.title,
        target_donasi: data.targetAmount,
        deskripsi: data.description || undefined,
        tanggal_berakhir: data.deadline || undefined,
        thumbnail: data.thumbnail,
      });

      if (response && response.success) {
        addToast({
          variant: "success",
          message: response.message || "Kampanye berhasil diperbarui",
        });
        await fetchPrograms();
        router.push(routes.admin.donasi.root());
      } else {
        addToast({
          variant: "error",
          message: "Gagal memperbarui kampanye",
        });
      }
    } catch (err: any) {
      console.error(err);
      addToast({
        variant: "error",
        message: err.message || "Terjadi kesalahan saat memperbarui kampanye",
      });
    }
  };

  const onDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);
    try {
      const response = await deleteKampanye(id);
      if (response && response.success) {
        addToast({
          variant: "success",
          message: response.message || "Kampanye berhasil dihapus",
        });
        await fetchPrograms();
        router.push(routes.admin.donasi.root());
      } else {
        addToast({
          variant: "error",
          message: "Gagal menghapus kampanye",
        });
      }
    } catch (err: any) {
      console.error(err);
      addToast({
        variant: "error",
        message: err.message || "Terjadi kesalahan saat menghapus kampanye",
      });
    }
  };

  return (
    <>
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
      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus program "${program.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
