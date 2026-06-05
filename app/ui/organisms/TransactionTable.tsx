import React from "react";
import { cn } from "@/app/lib/utils";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "../atoms/table";
import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";
import type { FinanceTransaction } from "@/app/lib/types/entities";

export interface TransactionTableProps {
  transactions: FinanceTransaction[];
  onDelete?: (id: number) => void;
  className?: string;
}

export const TransactionTable = ({ transactions, onDelete }: TransactionTableProps) => {
  return (
    <Container className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <Container className="p-8 border-b border-gray-50 flex items-center justify-between">
        <Txt variant="h4" weight="bold" className="text-gray-900">
          Riwayat Transaksi
        </Txt>
      </Container>
      <Container className="overflow-x-auto flex flex-col">
        <Table>
          <THead>
            <TR>
              <TH>Transaksi</TH>
              <TH>Kategori</TH>
              <TH>Jumlah</TH>
              <TH>Tanggal</TH>
              <TH>Status</TH>
              {onDelete && <TH className="text-right">Aksi</TH>}
            </TR>
          </THead>
          <TBody>
            {transactions.map((tx) => (
              <TR key={tx.id}>
                <TD>
                  <Container className="flex items-center gap-3">
                    <Container
                      className={`p-2 rounded-xl ${tx.type === "Income" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
                    >
                      {tx.type === "Income" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </Container>
                    <Txt weight="bold" className="text-gray-900">
                      {tx.type === "Income" ? "Pemasukan" : "Pengeluaran"}
                    </Txt>
                  </Container>
                </TD>
                <TD className="text-gray-500 font-medium">{tx.category}</TD>
                <TD className={cn("font-black", tx.type === "Income" ? "text-success" : "text-danger")}>
                  {tx.type === "Income" ? "+" : "-"} {tx.amount}
                </TD>
                <TD className="text-gray-400 text-sm font-medium">{tx.date}</TD>
                <TD>
                  <Badge variant="soft" color="success">
                    {tx.status}
                  </Badge>
                </TD>
                {onDelete && (
                  <TD className="text-right">
                    <Btn
                      type="button"
                      variant="light"
                      size="sm"
                      className="text-red-primary bg-red-50 gap-1"
                      onClick={() => {
                        if (confirm("Hapus transaksi ini?")) onDelete(tx.id);
                      }}
                    >
                      <Trash2 size={14} /> Hapus
                    </Btn>
                  </TD>
                )}
              </TR>
            ))}
          </TBody>
        </Table>
      </Container>
    </Container>
  );
};
