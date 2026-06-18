import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

/** POST /kunjungan — payload sesuai api-collection */
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
  return {
    ...item,
    nama_pengunjung: item.nama_pengunjung ?? item.nama_tamu,
    nomor_telepon: item.nomor_telepon ?? item.no_whatsapp,
    tujuan_kunjungan: item.tujuan_kunjungan ?? item.maksud,
  };
}

/** POST /kunjungan — ajukan kunjungan (public, tanpa auth) */
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

/** PATCH /kunjungan/{id}/status — update status kunjungan (APPROVED, REJECTED, COMPLETED) */
export type KunjunganStatus = "APPROVED" | "REJECTED" | "COMPLETED";

export async function updateKunjunganStatus(id: string, status: KunjunganStatus) {
  const res = await apiClient.patch(`/kunjungan/${id}/status`, { status });
  return res.data;
}

/** PATCH /kunjungan/{id}/status — setujui kunjungan (status = APPROVED) */
export async function approveKunjungan(id: string) {
  return updateKunjunganStatus(id, "APPROVED");
}

/** GET /kunjungan — returns empty array on 404 (backend may not be ready) */
export async function fetchKunjunganList(): Promise<KunjunganRecord[]> {
  try {
    const res = await apiClient.get("/kunjungan");
    return unwrapList<KunjunganRecord>(res.data).map(mapKunjunganRecord);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** GET /kunjungan/{id} — fetches single kunjungan detail (throws on error) */
export async function getKunjunganById(id: string): Promise<KunjunganRecord> {
  const res = await apiClient.get(`/kunjungan/${id}`);
  const body = res.data as { data?: KunjunganRecord } | KunjunganRecord;
  const item = (body as { data?: KunjunganRecord }).data || (body as KunjunganRecord);
  return mapKunjunganRecord(item);
}
