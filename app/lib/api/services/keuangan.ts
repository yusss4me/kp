import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { FinanceTransaction } from "@/app/lib/types/entities";
import { formatRupiah } from "@/app/lib/utils/crud-helpers";

export interface ApiTransaksiKeuanganResponse {
  id: string | number;
  // Field dari backend riil (Laravel)
  tipe_transaksi?: "Debit" | "Kredit";
  jenis_kas?: "Pusat" | "Cabang";
  nominal?: string | number;   // Backend mengembalikan string: "450000.00"
  deskripsi?: string;
  donasi_id?: string | null;
  // Field alternatif (backward-compat)
  jenis?: "pemasukan" | "pengeluaran";
  type?: string;
  kategori?: string;
  amount?: number;
  keterangan?: string;
  tanggal?: string;
  date?: string;
  created_at?: string;
}

export function mapTransaksiKeuangan(item: ApiTransaksiKeuanganResponse): FinanceTransaction {
  let amountRaw = 0;
  const rawValue = item.nominal ?? item.amount;
  if (typeof rawValue === "string") {
    amountRaw = parseFloat(rawValue) || 0;
  } else if (typeof rawValue === "number") {
    amountRaw = rawValue;
  }

  // Tentukan jenis: tipe_transaksi (Debit=pemasukan, Kredit=pengeluaran) atau jenis lama
  let txType: string;
  if (item.tipe_transaksi) {
    txType = item.tipe_transaksi === "Kredit" ? "pengeluaran" : "pemasukan";
  } else {
    txType = item.jenis ?? (item.type as string) ?? "pemasukan";
  }

  return {
    id: item.id,
    type: txType === "pengeluaran" ? "Expense" : "Income",
    category: item.deskripsi ?? item.kategori ?? item.keterangan ?? "Transaksi",
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

/**
 * @api {get} /transaksi-keuangan GET Riwayat Transaksi Keuangan
 * @description Mengambil daftar riwayat transaksi keuangan (memerlukan Bearer token).
 * 
 * @returns {Promise<FinanceTransaction[]>} Berisi array data riwayat transaksi.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchTransaksiKeuanganList(): Promise<FinanceTransaction[]> {
  try {
    // Backend uses /keuangan/laporan instead of /transaksi-keuangan
    const res = await fetchLaporanKeuangan();
    // The real backend returns the array directly inside the `data` wrapper
    // which is returned by fetchLaporanKeuangan as the whole object or array
    const rawList = (res as any).data || res || [];
    return unwrapList<ApiTransaksiKeuanganResponse>(rawList).map(mapTransaksiKeuangan);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {post} /transaksi-keuangan POST Tambah Transaksi Keuangan
 * @description Mencatat transaksi pemasukan atau pengeluaran kas (memerlukan Bearer token).
 * 
 * @param {CreateTransaksiKeuanganPayload} payload - Data rincian transaksi kas.
 * 
 * @returns {Promise<any>} Berisi status dan data transaksi yang baru dicatat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
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

/**
 * @api {get} /keuangan/laporan GET Laporan Keuangan
 * @description Mengambil data laporan keuangan berdasarkan filter bulan dan tahun (memerlukan Bearer token).
 * 
 * @param {LaporanKeuanganFilter} [filter] - Filter laporan keuangan.
 * 
 * @returns {Promise<LaporanKeuanganResponse>} Berisi data ringkasan dan transaksi laporan keuangan.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
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

/**
 * @api {get} /kas/saldo GET Saldo Kas
 * @description Mengambil info saldo kas terkini beserta total pemasukan dan pengeluaran (memerlukan Bearer token).
 * 
 * @returns {Promise<KasSaldoResponse>} Berisi nominal saldo kas saat ini.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchKasSaldo(): Promise<KasSaldoResponse> {
  const res = await apiClient.get("/kas/saldo");
  const body = res.data;
  return body?.data || body;
}
