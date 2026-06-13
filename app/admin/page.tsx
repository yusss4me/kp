"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/app/ui/templates/admin-dashboardTemplate";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";

export default function Page() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const orphans = useYamutiStore((s) => s.orphans);
  const programs = useYamutiStore((s) => s.programs);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const inventory = useYamutiStore((s) => s.inventory);
  const isLoading = useYamutiStore((s) => s.isLoading);
  const error = useYamutiStore((s) => s.error);
  const fetchOrphans = useYamutiStore((s) => s.fetchOrphans);
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);

  // API: GET /anak-asuh
  useEffect(() => {
    fetchOrphans();
  }, [fetchOrphans]);

  // API: GET /programs — route belum tersedia di backend (404)
  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const anak = orphans.map((o) => ({
    id: String(o.id),
    nama: o.name,
    jenisKelamin: "Laki-laki" as const,
    umur: 0,
    status: o.status,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?auto=format&fit=crop&w=1170&q=80",
  }));

  const donasi = pendingDonations.map((d) => ({
    id: d.id,
    jumlah: parseInt(d.jumlah.replace(/[^0-9]/g, "")) || 0,
  }));

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
    const isSessionExpired = error.includes("Sesi login");
    return (
      <ErrorDisplay 
        title={isSessionExpired ? "Sesi Berakhir" : "Gagal Memuat Dashboard Admin"}
        message={error}
        onRetry={() => {
          fetchOrphans();
          fetchPrograms();
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
      donasi={donasi}
      program={programs.map((p) => ({ id: p.id }))}
      stokBarang={inventory.map((i) => ({
        id: String(i.id),
        jumlah: parseInt(i.stock) || 0,
      }))}
    />
  );
}
