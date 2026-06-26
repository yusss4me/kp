'use client';
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { StatCard } from "@/app/ui/molecules/stat-card";
import { OrphanCard } from "@/app/ui/molecules/orphan-card";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Plus, Wallet, Package, Heart, Users } from "lucide-react";
import { useTranslations } from "next-intl";

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
  return (
    <DashboardHeader user={user} headerTitle={headerTitle}>
      <div className="space-y-10">
        {/* Welcome Section */}
        <div className="bg-red-primary/5 rounded-[32px] p-6 md:p-10 border border-red-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />

          <div className="space-y-2 relative z-10">
            <Txt variant="h2" weight="bold" className="text-red-primary text-2xl md:text-3xl">
              {t("welcomeBack")}, {user.name} 👋
            </Txt>
            <Txt variant="body" className="text-gray-500 max-w-xl text-sm md:text-base">
              Platform ini dirancang untuk mempermudah manajemen operasional Yayasan Yamuti secara transparan dan akuntabel.
            </Txt>
          </div>

          <Btn variant="red" size="md" shape="circle" className="gap-2 shrink-0 shadow-xl shadow-red-primary/20 relative z-10 px-6 w-full md:w-auto mt-1 md:mt-0">
            <Plus size={18} />
            Donasi Baru
          </Btn>
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
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Anak Asuh Terbaru</Txt>
            <Btn variant="light" size="sm" shape="rounded" className="text-red-primary font-bold">{tCommon("back")} Semua</Btn>
          </div>

          {anak.length === 0 ? (
            <div className="w-full py-8 text-center text-gray-500">
              <Txt variant="body">{tCommon("noData")}</Txt>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {
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