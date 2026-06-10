"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAnakAsuh } from "@/app/lib/api/services/anak-asuh";

/** Hook JAMstack: GET /anak-asuh */
export function useAnakAsuh() {
  return useQuery({
    queryKey: ["anak-asuh"],
    queryFn: fetchAnakAsuh,
    staleTime: 60_000,
    retry: 1,
  });
}
