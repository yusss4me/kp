import { DashboardHeader } from '@/app/ui/organisms/dashboard-header';
import { OwnerAdminPerform } from '@/app/ui/organisms/owner-adminPerform';
import { OwnerReport } from '@/app/ui/organisms/owner-report';
import { StatCard } from '@/app/ui/molecules/stat-card';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import {
    ShieldCheck,
    Wallet, 
    TrendingUp,
    Users,
    ArrowRight,
    FilePieChart,
    Activity,
    Globe
} from 'lucide-react';

interface OwnerDashboardTemplateProps {
    user: {
        name: string;
        role: string;
    };
    headerTitle: string;
    donasi: {
        id: string;
        jumlah: number;
        tgl_donasi: Date;
    }[];
    adminData: {
        id: string;
        name: string;
        role: string;
        task: string;
        color: string;
        status: string;
    }[];
    reportData: {
        id: string;
        title: string;
        date: string;
        type: string;
        icon: any;
    }[];

    anak: {
        id: string;
    }[];
    asset: {
        id: string;
    }[];


}

/**
 * Owner Dashboard Page
 * Halaman utama untuk role Owner yang memberikan ringkasan eksekutif
 * seluruh aktivitas yayasan.
 */
export const OwnerDashboard = ({ user, adminData, donasi, headerTitle, anak, asset, reportData }: OwnerDashboardTemplateProps) => {
    return (
        <DashboardHeader user={user} headerTitle={headerTitle}>
            <div className="space-y-10">
                {/* Executive Welcome Section */}
                <div className="bg-gradient-to-br from-red-primary to-red-primary/80 p-8 md:p-12 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-2xl" />

                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">
                            <ShieldCheck size={14} />
                            Owner Access Only
                        </div>
                        <Txt variant="h2" weight="bold" color="light" className="max-w-2xl leading-tight">
                            Selamat Datang di Kendali Utama Yayasan Yamuti
                        </Txt>
                        <Txt variant="body" className="text-white/80 max-w-xl">
                            Pantau seluruh aktivitas operasional, kesehatan finansial, dan performa tim administrator Anda dalam satu tampilan terpadu yang transparan.
                        </Txt>
                    </div>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        label="Pendapatan Bulan Ini"
                        value={donasi.reduce((acc, curr) => acc + curr.jumlah, 0).toLocaleString('id-ID')}
                        icon={TrendingUp}
                        color="success"
                        trend={{ value: 15, isUp: true }}
                    />
                    <StatCard
                        label="Total Administrator"
                        value={adminData.length}
                        icon={ShieldCheck}
                        color="primary"
                    />
                    <StatCard
                        label="Total Anak Asuh"
                        value={anak.length}
                        icon={Users}
                        color="info"
                    />
                    <StatCard
                        label="Total Aset Dana"
                        value={asset.length}
                        icon={Wallet}
                        color="primary"
                    />
                </div>

                {/* Executive Insights Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Admin Performance Overview */}
                    <OwnerAdminPerform admin={adminData} />


                    {/* Right Column: High-Level Reports */}
                    <OwnerReport reportData={reportData} />
                </div>

                {/* Foundation Settings CTA */}
                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-red-primary/10 rounded-[32px] flex items-center justify-center text-red-primary shrink-0 shadow-inner">
                        <Globe size={48} />
                    </div>
                    <div className="space-y-2 text-center md:text-left flex-grow">
                        <Txt variant="h3" weight="bold" className="text-gray-900">Konfigurasi Identitas Yayasan</Txt>
                        <Txt variant="body" className="text-gray-500 max-w-2xl">
                            Sesuaikan informasi publik yayasan, visi misi, logo, dan profil institusi yang akan ditampilkan kepada donatur dan publik.
                        </Txt>
                    </div>
                    <Btn variant="red" size="lg" shape="rounded" className="px-10 py-4 shadow-xl shadow-red-primary/20">
                        Ubah Profil
                    </Btn>
                </div>
            </div>
        </DashboardHeader>
    );
}