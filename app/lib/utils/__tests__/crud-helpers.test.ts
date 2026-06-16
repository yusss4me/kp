import { describe, it, expect } from "vitest";
import {
  generateId,
  generateNumericId,
  formatRupiah,
  calcProgress,
  programToListItem,
} from "@/app/lib/utils/crud-helpers";

describe("generateId", () => {
  it("returns a string starting with the given prefix", () => {
    const id = generateId("prog-");
    expect(id).toMatch(/^prog-.+/);
  });

  it("returns unique IDs on successive calls", () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateId()));
    expect(ids.size).toBe(50);
  });

  it("works with empty prefix", () => {
    const id = generateId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });
});

describe("generateNumericId", () => {
  it("returns 1 for an empty array", () => {
    expect(generateNumericId([])).toBe(1);
  });

  it("returns max(id) + 1", () => {
    expect(generateNumericId([{ id: 3 }, { id: 7 }, { id: 1 }])).toBe(8);
  });

  it("handles single-item array", () => {
    expect(generateNumericId([{ id: 42 }])).toBe(43);
  });
});

describe("formatRupiah", () => {
  it("formats zero correctly", () => {
    expect(formatRupiah(0)).toBe("Rp 0");
  });

  it("formats thousands with locale separator", () => {
    const result = formatRupiah(1000000);
    expect(result).toMatch(/Rp 1[.,]000[.,]000/);
  });

  it("handles negative amounts", () => {
    const result = formatRupiah(-50000);
    expect(result).toContain("50");
  });
});

describe("calcProgress", () => {
  it("returns 0 when target is 0", () => {
    expect(calcProgress(50, 0)).toBe(0);
  });

  it("returns 0 when target is negative", () => {
    expect(calcProgress(50, -100)).toBe(0);
  });

  it("returns correct percentage", () => {
    expect(calcProgress(50, 100)).toBe(50);
  });

  it("caps at 100", () => {
    expect(calcProgress(200, 100)).toBe(100);
  });

  it("rounds to nearest integer", () => {
    expect(calcProgress(1, 3)).toBe(33);
  });
});

describe("programToListItem", () => {
  it("returns formatted target, collected, and progress", () => {
    const result = programToListItem({
      title: "Test",
      targetAmount: 1000000,
      collectedAmount: 500000,
    });

    expect(result.target).toContain("1");
    expect(result.collected).toContain("500");
    expect(result.progress).toBe(50);
  });

  it("handles zero collected amount", () => {
    const result = programToListItem({
      title: "Test",
      targetAmount: 100000,
      collectedAmount: 0,
    });

    expect(result.progress).toBe(0);
  });
});
