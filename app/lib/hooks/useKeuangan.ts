import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTransaksiKeuanganList,
  createTransaksiKeuangan,
  fetchLaporanKeuangan,
  fetchKasSaldo,
  type CreateTransaksiKeuanganPayload,
  type LaporanKeuanganFilter,
} from "@/app/lib/api/services/keuangan";

/** React Query hook for fetching transaksi keuangan list */
export function useTransaksiKeuangan() {
  return useQuery({
    queryKey: ["transaksi-keuangan"],
    queryFn: fetchTransaksiKeuanganList,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query mutation hook for creating a transaksi keuangan */
export function useCreateTransaksiKeuangan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTransaksiKeuanganPayload) => createTransaksiKeuangan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi-keuangan"] });
      queryClient.invalidateQueries({ queryKey: ["keuangan-laporan"] });
      queryClient.invalidateQueries({ queryKey: ["kas-saldo"] });
    },
  });
}

/** React Query hook for fetching laporan keuangan with optional filters */
export function useLaporanKeuangan(filter?: LaporanKeuanganFilter) {
  return useQuery({
    queryKey: ["keuangan-laporan", filter],
    queryFn: () => fetchLaporanKeuangan(filter),
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching kas saldo */
export function useKasSaldo() {
  return useQuery({
    queryKey: ["kas-saldo"],
    queryFn: fetchKasSaldo,
    staleTime: 2 * 60 * 1000,
  });
}
