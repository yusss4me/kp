import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminsList,
  fetchAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  type CreateAdminPayload,
  type UpdateAdminPayload,
} from "@/app/lib/api/services/admins";

/** React Query hook for fetching admins list (Owner only) */
export function useAdminsList() {
  return useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdminsList,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching a single admin by ID */
export function useAdmin(id: string | number) {
  return useQuery({
    queryKey: ["admins", id],
    queryFn: () => fetchAdminById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

/** React Query mutation hook for creating an admin */
export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAdminPayload) => createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}

/** React Query mutation hook for updating an admin */
export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateAdminPayload }) =>
      updateAdmin(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}

/** React Query mutation hook for deleting an admin */
export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}
