import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAnakAsuh,
  fetchAnakAsuhById,
  createAnakAsuh,
  updateAnakAsuh,
  deleteAnakAsuh,
  type CreateAnakAsuhPayload,
  type UpdateAnakAsuhPayload,
} from "@/app/lib/api/services/anak-asuh";

/** React Query hook for fetching anak asuh list */
export function useOrphans() {
  return useQuery({
    queryKey: ["orphans"],
    queryFn: fetchAnakAsuh,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching a single anak asuh by ID */
export function useAnakAsuh(id: string | number) {
  return useQuery({
    queryKey: ["anak-asuh", id],
    queryFn: () => fetchAnakAsuhById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/** React Query mutation hook for creating an anak asuh */
export function useCreateAnakAsuh() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => createAnakAsuh(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orphans"] });
      queryClient.invalidateQueries({ queryKey: ["anak-asuh"] });
    },
  });
}

/** React Query mutation hook for updating an anak asuh */
export function useUpdateAnakAsuh() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateAnakAsuhPayload }) =>
      updateAnakAsuh(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orphans"] });
      queryClient.invalidateQueries({ queryKey: ["anak-asuh"] });
    },
  });
}

/** React Query mutation hook for deleting an anak asuh */
export function useDeleteAnakAsuh() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteAnakAsuh(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orphans"] });
      queryClient.invalidateQueries({ queryKey: ["anak-asuh"] });
    },
  });
}
