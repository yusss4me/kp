"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminOrphanFormTemplate } from "@/app/ui/templates/admin-orphan-form";
import { useYamutiStore, type OrphanFormInput } from "@/app/lib/stores/yamuti-store";

const schema = z.object({
  name: z.string().min(2),
  age: z.number().min(1).max(25),
  gender: z.enum(["Laki-laki", "Perempuan"]),
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
      ? { name: orphan.name, age: orphan.age, gender: orphan.gender, status: orphan.status, notes: orphan.notes }
      : undefined,
  });

  if (!orphan) {
    return <p className="p-10 text-center text-gray-500">Data anak tidak ditemukan.</p>;
  }

  const onSubmit = (data: OrphanFormInput) => {
    updateOrphan(id, data);
    router.push("/admin/orphans");
  };

  const onDelete = () => {
    if (confirm(`Hapus data ${orphan.name}?`)) {
      deleteOrphan(id);
      router.push("/admin/orphans");
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
    />
  );
}
