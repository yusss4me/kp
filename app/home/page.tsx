"use client";

import { useEffect } from "react";
import Home from "@/app/ui/templates/home";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";

export default function Page() {
  const programs = useYamutiStore((s) => s.programs);
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);
  const authUser = useAuthStore((s) => s.user);

  // API: GET /programs — route belum tersedia; fetch tetap dipanggil untuk kesiapan backend
  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const discover = programs.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  }));

  // API: GET /donatur/profile — route belum tersedia; gunakan data auth store
  const totalDonasi = programs.reduce((sum, p) => sum + p.collectedAmount, 0);

  return (
    <Home
      user={{
        name: authUser?.name || "Donatur Yamuti",
        role: "Donatur",
        totalDonasi,
        programDibantu: programs.length,
      }}
      discover={discover}
      headerTitle="Beranda"
    />
  );
}
