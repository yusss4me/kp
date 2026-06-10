"use client";

import { useEffect } from "react";
import { AdminDashboard } from "@/app/ui/templates/admin-dashboardTemplate";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";

export default function Page() {
  const authUser = useAuthStore((s) => s.user);
  const orphans = useYamutiStore((s) => s.orphans);
  const programs = useYamutiStore((s) => s.programs);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const inventory = useYamutiStore((s) => s.inventory);
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
    jenisKelamin: o.gender,
    umur: o.age,
    status: o.status,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?auto=format&fit=crop&w=1170&q=80",
  }));

  const donasi = pendingDonations.map((d) => ({
    id: d.id,
    jumlah: parseInt(d.jumlah.replace(/[^0-9]/g, "")) || 0,
  }));

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
