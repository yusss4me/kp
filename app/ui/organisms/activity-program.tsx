"use client";

import Link from "next/link";
import { DonationCard } from "../molecules/donationCard";
import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

export interface ActivityProgramProps {
  detailUrl: (id: string) => string;
  donasiUrl: (id: string) => string;
}

export const ActivityProgram = ({ detailUrl, donasiUrl }: ActivityProgramProps) => {
  const programs = useYamutiStore((s) => s.programs);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <Txt weight="bold" className="text-gray-900">
          Program Aktif
        </Txt>
        <Link href={routes.explore()}>
          <Btn variant="transparent" textColor="red" size="sm" shape="rounded" className="text-xs text-red-primary font-bold hover:underline">
            Lihat semua
          </Btn>
        </Link>
      </div>
      <div className="space-y-4">
        {programs.map((program) => (
          <DonationCard
            key={program.id}
            id={program.id}
            name={program.title}
            categoryTag={program.category.slice(0, 3).toUpperCase()}
            description={program.description}
            image={program.image ?? "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"}
            target={program.targetAmount}
            raised={program.collectedAmount}
            detailHref={detailUrl(program.id)}
            donateHref={donasiUrl(program.id)}
          />
        ))}
      </div>
    </div>
  );
};
