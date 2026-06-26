"use client";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Lnk } from "../atoms/link";
import { Btn } from "../atoms/button";
import { useState } from "react";

export interface ProfileHeaderProps {
  name: string;
  role: string;
  image: string;
}

/**
 * ProfileHeader
 *
 * Komponen header profil yang menampilkan foto, nama, dan peran pengguna.
 * Jika field `image` kosong atau gagal dimuat, tampilkan inisial nama sebagai fallback.
 * Dirancang untuk ditempatkan pada dashboard atau halaman profil.
 *
 * @param {string} name - Nama lengkap pengguna
 * @param {string} role - Peran atau jabatan pengguna
 * @param {string} image - URL foto profil pengguna
 * @param {ProfileHeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ProfileHeader
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  image,
}) => {
  const [imgError, setImgError] = useState(false);

  /** Ambil dua huruf pertama nama sebagai inisial fallback */
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  const hasImage = image && image.trim() !== "" && !imgError;

  return (
    <Container className="flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
      <Container className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-white/50 shadow-lg overflow-hidden bg-white/10">
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={`Foto profil ${name}`}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Fallback: Inisial nama di atas background merah */
              <div className="w-full h-full flex items-center justify-center bg-red-700 text-white font-bold text-xl select-none">
                {initials}
              </div>
            )}
          </div>
          {/* Indikator online */}
          <Container
            variant="success"
            className="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full"
          />
        </div>
        <Container className="flex flex-col gap-0.5 min-w-0">
          <Txt variant="h4" weight="bold" color="light" font="jakarta" className="text-xl truncate">
            {name}
          </Txt>
          <Container className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
            <Txt variant="small" color="light" font="jakarta" className="opacity-80 truncate">
              {role}
            </Txt>
          </Container>
        </Container>
      </Container>
      <Lnk href="/user/profil" className="w-full sm:w-auto shrink-0">
        <Btn
          variant="light"
          size="sm"
          shape="rounded"
          className="w-full sm:w-auto py-2.5 px-6 shadow-lg bg-white/10 border border-white/20 text-white hover:bg-white hover:text-red-primary active:scale-[0.98] transition-all font-bold"
        >
          Lihat Profil
        </Btn>
      </Lnk>
    </Container>
  );
};
