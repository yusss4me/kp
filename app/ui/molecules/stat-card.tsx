import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Icn } from "../atoms/Icn";
import { cn } from "@/app/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "danger" | "info" | "secondary";
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
}

/**
 * StatCard
 * 
 * Komponen kartu statistik premium untuk menampilkan angka metrik utama.
 * Mendukung indikator tren (naik/turun) dan berbagai varian warna.
 * 
 * @param {string} label - Label keterangan statistik
 * @param {string | number} value - Nilai statistik yang ditampilkan
 * @param {LucideIcon} icon - Icon dari lucide-react
 * @param {"primary" | "success" | "warning" | "danger" | "info" | "secondary"} color - Warna tema kartu
 * @param {object} trend - Informasi tren kenaikan/penurunan (opsional)
 * @param {number} trend.value - Nilai persentase tren
 * @param {boolean} trend.isUp - Apakah tren naik (true) atau turun (false)
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {StatCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen StatCard
 */
export const StatCard = ({
  label,
  value,
  icon: Icon,
  color = "primary",
  trend,
  className,
}: StatCardProps) => {
  const colorClasses = {
    primary: "text-red-primary bg-red-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    danger: "text-danger bg-danger/10",
    info: "text-info bg-info/10",
    secondary: "text-lightdark-tertiary bg-lightdark-secondary",
  };

  return (
    <Container
      className={cn(
        "bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-4 rounded-[1.25rem] transition-colors duration-300 group-hover:scale-110", colorClasses[color])}>
          <Icn icon={Icon} size={24} color="current" />
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
              trend.isUp
                ? "text-success bg-success/10"
                : "text-danger bg-danger/10",
            )}
          >
            {trend.isUp
                ? <Icn icon={TrendingUp} size={12} color="current" />
                : <Icn icon={TrendingDown} size={12} color="current" />}
            {trend.value}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <Txt
          variant="caption"
          className="text-gray-400 font-bold uppercase tracking-wider"
        >
          {label}
        </Txt>
        <Txt
          variant="h4"
          weight="bold"
          className="text-gray-900 tracking-tight"
        >
          {value}
        </Txt>
      </div>
    </Container>
  );
};
