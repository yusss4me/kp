import { useQuery } from "@tanstack/react-query";
import { fetchPrograms } from "@/app/lib/api/services/programs";
import type { Program } from "@/app/lib/types/entities";

/** React Query hook for fetching programs */
export function usePrograms() {
  return useQuery<Program[]>({
    queryKey: ["programs"],
    queryFn: () => fetchPrograms(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
