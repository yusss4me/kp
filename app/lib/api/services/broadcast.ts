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

/**
 * @api {post} /broadcast/send POST Kirim Broadcast
 * @description Mengirimkan pesan broadcast via WhatsApp atau Email (memerlukan Bearer token).
 * 
 * @param {BroadcastPayload} payload - Data broadcast yang akan dikirim (pesan dan target).
 * 
 * @returns {Promise<BroadcastResponse>} Berisi status sukses, jumlah yang terkirim dan gagal.
 * @throws {Error} Jika gagal mengirim atau server error.
 */
export async function sendBroadcast(payload: BroadcastPayload): Promise<BroadcastResponse> {
  const res = await apiClient.post("/broadcast/send", payload);
  return res.data as BroadcastResponse;
}
