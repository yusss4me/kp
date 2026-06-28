import { useQuery } from "@tanstack/react-query";
import { fetchRiwayatDonasi, fetchRiwayatKunjungan } from "@/app/lib/api/services/auth";

/** React Query hook for fetching current user's donation history */
export function useRiwayatDonasi() {
  return useQuery({
    queryKey: ["user-riwayat-donasi"],
    queryFn: fetchRiwayatDonasi,
    staleTime: 5 * 60 * 1000,
  });
}

/** React Query hook for fetching current user's visit booking history */
export function useRiwayatKunjungan() {
  return useQuery({
    queryKey: ["user-riwayat-kunjungan"],
    queryFn: fetchRiwayatKunjungan,
    staleTime: 5 * 60 * 1000,
  });
}
