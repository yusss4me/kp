"use client";

import { useParams, useRouter } from "next/navigation";
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

export default function EditInventoryPage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const item = useYamutiStore((s) => s.getInventoryById(id));
  const updateInventory = useYamutiStore((s) => s.updateInventory);
  const deleteInventory = useYamutiStore((s) => s.deleteInventory);

  const form = useForm<InventoryFormInput>({
    resolver: zodResolver(schema),
    values: item ? { name: item.name, category: item.category, stock: item.stock, status: item.status } : undefined,
  });

  if (!item) {
    return <p className="p-10 text-center text-gray-500">Barang tidak ditemukan.</p>;
  }

  const onSubmit = (data: InventoryFormInput) => {
    updateInventory(id, data);
    router.push(routes.admin.inventaris.root());
  };

  const onDelete = () => {
    if (confirm(`Hapus ${item.name}?`)) {
      deleteInventory(id);
      router.push(routes.admin.inventaris.root());
    }
  };

  return (
    <AdminInventoryFormTemplate
      title={item.name}
      subtitle={`ID: ${id}`}
      isEdit
      form={form}
      onSubmit={onSubmit}
      onDelete={onDelete}
      backUrl={routes.admin.inventaris.root()}
    />
  );
}
