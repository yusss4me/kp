"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminOrphanFormTemplate } from "@/app/ui/templates/admin-orphan-form";
import { useYamutiStore, type OrphanFormInput } from "@/app/lib/stores/yamuti-store";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  age: z.number().min(1).max(25),
  gender: z.enum(["Laki-laki", "Perempuan"]),
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
      router.push("/admin/anak-asuh");
    } catch (e) {
      console.error(e);
      // fallback handled in store
      router.push("/admin/anak-asuh");
    }
  };

  return (
    <AdminOrphanFormTemplate
      title="Tambah Anak Asuh"
      subtitle="Lengkapi data profil anak asuh baru."
      form={form}
      onSubmit={onSubmit}
    />
  );
}
