import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

export interface CreateKunjunganPayload {
  nama_pengunjung: string;
  nomor_telepon: string;
  tujuan_kunjungan: string;
  slot_waktu: string;
}

/** POST /kunjungan — ajukan kunjungan (public, tanpa auth) */
export async function createKunjungan(payload: CreateKunjunganPayload) {
  const res = await apiClient.post("/kunjungan", payload);
  return res.data;
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
export async function fetchKunjunganList() {
  try {
    const res = await apiClient.get("/kunjungan");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** GET /kunjungan/{id} — fetches single kunjungan detail (throws on error) */
export async function getKunjunganById(id: string) {
  const res = await apiClient.get(`/kunjungan/${id}`);
  return res.data;
}
