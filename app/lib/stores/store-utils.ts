/**
 * Shared error handling utilities for all Zustand stores.
 * Extracted from the monolithic yamuti-store for reuse.
 */

/** Check if error is an auth failure (401/403) */
export function isAuthError(error: any): boolean {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

/** Check if error is a validation failure (422) */
export function isValidationError(error: any): boolean {
  return error?.response?.status === 422;
}

/** Extract user-friendly error message with 401 and 422 awareness */
export function getErrorMessage(error: any, fallback: string): string {
  if (isAuthError(error)) {
    return "Sesi login Anda telah berakhir. Silakan login kembali.";
  }
  if (isValidationError(error)) {
    const validationErrors = error?.response?.data?.errors;
    if (validationErrors && typeof validationErrors === "object") {
      const messages = Object.values(validationErrors).flat().join(", ");
      return `Validasi gagal: ${messages}`;
    }
    return error?.response?.data?.message || "Data yang dikirim tidak valid.";
  }
  return error?.response?.data?.message || error?.message || fallback;
}

/** Common loading/error state shared by all domain stores */
export interface BaseStoreState {
  isLoading: boolean;
  error: string | null;
}

export const baseInitialState: BaseStoreState = {
  isLoading: false,
  error: null,
};
