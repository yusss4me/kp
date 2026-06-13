"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminOrphanFormTemplate } from "@/app/ui/templates/admin-orphan-form";
import { useYamutiStore, type OrphanFormInput } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  kategori_bayi: z.boolean(),
  status: z.enum(["Baru", "Aktif", "Alumni"]),
  notes: z.string().optional(),
});

export default function TambahOrphanPage() {
  const router = useRouter();
  const addOrphan = useYamutiStore((s) => s.addOrphan);
  const form = useForm<OrphanFormInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: OrphanFormInput) => {
    try {
      await addOrphan(data);
      router.push(routes.admin.anakAsuh.root());
    } catch (e) {
      console.error(e);
      // fallback handled in store
      router.push(routes.admin.anakAsuh.root());
    }
  };

  return (
    <AdminOrphanFormTemplate
      title="Tambah Anak Asuh"
      subtitle="Lengkapi data profil anak asuh baru."
      form={form}
      onSubmit={onSubmit}
      backUrl={routes.admin.anakAsuh.root()}
    />
  );
}
