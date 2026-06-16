import type { Program } from "@/app/lib/types/entities";
import { calcProgress, formatRupiah } from "@/app/lib/utils/crud-helpers";
import { apiClient } from "@/app/lib/api/client";
import { unwrapList } from "@/app/lib/api/response";

interface ApiProgram {
  id: string | number;
  title?: string;
  judul?: string;
  description?: string;
  deskripsi?: string;
  category?: string;
  kategori?: string;
  location?: string;
  lokasi?: string;
  target_amount?: number;
  targetAmount?: number;
  collected_amount?: number;
  collectedAmount?: number;
  end_date?: string;
  deadline?: string;
  thumbnail_url?: string;
  image?: string;
}

export function mapProgram(item: ApiProgram): Program {
  const targetAmount = item.target_amount ?? item.targetAmount ?? 0;
  const collectedAmount = item.collected_amount ?? item.collectedAmount ?? 0;

  return {
    id: String(item.id),
    title: item.title ?? item.judul ?? "Program",
    category: item.category ?? item.kategori ?? "Umum",
    location: item.location ?? item.lokasi ?? "—",
    description: item.description ?? item.deskripsi ?? "",
    targetAmount,
    collectedAmount,
    deadline: item.end_date ?? item.deadline ?? "",
    image: item.thumbnail_url ?? item.image,
    target: formatRupiah(targetAmount),
    collected: formatRupiah(collectedAmount),
    progress: calcProgress(collectedAmount, targetAmount),
  };
}

/** GET /programs — returns empty array on 404 (backend may not be ready) */
export async function fetchPrograms(): Promise<Program[]> {
  try {
    const res = await apiClient.get("/programs");
    return unwrapList<ApiProgram>(res.data).map(mapProgram);
  } catch (error: any) {
    // Gracefully handle 404 when backend route is not yet available
    if (error?.response?.status === 404) return [];
    throw error;
  }
}

export interface ProgramFormInput {
  title: string;
  description: string;
  target_amount: number;
  category: string;
  end_date: string;
  thumbnail_url?: string;
}

/** POST /programs — creates a new program (returns null on 404) */
export async function createProgram(payload: ProgramFormInput) {
  try {
    const res = await apiClient.post("/programs", payload);
    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 404) return null;
    throw error;
  }
}
