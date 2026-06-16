import { describe, it, expect } from "vitest";
import { unwrapList } from "@/app/lib/api/response";

describe("unwrapList", () => {
  it("returns the array directly when given an array", () => {
    const input = [1, 2, 3];
    expect(unwrapList<number>(input)).toEqual([1, 2, 3]);
  });

  it("unwraps { data: [...] } envelope", () => {
    const input = { data: [{ id: 1 }, { id: 2 }] };
    const result = unwrapList<{ id: number }>(input);
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("returns empty array for null", () => {
    expect(unwrapList(null)).toEqual([]);
  });

  it("returns empty array for undefined", () => {
    expect(unwrapList(undefined)).toEqual([]);
  });

  it("returns empty array for non-array, non-object", () => {
    expect(unwrapList("hello")).toEqual([]);
    expect(unwrapList(42)).toEqual([]);
  });

  it("returns empty array when data property is not an array", () => {
    expect(unwrapList({ data: "not-an-array" })).toEqual([]);
  });

  it("handles empty array input", () => {
    expect(unwrapList([])).toEqual([]);
  });

  it("handles empty data array in envelope", () => {
    expect(unwrapList({ data: [] })).toEqual([]);
  });
});
