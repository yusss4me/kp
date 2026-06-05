"use client";

import Home from "@/app/ui/templates/home";
import { MOCK_DONOR_USER } from "@/app/constants/mockData";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";


export default function Page() {
  const programs = useYamutiStore((s) => s.programs);

  const discover = programs.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    image: p.image ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  }));

  return (
    <Home
      user={{
        name: MOCK_DONOR_USER.name,
        totalDonasi: MOCK_DONOR_USER.totalDonasi,
        programDibantu: MOCK_DONOR_USER.programDibantu,
      }}
      discover={discover}
    />
  );
}
