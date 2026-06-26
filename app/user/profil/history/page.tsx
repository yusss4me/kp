"use client";

import { ProfileHistoryTemplate } from "@/app/ui/templates/profile-history";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function Page() {
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);

  // API: GET /donasi/riwayat — route belum tersedia di backend
  // const { data: donations } = useQuery({ queryKey: ['donasi-riwayat'], queryFn: fetchDonasiRiwayat });
  const donations = pendingDonations.map((d, i) => ({
    id: i + 1,
    title: d.nama,
    amount: d.jumlah,
    date: d.tanggal,
    status: "Berhasil",
  }));

  return <ProfileHistoryTemplate donations={donations} />;
}
