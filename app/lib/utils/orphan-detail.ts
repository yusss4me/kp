import type { Orphan } from "@/app/lib/types/entities";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop";

export function orphanToDetailView(orphan: Orphan) {
  const target = 5_000_000;
  const raised = Math.min(target - 1, 500_000 + orphan.id * 200_000);

  return {
    image: DEFAULT_IMAGE,
    name: orphan.name,
    age: 0,
    location: "Rumah Yatim YAMUTI",
    description: `${orphan.name} adalah anak asuh YAMUTI (status: ${orphan.status}). Dana donasi digunakan untuk kebutuhan pendidikan, kesehatan, dan asuh harian.`,
    target,
    raised,
    donorsCount: 20 + orphan.id * 3,
    daysRemaining: 30,
    author: {
      name: "Yayasan Yamuti",
      avatar: "https://i.pravatar.cc/150?u=yamuti",
    },
    gallery: [DEFAULT_IMAGE],
  };
}

export const DEFAULT_ANAK_DETAIL = orphanToDetailView({
  id: 0,
  name: "Ahmad Syaifuddin",
  birthDate: "2015-01-01",
  kategori_bayi: false,
  status: "Aktif",
});
