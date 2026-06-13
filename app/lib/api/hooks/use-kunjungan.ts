"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKunjungan, type CreateKunjunganPayload } from "@/app/lib/api/services/kunjungan";

/** Hook JAMstack: POST /kunjungan — ajukan kunjungan (public) */
export function useCreateKunjungan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateKunjunganPayload) => createKunjungan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kunjungan"] });
    },
  });
}
