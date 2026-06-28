"use client";

import { ProfileHistoryTemplate } from "@/app/ui/templates/profile-history";
import { useRiwayatDonasi } from "@/app/lib/hooks/useUserHistory";
import { Skeleton } from "@/app/ui/atoms/skeleton";

export default function Page() {
  const { data: riwayatDonasi = [], isLoading } = useRiwayatDonasi();

  const donations = Array.isArray(riwayatDonasi) ? riwayatDonasi.map((d: any, i: number) => ({
    id: d.id || i + 1,
    title: d.nama_donatur || d.nama || "Donasi Program",
    amount: d.jumlah || d.amount || d.gross_amount || "0",
    date: d.tanggal || d.created_at || new Date().toISOString(),
    status: d.status || "Berhasil",
  })) : [];

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton variant="rounded" width="100%" height="60px" />
        <Skeleton variant="rounded" width="100%" height="60px" />
        <Skeleton variant="rounded" width="100%" height="60px" />
      </div>
    );
  }

  return <ProfileHistoryTemplate donations={donations} />;
}
