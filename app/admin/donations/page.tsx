import React from "react";
import { DashboardTemplate } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { StatCard } from "@/app/ui/molecules/StatCard";
import { Badge } from "@/app/ui/atoms/badge";
import {
  Heart,
  Users,
  Calendar,
  Filter,
  Plus,
  Search,
  DollarSign,
  Edit2,
  Trash2,
  MoreVertical,
  Clock,
} from "lucide-react";
import { DataVerification } from "@/app/ui/molecules/dataVerification";
import Link from "next/link";

export default function DonationsPage() {
  return (
    <DashboardTemplate headerTitle="Manajemen Donasi">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt
              variant="h3"
              weight="bold"
              className="text-gray-900 tracking-tight"
            >
              Portal Donasi & Donatur
            </Txt>
            <Txt variant="body" className="text-gray-500">
              Kelola program donasi dan pantau kontribusi dari para donatur
              setia.
            </Txt>
          </div>
          <Link href="/admin/donations/tambah-donasi">
            <Btn
              variant="red"
              shape="circle"
              className="gap-2 px-8 shadow-lg shadow-red-primary/20"
            >
              <Plus size={20} />
              Program Baru
            </Btn>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Donasi"
            value="Rp 150M"
            icon={Heart}
            color="primary"
            trend={{ value: 8, isUp: true }}
          />
          <StatCard
            label="Donatur Aktif"
            value="342"
            icon={Users}
            color="info"
            trend={{ value: 12, isUp: true }}
          />
          <StatCard
            label="Bulan Ini"
            value="Rp 12.5M"
            icon={DollarSign}
            color="success"
            trend={{ value: 5, isUp: true }}
          />
          <StatCard
            label="Target Program"
            value="85%"
            icon={Filter}
            color="secondary"
          />
        </div>

        {/* Pending Verification Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <Clock size={20} className="text-blue-600" />
            <Txt variant="h4" weight="bold">
              Donasi Perlu Verifikasi
            </Txt>
            <Badge color="info" variant="solid" className="ml-2">
              2 Baru
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* <DataVerification
              isAdmin
              status="pending"
              title="Donasi dari Bpk. Bambang"
              description="Nominal: Rp 500.000 untuk Beasiswa Anak Yatim. Bukti transfer telah diunggah."
              onVerify={() => alert("Diverifikasi!")}
              onReject={() => alert("Ditolak!")}
              className="bg-white shadow-sm border-gray-100"
            />
            <DataVerification
              isAdmin
              status="pending"
              title="Donasi dari Hamba Allah"
              description="Nominal: Rp 1.000.000 untuk Pembangunan Asrama. Menunggu konfirmasi mutasi bank."
              onVerify={() => alert("Diverifikasi!")}
              onReject={() => alert("Ditolak!")}
              className="bg-white shadow-sm border-gray-100"
            /> */}
          </div>
        </section>

        {/* Programs Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <Txt variant="h4" weight="bold">
              Program Donasi Aktif
            </Txt>
            <Txt
              variant="caption"
              className="text-red-primary font-bold cursor-pointer hover:underline"
            >
              Kelola Semua Program
            </Txt>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "1",
                title: "Pembangunan Asrama Baru",
                target: "Rp 50.000.000",
                collected: "Rp 35.000.000",
                progress: 70,
              },
              {
                id: "2",
                title: "Biaya Pendidikan Rutin",
                target: "Rp 20.000.000",
                collected: "Rp 18.000.000",
                progress: 90,
              },
              {
                id: "3",
                title: "Sembako Yatim & Dhuafa",
                target: "Rp 10.000.000",
                collected: "Rp 4.000.000",
                progress: 40,
              },
            ].map((program) => (
              <div
                key={program.id}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/donations/edit-donasi/${program.id}`}>
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </Link>
                  <button className="p-2 bg-red-50 text-red-primary rounded-xl hover:bg-red-100 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex justify-between items-start gap-4 pr-16">
                  <Txt
                    weight="bold"
                    className="text-lg leading-tight text-gray-900"
                  >
                    {program.title}
                  </Txt>
                  <Badge
                    color={program.progress > 80 ? "success" : "primary"}
                    variant="solid"
                  >
                    {program.progress}%
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-primary rounded-full"
                      style={{ width: `${program.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <Txt
                        variant="caption"
                        className="text-gray-400 font-bold uppercase tracking-wider"
                      >
                        Terkumpul
                      </Txt>
                      <Txt
                        variant="small"
                        weight="bold"
                        className="text-red-primary"
                      >
                        {program.collected}
                      </Txt>
                    </div>
                    <div className="flex flex-col text-right">
                      <Txt
                        variant="caption"
                        className="text-gray-400 font-bold uppercase tracking-wider"
                      >
                        Target
                      </Txt>
                      <Txt
                        variant="small"
                        weight="bold"
                        className="text-gray-900"
                      >
                        {program.target}
                      </Txt>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/admin/donations/edit-donasi/${program.id}`}
                    className="w-full"
                  >
                    <Btn
                      variant="light"
                      size="sm"
                      shape="rounded"
                      className="w-full py-3 bg-gray-50 border-none text-gray-600 hover:text-red-primary"
                    >
                      Edit
                    </Btn>
                  </Link>
                  <Btn
                    variant="light"
                    size="sm"
                    shape="rounded"
                    className="w-full py-3 bg-red-50/50 border-none text-red-primary/60 hover:text-red-primary hover:bg-red-50"
                  >
                    Hapus
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Donors List Table */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Txt variant="h4" weight="bold">
              Donatur Teratas
            </Txt>
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari donatur..."
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-primary/20 text-sm font-medium transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Nama Donatur
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Kontribusi
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Terakhir Donasi
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    name: "H. Suherman",
                    total: "Rp 25.000.000",
                    last: "10 Apr 2026",
                    status: "Donatur Tetap",
                  },
                  {
                    name: "Ibu Ratnasari",
                    total: "Rp 12.500.000",
                    last: "05 Apr 2026",
                    status: "Donatur Tetap",
                  },
                  {
                    name: "Bpk. Ahmad Fauzi",
                    total: "Rp 5.000.000",
                    last: "12 Apr 2026",
                    status: "Baru",
                  },
                  {
                    name: "CV. Maju Jaya",
                    total: "Rp 50.000.000",
                    last: "01 Apr 2026",
                    status: "Institusi",
                  },
                ].map((donor) => (
                  <tr
                    key={donor.name}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 font-bold text-gray-900 group-hover:text-red-primary transition-colors">
                      {donor.name}
                    </td>
                    <td className="px-8 py-5 text-red-primary font-black">
                      {donor.total}
                    </td>
                    <td className="px-8 py-5 text-gray-400 text-sm font-medium">
                      {donor.last}
                    </td>
                    <td className="px-8 py-5">
                      <Badge
                        variant="soft"
                        color={donor.status === "Baru" ? "info" : "success"}
                      >
                        {donor.status}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-gray-300 hover:text-red-primary transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
