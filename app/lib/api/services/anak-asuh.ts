import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";
import type { ApiOrphanResponse } from "@/app/lib/types/api-types";
import type { Orphan } from "@/app/lib/types/entities";

function mapOrphan(item: ApiOrphanResponse & { nama?: string }): Orphan {
  const birthYear = item.birth_date
    ? new Date(item.birth_date).getFullYear()
    : new Date().getFullYear() - 10;
  const currentYear = new Date().getFullYear();

  return {
    id: Number(item.id),
    name: item.name || item.nama || "—",
    age: currentYear - birthYear,
    gender: (item.gender as Orphan["gender"]) || "Laki-laki",
    status: (item.status as Orphan["status"]) || "Baru",
    notes: item.address,
  };
}

/** GET /anak-asuh — daftar anak asuh (memerlukan Bearer token) */
export async function fetchAnakAsuh(): Promise<Orphan[]> {
  const res = await apiClient.get("/anak-asuh");
  return unwrapList<ApiOrphanResponse & { nama?: string }>(res.data).map(mapOrphan);
}
