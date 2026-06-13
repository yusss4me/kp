"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminOrphanFormTemplate } from "@/app/ui/templates/admin-orphan-form";
import { useYamutiStore, type OrphanFormInput } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  name: z.string().min(2),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  kategori_bayi: z.boolean(),
  status: z.enum(["Baru", "Aktif", "Alumni"]),
  notes: z.string().optional(),
});

export default function EditOrphanPage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const orphan = useYamutiStore((s) => s.getOrphanById(id));
  const updateOrphan = useYamutiStore((s) => s.updateOrphan);
  const deleteOrphan = useYamutiStore((s) => s.deleteOrphan);

  const form = useForm<OrphanFormInput>({
    resolver: zodResolver(schema),
    values: orphan
      ? { name: orphan.name, birthDate: orphan.birthDate, kategori_bayi: orphan.kategori_bayi, status: orphan.status, notes: "" }
      : undefined,
  });

  if (!orphan) {
    return <p className="p-10 text-center text-gray-500">Data anak tidak ditemukan.</p>;
  }

  const onSubmit = (data: OrphanFormInput) => {
    updateOrphan(id, data);
    router.push(routes.admin.anakAsuh.root());
  };

  const onDelete = () => {
    if (confirm(`Hapus data ${orphan.name}?`)) {
      deleteOrphan(id);
      router.push(routes.admin.anakAsuh.root());
    }
  };

  return (
    <AdminOrphanFormTemplate
      title={orphan.name}
      subtitle={`ID: ${id}`}
      isEdit
      form={form}
      onSubmit={onSubmit}
      onDelete={onDelete}
      backUrl={routes.admin.anakAsuh.root()}
    />
  );
}
