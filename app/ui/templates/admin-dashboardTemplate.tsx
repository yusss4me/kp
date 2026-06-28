'use client';
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { StatCard } from "@/app/ui/molecules/stat-card";
import { OrphanCard } from "@/app/ui/molecules/orphan-card";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Plus, Wallet, Package, Heart, Users, ArrowRight, UserPlus, Banknote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Link from "next/link";

interface AdminDashboardProps {
    user: {
        name: string;
        role: string;
    };
    anak: {
      id: string;
      nama: string;
      jenisKelamin: "Laki-laki" | "Perempuan";
      umur: number;
      status: "Baru" | "Aktif" | "Alumni";
      image: string;

    }[];
    donasi: {
      id: string;
      jumlah: number;
    }[];
    program: {
      id: string;
      
    }[];
    stokBarang: {
      id: string;
      jumlah: number;
    }[];
    headerTitle: string;
  
}

export const AdminDashboard = ({ user, headerTitle, anak, donasi, program, stokBarang }: AdminDashboardProps) => {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const [greeting, setGreeting] = useState("Selamat datang");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");
  }, []);

  return (
    <DashboardHeader user={user} headerTitle={headerTitle}>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Welcome Section (Premium Glassmorphism) */}
        <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-red-primary/20 bg-gradient-to-br from-red-600 via-red-500 to-orange-500">
          {/* Abstract Mesh / Glow */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-10 -mb-20 w-60 h-60 bg-red-900/30 blur-3xl rounded-full" />
          
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <Txt variant="h2" weight="bold" className="text-white text-3xl md:text-4xl drop-shadow-sm">
                {greeting}, {user.name} 👋
              </Txt>
              <Txt variant="body" className="text-red-50 text-sm md:text-base leading-relaxed opacity-90 font-medium">
                Platform ini dirancang untuk mempermudah manajemen operasional Yayasan Yamuti secara transparan dan akuntabel. Pantau dan kelola semuanya di satu tempat.
              </Txt>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/donasi" className="block">
                <Btn variant="light" size="lg" shape="rounded" className="gap-2 shadow-lg hover:scale-105 transition-transform duration-300 group">
                  <Banknote className="text-red-primary group-hover:rotate-12 transition-transform" size={20} />
                  Catat Donasi
                </Btn>
              </Link>
              <Link href="/admin/anak-asuh" className="block">
                <Btn variant="outline" size="lg" shape="rounded" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-transform duration-300">
                  <UserPlus size={20} />
                  Anak Asuh
                </Btn>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label={t("totalOrphans")}
            value={anak.length.toString()}
            icon={Users}
            color="primary"
            trend={{ value: 12, isUp: true }}
          />
          <StatCard
            label="Dana Donasi"
            value={`Rp ${donasi.reduce((acc, item) => acc + item.jumlah, 0).toLocaleString()}`}
            icon={Wallet}
            color="success"
            trend={{ value: 5, isUp: true }}
          />
          <StatCard
            label="Stok Barang"
            value={stokBarang.reduce((acc, item) => acc + item.jumlah, 0).toLocaleString()}
            icon={Package}
            color="info"
            trend={{ value: 2, isUp: false }}
          />
          <StatCard
            label="Program Aktif"
            value={program.length.toString()}
            icon={Heart}
            color="info"
          />
        </div>

        {/* Recent Orphans Section */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <div>
              <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Anak Asuh Terbaru</Txt>
              <Txt variant="caption" className="text-gray-400 mt-1">Daftar anak asuh yang baru saja ditambahkan</Txt>
            </div>
            <Link href="/admin/anak-asuh">
              <Btn variant="light" size="sm" shape="rounded" className="text-red-primary font-bold gap-2 group hover:bg-red-primary/10">
                {tCommon("back")} Semua
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Btn>
            </Link>
          </div>

          {anak.length === 0 ? (
            <div className="w-full py-12 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
              <Users size={48} className="text-gray-300 mb-4" />
              <Txt variant="body" weight="bold" className="text-gray-500">{tCommon("noData")}</Txt>
              <Txt variant="caption" className="text-gray-400 mt-1">Belum ada anak asuh yang terdaftar.</Txt>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                anak.slice(0, 4).map((item: any) => (
                  <OrphanCard
                    key={item.id}
                    name={item.nama}
                    age={item.umur}
                    gender={item.jenisKelamin}
                    status={item.status}
                  />
                ))
              }
            </div>
          )}
        </section>

      </div>
    </DashboardHeader>

  )
}