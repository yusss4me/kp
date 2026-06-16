import { describe, it, expect } from "vitest";
import {
  buildFinanceStats,
  buildInventoryStats,
  buildKunjunganStats,
  buildBroadcastStats,
  buildOwnerOversightStats,
  buildProgramPerformance,
} from "@/app/lib/utils/dashboard-stats";
import type {
  FinanceTransaction,
  InventoryItem,
  VisitBooking,
  Program,
  PendingDonation,
} from "@/app/lib/types/entities";

const makeTransaction = (overrides: Partial<FinanceTransaction> = {}): FinanceTransaction => ({
  id: 1,
  type: "Income",
  category: "Donasi",
  amount: "Rp 100.000",
  amountRaw: 100000,
  date: "2025-01-01",
  status: "confirmed",
  ...overrides,
});

const makeInventory = (overrides: Partial<InventoryItem> = {}): InventoryItem => ({
  id: 1,
  name: "Beras",
  category: "Sembako",
  stock: "10",
  status: "Cukup",
  ...overrides,
});

const makeBooking = (overrides: Partial<VisitBooking> = {}): VisitBooking => ({
  id: 1,
  visitor: "John",
  phone: "0812",
  date: "2025-01-01",
  time: "10:00",
  type: "Silaturahmi",
  status: "Menunggu",
  ...overrides,
});

const makeProgram = (overrides: Partial<Program> = {}): Program => ({
  id: "prog-1",
  title: "Test Program",
  category: "Pendidikan",
  location: "Tasikmalaya",
  description: "Test",
  targetAmount: 1000000,
  collectedAmount: 500000,
  deadline: "2025-12-31",
  target: "Rp 1.000.000",
  collected: "Rp 500.000",
  progress: 50,
  ...overrides,
});

describe("buildFinanceStats", () => {
  it("calculates income, expense, and balance correctly", () => {
    const transactions: FinanceTransaction[] = [
      makeTransaction({ type: "Income", amountRaw: 500000 }),
      makeTransaction({ type: "Income", amountRaw: 300000 }),
      makeTransaction({ type: "Expense", amountRaw: 200000 }),
    ];

    const stats = buildFinanceStats(transactions);
    expect(stats).toHaveLength(5);
    expect(stats[0].value).toContain("800");
    expect(stats[1].value).toContain("200");
    expect(stats[2].value).toContain("600");
    // Distribution stats (branch 10%, central 90%) default to 0 when no distributions
    expect(stats[3].value).toContain("0");
    expect(stats[4].value).toContain("0");
  });

  it("returns zero stats for empty transactions", () => {
    const stats = buildFinanceStats([]);
    expect(stats[0].value).toContain("0");
    expect(stats[1].value).toContain("0");
    expect(stats[2].value).toContain("0");
  });
});

describe("buildInventoryStats", () => {
  it("counts low stock items correctly", () => {
    const items: InventoryItem[] = [
      makeInventory({ status: "Cukup" }),
      makeInventory({ id: 2, status: "Menipis" }),
      makeInventory({ id: 3, status: "Habis" }),
    ];

    const stats = buildInventoryStats(items);
    expect(stats).toHaveLength(3);
    expect(stats[0].value).toBe("3 Item");
    expect(stats[2].value).toBe("2 Item");
  });

  it("handles empty inventory", () => {
    const stats = buildInventoryStats([]);
    expect(stats[0].value).toBe("0 Item");
    expect(stats[2].value).toBe("0 Item");
  });
});

describe("buildKunjunganStats", () => {
  it("categorizes bookings by status", () => {
    const bookings: VisitBooking[] = [
      makeBooking({ status: "Menunggu" }),
      makeBooking({ id: 2, status: "Menunggu" }),
      makeBooking({ id: 3, status: "Selesai" }),
      makeBooking({ id: 4, status: "Dikonfirmasi" }),
    ];

    const stats = buildKunjunganStats(bookings);
    expect(stats).toHaveLength(3);
    expect(stats[0].value).toBe("4");
    expect(stats[1].value).toBe("2");
    expect(stats[2].value).toBe("2");
  });
});

describe("buildBroadcastStats", () => {
  it("returns 3 stat items with placeholder values", () => {
    const stats = buildBroadcastStats();
    expect(stats).toHaveLength(3);
    stats.forEach((s) => expect(s.value).toBeDefined());
  });
});

describe("buildOwnerOversightStats", () => {
  it("calculates total donations from pending list", () => {
    const programs = [makeProgram()];
    const donations: PendingDonation[] = [
      { id: "d1", nama: "A", description: "", tipe: "transfer", jumlah: "Rp 100.000", tanggal: "2025-01-01" },
      { id: "d2", nama: "B", description: "", tipe: "qris", jumlah: "Rp 200.000", tanggal: "2025-01-02" },
    ];

    const stats = buildOwnerOversightStats(programs, donations);
    expect(stats).toHaveLength(4);
    expect(stats[3].value).toContain("300");
  });
});

describe("buildProgramPerformance", () => {
  it("maps programs to performance entries", () => {
    const programs = [
      makeProgram({ progress: 90 }),
      makeProgram({ id: "p2", progress: 50 }),
      makeProgram({ id: "p3", progress: 10 }),
    ];

    const result = buildProgramPerformance(programs);
    expect(result).toHaveLength(3);
    expect(result[0].status).toBe("Active");
    expect(result[2].status).toBe("Critical");
  });
});
