"use client";

import { DonationDetailTemplate } from "@/app/ui/templates/donationDetail";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useParams } from "next/navigation";
import { MOCK_DONATION_DETAIL } from "@/app/constants/mockData";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const program = useYamutiStore((s) => s.getProgramById(id));

  if (!program) {
    return <DonationDetailTemplate {...MOCK_DONATION_DETAIL} />;
  }

  return (
    <DonationDetailTemplate
      image={program.image ?? MOCK_DONATION_DETAIL.image}
      location={program.location}
      title={program.title}
      currentAmount={program.collectedAmount}
      targetAmount={program.targetAmount}
      author={MOCK_DONATION_DETAIL.author}
      donorsCount={MOCK_DONATION_DETAIL.donorsCount}
      daysRemaining={MOCK_DONATION_DETAIL.daysRemaining}
      description={program.description}
      gallery={MOCK_DONATION_DETAIL.gallery}
    />
  );
}
