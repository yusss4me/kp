import React from 'react';
import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { StatCard } from '@/app/ui/molecules/StatCard';
import { TransactionTable } from '@/app/ui/organisms/TransactionTable';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { TrendingUp, TrendingDown, DollarSign, Plus, Download } from 'lucide-react';

export default function FinancePage() {
  return (
    <DashboardTemplate headerTitle="Manajemen Keuangan">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Laporan Keuangan</Txt>
            <Txt variant="body" className="text-gray-500">
              Monitor ringkasan aliran kas dan riwayat transaksi yayasan secara real-time.
            </Txt>
          </div>
          <div className="flex items-center gap-3">
            <Btn variant="light" shape="rounded" className="gap-2 border border-gray-100 bg-white shadow-sm font-bold">
              <Download size={20} />
              Ekspor PDF
            </Btn>
            <Btn variant="red" shape="circle" className="gap-2 px-8 shadow-lg shadow-red-primary/20">
              <Plus size={20} />
              Tambah Transaksi
            </Btn>
          </div>
        </div>

        {/* Financial Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Total Pemasukan (Bulan Ini)" 
            value="Rp 24.500.000" 
            icon={TrendingUp} 
            color="success" 
            trend={{ value: 8, isUp: true }}
          />
          <StatCard 
            label="Total Pengeluaran (Bulan Ini)" 
            value="Rp 12.850.000" 
            icon={TrendingDown} 
            color="danger" 
            trend={{ value: 3, isUp: false }}
          />
          <StatCard 
            label="Saldo Kas Saat Ini" 
            value="Rp 85.200.000" 
            icon={DollarSign} 
            color="primary" 
          />
        </div>

        {/* Transaction History */}
        <TransactionTable />
      </div>
    </DashboardTemplate>
  );
}
