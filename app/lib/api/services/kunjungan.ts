import { apiClient } from "@/app/lib/api/client";

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

/** POST /kunjungan/{id}/approve — setujui kunjungan (memerlukan Bearer token) */
export async function approveKunjungan(id: string) {
  const res = await apiClient.post(`/kunjungan/${id}/approve`);
  return res.data;
}

// GET /kunjungan — route belum tersedia di backend
// export async function fetchKunjunganList() {
//   const res = await apiClient.get("/kunjungan");
//   return unwrapList(res.data);
// }

export async function getKunjunganById(id: string) {
  try {
    const res = await apiClient.get(`/kunjungan/${id}`);
    return res.data;
  } catch (e: any) {
    // Re-throw 401 errors so the global interceptor handles auth redirect
    if (e.response?.status === 401 || e.response?.status === 403) {
      throw e;
    }
    // Mock data for UI development if backend is not ready (non-auth errors only)
    return {
      id,
      nama_pengunjung: "John Doe",
      nomor_telepon: "081234567890",
      tujuan_kunjungan: "Silaturahmi dan Donasi",
      slot_waktu: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      status: "pending", // Can be 'pending' or 'approved'
      created_at: new Date().toISOString()
    };
  }
}
