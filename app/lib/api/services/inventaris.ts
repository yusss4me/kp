import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { InventoryItem } from "@/app/lib/types/entities";

export interface ApiInventarisResponse {
  id: string | number;
  nama_barang?: string;
  nama?: string;
  name?: string;
  deskripsi?: string;
  kategori?: string;
  category?: string;
  stok_sekarang?: number | string;
  stok?: number | string;
  stock?: number | string;
  satuan?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export function mapInventaris(item: ApiInventarisResponse): InventoryItem {
  const stockRaw = item.stok_sekarang ?? item.stok ?? item.stock ?? 0;
  const stockNum = typeof stockRaw === "string" ? parseInt(stockRaw) || 0 : stockRaw;
  const status =
    stockNum > 10 ? "Cukup" : stockNum > 0 ? "Menipis" : "Habis";
  return {
    id: Number(item.id),
    name: item.nama_barang ?? item.nama ?? item.name ?? "—",
    category: item.kategori ?? item.category ?? item.satuan ?? "Umum",
    stock: String(stockRaw),
    status: (item.status as InventoryItem["status"]) ?? status,
  };
}

/**
 * @api {get} /inventaris GET Daftar Inventaris
 * @description Mengambil daftar barang inventaris (memerlukan Bearer token).
 * 
 * @returns {Promise<InventoryItem[]>} Berisi array data barang inventaris.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchInventarisList(): Promise<InventoryItem[]> {
  try {
    const res = await apiClient.get("/inventaris");
    return unwrapList<ApiInventarisResponse>(res.data).map(mapInventaris);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * Data payload untuk membuat master barang inventaris baru.
 */
export interface CreateInventarisPayload {
  nama_barang: string;
  deskripsi?: string;
  stok_sekarang?: number;
  satuan?: string;
}

/**
 * @api {post} /inventaris POST Tambah Inventaris
 * @description Menambahkan master barang inventaris baru ke server (memerlukan Bearer token).
 * 
 * @param {CreateInventarisPayload} payload - Data rincian barang inventaris.
 * 
 * @returns {Promise<any>} Berisi status dan data barang yang baru dibuat.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createInventaris(payload: CreateInventarisPayload) {
  const res = await apiClient.post("/inventaris", payload);
  return res.data;
}

/**
 * @api {get} /inventaris/:id GET Detail Inventaris
 * @description Mengambil detail data barang inventaris berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik barang inventaris.
 * 
 * @returns {Promise<InventoryItem>} Berisi data detail barang inventaris.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
export async function fetchInventarisById(id: string | number): Promise<InventoryItem> {
  const res = await apiClient.get(`/inventaris/${id}`);
  const body = res.data as { data?: ApiInventarisResponse } | ApiInventarisResponse;
  const item = (body as { data?: ApiInventarisResponse }).data || (body as ApiInventarisResponse);
  return mapInventaris(item);
}

/**
 * Data payload untuk memperbarui data barang inventaris.
 */
export interface UpdateInventarisPayload {
  nama_barang?: string;
  deskripsi?: string;
  stok_sekarang?: number;
  satuan?: string;
}

/**
 * @api {put} /inventaris/:id PUT Update Inventaris
 * @description Memperbarui data master barang inventaris berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik barang inventaris yang akan diperbarui.
 * @param {UpdateInventarisPayload} payload - Data perubahan untuk barang inventaris.
 * 
 * @returns {Promise<any>} Berisi status dan data barang yang telah diperbarui.
 * @throws {Error} Jika ID tidak ditemukan atau validasi gagal.
 */
export async function updateInventaris(id: string | number, payload: UpdateInventarisPayload) {
  const res = await apiClient.put(`/inventaris/${id}`, payload);
  return res.data;
}

/**
 * @api {delete} /inventaris/:id DELETE Hapus Inventaris
 * @description Menghapus data barang inventaris secara permanen berdasarkan ID (memerlukan Bearer token).
 * 
 * @param {string|number} id - ID unik barang inventaris yang akan dihapus.
 * 
 * @returns {Promise<any>} Berisi status sukses dan pesan berhasil dihapus.
 * @throws {Error} Jika ID tidak ditemukan atau gagal dihapus.
 */
export async function deleteInventaris(id: string | number) {
  const res = await apiClient.delete(`/inventaris/${id}`);
  return res.data;
}

/**
 * Data payload untuk mencatat mutasi stok barang (masuk/keluar/rusak).
 */
export interface CatatMutasiPayload {
  inventaris_id: string;
  tipe: "masuk" | "keluar" | "rusak";
  jumlah: number;
  keterangan?: string;
}

/**
 * @api {post} /mutasi-barang POST Catat Mutasi
 * @description Mencatat transaksi mutasi stok barang inventaris (memerlukan Bearer token).
 * 
 * @param {CatatMutasiPayload} payload - Data mutasi stok (tipe, jumlah, inventaris_id).
 * 
 * @returns {Promise<any>} Berisi status sukses dan data mutasi yang dicatat.
 * @throws {Error} Jika validasi gagal atau stok tidak mencukupi.
 */
export async function catatMutasiInventaris(
  payload: CatatMutasiPayload
) {
  const res = await apiClient.post(`/mutasi-barang`, payload);
  return res.data;
}

/**
 * @api {get} /inventaris/:id/mutasi GET Riwayat Mutasi
 * @description Mengambil riwayat mutasi stok untuk suatu barang inventaris (memerlukan Bearer token).
 * 
 * @param {string|number} inventarisId - ID unik barang inventaris.
 * 
 * @returns {Promise<any[]>} Berisi array riwayat mutasi barang, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchRiwayatMutasi(inventarisId: string | number) {
  try {
    const res = await apiClient.get(`/inventaris/${inventarisId}/mutasi`);
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}
