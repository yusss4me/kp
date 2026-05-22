import { Txt } from "../atoms/text";
import { SearchGroup } from "../molecules/search-group";
import { DonationCard } from "../molecules/donationCard";

export interface ExploreProps {
  className?: string;
}

/**
 * Explore
 * 
 * Template untuk halaman eksplorasi program donasi.
 * Menampilkan pencarian program dan daftar rekomendasi kartu donasi 
 * dalam format grid.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ExploreProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Explore
 */
export default function Explore({}: ExploreProps) {
    const featuredCampaigns = [
        {
            name: "Beasiswa Anak Yatim Piatu",
            categoryTag: "EDU",
            description: "Bantu biaya sekolah untuk 50 anak yatim di Tasikmalaya.",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
            target: 50000000,
            raised: 32500000
        },
        {
            name: "Pembangunan Masjid Al-Ikhlas",
            categoryTag: "BLD",
            description: "Renovasi atap dan tempat wudhu masjid di pelosok desa.",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
            target: 150000000,
            raised: 45000000
        }
    ];

    return (
        <div className="flex flex-col gap-8 pb-24">
            {/* Header */}
            <div className="bg-red-primary p-8 rounded-b-[40px] shadow-xl">
                <Txt variant="h4" weight="bold" color="white" className="mb-6">Jelajahi Program</Txt>
                <SearchGroup  />
            </div>

            {/* Grid Content */}
            <divclassName="px-6 space-y-6">
                <div className="flex justify-between items-center">
                    <Txt weight="bold" className="text-gray-900">Rekomendasi Untuk Anda</Txt>
                    <Txt className="text-xs text-red-primary font-bold">Filter</Txt>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {featuredCampaigns.map((camp, i) => (
                        <DonationCard key={i} {...camp} />
                    ))}
                </div>
            </div>
        </div>
    )
}