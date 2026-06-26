"use client";

import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { useState } from "react";

export interface AvatarProps {
  /** @param {string} src - URL sumber gambar avatar */
  src?: string;
  /** @param {"sm" | "md" | "lg" | number} size - Ukuran avatar (sm: 32px, md: 48px, lg: 64px) atau angka dalam pixel */
  size?: "sm" | "md" | "lg" | number;
  /** @param {string} alt - Teks alternatif untuk gambar (default: "Avatar") */
  alt?: string;
  /** @param {string} className - Class tambahan Tailwind CSS */
  className?: string;
  /**
   * @param {string} name - Nama untuk menghasilkan inisial fallback jika gambar tidak tersedia.
   * Jika diisi dan gambar gagal dimuat, akan menampilkan 1-2 huruf pertama dari nama.
   */
  name?: string;
}

/**
 * Avatar
 *
 * Komponen untuk menampilkan gambar profil pengguna dalam bentuk lingkaran.
 * Mendukung berbagai ukuran standar atau ukuran kustom.
 * Jika `src` kosong atau gagal dimuat, tampilkan inisial dari `name` sebagai fallback.
 *
 * @param {AvatarProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Avatar
 */
export const Avatar = ({
  src,
  size = "md",
  alt = "Avatar",
  name,
  className,
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const dimension = typeof size === "number" ? size : sizeMap[size];

  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  const hasImage = src && src.trim() !== "" && !imgError;

  // Hitung ukuran font relatif terhadap ukuran avatar
  const fontSize = Math.max(10, Math.floor(dimension * 0.35));

  return (
    <div
      className={cn("relative overflow-hidden rounded-full shrink-0", className)}
      style={{ width: dimension, height: dimension }}
    >
      {hasImage ? (
        <Image
          src={src!}
          alt={alt}
          width={dimension}
          height={dimension}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback: Inisial nama */
        <div
          className="w-full h-full flex items-center justify-center bg-red-700 text-white font-bold select-none"
          style={{ fontSize }}
          aria-label={`Inisial ${name || "pengguna"}`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};
