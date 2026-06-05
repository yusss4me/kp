"use client";

import { ExploreTemplate } from "@/app/ui/templates/explore";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { MOCK_CAMPAIGNS } from "@/app/constants/mockData";

export default function Page() {
  const programs = useYamutiStore((s) => s.programs);

  const campaigns =
    programs.length > 0
      ? programs.map((p) => ({
          id: p.id,
          name: p.title,
          categoryTag: p.category.slice(0, 3).toUpperCase(),
          description: p.description,
          image: p.image ?? MOCK_CAMPAIGNS[0].image,
          target: p.targetAmount,
          raised: p.collectedAmount,
        }))
      : MOCK_CAMPAIGNS.map((c, i) => ({
          id: String(i + 1),
          ...c,
        }));

  return <ExploreTemplate campaigns={campaigns} />;
}
