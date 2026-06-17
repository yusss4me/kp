"use client";

import { useState, useMemo } from "react";
import { Txt } from "@/app/ui/atoms/text";
import { SearchGroup } from "@/app/ui/molecules/search-group";
import { DonationCard } from "@/app/ui/molecules/donationCard";
import { routes } from "@/app/lib/constants/routes";

export interface ExploreCampaign {
  id: string;
  name: string;
  categoryTag: string;
  description: string;
  image: string;
  target: number;
  raised: number;
}

export type ExploreRole = "visitor" | "donatur" | "admin" | "owner";

export interface ExploreTemplateProps {
  campaigns: ExploreCampaign[];
  className?: string;
  /** Role context to determine link behavior */
  role?: ExploreRole;
}

function getDetailHref(role: ExploreRole, id: string): string {
  switch (role) {
    case "donatur":
      return routes.user.aktivitas.program.detail(id);
    case "admin":
      return routes.visitor.donasiDetail(id);
    case "owner":
      return routes.visitor.donasiDetail(id);
    default:
      return routes.visitor.donasiDetail(id);
  }
}

function getDonateHref(role: ExploreRole, id: string): string | undefined {
  switch (role) {
    case "donatur":
      return routes.user.aktivitas.program.donation(id);
    case "visitor":
      return routes.visitor.donasi(id);
    // admin and owner: read-only, no donate action
    default:
      return undefined;
  }
}

export function ExploreTemplate({ campaigns, className = "", role = "visitor" }: ExploreTemplateProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.categoryTag.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [campaigns, searchQuery]);

  return (
    <div className={`flex flex-col gap-8 pb-24 ${className}`}>
      <div className="bg-red-primary p-8 rounded-b-[40px] shadow-xl">
        <Txt variant="h4" weight="bold" color="light" className="mb-6">
          Jelajahi Program
        </Txt>
        <SearchGroup
          placeholder="Cari program, kategori, atau kata kunci..."
          onSearch={(val) => setSearchQuery(val)}
        />
      </div>

      <div className="px-6 space-y-6">
        <div className="flex justify-between items-center">
          <Txt weight="bold" className="text-gray-900">
            {searchQuery
              ? `Hasil pencarian "${searchQuery}" (${filteredCampaigns.length})`
              : "Rekomendasi Untuk Anda"}
          </Txt>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            <Txt variant="body" className="mb-2">
              {searchQuery
                ? "Tidak ada program yang cocok dengan pencarian Anda."
                : "Tidak ada program yang tersedia saat ini."}
            </Txt>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredCampaigns.map((camp) => (
              <DonationCard
                key={camp.id}
                {...camp}
                detailHref={getDetailHref(role, camp.id)}
                donateHref={getDonateHref(role, camp.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreTemplate;
