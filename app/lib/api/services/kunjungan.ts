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
