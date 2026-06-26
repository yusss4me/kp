/** Helper untuk menormalisasi bentuk respons API Laravel (termasuk paginated response) */
export function unwrapList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    if ("data" in data) {
      const inner = (data as { data: unknown }).data;
      // Langsung array: { data: [...] }
      if (Array.isArray(inner)) return inner as T[];
      // Laravel paginated: { data: { current_page, data: [...] } }
      if (inner && typeof inner === "object" && "data" in inner) {
        const paginated = (inner as { data: unknown }).data;
        if (Array.isArray(paginated)) return paginated as T[];
      }
    }
    
    // Fallback: cari kunci pertama yang berisi array (misal: { kunjungan: [...] })
    for (const key in data) {
      const val = (data as any)[key];
      if (Array.isArray(val)) return val as T[];
    }
  }
  return [];
}
