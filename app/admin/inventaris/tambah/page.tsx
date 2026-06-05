"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminInventoryFormTemplate, InventoryFormInput } from "@/app/ui/templates/admin-inventory-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

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
      router.push("/admin/inventaris"); // Changed from /admin/inventory to match folder name if necessary, though it might be mapped
    } catch (error) {
      console.error(error);
      router.push("/admin/inventaris");
    }
  };

  return (
    <AdminInventoryFormTemplate
      title="Barang Baru"
      subtitle="Tambahkan item ke inventaris logistik yayasan."
      form={form}
      onSubmit={onSubmit}
    />
  );
}
