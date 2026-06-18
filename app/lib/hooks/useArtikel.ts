import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchArtikelList,
  fetchArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel,
  fetchKategoriArtikel,
  createKategoriArtikel,
  updateKategoriArtikel,
  deleteKategoriArtikel,
  type CreateArtikelPayload,
} from "@/app/lib/api/services/artikel";

/** React Query hook for fetching artikel list */
export function useArtikelList() {
  return useQuery({
    queryKey: ["artikel"],
    queryFn: fetchArtikelList,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching a single artikel by ID */
export function useArtikel(id: string | number) {
  return useQuery({
    queryKey: ["artikel", id],
    queryFn: () => fetchArtikelById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/** React Query mutation hook for creating an artikel */
export function useCreateArtikel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateArtikelPayload) => createArtikel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artikel"] });
    },
  });
}

/** React Query mutation hook for updating an artikel */
export function useUpdateArtikel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string | number;
      payload: Partial<CreateArtikelPayload>;
    }) => updateArtikel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artikel"] });
    },
  });
}

/** React Query mutation hook for deleting an artikel */
export function useDeleteArtikel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteArtikel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artikel"] });
    },
  });
}

/** React Query hook for fetching kategori artikel */
export function useKategoriArtikel() {
  return useQuery({
    queryKey: ["kategori-artikel"],
    queryFn: fetchKategoriArtikel,
    staleTime: 10 * 60 * 1000,
  });
}

/** React Query mutation hook for creating a kategori artikel */
export function useCreateKategoriArtikel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { nama: string }) => createKategoriArtikel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kategori-artikel"] });
    },
  });
}

/** React Query mutation hook for updating a kategori artikel */
export function useUpdateKategoriArtikel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: { nama?: string } }) =>
      updateKategoriArtikel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kategori-artikel"] });
    },
  });
}

/** React Query mutation hook for deleting a kategori artikel */
export function useDeleteKategoriArtikel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteKategoriArtikel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kategori-artikel"] });
    },
  });
}
