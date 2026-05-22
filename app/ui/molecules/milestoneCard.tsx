import React from "react";
import { Container } from "@/app/ui/atoms/container";
import { Img } from "@/app/ui/atoms/image";
import { Avatar } from "../atoms/avatar";
import { Txt } from "@/app/ui/atoms/text";

export interface MilestoneCardProps {
  title: string;
  range: string;
  image: string;
}

/**
 * MilestoneCard
 * 
 * Komponen kartu untuk menampilkan pencapaian atau target tertentu 
 * dalam sebuah program atau akun pengguna.
 * 
 * @param {string} title - Judul pencapaian / milestone
 * @param {string} range - Rentang nilai atau progres (misal: "Rp 1jt - Rp 5jt")
 * @param {string} image - URL gambar ikon milestone
 * @param {MilestoneCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen MilestoneCard
 */
export const MilestoneCard: React.FC<MilestoneCardProps> = ({ title, range, image }) => (
  <Container gap="xl" display='flex' variant="transparent" className="p-5 rounded-3xl items-center text-center w-full">
    <Avatar size={100} src={image} alt={title} />
    <Container className="flex-col">

    <Txt variant="h4" color='white' className="font-bold text-sm leading-tight">{title}</Txt>
    <Txt variant="caption" color='white' className="text-[10px] mt-1">{range}</Txt>
    </Container>
  </Container>
);