"use client";

import { AdminFinanceTemplate } from "@/app/ui/templates/admin-finance";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildFinanceStats } from "@/app/lib/utils/dashboard-stats";

export default function FinancePage() {
  const transactions = useYamutiStore((s) => s.transactions);
  const deleteTransaction = useYamutiStore((s) => s.deleteTransaction);

  // API: GET /keuangan/transaksi — route belum tersedia; stats dihitung dari data store lokal
  const stats = buildFinanceStats(transactions);

  return (
    <AdminFinanceTemplate
      stats={stats}
      transactions={transactions}
      onDeleteTransaction={deleteTransaction}
    />
  );
}
