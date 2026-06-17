import { useMutation } from "@tanstack/react-query";
import { sendBroadcast, type BroadcastPayload } from "@/app/lib/api/services/broadcast";

/** React Query mutation hook for sending broadcast messages */
export function useSendBroadcast() {
  return useMutation({
    mutationFn: (payload: BroadcastPayload) => sendBroadcast(payload),
  });
}
