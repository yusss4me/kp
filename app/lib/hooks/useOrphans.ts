import { useQuery } from "@tanstack/react-query";
import { fetchAnakAsuh } from "@/app/lib/api/services/anak-asuh";

/** React Query hook for fetching orphans (anak asuh) */
export function useOrphans() {
  return useQuery({
    queryKey: ["orphans"],
    queryFn: fetchAnakAsuh,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
