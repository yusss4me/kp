import Image from "next/image";
import { cn } from "@/app/lib/utils";

export interface AvatarProps {
  /** @param {string} src - URL sumber gambar avatar */
  src: string;
  /** @param {"sm" | "md" | "lg" | number} size - Ukuran avatar (sm: 32px, md: 48px, lg: 64px) atau angka dalam pixel */
  size?: "sm" | "md" | "lg" | number;
  /** @param {string} alt - Teks alternatif untuk gambar (default: "Avatar") */
  alt?: string;
  /** @param {string} className - Class tambahan Tailwind CSS */
  className?: string;
}

/**
 * Avatar
 * 
 * Komponen untuk menampilkan gambar profil pengguna dalam bentuk lingkaran.
 * Mendukung berbagai ukuran standar atau ukuran kustom.
 * 
 * @param {AvatarProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Avatar
 */
export const Avatar = ({
  src,
  size = "md",
  alt = "Avatar",
  className,
}: AvatarProps) => {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const dimension = typeof size === "number" ? size : sizeMap[size];

  return (
    <div className={cn("relative overflow-hidden rounded-full shrink-0", className)} 
         style={{ width: dimension, height: dimension }}>
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

