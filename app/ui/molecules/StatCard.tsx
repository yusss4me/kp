import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { cn } from "@/app/lib/utils";

interface StatCardProps {
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
    secondary: "text-orange-primary bg-orange-primary/10",
  };

  return (
    <Container
      className={cn(
        "bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl", colorClasses[color])}>
          <Icon size={24} />
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
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
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
