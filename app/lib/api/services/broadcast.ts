import { apiClient } from "@/app/lib/api/client";

export interface BroadcastPayload {
  pesan: string;
  target_penerima: "donatur" | "umum" | "semua";
}

export interface BroadcastResponse {
  success?: boolean;
  message?: string;
  data?: {
    sent_count?: number;
    failed_count?: number;
  };
}

/** POST /broadcast/send — kirim broadcast WhatsApp/Email (memerlukan Bearer token) */
export async function sendBroadcast(payload: BroadcastPayload): Promise<BroadcastResponse> {
  const res = await apiClient.post("/broadcast/send", payload);
  return res.data as BroadcastResponse;
}
