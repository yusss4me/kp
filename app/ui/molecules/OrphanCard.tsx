import React from "react";
import { User, Calendar, Heart } from "lucide-react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Icn } from "../atoms/Icn";
import { Btn } from "../atoms/button";
import { cn } from "@/app/lib/utils";
import { Img } from "../atoms/image";
import { Lnk } from "../atoms/link";

export interface OrphanCardProps {
  id?: number;
  name: string;
  age: number;
  gender: "Laki-laki" | "Perempuan";
  status: "Baru" | "Aktif" | "Alumni";
  /** Donatur: `/home/aktivitas/anak/{id}` · Admin: `/admin/orphans/{id}/edit` */
  detailHref?: string;
  className?: string;
}
/**
 * OrphanCard
 * 
 * Komponen kartu informasi ringkas untuk anak asuh.
 * Menampilkan foto placeholder, nama, usia, jenis kelamin, dan status.
 * 
 * @param {string} name - Nama anak asuh
 * @param {number} age - Usia anak asuh
 * @param {"Laki-laki" | "Perempuan"} gender - Jenis kelamin anak asuh
 * @param {"Baru" | "Aktif" | "Alumni"} status - Status keanggotaan anak asuh
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {OrphanCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen OrphanCard
 */
export const OrphanCard = ({
  id,
  name,
  age,
  gender,
  status,
  detailHref,
  className,
}: OrphanCardProps) => {
  const statusColors = {
    Baru: "info" as const,
    Aktif: "success" as const,
    Alumni: "secondary" as const,
  };

  return (
    <Container
      variant="light"
      shadow="sm"
      padding="md"
      radius="xl"
      className={cn(
        "border border-gray-100 hover:shadow-lg transition-all duration-300 group",
        className,
      )}
    >
      <Container className="relative mb-4">
        <div className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-[1.02] transition-transform">
          <Icn icon={User} size={150} color="dark" />
        </div>
        <Badge
          className="absolute top-3 right-3"
          color={statusColors[status]}
          variant="solid"
        >
          {status}
        </Badge>
      </Container>

      <Container className="space-y-3">
        <Txt
          weight="bold"
          className="text-lg leading-tight text-gray-900 line-clamp-1"
        >
          {name}
        </Txt>

        <Container  className=" flex-col gap-2">
          <Container className="items-center gap-2 text-gray-500">
            <Icn icon={Calendar} size={14} color="dark" />
            <Txt variant="small" className="font-medium">
              {age} Tahun
            </Txt>
          </Container>
          <Container className=" items-center gap-2 text-gray-500">
            <Icn icon={Heart} size={14} color="dark" />
            <Txt variant="small" className="font-medium">
              {gender}
            </Txt>
          </Container>
        </Container>

        {detailHref ? (
          <Lnk href={detailHref} className="w-full mt-2 block">
            <Btn variant="light" textColor="dark" size="sm" shape="rounded" className="w-full py-2.5 text-xs font-bold rounded-xl">
              Lihat Profil Lengkap
            </Btn>
          </Lnk>
        ) : (
          <Btn variant="light" textColor="dark" size="sm" shape="rounded" className="w-full mt-2 py-2.5 text-xs font-bold rounded-xl">
            Lihat Profil Lengkap
          </Btn>
        )}
      </Container>
    </Container>
  );
};
