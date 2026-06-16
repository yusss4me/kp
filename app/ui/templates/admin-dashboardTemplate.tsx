  import { DashboardHeader } from "../organisms/dashboard-header";
  import { StatCard } from "../molecules/stat-card";
  import { OrphanCard } from "../molecules/orphan-card";
  import { Txt } from "../atoms/text";
  import { Btn } from "../atoms/button";
  import { Plus, Wallet, Package, Heart, Users } from "lucide-react";
  import { getTranslations } from "next-intl/server";

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

  export const AdminDashboard = async ({ user, headerTitle, anak, donasi, program, stokBarang }: AdminDashboardProps) => {
    const t = await getTranslations("dashboard");
    const tCommon = await getTranslations("common");
    return (
      <DashboardHeader user={user} headerTitle={headerTitle}>
        <div className="space-y-10">
          {/* Welcome Section */}
          <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />

            <div className="space-y-3 relative z-10">
              <Txt variant="h2" weight="bold" className="text-red-primary">
                {t("welcomeBack")}, {user.name}
              </Txt>
              <Txt variant="body" className="text-gray-500 max-w-xl">
                Platform ini dirancang untuk mempermudah manajemen operasional Yayasan Yamuti secara transparan dan akuntabel.
              </Txt>
            </div>

            <Btn variant="red" size="lg" shape="circle" className="gap-2 shrink-0 shadow-xl shadow-red-primary/20 relative z-10 px-8">
              <Plus size={20} />
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

          {/* Call to action for Broadcast */}
          <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 flex flex-col items-center text-center gap-6 relative overflow-hidden">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-20 bg-red-primary/10 rounded-full blur-3xl" />

            <div className="space-y-2 relative z-10">
              <Txt variant="h3" weight="bold" className="text-gray-900">
                Ingin Mengirim Kabar ke Donatur?
              </Txt>
              <Txt variant="body" className="text-gray-500 max-w-2xl">
                Gunakan fitur Broadcast WhatsApp untuk mengirimkan laporan kegiatan atau ucapan terima kasih secara massal dengan satu klik.
              </Txt>
            </div>
            <Btn variant="red" size="lg" shape="circle" className="px-12 shadow-xl shadow-red-primary/20 relative z-10">
              Buka Menu Broadcast
            </Btn>
          </div>
        </div>
      </DashboardHeader>

    )
  }