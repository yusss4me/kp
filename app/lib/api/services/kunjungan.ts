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
  try {
    const res = await apiClient.post("/kunjungan", payload, {
      timeout: 15000,
    });
    return res.data;
  } catch (error: any) {
    // Gracefully handle backend not available
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
