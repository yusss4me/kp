"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminTransactionFormTemplate, TransactionFormInput } from "@/app/ui/templates/admin-transaction-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  type: z.enum(["Income", "Expense"]),
  category: z.string().min(2),
  amountRaw: z.number().min(1),
  date: z.string().min(1),
});

export default function TambahTransaksiPage() {
  const router = useRouter();
  const addTransaction = useYamutiStore((s) => s.addTransaction);
  const form = useForm<TransactionFormInput>({
    resolver: zodResolver(schema),
    defaultValues: { type: "Income", date: new Date().toISOString().slice(0, 10) },
  });

  const onSubmit = (data: TransactionFormInput) => {
    addTransaction({ ...data, status: "Selesai" });
    router.push(routes.admin.keuangan.root());
  };

  return <AdminTransactionFormTemplate form={form} onSubmit={onSubmit} backUrl={routes.admin.keuangan.root()} />;
}
