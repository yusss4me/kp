

import { HeartHandshake, Wallet } from "lucide-react";
import { Txt } from "../atoms/text"
import { CategoryList } from "../organisms/categoryList"
import { DiscoverSection } from "../organisms/discoverSction"
import { SummaryCard } from "../molecules/summaty-card"



export interface HomeProps {
  className?: string;
  user: {
    name: string;
    totalDonasi: number;
    programDibantu: number;
  };
  discover:{
    id: string;
    title: string;
    category: string;
    image: string;
  }[];

}

/**
 * Home
 * 
 * Template halaman beranda utama untuk role Donatur.
 * Menampilkan ringkasan dampak donasi personal, daftar kategori program, 
 * dan bagian eksplorasi program pilihan.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {HomeProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Home
 */
export default function Home({user, discover}: HomeProps) {
    return (
        <div className="flex flex-col gap-10">
            {/* Hero Section */}
            <section className="bg-red-primary  p-6 rounded-b-[40px] shadow-2xl relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-40 -left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-8">
                    <div className="space-y-1">
                        <Txt variant="caption" className="text-white/60 uppercase tracking-[0.2em] font-bold">
                            Selamat Datang
                        </Txt>
                        <Txt variant="h4" weight="bold" color="light">
                            Halo, {user?.name}
                        </Txt>
                    </div>

                    {/* Impact Stats Card */}
                    <div className="backdrop-blur-md  p-6 rounded-[32px] flex items-center justify-between">
                        <SummaryCard
                            title="Total Donasi"
                            value={`Rp ${user?.totalDonasi}`}
                            Icon={Wallet}
                        />
                        <div className="w-px h-10 bg-white/10" />
                        <SummaryCard
                            title="Program Dibantu"
                            value={`${user?.programDibantu} Program`}
                            Icon={HeartHandshake}
                        />
                    </div>
                </div>
            </section>
        
            {/* Content Section */}
            <div className="p-4 md:p-6 -mt-10 relative z-20 space-y-8">
                <CategoryList />
                <DiscoverSection items={discover} />
            </div>
        </div>
    )
}