import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

/**
 * Data payload untuk mengajukan kunjungan baru.
 */
export interface CreateKunjunganPayload {
  nama_tamu: string;
  no_whatsapp: string;
  jumlah_pengunjung: number;
  maksud: string;
  slot_waktu: string;
}

/** Normalized kunjungan record for UI (backward-compatible field names) */
export interface KunjunganRecord {
  id?: string | number;
  nama_pengunjung?: string;
  nama_tamu?: string;
  nomor_telepon?: string;
  no_whatsapp?: string;
  tujuan_kunjungan?: string;
  maksud?: string;
  jumlah_pengunjung?: number;
  slot_waktu?: string;
  status?: string;
  [key: string]: unknown;
}

function mapKunjunganRecord(item: KunjunganRecord): KunjunganRecord {
  if (!item) return {} as KunjunganRecord;
  return {
    ...item,
    nama_pengunjung: item.nama_pengunjung ?? item.nama_tamu,
    nomor_telepon: item.nomor_telepon ?? item.no_whatsapp,
    tujuan_kunjungan: item.tujuan_kunjungan ?? item.maksud,
  };
}

/**
 * @api {post} /kunjungan POST Ajukan Kunjungan
 * @description Mengajukan jadwal kunjungan ke panti asuhan (public, tanpa auth).
 * 
 * @param {CreateKunjunganPayload} payload - Data pengajuan kunjungan tamu.
 * 
 * @returns {Promise<any>} Berisi status, pesan, dan rincian kunjungan yang diajukan.
 * @throws {Error} Jika validasi gagal atau server error.
 */
export async function createKunjungan(payload: CreateKunjunganPayload) {
  try {
    const res = await apiClient.post("/kunjungan", payload, {
      timeout: 15000,
    });
    return res.data;
  } catch (error: any) {
    if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
      console.warn("POST /kunjungan — network error or timeout, backend may be unavailable");
      return null;
    }
    if (error?.response?.status === 404) {
      console.warn("POST /kunjungan — endpoint not found (backend may not be ready)");
      return null;
    }
    if (error?.response?.status === 422) {
      console.error("POST /kunjungan — validation error:", error.response.data);
      throw error;
    }
    throw error;
  }
}

/**
 * Status kunjungan yang valid (PENDING, APPROVED, REJECTED, COMPLETED).
 */
export type KunjunganStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";

/**
 * @api {patch} /kunjungan/:id/status PATCH Update Status Kunjungan
 * @description Memperbarui status persetujuan atau penyelesaian kunjungan (hanya admin).
 * 
 * @param {string} id - ID unik kunjungan.
 * @param {KunjunganStatus} status - Status baru untuk kunjungan (APPROVED, REJECTED, COMPLETED).
 * 
 * @returns {Promise<any>} Berisi status dan pesan pembaruan.
 * @throws {Error} Jika ID tidak ditemukan atau gagal pembaruan.
 */
export async function updateKunjunganStatus(id: string, status: KunjunganStatus) {
  const res = await apiClient.patch(`/kunjungan/${id}/status`, { status });
  return res.data;
}

/**
 * @api {patch} /kunjungan/:id/status PATCH Setujui Kunjungan
 * @description Memperbarui status kunjungan menjadi APPROVED (hanya admin).
 * 
 * @param {string} id - ID unik kunjungan.
 * 
 * @returns {Promise<any>} Berisi status dan pesan persetujuan.
 * @throws {Error} Jika ID tidak ditemukan atau gagal pembaruan.
 */
export async function approveKunjungan(id: string) {
  return updateKunjunganStatus(id, "APPROVED");
}

/**
 * @api {get} /kunjungan GET Daftar Kunjungan
 * @description Mengambil daftar semua pengajuan kunjungan.
 * 
 * @returns {Promise<KunjunganRecord[]>} Berisi array data kunjungan, returns empty array on 404.
 * @throws {Error} Jika terjadi kesalahan pada server atau network.
 */
export async function fetchKunjunganList(): Promise<KunjunganRecord[]> {
  try {
    const res = await apiClient.get("/kunjungan");
    return unwrapList<KunjunganRecord>(res.data).map(mapKunjunganRecord);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/**
 * @api {get} /kunjungan/:id GET Detail Kunjungan
 * @description Mengambil detail data pengajuan kunjungan berdasarkan ID.
 * 
 * @param {string} id - ID unik kunjungan.
 * 
 * @returns {Promise<KunjunganRecord>} Berisi data detail kunjungan.
 * @throws {Error} Jika ID tidak ditemukan atau server error.
 */
export async function getKunjunganById(id: string): Promise<KunjunganRecord> {
  const res = await apiClient.get(`/kunjungan/${id}`);
  let item = res.data as any;
  
  if (item && typeof item === 'object') {
    if (item.data) item = item.data;
    if (item.kunjungan) item = item.kunjungan;
    if (item.data) item = item.data; // Just in case it's deeply wrapped
  }
  
  // Jika backend mengembalikan array satu elemen secara tidak sengaja
  if (Array.isArray(item) && item.length > 0) {
    item = item[0];
  }
  
  return mapKunjunganRecord(item as KunjunganRecord);
}
