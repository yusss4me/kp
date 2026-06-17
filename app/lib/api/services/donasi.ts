import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

export interface CreateDonasiPayload {
  nama_donatur: string;
  no_whatsapp: string;
  gross_amount: number;
  payment_type: string;
}

/** POST /donasi — buat donasi baru (public, tanpa auth) */
export async function createDonasi(payload: CreateDonasiPayload) {
  try {
    const res = await apiClient.post("/donasi", payload);
    return res.data;
  } catch (e: any) {
    if (e.response?.status === 401 || e.response?.status === 403) {
      throw e;
    }
    throw e;
  }
}

/** GET /donasi — returns empty array on 404 (backend may not be ready) */
export async function fetchDonasiList() {
  try {
    const res = await apiClient.get("/donasi");
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** GET /donasi/riwayat/:donaturId — returns empty array on 404 */
export async function fetchDonasiRiwayat(donaturId: string) {
  try {
    const res = await apiClient.get(`/donasi/riwayat/${donaturId}`);
    return unwrapList(res.data);
  } catch (error: any) {
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

/** PATCH /donasi/{id}/verify — verifikasi bukti transfer donasi (admin) */
export async function verifyDonasi(id: string) {
  const res = await apiClient.patch(`/donasi/${id}/verify`);
  return res.data;
}
