import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface AvatarProps {
  src: string;
  size?: "sm" | "md" | "lg" | number;
  alt?: string;
  className?: string;
}

/**
 * Komponen Avatar untuk menampilkan gambar profil pengguna dalam bentuk lingkaran.
 * 
 * @param {string} src - URL sumber gambar avatar
 * @param {"sm" | "md" | "lg" | number} size - Ukuran avatar (sm: 32px, md: 48px, lg: 64px) atau angka dalam pixel
 * @param {string} alt - Teks alternatif untuk gambar (default: "Avatar")
 * @param {string} className - Class tambahan Tailwind CSS
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
    <div className={cn("relative overflow-hidden rounded-full flex-shrink-0", className)} 
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

