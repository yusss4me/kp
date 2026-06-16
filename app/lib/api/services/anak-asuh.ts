import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiOrphanResponse } from "@/app/lib/types/api-types";
import type { Orphan } from "@/app/lib/types/entities";

export function mapOrphan(item: ApiOrphanResponse): Orphan {
  // Support both backend field names: tanggal_lahir and birth_date
  const birthDateStr = item.tanggal_lahir || item.birth_date;
  const birthYear = birthDateStr
    ? new Date(birthDateStr).getFullYear()
    : new Date().getFullYear() - 10;
  const currentYear = new Date().getFullYear();


  // If gender is not provided, default to Laki-laki
  // const gender = (item.gender as Orphan["gender"]) || "Laki-laki";

  return {
    id: Number(item.id),
    name: item.nama || item.name || "—",
    birthDate: item.tanggal_lahir || item.birth_date || "",
    status: item.status || "Baru",
    kategori_bayi: item.kategori_bayi || false,
    
    
  };
}

/** GET /anak-asuh — daftar anak asuh (memerlukan Bearer token) */
export async function fetchAnakAsuh(): Promise<Orphan[]> {
  const res = await apiClient.get("/anak-asuh");
  return unwrapList<ApiOrphanResponse>(res.data).map(mapOrphan);
}

export interface CreateAnakAsuhPayload {
  nama: string;
  tanggal_lahir: string;
  status: string;
  kategori_bayi: boolean;
}

/** POST /anak-asuh — tambah anak asuh baru (memerlukan Bearer token) */
export async function createAnakAsuh(payload: CreateAnakAsuhPayload) {
  const res = await apiClient.post("/anak-asuh", payload);
  return res.data;
}
