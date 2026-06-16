import { describe, it, expect } from "vitest";
import { mapProgram } from "@/app/lib/api/services/programs";

describe("mapProgram", () => {
  it("maps English field names correctly", () => {
    const result = mapProgram({
      id: 1,
      title: "Education Fund",
      description: "Help students",
      category: "Pendidikan",
      location: "Tasikmalaya",
      target_amount: 5000000,
      collected_amount: 2500000,
      end_date: "2025-12-31",
      thumbnail_url: "/img.jpg",
    });

    expect(result.id).toBe("1");
    expect(result.title).toBe("Education Fund");
    expect(result.description).toBe("Help students");
    expect(result.category).toBe("Pendidikan");
    expect(result.location).toBe("Tasikmalaya");
    expect(result.targetAmount).toBe(5000000);
    expect(result.collectedAmount).toBe(2500000);
    expect(result.deadline).toBe("2025-12-31");
    expect(result.image).toBe("/img.jpg");
    expect(result.progress).toBe(50);
  });

  it("maps Indonesian field names correctly", () => {
    const result = mapProgram({
      id: "2",
      judul: "Program Kesehatan",
      deskripsi: "Bantuan kesehatan",
      kategori: "Kesehatan",
      lokasi: "Bandung",
      target_amount: 1000000,
      collected_amount: 0,
    });

    expect(result.title).toBe("Program Kesehatan");
    expect(result.description).toBe("Bantuan kesehatan");
    expect(result.category).toBe("Kesehatan");
    expect(result.location).toBe("Bandung");
    expect(result.progress).toBe(0);
  });

  it("uses defaults for missing fields", () => {
    const result = mapProgram({ id: 3 });

    expect(result.title).toBe("Program");
    expect(result.category).toBe("Umum");
    expect(result.location).toBe("—");
    expect(result.description).toBe("");
    expect(result.targetAmount).toBe(0);
    expect(result.collectedAmount).toBe(0);
    expect(result.progress).toBe(0);
  });

  it("prefers snake_case over camelCase when both present", () => {
    const result = mapProgram({
      id: 4,
      title: "CamelCase Title",
      judul: "Snake Title",
      targetAmount: 200,
      target_amount: 100,
    });

    // snake_case (target_amount) is checked first via ??
    expect(result.targetAmount).toBe(100);
  });

  it("caps progress at 100", () => {
    const result = mapProgram({
      id: 5,
      target_amount: 100,
      collected_amount: 200,
    });

    expect(result.progress).toBe(100);
  });

  it("handles string ID", () => {
    expect(mapProgram({ id: "abc" }).id).toBe("abc");
  });

  it("handles numeric ID", () => {
    expect(mapProgram({ id: 42 }).id).toBe("42");
  });
});
