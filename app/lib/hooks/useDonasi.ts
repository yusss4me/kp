import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDonasi, type CreateDonasiPayload } from "@/app/lib/api/services/donasi";

/** React Query mutation hook for creating a donation */
export function useCreateDonasi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDonasiPayload) => createDonasi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}
