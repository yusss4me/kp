import { OwnerDashboard } from '../ui/templates/owner-dashboardTemplate';
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
export default function Page() {
  return (
    <OwnerDashboard
        user={{
            name: 'Budi Santoso',
            role: 'Owner',
        }}
        headerTitle="Dashboard Eksekutif"
        donasi={[
            { id: '1', jumlah: 10000000, tgl_donasi: new Date() },
            { id: '2', jumlah: 5000000, tgl_donasi: new Date() },
            { id: '3', jumlah: 2000000, tgl_donasi: new Date() },
        ]}
        adminData={[
            { id: '1', name: 'Ahmad Budi', role: 'Admin Keuangan', task: 'Laporan Keuangan', color: 'bg-red-primary', status: 'Aktif' },
            { id: '2', name: 'Ahmad Budi', role: 'Admin Keuangan', task: 'Laporan Keuangan', color: 'bg-red-primary', status: 'Aktif' },
            { id: '3', name: 'Ahmad Budi', role: 'Admin Keuangan', task: 'Laporan Keuangan', color: 'bg-red-primary', status: 'Aktif' },
            { id: '4', name: 'Ahmad Budi', role: 'Admin Keuangan', task: 'Laporan Keuangan', color: 'bg-red-primary', status: 'Aktif' },
        ]}
        reportData={[
            { id: '1', title: 'Laporan Keuangan', date: '2022-01-01', type: 'Bulanan', icon: FilePieChart },
            { id: '2', title: 'Laporan Keuangan', date: '2022-01-01', type: 'Bulanan', icon: FilePieChart },
            { id: '3', title: 'Laporan Keuangan', date: '2022-01-01', type: 'Bulanan', icon: FilePieChart },
            { id: '4', title: 'Laporan Keuangan', date: '2022-01-01', type: 'Bulanan', icon: FilePieChart },
        ]}
        anak={[
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
            { id: '5' },
            { id: '6' },
        ]}
        asset={[
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
        ]}
    />
  );
}