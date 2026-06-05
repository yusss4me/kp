"use client";

import Link from "next/link";
import { DonationCard } from "../molecules/donationCard";
import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const ANAK_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop";

export const ActivityAnak = () => {
  const orphans = useYamutiStore((s) => s.orphans);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <Txt weight="bold" className="text-gray-900">
          Donasi Anak Asuh
        </Txt>
        <Link href={routes.aktivitas.root()}>
          <Btn variant="transparent" textColor="red" size="sm" shape="rounded" className="text-xs text-red-primary font-bold hover:underline">
            Lihat semua
          </Btn>
        </Link>
      </div>
      <div className="space-y-4">
        {orphans.map((orphan) => {
          const target = 5_000_000;
          const raised = Math.min(target - 1, 500_000 + orphan.id * 200_000);
          return (
            <DonationCard
              key={orphan.id}
              id={String(orphan.id)}
              name={orphan.name}
              categoryTag="ANAK"
              description={`${orphan.gender}, ${orphan.age} tahun · Status ${orphan.status}`}
              image={ANAK_IMAGE}
              target={target}
              raised={raised}
              detailHref={routes.aktivitas.anak.detail(orphan.id)}
              donateHref={routes.aktivitas.anak.donasi(orphan.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
