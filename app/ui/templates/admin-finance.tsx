import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/app/ui/organisms/dashboard-header';
import { DistributionSummary } from '@/app/ui/organisms/DistributionSummary';
import type { FinanceTransaction, FundDistribution } from '@/app/lib/types/entities';
import { StatCard } from '@/app/ui/molecules/stat-card';
import { TransactionTable } from '@/app/ui/organisms/TransactionTable';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Plus, Download } from 'lucide-react';

export interface FinanceStat {
  label: string;
  value: string;
  icon: any;
  color: any;
  trend?: { value: number; isUp: boolean };
}

interface AdminFinanceTemplateProps {
  stats: FinanceStat[];
  transactions: FinanceTransaction[];
  distributions?: FundDistribution[];
  onDeleteTransaction?: (id: number) => void;
  addUrl?: string;
}

export function AdminFinanceTemplate({ stats, transactions, distributions = [], onDeleteTransaction, addUrl }: AdminFinanceTemplateProps) {
  return (
    <DashboardHeader headerTitle="Manajemen Keuangan">
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
            {addUrl && (
              <Link href={addUrl}>
                <Btn variant="red" shape="circle" className="gap-2 px-8 shadow-lg shadow-red-primary/20">
                  <Plus size={20} />
                  Tambah Transaksi
                </Btn>
              </Link>
            )}
          </div>
        </div>

        {/* Financial Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Transaction History */}
        <TransactionTable transactions={transactions} onDelete={onDeleteTransaction} />
      </div>
    </DashboardHeader>
  );
}
