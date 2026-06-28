"use client";

import { ProfileTemplate } from "@/app/ui/templates/profile";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { PROFILE_MENU_GROUPS } from "@/app/lib/constants/profile-constants";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useRiwayatDonasi, useRiwayatKunjungan } from "@/app/lib/hooks/useUserHistory";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/app/lib/utils/image";
import { parseAmount } from "@/app/lib/utils/crud-helpers";

type RiwayatItem = {
  id?: string | number;
  status?: string;
  jumlah?: string | number;
  amount?: string | number;
  gross_amount?: string | number;
  kampanye_id?: string | number;
  program_id?: string | number;
};

export default function Page() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  
  const { data: riwayatDonasi = [] } = useRiwayatDonasi();
  const { data: riwayatKunjungan = [] } = useRiwayatKunjungan();

  const user = {
    name: authUser?.name || "Donatur Yamuti",
    role: "Donatur",
    image: authUser?.image ? getImageUrl(authUser.image) : "/logo/yamuti.png",
  };

  const totalDonasi = Array.isArray(riwayatDonasi)
    ? riwayatDonasi.reduce((acc: number, curr: RiwayatItem) => {
        if (!curr) return acc;
        const statusStr = curr.status ? String(curr.status).toLowerCase() : "";
        const isSuccess = statusStr === "berhasil" || statusStr === "success" || statusStr === "paid";
        const amount = parseAmount(curr.jumlah || curr.amount || curr.gross_amount);
        return acc + (isSuccess || !curr.status ? amount : 0);
      }, 0)
    : 0;

  const programDibantu = Array.isArray(riwayatDonasi)
    ? new Set(riwayatDonasi.filter(Boolean).map((d: RiwayatItem) => d.kampanye_id || d.program_id).filter(Boolean)).size
    : 0;
    
  const jumlahKunjungan = Array.isArray(riwayatKunjungan) ? riwayatKunjungan.length : 0;

  return (
    <DashboardHeader
      user={{ name: user.name, role: user.role }}
      headerTitle="Profil Saya"
      portalLabel="Portal Donatur"
    >
      <ProfileTemplate
        user={user}
        amountProgramUser={String(programDibantu)}
        amountVisitUser={String(jumlahKunjungan)}
        amountDonatedUser={`Rp ${totalDonasi.toLocaleString("id-ID")}`}
        listMenu={PROFILE_MENU_GROUPS}
        isFlyout={false}
        embedded
        onLogout={async () => {
          await useAuthStore.getState().logout();
          router.push("/auth/donatur");
        }}
      />
    </DashboardHeader>
  );
}
