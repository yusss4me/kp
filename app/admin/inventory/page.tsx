import React from 'react';
import { DashboardTemplate } from '@/app/ui/templates/DashboardTemplate';
import { StatCard } from '@/app/ui/molecules/StatCard';
import { InventoryTable } from '@/app/ui/organisms/InventoryTable';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Package, Inbox, AlertTriangle, Plus, Search } from 'lucide-react';

export default function InventoryPage() {
  return (
    <DashboardTemplate headerTitle="Manajemen Inventaris">
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt variant="h3" weight="bold" className="text-gray-900 tracking-tight">Inventaris Barang</Txt>
            <Txt variant="body" className="text-gray-500">
              Pantau stok logistik, pakaian, dan perlengkapan panti asuhan secara efisien.
            </Txt>
          </div>
          <Btn variant="red" shape="circle" className="gap-2 px-8 shadow-lg shadow-red-primary/20">
            <Plus size={20} />
            Tambah Barang
          </Btn>
        </div>

        {/* Inventory Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Total Jenis Barang" 
            value="152 Item" 
            icon={Package} 
            color="primary" 
          />
          <StatCard 
            label="Barang Keluar (Minggu Ini)" 
            value="42 Item" 
            icon={Inbox} 
            color="info" 
          />
          <StatCard 
            label="Stok Menipis" 
            value="5 Item" 
            icon={AlertTriangle} 
            color="danger" 
          />
        </div>

        {/* Filter & Search */}
        <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Cari nama barang atau kategori..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-primary/20 text-sm font-medium transition-all"
            />
          </div>
          <Btn variant="light" shape="rounded" className="w-full md:w-auto h-12 border-gray-50 bg-gray-50/50 text-gray-500">Filter Kategori</Btn>
        </div>

        {/* Inventory List */}
        <InventoryTable />
      </div>
    </DashboardTemplate>
  );
}
