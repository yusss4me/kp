"use client";

import { ProfileFavoritesTemplate } from "@/app/ui/templates/profile-favorites";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function Page() {
  const programs = useYamutiStore((s) => s.programs);

  // API: GET /donatur/favorites — route belum tersedia di backend (404)
  // const { data: favorites } = useQuery({ queryKey: ['favorites'], queryFn: fetchFavorites });
  const items = programs.slice(0, 4).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image ?? "",
  }));

  return <ProfileFavoritesTemplate items={items} />;
}
