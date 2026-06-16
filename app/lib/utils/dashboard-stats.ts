import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Inbox,
  MessageSquare,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import type {
  FinanceTransaction,
  FundDistribution,
  InventoryItem,
  PendingDonation,
  Program,
  VisitBooking,
} from "@/app/lib/types/entities";

type StatColor = "primary" | "success" | "warning" | "danger" | "info" | "secondary";

export function buildFinanceStats(
  transactions: FinanceTransaction[],
  distributions: FundDistribution[] = [],
) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amountRaw, 0);
  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amountRaw, 0);

  const totalBranch = distributions.reduce((sum, d) => sum + d.branchAmount, 0);
  const totalCentral = distributions.reduce((sum, d) => sum + d.centralAmount, 0);

  const format = (n: number) =>
    `Rp ${n.toLocaleString("id-ID")}`;

  return [
    { label: "Total Pemasukan (Bulan Ini)", value: format(income), icon: TrendingUp, color: "success" as StatColor, trend: { value: 0, isUp: true } },
    { label: "Total Pengeluaran (Bulan Ini)", value: format(expense), icon: TrendingDown, color: "danger" as StatColor, trend: { value: 0, isUp: false } },
    { label: "Saldo Kas Saat Ini", value: format(income - expense), icon: DollarSign, color: "primary" as StatColor },
    { label: "Dana Cabang (10%)", value: format(totalBranch), icon: Building2, color: "info" as StatColor },
    { label: "Dana Yayasan Pusat (90%)", value: format(totalCentral), icon: Building2, color: "warning" as StatColor },
  ];
}

export function buildInventoryStats(items: InventoryItem[]) {
  const lowStock = items.filter((i) => i.status === "Menipis" || i.status === "Habis").length;
  return [
    { label: "Total Jenis Barang", value: `${items.length} Item`, icon: Package, color: "primary" as StatColor },
    { label: "Barang Keluar (Minggu Ini)", value: "—", icon: Inbox, color: "info" as StatColor },
    { label: "Stok Menipis", value: `${lowStock} Item`, icon: AlertTriangle, color: "danger" as StatColor },
  ];
}

export function buildKunjunganStats(bookings: VisitBooking[]) {
  const waiting = bookings.filter((b) => b.status === "Menunggu").length;
  const done = bookings.filter((b) => b.status === "Selesai" || b.status === "Dikonfirmasi").length;
  return [
    { label: "Kunjungan Bulan Ini", value: String(bookings.length), icon: Calendar, color: "primary" as StatColor },
    { label: "Menunggu Konfirmasi", value: String(waiting), icon: Users, color: "secondary" as StatColor },
    { label: "Kunjungan Selesai", value: String(done), icon: CheckCircle, color: "success" as StatColor },
  ];
}

export function buildBroadcastStats() {
  return [
    { label: "Pesan Terkirim (Bulan Ini)", value: "—", icon: CheckCircle, color: "success" as StatColor },
    { label: "Sisa Kuota Blast", value: "—", icon: MessageSquare, color: "primary" as StatColor },
    { label: "Pesan Terjadwal", value: "—", icon: Clock, color: "secondary" as StatColor },
  ];
}

export function buildOwnerOversightStats(programs: Program[], donations: PendingDonation[]) {
  const totalDonasi = donations.reduce(
    (sum, d) => sum + (parseInt(d.jumlah.replace(/[^0-9]/g, "")) || 0),
    0,
  );
  return [
    { label: "Efektivitas Dana", value: "—", icon: TrendingUp, color: "success" as StatColor, trend: { value: 0, isUp: true } },
    { label: "Menunggu Persetujuan", value: "—", icon: Package, color: "warning" as StatColor },
    { label: "Program Berjalan", value: String(programs.length), icon: Package, color: "primary" as StatColor },
    { label: "Dana Tersalurkan", value: `Rp ${totalDonasi.toLocaleString("id-ID")}`, icon: DollarSign, color: "info" as StatColor },
  ];
}

export function buildProgramPerformance(programs: Program[]) {
  return programs.map((p) => ({
    name: p.title,
    progress: `${p.progress}%`,
    status: (p.progress >= 80 ? "Active" : p.progress >= 40 ? "Active" : "Critical") as "Active" | "Critical" | "Completed",
    trend: "—",
  }));
}
