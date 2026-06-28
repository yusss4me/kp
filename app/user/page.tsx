"use client";

import Home from "@/app/ui/templates/home";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { usePrograms } from "@/app/lib/hooks/usePrograms";
import { useRiwayatDonasi } from "@/app/lib/hooks/useUserHistory";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";
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
  const authUser = useAuthStore((s) => s.user);
  const { data: programs = [], isLoading: isLoadingPrograms, error: errorPrograms, refetch } = usePrograms();
  const { data: riwayatDonasi = [], isLoading: isLoadingDonasi } = useRiwayatDonasi();

  const discover = programs.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image ?? "/logo/icon.png",
  }));

  const isLoading = isLoadingPrograms || isLoadingDonasi;
  const error = errorPrograms;

  const totalDonasi = Array.isArray(riwayatDonasi)
    ? riwayatDonasi.reduce((acc: number, curr: RiwayatItem) => {
        if (!curr) return acc;
        const isSuccess = curr.status?.toLowerCase() === "berhasil" || curr.status?.toLowerCase() === "success" || curr.status === "PAID";
        const amount = parseAmount(curr.jumlah || curr.amount || curr.gross_amount);
        return acc + (isSuccess || !curr.status ? amount : 0);
      }, 0)
    : 0;

  const programDibantu = Array.isArray(riwayatDonasi)
    ? new Set(riwayatDonasi.filter(Boolean).map((d: RiwayatItem) => d.kampanye_id || d.program_id).filter(Boolean)).size
    : 0;

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton variant="rounded" width="100%" height="200px" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Skeleton variant="rounded" width="100%" height="120px" />
          <Skeleton variant="rounded" width="100%" height="120px" />
        </div>
        <Skeleton variant="rounded" width="100%" height="400px" />
      </div>
    );
  }

  if (error) {
    const errorMsg = error instanceof Error ? error.message : "Gagal memuat data";
    return (
      <ErrorDisplay 
        title="Gagal Memuat Beranda"
        message={errorMsg}
        onRetry={() => refetch()}
        fullPage
      />
    );
  }

  return (
    <Home
      user={{
        name: authUser?.name || "Donatur Yamuti",
        role: "Donatur",
        totalDonasi,
        programDibantu: programDibantu > 0 ? programDibantu : programs.length, // fallback to total programs if donasi has no kampanye_id
      }}
      discover={discover}
      headerTitle="Beranda"
    />
  );
}
