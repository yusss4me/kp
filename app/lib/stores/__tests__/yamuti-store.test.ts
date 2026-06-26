import { describe, it, expect, beforeEach, vi } from "vitest";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import type { Orphan, Program, InventoryItem, VisitBooking, PendingDonation } from "@/app/lib/types/entities";

// Mock API services
vi.mock("@/app/lib/api/services/anak-asuh", () => ({
  fetchAnakAsuh: vi.fn().mockResolvedValue([]),
  createAnakAsuh: vi.fn().mockResolvedValue({ id: 1 }),
}));
vi.mock("@/app/lib/api/services/donasi", () => ({
  createDonasi: vi.fn().mockResolvedValue({}),
  verifyDonasi: vi.fn().mockResolvedValue({}),
}));
vi.mock("@/app/lib/api/services/kunjungan", () => ({
  approveKunjungan: vi.fn().mockResolvedValue({}),
  createKunjungan: vi.fn().mockResolvedValue({}),
  fetchKunjunganList: vi.fn().mockResolvedValue([]),
  updateKunjunganStatus: vi.fn().mockResolvedValue({}),
}));
vi.mock("@/app/lib/api/services/programs", () => ({
  fetchPrograms: vi.fn().mockResolvedValue([]),
}));
vi.mock("@/app/lib/api/services/logistik", () => ({
  catatMutasiBarang: vi.fn().mockResolvedValue({}),
}));

describe("yamuti-store - Orphan CRUD", () => {
  beforeEach(() => {
    useYamutiStore.setState({
      orphans: [],
      error: null,
      isLoading: false,
    });
  });

  it("updateOrphan updates existing orphan", () => {
    useYamutiStore.setState({
      orphans: [{ id: 1, name: "Budi", birthDate: "2015-01-01", status: "Aktif", kategori_bayi: false }],
    });

    useYamutiStore.getState().updateOrphan(1, { name: "Budi Updated" });

    expect(useYamutiStore.getState().orphans[0].name).toBe("Budi Updated");
  });

  it("deleteOrphan removes orphan", () => {
    useYamutiStore.setState({
      orphans: [
        { id: 1, name: "A", birthDate: "2015-01-01", status: "Aktif", kategori_bayi: false },
        { id: 2, name: "B", birthDate: "2016-01-01", status: "Baru", kategori_bayi: false },
      ],
    });

    useYamutiStore.getState().deleteOrphan(1);

    expect(useYamutiStore.getState().orphans).toHaveLength(1);
    expect(useYamutiStore.getState().orphans[0].id).toBe(2);
  });

  it("getOrphanById finds correct orphan", () => {
    useYamutiStore.setState({
      orphans: [{ id: 42, name: "Found", birthDate: "2015-01-01", status: "Aktif", kategori_bayi: false }],
    });

    const found = useYamutiStore.getState().getOrphanById(42);
    expect(found?.name).toBe("Found");
  });

  it("getOrphanById returns undefined for missing orphan", () => {
    expect(useYamutiStore.getState().getOrphanById(999)).toBeUndefined();
  });
});

describe("yamuti-store - Program CRUD", () => {
  beforeEach(() => {
    useYamutiStore.setState({ programs: [], error: null });
  });

  it("addProgram creates program with generated ID", () => {
    const id = useYamutiStore.getState().addProgram({
      title: "Test Program",
      category: "Pendidikan",
      location: "Tasikmalaya",
      description: "Test",
      targetAmount: 1000000,
      collectedAmount: 0,
      deadline: "2025-12-31",
    });

    expect(id).toMatch(/^prog-/);
    expect(useYamutiStore.getState().programs).toHaveLength(1);
  });

  it("updateProgram modifies existing program", () => {
    useYamutiStore.setState({
      programs: [{
        id: "p1", title: "Old", category: "A", location: "B",
        description: "", targetAmount: 100, collectedAmount: 0,
        deadline: "", target: "Rp 100", collected: "Rp 0", progress: 0,
      }],
    });

    useYamutiStore.getState().updateProgram("p1", { title: "New" });
    expect(useYamutiStore.getState().programs[0].title).toBe("New");
  });

  it("deleteProgram removes program", () => {
    useYamutiStore.setState({
      programs: [
        { id: "p1", title: "A", category: "", location: "", description: "", targetAmount: 0, collectedAmount: 0, deadline: "", target: "", collected: "", progress: 0 },
        { id: "p2", title: "B", category: "", location: "", description: "", targetAmount: 0, collectedAmount: 0, deadline: "", target: "", collected: "", progress: 0 },
      ],
    });

    useYamutiStore.getState().deleteProgram("p1");
    expect(useYamutiStore.getState().programs).toHaveLength(1);
  });
});

describe("yamuti-store - Inventory CRUD", () => {
  beforeEach(() => {
    useYamutiStore.setState({ inventory: [], error: null });
  });

  it("updateInventory modifies item", () => {
    useYamutiStore.setState({
      inventory: [{ id: 1, name: "Rice", category: "Food", stock: "10", status: "Cukup" }],
    });

    useYamutiStore.getState().updateInventory(1, { stock: "5" });
    expect(useYamutiStore.getState().inventory[0].stock).toBe("5");
  });

  it("deleteInventory removes item", () => {
    useYamutiStore.setState({
      inventory: [
        { id: 1, name: "A", category: "", stock: "1", status: "Cukup" },
        { id: 2, name: "B", category: "", stock: "2", status: "Cukup" },
      ],
    });

    useYamutiStore.getState().deleteInventory(1);
    expect(useYamutiStore.getState().inventory).toHaveLength(1);
  });
});

describe("yamuti-store - Donation management", () => {
  beforeEach(() => {
    useYamutiStore.setState({ pendingDonations: [], error: null });
  });

  it("verifyDonation removes from pending", () => {
    useYamutiStore.setState({
      pendingDonations: [
        { id: "d1", nama: "A", description: "", tipe: "transfer", jumlah: "Rp 100.000", tanggal: "" },
        { id: "d2", nama: "B", description: "", tipe: "qris", jumlah: "Rp 200.000", tanggal: "" },
      ],
    });

    useYamutiStore.getState().verifyDonation("d1");
    expect(useYamutiStore.getState().pendingDonations).toHaveLength(1);
    expect(useYamutiStore.getState().pendingDonations[0].id).toBe("d2");
  });

  it("rejectDonation removes from pending", () => {
    useYamutiStore.setState({
      pendingDonations: [
        { id: "d1", nama: "A", description: "", tipe: "transfer", jumlah: "Rp 100.000", tanggal: "" },
      ],
    });

    useYamutiStore.getState().rejectDonation("d1");
    expect(useYamutiStore.getState().pendingDonations).toHaveLength(0);
  });
});

describe("yamuti-store - Booking CRUD", () => {
  beforeEach(() => {
    useYamutiStore.setState({ bookings: [], error: null });
  });

  it("updateBooking modifies booking", () => {
    useYamutiStore.setState({
      bookings: [{ id: 1, visitor: "John", phone: "0812", date: "2025-01-01", time: "10:00", type: "Visit", status: "Menunggu" }],
    });

    useYamutiStore.getState().updateBooking(1, { status: "Dikonfirmasi" });
    expect(useYamutiStore.getState().bookings[0].status).toBe("Dikonfirmasi");
  });

  it("deleteBooking removes booking", () => {
    useYamutiStore.setState({
      bookings: [
        { id: 1, visitor: "A", phone: "", date: "", time: "", type: "", status: "Menunggu" },
        { id: 2, visitor: "B", phone: "", date: "", time: "", type: "", status: "Selesai" },
      ],
    });

    useYamutiStore.getState().deleteBooking(2);
    expect(useYamutiStore.getState().bookings).toHaveLength(1);
  });
});

describe("yamuti-store - Admin CRUD", () => {
  beforeEach(() => {
    useYamutiStore.setState({ admins: [], error: null });
  });

  it("addAdmin creates admin with generated ID", () => {
    const id = useYamutiStore.getState().addAdmin({
      name: "Admin Baru",
      role: "admin",
      email: "new@test.com",
      status: "Aktif",
    });

    expect(id).toMatch(/^admin-/);
    expect(useYamutiStore.getState().admins).toHaveLength(1);
  });

  it("deleteAdmin removes admin", () => {
    useYamutiStore.setState({
      admins: [
        { id: "a1", name: "A", role: "admin", email: "a@t.com", status: "Aktif" },
        { id: "a2", name: "B", role: "admin", email: "b@t.com", status: "Aktif" },
      ],
    });

    useYamutiStore.getState().deleteAdmin("a1");
    expect(useYamutiStore.getState().admins).toHaveLength(1);
  });
});

describe("yamuti-store - News CRUD", () => {
  beforeEach(() => {
    useYamutiStore.setState({ news: [], error: null });
  });

  it("addNews creates news with generated ID", () => {
    const id = useYamutiStore.getState().addNews({
      title: "Breaking News",
      content: "Content here",
      summary: "Summary",
      author: "Admin",
      date: "2025-01-01",
      imageUrl: "/img.jpg",
    });

    expect(id).toMatch(/^news-/);
    expect(useYamutiStore.getState().news).toHaveLength(1);
  });

  it("updateNews modifies news", () => {
    useYamutiStore.setState({
      news: [{ id: "n1", title: "Old", content: "", summary: "", author: "", date: "", imageUrl: "" }],
    });

    useYamutiStore.getState().updateNews("n1", { title: "Updated" });
    expect(useYamutiStore.getState().news[0].title).toBe("Updated");
  });

  it("deleteNews removes news", () => {
    useYamutiStore.setState({
      news: [
        { id: "n1", title: "A", content: "", summary: "", author: "", date: "", imageUrl: "" },
        { id: "n2", title: "B", content: "", summary: "", author: "", date: "", imageUrl: "" },
      ],
    });

    useYamutiStore.getState().deleteNews("n1");
    expect(useYamutiStore.getState().news).toHaveLength(1);
  });
});

describe("yamuti-store - Foundation Profile", () => {
  it("updateFoundationProfile sets profile", () => {
    useYamutiStore.getState().updateFoundationProfile({
      name: "YAMUTI",
      vision: "Vision",
      mission: "Mission",
      aboutUs: "About",
      address: "Tasikmalaya",
      phone: "0265-123",
      email: "info@yamuti.org",
    });

    expect(useYamutiStore.getState().foundationProfile?.name).toBe("YAMUTI");
  });
});
