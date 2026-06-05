"use client";

import { AdminFinanceTemplate } from "@/app/ui/templates/admin-finance";
import { MOCK_ADMIN_FINANCE_STATS } from "@/app/constants/mockData";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function FinancePage() {
  const transactions = useYamutiStore((s) => s.transactions);
  const deleteTransaction = useYamutiStore((s) => s.deleteTransaction);

  return (
    <AdminFinanceTemplate
      stats={MOCK_ADMIN_FINANCE_STATS}
      transactions={transactions}
      onDeleteTransaction={deleteTransaction}
    />
  );
}
