"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadGaleri } from "@/app/lib/api/services/galeri";
import type { ApiGaleriPayload } from "@/app/lib/types/api-types";

/** Hook JAMstack: POST /galeri — unggah foto galeri (admin) */
export function useUploadGaleri() {
  return useMutation({
    mutationFn: (payload: ApiGaleriPayload) => uploadGaleri(payload),
  });
}
