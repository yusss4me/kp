import { apiClient } from "@/app/lib/api/client";

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
    // Re-throw 401/403 so the global interceptor handles auth redirect
    if (e.response?.status === 401 || e.response?.status === 403) {
      throw e;
    }
    throw e;
  }
}

// GET /donasi — route belum tersedia di backend
// export async function fetchDonasiList() {
//   const res = await apiClient.get("/donasi");
//   return unwrapList(res.data);
// }

// GET /donasi/riwayat — route belum tersedia di backend
// export async function fetchDonasiRiwayat(donaturId: string) {
//   const res = await apiClient.get(`/donasi/riwayat/${donaturId}`);
//   return unwrapList(res.data);
// }
