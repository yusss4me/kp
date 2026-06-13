"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDonasi, type CreateDonasiPayload } from "@/app/lib/api/services/donasi";

/** Hook JAMstack: POST /donasi — buat donasi (public) */
export function useCreateDonasi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDonasiPayload) => createDonasi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donasi"] });
    },
  });
}
