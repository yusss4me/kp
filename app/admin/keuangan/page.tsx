"use client";

import { useEffect } from "react";
import { AdminFinanceTemplate } from "@/app/ui/templates/admin-finance";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildFinanceStats } from "@/app/lib/utils/dashboard-stats";
import { routes } from "@/app/lib/constants/routes";

export default function FinancePage() {
  const transactions = useYamutiStore((s) => s.transactions);
  const distributions = useYamutiStore((s) => s.distributions);
  const deleteTransaction = useYamutiStore((s) => s.deleteTransaction);
  const fetchTransaksiKeuangan = useYamutiStore((s) => s.fetchTransaksiKeuangan);
  const saldoKas = useYamutiStore((s) => s.saldoKas);

  // API: GET /keuangan/laporan
  useEffect(() => {
    fetchTransaksiKeuangan();
  }, [fetchTransaksiKeuangan]);

  const stats = buildFinanceStats(transactions, distributions, saldoKas);

  return (
    <AdminFinanceTemplate
      stats={stats}
      transactions={transactions}
      distributions={distributions}
      onDeleteTransaction={deleteTransaction}
      addUrl={routes.admin.keuangan.add()}
    />
  );
}
