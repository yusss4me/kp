"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPrograms } from "@/app/lib/api/services/programs";

/** Hook JAMstack: GET /programs (dinonaktifkan — route belum tersedia di backend) */
export function usePrograms() {
  return useQuery({
    queryKey: ["programs"],
    queryFn: fetchPrograms,
    staleTime: 60_000,
    retry: false,
  });
}
