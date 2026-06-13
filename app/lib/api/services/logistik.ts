import { apiClient } from "@/app/lib/api/client";
import type { ApiMutasiBarangPayload } from "@/app/lib/types/api-types";

/** POST /mutasi-barang — catat mutasi barang (memerlukan Bearer token) */
export async function catatMutasiBarang(payload: ApiMutasiBarangPayload) {
  const res = await apiClient.post("/mutasi-barang", payload);
  return res.data;
}

// GET /mutasi-barang — route belum tersedia di backend
// export async function fetchMutasiBarangList() {
//   const res = await apiClient.get("/mutasi-barang");
//   return unwrapList(res.data);
// }
