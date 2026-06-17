import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { FinanceTransaction } from "@/app/lib/types/entities";
import { formatRupiah } from "@/app/lib/utils/crud-helpers";

export interface ApiTransaksiKeuanganResponse {
  id: string | number;
  jenis?: "pemasukan" | "pengeluaran";
  type?: string;
  kategori?: string;
  category?: string;
  nominal?: number;
  amount?: number;
  keterangan?: string;
  description?: string;
  tanggal?: string;
  date?: string;
  created_at?: string;
}

export function mapTransaksiKeuangan(item: ApiTransaksiKeuanganResponse): FinanceTransaction {
  const amountRaw = item.nominal ?? item.amount ?? 0;
  const txType = item.jenis ?? (item.type as string);
  return {
    id: Number(item.id),
    type: txType === "pengeluaran" ? "Expense" : "Income",
    category: item.kategori ?? item.category ?? "Umum",
    amount: formatRupiah(amountRaw),
    amountRaw,
    date: item.tanggal ?? item.date ?? item.created_at ?? "",
    status: "Selesai",
  };
}

export interface CreateTransaksiKeuanganPayload {
  jenis: "pemasukan" | "pengeluaran";
  kategori?: string;
  nominal: number;
  keterangan?: string;
  tanggal?: string;
}

/** GET /transaksi-keuangan — riwayat transaksi (memerlukan Bearer token) */
export async function fetchTransaksiKeuanganList(): Promise<FinanceTransaction[]> {
  try {
    const res = await apiClient.get("/transaksi-keuangan");
    return unwrapList<ApiTransaksiKeuanganResponse>(res.data).map(mapTransaksiKeuangan);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** POST /transaksi-keuangan — tambah pemasukan/pengeluaran kas (memerlukan Bearer token) */
export async function createTransaksiKeuangan(payload: CreateTransaksiKeuanganPayload) {
  const res = await apiClient.post("/transaksi-keuangan", payload);
  return res.data;
}

export interface LaporanKeuanganFilter {
  bulan?: string;  // "01" - "12"
  tahun?: string;  // e.g. "2026"
  jenis?: "pemasukan" | "pengeluaran";
}

export interface LaporanKeuanganResponse {
  total_pemasukan?: number;
  total_pengeluaran?: number;
  saldo?: number;
  transaksi?: ApiTransaksiKeuanganResponse[];
}

/** GET /keuangan/laporan — laporan keuangan dengan filter (memerlukan Bearer token) */
export async function fetchLaporanKeuangan(filter?: LaporanKeuanganFilter): Promise<LaporanKeuanganResponse> {
  const params = new URLSearchParams();
  if (filter?.bulan) params.append("bulan", filter.bulan);
  if (filter?.tahun) params.append("tahun", filter.tahun);
  if (filter?.jenis) params.append("jenis", filter.jenis);

  const res = await apiClient.get(`/keuangan/laporan${params.toString() ? `?${params}` : ""}`);
  return res.data as LaporanKeuanganResponse;
}

export interface KasSaldoResponse {
  saldo: number;
  total_pemasukan?: number;
  total_pengeluaran?: number;
}

/** GET /kas/saldo — cek saldo kas saat ini (memerlukan Bearer token) */
export async function fetchKasSaldo(): Promise<KasSaldoResponse> {
  const res = await apiClient.get("/kas/saldo");
  const body = res.data as { data?: KasSaldoResponse } | KasSaldoResponse;
  return (body as { data?: KasSaldoResponse }).data || (body as KasSaldoResponse);
}
