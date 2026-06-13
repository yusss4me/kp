import { apiClient } from "@/app/lib/api/client";
import type { ApiGaleriPayload } from "@/app/lib/types/api-types";

/** POST /galeri — unggah foto galeri (memerlukan Bearer token, multipart) */
export async function uploadGaleri(payload: ApiGaleriPayload) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("deskripsi", payload.deskripsi);
  formData.append("file", payload.file);

  const res = await apiClient.post("/galeri", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// GET /galeri — route belum tersedia di backend
// export async function fetchGaleriList() {
//   const res = await apiClient.get("/galeri");
//   return unwrapList(res.data);
// }
