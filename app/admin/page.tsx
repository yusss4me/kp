import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { StatCard } from '@/app/ui/molecules/StatCard';
import { OrphanCard } from '@/app/ui/molecules/OrphanCard';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Users, Wallet, Package, Heart, Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardTemplate headerTitle="Dashboard Utama">
      <div className="space-y-10">
        {/* Welcome Section */}
        <div className="bg-red-primary/5 rounded-[40px] p-8 md:p-12 border border-red-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-primary/5 rounded-full blur-3xl" />

          <div className="space-y-3 relative z-10">
            <Txt variant="h2" weight="bold" className="text-red-primary">
              Selamat Datang, Admin
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
            label="Total Anak Asuh" 
            value="128" 
            icon={Users} 
            color="primary"
            trend={{ value: 12, isUp: true }} 
          />
          <StatCard 
            label="Dana Donasi" 
            value="Rp 45.2M" 
            icon={Wallet} 
            color="success"
            trend={{ value: 5, isUp: true }} 
          />
          <StatCard 
            label="Stok Beras (Kg)" 
            value="450" 
            icon={Package} 
            color="secondary"
            trend={{ value: 2, isUp: false }} 
          />
          <StatCard 
            label="Program Aktif" 
            value="12" 
            icon={Heart} 
            color="info" 
          />
        </div>

        {/* Recent Orphans Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Anak Asuh Terbaru</Txt>
            <Btn variant="light" size="sm" shape="rounded" className="text-red-primary font-bold">Lihat Semua</Btn>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <OrphanCard 
              name="Ahmad Fauzi" 
              age={10} 
              gender="Laki-laki" 
              status="Baru" 
            />
            <OrphanCard 
              name="Siti Aminah" 
              age={8} 
              gender="Perempuan" 
              status="Aktif" 
            />
            <OrphanCard 
              name="Budi Santoso" 
              age={12} 
              gender="Laki-laki" 
              status="Aktif" 
            />
            <OrphanCard 
              name="Laila Sari" 
              age={9} 
              gender="Perempuan" 
              status="Aktif" 
            />
          </div>
        </section>

        {/* Call to action for Broadcast */}
        <div className="bg-orange-primary/5 rounded-[40px] p-8 md:p-12 border border-orange-primary/10 flex flex-col items-center text-center gap-6 relative overflow-hidden">
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-20 bg-orange-primary/10 rounded-full blur-3xl" />
           
          <div className="space-y-2 relative z-10">
            <Txt variant="h3" weight="bold" className="text-gray-900">
              Ingin Mengirim Kabar ke Donatur?
            </Txt>
            <Txt variant="body" className="text-gray-500 max-w-2xl">
              Gunakan fitur Broadcast WhatsApp untuk mengirimkan laporan kegiatan atau ucapan terima kasih secara massal dengan satu klik.
            </Txt>
          </div>
          <Btn variant="orange" size="lg" shape="circle" className="px-12 shadow-xl shadow-orange-primary/20 relative z-10">
            Buka Menu Broadcast
          </Btn>
        </div>
      </div>
    </DashboardTemplate>
  );
}
