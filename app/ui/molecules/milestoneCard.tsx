import React from "react";
import { Container } from "@/app/ui/atoms/container";
import { Avatar } from "../atoms/avatar";
import { Txt } from "@/app/ui/atoms/text";

export interface MilestoneCardProps {
  title: string;
  range: string;
  image?: string;
}

/**
 * MilestoneCard
 *
 * Komponen kartu untuk menampilkan pencapaian atau target tertentu
 * dalam sebuah program atau akun pengguna.
 *
 * @param {string} title - Judul pencapaian / milestone
 * @param {string} range - Rentang nilai atau progres (misal: "Rp 1jt - Rp 5jt")
 * @param {string} [image] - URL gambar ikon milestone (opsional, fallback ke inisial jika kosong)
 * @param {MilestoneCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen MilestoneCard
 */
export const MilestoneCard: React.FC<MilestoneCardProps> = ({ title, range, image }) => (
  <Container gap="xl" variant="transparent" className="flex p-5 rounded-3xl items-center text-center w-full">
    <Avatar size={80} src={image} alt={title} name={title} />
    <Container className="flex-col min-w-0">
      <Txt variant="h4" color="light" className="font-bold text-sm leading-tight truncate">{title}</Txt>
      <Txt variant="caption" color="light" className="text-[10px] mt-1 opacity-80">{range}</Txt>
    </Container>
  </Container>
);