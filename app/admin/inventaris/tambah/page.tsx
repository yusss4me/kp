"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminInventoryFormTemplate, InventoryFormInput } from "@/app/ui/templates/admin-inventory-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  name: z.string().min(2),
  category: z.string().min(1),
  stock: z.string().min(1),
  status: z.enum(["Cukup", "Menipis", "Habis"]),
});

export default function TambahInventoryPage() {
  const router = useRouter();
  const addInventory = useYamutiStore((s) => s.addInventory);
  const form = useForm<InventoryFormInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: InventoryFormInput) => {
    try {
      await addInventory(data);
      router.push(routes.admin.inventaris.root());
    } catch (error) {
      console.error(error);
      router.push(routes.admin.inventaris.root());
    }
  };

  return (
    <AdminInventoryFormTemplate
      title="Barang Baru"
      subtitle="Tambahkan item ke inventaris logistik yayasan."
      form={form}
      onSubmit={onSubmit}
      backUrl={routes.admin.inventaris.root()}
    />
  );
}
