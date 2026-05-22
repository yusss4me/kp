import React from "react";
import { cn } from "@/app/lib/utils";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import { Table, THead, TBody, TR, TH, TD } from "../atoms/table";
import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: "Income",
    category: "Donasi Umum",
    amount: "Rp 2.500.000",
    date: "25 Apr 2026",
    status: "Selesai",
  },
  {
    id: 2,
    type: "Expense",
    category: "Listrik & Air",
    amount: "Rp 850.000",
    date: "24 Apr 2026",
    status: "Selesai",
  },
  {
    id: 3,
    type: "Income",
    category: "Donasi Pendidikan",
    amount: "Rp 5.000.000",
    date: "22 Apr 2026",
    status: "Selesai",
  },
  {
    id: 4,
    type: "Expense",
    category: "Sembako Bulanan",
    amount: "Rp 3.200.000",
    date: "20 Apr 2026",
    status: "Selesai",
  },
  {
    id: 5,
    type: "Income",
    category: "Zakat Mal",
    amount: "Rp 10.000.000",
    date: "18 Apr 2026",
    status: "Selesai",
  },
];

export interface TransactionTableProps {
  className?: string;
}

/**
 * TransactionTable
 * 
 * Komponen tabel untuk menampilkan riwayat transaksi keuangan yayasan.
 * Menampilkan tipe transaksi (Pemasukan/Pengeluaran) dengan indikator tren, 
 * kategori, nominal, tanggal, dan status penyelesaian.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {TransactionTableProps} props - Properti komponen
 * @returns {JSX.Element} Komponen TransactionTable
 */
export const TransactionTable = ({}: TransactionTableProps) => {
  return (
    <Container className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <Container className="p-8 border-b border-gray-50 flex items-center justify-between">
        <Txt variant="h4" weight="bold" className="text-gray-900">
          Riwayat Transaksi
        </Txt>
        <Btn 
          variant="transparent" 
          textColor="dark"
          shape="rounded"
          className="p-2 bg-transparent hover:bg-gray-50 border-none transition-colors"
        >
          <MoreVertical size={20} className="text-gray-400" />
        </Btn>
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
            </TR>
          </THead>
          <TBody>
            {MOCK_TRANSACTIONS.map((tx) => (
              <TR key={tx.id}>
                <TD>
                  <Container className="flex items-center gap-3">
                    <Container
                      className={`p-2 rounded-xl ${tx.type === "Income" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
                    >
                      {tx.type === "Income" ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                    </Container>
                    <Txt weight="bold" className="text-gray-900">
                      {tx.type === "Income" ? "Pemasukan" : "Pengeluaran"}
                    </Txt>
                  </Container>
                </TD>
                <TD className="text-gray-500 font-medium">{tx.category}</TD>
                <TD
                  className={cn(
                    "font-black",
                    tx.type === "Income" ? "text-success" : "text-danger",
                  )}
                >
                  {tx.type === "Income" ? "+" : "-"} {tx.amount}
                </TD>
                <TD className="text-gray-400 text-sm font-medium">{tx.date}</TD>
                <TD>
                  <Badge variant="soft" color="success">
                    {tx.status}
                  </Badge>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Container>
    </Container>
  );
};
