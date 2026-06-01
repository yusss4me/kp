import { DonationCard } from "../molecules/donationCard";
import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";

interface ActivityAnakProps {
    campaigns: {
        name: string,
        categoryTag: string,
        description: string,
        image: string,
        target: number,
        raised: number
    }[]
}



export const ActivityAnak = ({ campaigns }: ActivityAnakProps) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <Txt weight="bold" className="text-gray-900">Donasi Anak Asuh</Txt>
                <Btn variant="transparent" textColor="red" size="sm" shape="rounded" className="text-xs text-red-primary font-bold hover:underline">
                    Lihat semua
                </Btn>
            </div>
            <div className="space-y-4">
                {campaigns.filter(c => c.categoryTag === "EDU").map((camp, i) => (
                    <DonationCard key={i} {...camp} />
                ))}
            </div>
        </div>
    );
};