import React from "react";
import { User, Calendar, Heart } from "lucide-react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Badge } from "./badge";
import { cn } from "@/app/lib/utils";

interface OrphanCardProps {
  name: string;
  age: number;
  gender: "Laki-laki" | "Perempuan";
  status: "Baru" | "Aktif" | "Alumni";
  className?: string;
}

export const OrphanCard = ({
  name,
  age,
  gender,
  status,
  className,
}: OrphanCardProps) => {
  const statusColors = {
    Baru: "info" as const,
    Aktif: "success" as const,
    Alumni: "secondary" as const,
  };

  return (
    <Container
      className={cn(
        "bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group",
        className,
      )}
    >
      <div className="relative mb-4">
        <div className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-[1.02] transition-transform">
          <User size={48} className="text-gray-200" />
        </div>
        <Badge
          className="absolute top-3 right-3"
          color={statusColors[status]}
          variant="solid"
        >
          {status}
        </Badge>
      </div>

      <div className="space-y-3">
        <Txt
          weight="bold"
          className="text-lg leading-tight text-gray-900 line-clamp-1"
        >
          {name}
        </Txt>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={14} />
            <Txt variant="small" className="font-medium">
              {age} Tahun
            </Txt>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Heart size={14} />
            <Txt variant="small" className="font-medium">
              {gender}
            </Txt>
          </div>
        </div>

        <button className="w-full mt-2 py-2.5 bg-gray-50 hover:bg-red-primary/5 text-gray-400 hover:text-red-primary text-xs font-bold rounded-xl transition-all">
          Lihat Profil Lengkap
        </button>
      </div>
    </Container>
  );
};
