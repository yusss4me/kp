import { apiClient } from "@/app/lib/api/client";

/** POST /artikel — buat artikel baru (memerlukan Bearer token, multipart) */
export async function createArtikel(formData: FormData) {
  const res = await apiClient.post("/artikel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// GET /artikel — route belum tersedia di backend
// export async function fetchArtikelList() {
//   const res = await apiClient.get("/artikel");
//   return unwrapList(res.data);
// }

// GET /broadcast/templates — route belum tersedia di backend (404)
// export async function fetchBroadcastTemplates() {
//   const res = await apiClient.get("/broadcast/templates");
//   return unwrapList(res.data);
// }
