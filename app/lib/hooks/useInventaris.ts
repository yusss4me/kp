import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchInventarisList,
  fetchInventarisById,
  createInventaris,
  updateInventaris,
  deleteInventaris,
  type CreateInventarisPayload,
  type UpdateInventarisPayload,
} from "@/app/lib/api/services/inventaris";

/** React Query hook for fetching inventaris list */
export function useInventarisList() {
  return useQuery({
    queryKey: ["inventaris"],
    queryFn: fetchInventarisList,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching a single inventaris item by ID */
export function useInventaris(id: string | number) {
  return useQuery({
    queryKey: ["inventaris", id],
    queryFn: () => fetchInventarisById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/** React Query mutation hook for creating an inventaris item */
export function useCreateInventaris() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInventarisPayload) => createInventaris(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventaris"] });
    },
  });
}

/** React Query mutation hook for updating an inventaris item */
export function useUpdateInventaris() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateInventarisPayload }) =>
      updateInventaris(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventaris"] });
    },
  });
}

/** React Query mutation hook for deleting an inventaris item */
export function useDeleteInventaris() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteInventaris(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventaris"] });
    },
  });
}
