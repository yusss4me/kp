import { describe, it, expect } from "vitest";
import { mapOrphan } from "@/app/lib/api/services/anak-asuh";
import type { ApiOrphanResponse } from "@/app/lib/types/api-types";

describe("mapOrphan", () => {
  it("maps Indonesian field names (nama, tanggal_lahir)", () => {
    const result = mapOrphan({
      id: 1,
      nama: "Budi Santoso",
      tanggal_lahir: "2015-06-15",
      status: "Aktif",
      kategori_bayi: false,
    });

    expect(result.id).toBe(1);
    expect(result.name).toBe("Budi Santoso");
    expect(result.birthDate).toBe("2015-06-15");
    expect(result.status).toBe("Aktif");
    expect(result.kategori_bayi).toBe(false);
  });

  it("maps English field names (name, birth_date)", () => {
    const result = mapOrphan({
      id: "2",
      name: "Siti Aminah",
      birth_date: "2018-03-20",
      status: "Baru",
      kategori_bayi: true,
    });

    expect(result.id).toBe(2);
    expect(result.name).toBe("Siti Aminah");
    expect(result.birthDate).toBe("2018-03-20");
    expect(result.status).toBe("Baru");
    expect(result.kategori_bayi).toBe(true);
  });

  it("prefers nama over name", () => {
    const result = mapOrphan({
      id: 3,
      nama: "Indonesian Name",
      name: "English Name",
      status: "Aktif",
    });

    expect(result.name).toBe("Indonesian Name");
  });

  it("defaults name to dash when missing", () => {
    const result = mapOrphan({
      id: 4,
      status: "Baru",
    });

    expect(result.name).toBe("—");
  });

  it("defaults status to Baru when missing", () => {
    const result = mapOrphan({
      id: 5,
      nama: "Test",
    } as ApiOrphanResponse);

    expect(result.status).toBe("Baru");
  });

  it("defaults kategori_bayi to false when missing", () => {
    const result = mapOrphan({
      id: 6,
      nama: "Test",
      status: "Aktif",
    });

    expect(result.kategori_bayi).toBe(false);
  });

  it("converts string ID to number", () => {
    const result = mapOrphan({
      id: "42",
      nama: "Test",
      status: "Aktif",
    });

    expect(result.id).toBe(42);
    expect(typeof result.id).toBe("number");
  });

  it("handles numeric ID directly", () => {
    const result = mapOrphan({
      id: 100,
      nama: "Test",
      status: "Alumni",
    });

    expect(result.id).toBe(100);
  });

  it("handles empty birth date", () => {
    const result = mapOrphan({
      id: 7,
      nama: "No DOB",
      status: "Aktif",
    });

    expect(result.birthDate).toBe("");
  });
});
