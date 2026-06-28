"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/app/ui/templates/admin-dashboardTemplate";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useOrphans } from "@/app/lib/hooks/useOrphans";
import { usePrograms } from "@/app/lib/hooks/usePrograms";
import { useTransaksiKeuangan } from "@/app/lib/hooks/useKeuangan";
import { useInventoryStore } from "@/app/lib/stores/inventory-store";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

export default function Page() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const now = useMemo(() => Date.now(), []);
  const { data: orphans = [], isLoading: orphansLoading, error: orphansError, refetch: refetchOrphans } = useOrphans();
  const { data: programs = [], isLoading: programsLoading, error: programsError, refetch: refetchPrograms } = usePrograms();
  const { data: transaksiKeuangan = [] } = useTransaksiKeuangan();
  const inventory = useInventoryStore((s) => s.inventory);

  const isLoading = orphansLoading || programsLoading;
  const error = orphansError || programsError;

  const anak = orphans.map((o) => {
    // Compute age from birthDate
    const birthDate = o.birthDate ? new Date(o.birthDate) : null;
    const age = birthDate
      ? Math.floor((now - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      : 0;

    return {
      id: String(o.id),
      nama: o.name,
      jenisKelamin: "Laki-laki" as const, // TODO: update when backend provides gender field
      umur: age,
      status: o.status,
      image: "/logo/icon.png", // Default avatar — replace when backend provides photo field
    };
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton variant="rounded" width="100%" height="150px" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton variant="rounded" width="100%" height="100px" />
          <Skeleton variant="rounded" width="100%" height="100px" />
          <Skeleton variant="rounded" width="100%" height="100px" />
          <Skeleton variant="rounded" width="100%" height="100px" />
        </div>
        <Skeleton variant="rounded" width="100%" height="300px" />
      </div>
    );
  }

  if (error) {
    const errorMsg = error instanceof Error ? error.message : "Gagal memuat data";
    const isSessionExpired = errorMsg.includes("Sesi login");
    return (
      <ErrorDisplay 
        title={isSessionExpired ? "Sesi Berakhir" : "Gagal Memuat Dashboard Admin"}
        message={errorMsg}
        onRetry={() => {
          refetchOrphans();
          refetchPrograms();
        }}
        actionLabel="Login Kembali"
        onAction={isSessionExpired ? () => router.push('/auth') : undefined}
        fullPage
      />
    );
  }

  return (
    <AdminDashboard
      user={{
        name: authUser?.name || "Admin Yamuti",
        role: authUser?.role === "admin" ? "Administrator" : "Super Administrator",
      }}
      headerTitle="Dashboard Utama"
      anak={anak}
      donasi={transaksiKeuangan.map((t) => ({ id: String(t.id), jumlah: t.amountRaw || 0 }))}
      program={programs.map((p) => ({ id: p.id }))}
      stokBarang={inventory.map((i) => ({ id: String(i.id), jumlah: parseInt(i.stock) || 0 }))}
    />
  );
}
