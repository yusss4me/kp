"use client";

import { useEffect } from "react";
import { ExploreTemplate } from "@/app/ui/templates/explore";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";

export default function Page() {
  const programs = useYamutiStore((s) => s.programs);
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);

  // API: GET /programs — route belum tersedia di backend (404)
  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const campaigns = programs.map((p) => ({
    id: p.id,
    name: p.title,
    categoryTag: p.category.slice(0, 3).toUpperCase(),
    description: p.description,
    image: p.image ?? FALLBACK_IMAGE,
    target: p.targetAmount,
    raised: p.collectedAmount,
  }));

  return <ExploreTemplate campaigns={campaigns} />;
}
