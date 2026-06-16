

import { Activity, HeartHandshake, Newspaper, Pencil, Wallet } from "lucide-react";
import { Txt } from "../atoms/text"
import { DiscoverSection } from "../organisms/discover-section"
import { StatCard } from "../molecules/stat-card";
import Link from "next/link";
import { Btn } from "../atoms/button";
import { DashboardHeader } from "../organisms/dashboard-header";
import { routes } from "@/app/lib/constants/routes";
export interface HomeProps {
  className?: string;
  user: {
    name: string;
    role: string;
    totalDonasi: number;
    programDibantu: number;
  };
  discover:{
    id: string;
    title: string;
    category: string;
    image: string;
  }[];
  headerTitle?: string;
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
export default function Home({user, discover, headerTitle = "Beranda"}: HomeProps) {
    return (
        <DashboardHeader
          user={{ name: user.name, role: user.role }}
          headerTitle={headerTitle}
          portalLabel="Portal Donatur"
        >
            <div className="space-y-10">
                {/* Welcome Section */}
                <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />

                    <div className="space-y-3 relative z-10">
                        <Txt variant="caption" className="text-red-primary/60 uppercase tracking-[0.2em] font-bold">
                            Selamat Datang
                        </Txt>
                        <Txt variant="h2" weight="bold" className="text-red-primary">
                            Halo, {user?.name}
                        </Txt>
                        <Txt variant="body" className="text-gray-500 max-w-xl">
                            Terima kasih telah menjadi bagian dari perjalanan kebaikan Yayasan Yamuti. Pantau dampak donasi Anda dan jelajahi program yang tersedia.
                        </Txt>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatCard
                        label="Total Donasi"
                        value={`Rp ${user?.totalDonasi.toLocaleString('id-ID')}`}
                        icon={Wallet}
                        color="primary"
                    />
                    <StatCard
                        label="Program Dibantu"
                        value={`${user?.programDibantu} Program`}
                        icon={HeartHandshake}
                        color="success"
                    />
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={routes.user.aktivitas.root()} className="flex-1">
                        <Btn variant="red" size="sm" shape="rounded" className="w-full gap-2 text-xs font-bold">
                            <Activity size={14} /> Aktivitas Donasi
                        </Btn>
                    </Link>
                    <Link href={routes.user.aktivitas.kunjungan.root()} className="flex-1">
                        <Btn variant="light" size="sm" shape="rounded" className="w-full gap-2 text-xs font-bold text-red-primary border border-red-primary/20">
                            <Pencil size={14} /> Ajukan Kunjungan
                        </Btn>
                    </Link>
                    <Link href={`/home/berita`} className="flex-1">
                        <Btn variant="light" size="sm" shape="rounded" className="w-full gap-2 text-xs font-bold text-red-primary border border-red-primary/20">
                            <Newspaper size={14} /> Kabar Yamuti
                        </Btn>
                    </Link>
                </div>

                {/* Discover Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">
                            Program Pilihan
                        </Txt>
                    </div>
                    <DiscoverSection items={discover} />
                </section>
            </div>
        </DashboardHeader>
    )
}
