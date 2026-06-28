import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPrograms } from "@/app/lib/api/services/programs";
import { apiClient } from "@/app/lib/api/client";

// Mock the apiClient completely
vi.mock("@/app/lib/api/client", () => {
  return {
    apiClient: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe("Programs API Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls /kampanye endpoint correctly without params", async () => {
    (apiClient.get as any).mockResolvedValue({
      data: {
        data: [
          { id: 1, judul: "Program A" }
        ]
      }
    });

    const result = await fetchPrograms();

    expect(apiClient.get).toHaveBeenCalledWith("/kampanye", { params: undefined });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Program A");
  });

  it("calls /kampanye endpoint with status filter", async () => {
    (apiClient.get as any).mockResolvedValue({
      data: {
        data: []
      }
    });

    await fetchPrograms("Aktif");

    expect(apiClient.get).toHaveBeenCalledWith("/kampanye", { params: { status: "Aktif" } });
  });

  it("handles 404 gracefully", async () => {
    const error = new Error("Not Found") as any;
    error.response = { status: 404 };
    
    (apiClient.get as any).mockRejectedValue(error);

    const result = await fetchPrograms();
    
    expect(result).toEqual([]);
  });
});
