import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchKunjunganList,
  createKunjungan,
  approveKunjungan,
  getKunjunganById,
  type CreateKunjunganPayload,
} from "@/app/lib/api/services/kunjungan";

/** React Query hook for fetching kunjungan list */
export function useKunjunganList() {
  return useQuery({
    queryKey: ["kunjungan"],
    queryFn: fetchKunjunganList,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching a single kunjungan by ID */
export function useKunjungan(id: string) {
  return useQuery({
    queryKey: ["kunjungan", id],
    queryFn: () => getKunjunganById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/** React Query mutation hook for creating a kunjungan */
export function useCreateKunjungan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateKunjunganPayload) => createKunjungan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kunjungan"] });
    },
  });
}

/** React Query mutation hook for approving a kunjungan */
export function useApproveKunjungan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveKunjungan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kunjungan"] });
    },
  });
}
