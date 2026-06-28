import { ProfileHeader } from "../molecules/profile-header";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Wallet, Heart, CreditCard, MapPin } from "lucide-react";
import { SummaryCard } from "../molecules/summaty-card";

export interface ProfileCardProps {
  nameUser: string;
  roleUser: string;
  imageUser: string;
  amountProgramUser: string;
  amountVisitUser: string;
  amountDonatedUser: string;

}

/**
 * ProfileCard
 * 
 * Komponen kartu profil yang menampilkan ringkasan profil pengguna 
 * (foto, nama, peran) dan statistik dampak donasi (Program, Kunjungan, Terdonasi).
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ProfileCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ProfileCard
 */
export const ProfileCard = ({nameUser, roleUser, imageUser, amountProgramUser, amountVisitUser, amountDonatedUser}: ProfileCardProps) => {
  return (
    <Container
      className="flex flex-col gap-8 w-full border border-red-secondary/20 shadow-lg shadow-red-primary/5 rounded-xl"
      variant="red"
      padding="lg"
    >
      <ProfileHeader
        name={nameUser}
        role={roleUser}
        image={imageUser}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          title={amountProgramUser}
          value="Program"
          Icon={Heart}
        />
        <SummaryCard
          title={amountVisitUser}
          value="Kunjungan"
          Icon={MapPin}
        />
        <SummaryCard
          title={amountDonatedUser}
          value="Terdonasi"
          Icon={Wallet}
        />
      </div>
    </Container>
  );
};
