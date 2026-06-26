"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OwnerAdminFormTemplate, OwnerAdminFormInput } from "@/app/ui/templates/owner-admin-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  email: z.string().email(),
  status: z.enum(["Aktif", "Nonaktif"]),
});

export default function EditAdminPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const admin = useYamutiStore((s) => s.getAdminById(id));
  const updateAdmin = useYamutiStore((s) => s.updateAdmin);
  const deleteAdmin = useYamutiStore((s) => s.deleteAdmin);

  const form = useForm<OwnerAdminFormInput>({
    resolver: zodResolver(schema),
    values: admin ? { name: admin.name, role: admin.role, email: admin.email, status: admin.status } : undefined,
  });

  if (!admin) {
    return <p className="p-10 text-center text-gray-500">Admin tidak ditemukan.</p>;
  }

  const onSubmit = (data: OwnerAdminFormInput) => {
    updateAdmin(id, data);
    router.push(routes.owner.admins.root());
  };

  const onDelete = () => {
    if (confirm(`Hapus admin ${admin.name}?`)) {
      deleteAdmin(id);
      router.push(routes.owner.admins.root());
    }
  };

  return (
    <OwnerAdminFormTemplate 
      title={admin.name} 
      isEdit 
      form={form} 
      onSubmit={onSubmit} 
      onDelete={onDelete} 
      backUrl={routes.owner.admins.root()}
    />
  );
}
