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
  nik: z.string().min(1, "NIK wajib diisi"),
  birthDate: z.string().min(1, "Tanggal lahir wajib diisi"),
  kategori_bayi: z.boolean(),
  status: z.enum(["Baru", "Aktif", "Alumni"]),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  tempat_lahir: z.string().min(1, "Tempat lahir wajib diisi"),
  no_kk: z.string().min(1, "No. KK wajib diisi"),
  no_akte: z.string().min(1, "No. Akte wajib diisi"),
  notes: z.string().optional(),
});

export default function TambahOrphanPage() {
  const router = useRouter();
  const addOrphan = useYamutiStore((s) => s.addOrphan);
  const form = useForm<OrphanFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      jenis_kelamin: "Laki-laki",
      status: "Baru",
      kategori_bayi: false,
    },
  });

  const onSubmit = async (data: OrphanFormInput) => {
    try {
      await addOrphan(data);
      router.push(routes.admin.anakAsuh.root());
    } catch (e: any) {
      console.error(e);
      // Wait for user to correct the validation errors instead of redirecting
      alert(e?.response?.data?.message || "Gagal menyimpan data. Silakan periksa kembali isian form Anda.");
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
