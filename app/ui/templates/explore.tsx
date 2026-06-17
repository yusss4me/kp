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

export interface ExploreTemplateProps {
  campaigns: ExploreCampaign[];
  className?: string;
}

export function ExploreTemplate({ campaigns, className = "" }: ExploreTemplateProps) {
  return (
    <div className={`flex flex-col gap-8 pb-24 ${className}`}>
      <div className="bg-red-primary p-8 rounded-b-[40px] shadow-xl">
        <Txt variant="h4" weight="bold" color="light" className="mb-6">
          Jelajahi Program
        </Txt>
        <SearchGroup />
      </div>

      <div className="px-6 space-y-6">
        <div className="flex justify-between items-center">
          <Txt weight="bold" className="text-gray-900">
            Rekomendasi Untuk Anda
          </Txt>
          <Txt className="text-xs text-red-primary font-bold">Filter</Txt>
        </div>

        {campaigns.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            <Txt variant="body" className="mb-2">Tidak ada program yang tersedia saat ini.</Txt>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {campaigns.map((camp) => (
              <DonationCard
                key={camp.id}
                {...camp}
                detailHref={routes.visitor.donasiDetail(camp.id)}
                donateHref={routes.visitor.donasi(camp.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreTemplate;
