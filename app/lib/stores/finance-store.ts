import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FinanceTransaction } from "@/app/lib/types/entities";
import { generateNumericId, formatRupiah } from "@/app/lib/utils/crud-helpers";

interface FinanceStore {
  transactions: FinanceTransaction[];
  error: string | null;

  addTransaction: (data: Omit<FinanceTransaction, "id" | "amount">) => number;
  deleteTransaction: (id: number) => void;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      error: null,

      addTransaction: (data) => {
        const id = generateNumericId(get().transactions);
        const item: FinanceTransaction = {
          ...data,
          id,
          amount: formatRupiah(data.amountRaw),
        };
        set((s) => ({ transactions: [item, ...s.transactions] }));
        return id;
      },

      deleteTransaction: (id) => {
        set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
      },
    }),
    { name: "yamuti-finance" }
  )
);
