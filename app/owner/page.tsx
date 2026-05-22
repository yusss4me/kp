import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { StatCard } from '@/app/ui/molecules/StatCard';
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

/**
 * Owner Dashboard Page
 * Halaman utama untuk role Owner yang memberikan ringkasan eksekutif
 * seluruh aktivitas yayasan.
 */
export default function OwnerDashboard() {
  return (
    <DashboardTemplate headerTitle="Ringkasan Eksekutif">
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
            <Txt variant="h2" weight="bold" color="white" className="max-w-2xl leading-tight">
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
            value="Rp 125.8M" 
            icon={TrendingUp} 
            color="success"
            trend={{ value: 15, isUp: true }} 
          />
          <StatCard 
            label="Total Administrator" 
            value="8 Orang" 
            icon={ShieldCheck} 
            color="primary"
          />
          <StatCard 
            label="Total Anak Asuh" 
            value="128" 
            icon={Users} 
            color="info" 
          />
          <StatCard 
            label="Total Aset Dana" 
            value="Rp 2.1B" 
            icon={Wallet} 
            color="primary" 
          />
        </div>

        {/* Executive Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Performance Overview */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 space-y-6">
             <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <Txt variant="h4" weight="bold" className="text-gray-900">Performa Administrator</Txt>
                  <Txt variant="caption" className="text-gray-400">Ringkasan aktivitas admin dalam 30 hari terakhir</Txt>
                </div>
                <Btn variant="light" size="sm" shape="rounded" className="text-red-primary font-bold">Kelola Admin</Btn>
             </div>
             
             <div className="space-y-4">
                {[
                  { name: "Admin Pusat (Bpk. M. Ardi)", role: "Super Admin", task: "12 Aksi", color: "bg-red-primary", status: "Aktif" },
                  { name: "Admin Keuangan (Ibu Sarah)", role: "Finance", task: "28 Aksi", color: "bg-lightdark-neutral", status: "Aktif" },
                  { name: "Admin Inventaris (Bpk. Doni)", role: "Inventory", task: "5 Aksi", color: "bg-lightdark-secondary", status: "Idle" },
                ].map((admin, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-red-primary/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${admin.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                        {admin.name.split(' ')[2]?.[0] || admin.name[0]}
                      </div>
                      <div>
                        <Txt variant="small" weight="bold" className="text-gray-900">{admin.name}</Txt>
                        <div className="flex items-center gap-2">
                           <Txt variant="caption" className="text-gray-400">{admin.role}</Txt>
                           <span className="w-1 h-1 bg-gray-300 rounded-full" />
                           <Txt variant="caption" className={admin.status === 'Aktif' ? 'text-success font-medium' : 'text-gray-400'}>{admin.status}</Txt>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <Txt variant="small" weight="bold" className="text-red-primary">{admin.task}</Txt>
                       <Txt variant="caption" className="text-gray-400">Log Aktivitas</Txt>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right Column: High-Level Reports */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col gap-8">
             <div className="space-y-1">
                <Txt variant="h4" weight="bold" className="text-gray-900">Laporan Strategis</Txt>
                <Txt variant="caption" className="text-gray-400">Arsip laporan bulanan yayasan</Txt>
             </div>
             
             <div className="flex-grow space-y-2">
                {[
                  { title: "Laporan Keuangan April", date: "01 Mei 2024", type: "Finansial", icon: FilePieChart },
                  { title: "Audit Operasional Q1", date: "15 Apr 2024", type: "Audit", icon: Activity },
                  { title: "Statistik Pertumbuhan Donasi", date: "10 Apr 2024", type: "Analitik", icon: TrendingUp },
                ].map((report, i) => (
                  <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-red-primary/5 transition-all cursor-pointer border border-transparent hover:border-red-primary/10">
                    <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-red-primary group-hover:bg-white transition-all shadow-sm">
                       <report.icon size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <Txt variant="small" weight="bold" className="text-gray-800 group-hover:text-red-primary transition-colors">{report.title}</Txt>
                      <div className="flex items-center gap-2">
                        <Txt variant="caption" className="text-gray-400">{report.date}</Txt>
                        <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-bold uppercase tracking-wider">{report.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             
             <Btn variant="red" size="md" shape="rounded" className="w-full gap-2 py-4">
                Buka Pusat Laporan
                <ArrowRight size={16} />
             </Btn>
          </div>
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
    </DashboardTemplate>
  );
}