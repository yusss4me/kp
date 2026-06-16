import React from "react";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { StatCard } from "@/app/ui/molecules/stat-card";
import { Badge } from "@/app/ui/atoms/badge";
import {
  Heart,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Filter,
  Search,
  Download,
} from "lucide-react";

import { ApprovalRequest } from "@/app/lib/types/entities";

export interface OversightStat {
  label: string;
  value: string;
  icon: any;
  color: any;
  trend?: { value: number; isUp: boolean };
}

export interface ProgramPerformance {
  name: string;
  progress: string;
  status: "Active" | "Completed" | "Critical";
  trend: string;
}

interface OwnerDonationsTemplateProps {
  stats: OversightStat[];
  requests: ApprovalRequest[];
  programs: ProgramPerformance[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function OwnerDonationsTemplate({ stats, requests, programs, onApprove, onReject }: OwnerDonationsTemplateProps) {
  return (
    <DashboardHeader headerTitle="Pengawasan Program & Donasi">
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div className="space-y-1">
            <Txt
              variant="h3"
              weight="bold"
              className="text-gray-900 tracking-tight"
            >
              Oversight Yayasan
            </Txt>
            <Txt variant="body" className="text-gray-500">
              Pantau kinerja program dan setujui inisiatif penggalangan dana
              baru.
            </Txt>
          </div>
          <div className="flex gap-3">
            <Btn variant="light" className="gap-2 bg-white border-gray-200">
              <Download size={20} />
              Laporan PDF
            </Btn>
            <Btn variant="red" className="gap-2">
              <TrendingUp size={20} />
              Analitik
            </Btn>
          </div>
        </div>

        {/* Oversight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Approval Queue */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Txt variant="h4" weight="bold">
                Antrian Persetujuan
              </Txt>
              <Badge color="warning" variant="solid">
                {requests.length} Baru
              </Badge>
            </div>
          </div>

          <div className="bg-orange-50/30 border border-orange-100 rounded-[40px] p-8 space-y-6">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-6 rounded-3xl border border-orange-100/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <AlertCircle size={28} />
                  </div>
                  <div>
                    <Txt weight="bold" className="text-lg text-gray-900">
                      {req.title}
                    </Txt>
                    <Txt variant="caption" className="text-gray-400">
                      Diajukan oleh{" "}
                      <span className="text-gray-900 font-medium">
                        {req.requester}
                      </span>{" "}
                      • {req.date}
                    </Txt>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <Txt
                      variant="caption"
                      className="text-gray-400 uppercase font-bold tracking-wider"
                    >
                      Target
                    </Txt>
                    <Txt weight="bold" className="text-gray-900">
                      {req.amount}
                    </Txt>
                  </div>
                  <div className="flex gap-2">
                    <Btn
                      variant="light"
                      size="sm"
                      className="bg-gray-50 border-none text-gray-400"
                    >
                      Detail
                    </Btn>
                    <Btn
                      type="button"
                      variant="light"
                      size="sm"
                      className="bg-red-50 text-red-primary border-none"
                      onClick={() => onReject?.(req.id)}
                    >
                      Tolak
                    </Btn>
                    <Btn type="button" variant="red" size="sm" className="gap-2" onClick={() => onApprove?.(req.id)}>
                      <CheckCircle2 size={16} />
                      Setujui
                    </Btn>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* High-level Monitoring Table */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Txt variant="h4" weight="bold">
              Monitoring Kinerja Program
            </Txt>
            <div className="flex gap-3">
              <div className="relative w-full md:w-64">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Cari program..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-gray-50 border-none text-sm font-medium focus:ring-2 focus:ring-red-primary/10 transition-all"
                />
              </div>
              <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-primary transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Nama Program
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Progress
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Trend
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {programs.map((item) => (
                  <tr
                    key={item.name}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-5 font-bold text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-primary"
                            style={{ width: item.progress }}
                          />
                        </div>
                        <Txt variant="caption" weight="bold">
                          {item.progress}
                        </Txt>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge
                        variant="soft"
                        color={
                          item.status === "Completed"
                            ? "success"
                            : item.status === "Critical"
                              ? "danger"
                              : "primary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td
                      className={`px-8 py-5 font-bold ${item.trend.startsWith("+") ? "text-green-600" : item.trend === "N/A" ? "text-gray-300" : "text-red-primary"}`}
                    >
                      {item.trend}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Btn
                        variant="light"
                        size="sm"
                        className="bg-gray-50 border-none text-gray-400 hover:text-red-primary"
                      >
                        Audit
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardHeader>
  );
}
