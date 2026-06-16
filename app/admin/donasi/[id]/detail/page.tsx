"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { DonationDetailTemplate } from "@/app/ui/templates/donationDetail";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop";

export default function AdminDonationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const program = useYamutiStore((s) => s.getProgramById(id));
  const fetchPrograms = useYamutiStore((s) => s.fetchPrograms);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  if (!program) {
    return (
      <DonationDetailTemplate
        image={FALLBACK_IMAGE}
        location="\u2014"
        title="Memuat detail donasi..."
        currentAmount={0}
        targetAmount={0}
        author={{ name: "Yayasan Yamuti", avatar: "/logo/yamuti.png" }}
        donorsCount={0}
        daysRemaining={0}
        description="Data program belum tersedia."
        gallery={[]}
      />
    );
  }

  return (
    <DonationDetailTemplate
      image={program.image ?? FALLBACK_IMAGE}
      location={program.location}
      title={program.title}
      currentAmount={program.collectedAmount}
      targetAmount={program.targetAmount}
      author={{ name: "Yayasan Yamuti", avatar: "/logo/yamuti.png" }}
      donorsCount={0}
      daysRemaining={0}
      description={program.description}
      gallery={program.image ? [program.image] : []}
    />
  );
}
