import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Img } from "../atoms/image";
import { Lnk } from "../atoms/link";
import { Btn } from "../atoms/button";

export interface ProfileHeaderProps {
  name: string;
  role: string;
  image: string;
}

/**
 * ProfileHeader
 * 
 * Komponen header profil yang menampilkan foto, nama, dan peran pengguna.
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
  return (
    <Container className="flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
      <Container className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-white/50 shadow-lg overflow-hidden bg-white/10">
            <Img
              src={image}
              alt="Profile"
              w={64}
              h={64}
              rounded="full"
              aspect="square"
              className="w-full h-full"
            />
          </div>
          <Container variant="success"  className="absolute bottom-0 right-0 w-4 h-4 border-2 rounded-full" />
        </div>
        <Container className="flex flex-col gap-0.5">
          <Txt variant="h4" weight="bold" color="white" font="jakarta" className="text-xl">
            {name}
          </Txt>
          <Container className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <Txt variant="small" color="white" font="jakarta" className="opacity-80">
              {role}
            </Txt>
          </Container>
        </Container>
      </Container>
      <Lnk href="/home/profil" className="w-full sm:w-auto">
        <Btn
          variant="light"
          size="sm"
          shape="rounded"
          className="w-full sm:w-auto py-2.5 px-6 shadow-lg bg-white/10 border-white/20 text-white hover:bg-white hover:text-red-primary active:scale-[0.98] transition-all font-bold"
        >
          Lihat Profil
        </Btn>
      </Lnk>
    </Container>
  );
};
