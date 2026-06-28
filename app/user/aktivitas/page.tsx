"use client";

import { ActivityClientTemplate } from "@/app/ui/templates/activity-client-template";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { routes } from "@/app/lib/constants/routes";
import { useRiwayatDonasi } from "@/app/lib/hooks/useUserHistory";


export default function Page() {
  const authUser = useAuthStore((s) => s.user);
  const { data: riwayatDonasi = [] } = useRiwayatDonasi();

  const campaigns = Array.isArray(riwayatDonasi) ? riwayatDonasi.map((d: any) => ({
    name: d.kampanye_name || d.program_name || d.nama || "Program Yamuti",
    categoryTag: "DONASI",
    description: `Anda telah berdonasi sebesar ${d.jumlah || d.amount || 0} pada tanggal ${d.tanggal || d.created_at || "sekarang"}.`,
    image: "/logo/yamuti.png",
    target: 0,
    raised: 0
  })) : [];

  return (
    <ActivityClientTemplate
      campaigns={campaigns}
      detailUrl={(id: string) => routes.user.aktivitas.program.detail(id)}
      donasiUrl={(id: string) => routes.user.aktivitas.program.donation(id)}
      user={{ name: authUser?.name || "Donatur Yamuti", role: "Donatur" }}
    />
  );
}
