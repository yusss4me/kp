import { ProfileHeader } from "../molecules/profile-header";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Wallet, Heart, CreditCard, MapPin } from "lucide-react";
import { SummaryCard } from "../molecules/summaty-card";

export const ProfileCard = () => {
  return (
    <Container
      className="flex flex-col gap-8 w-full border border-red-secondary/20 shadow-lg shadow-red-primary/5"
      variant="red"
      padding="lg"
      radius="xl"
    >
      <ProfileHeader
        name="M. Ardiansyah"
        role="Donatur Tetap"
        image="/images/person-2.png"
      />
      
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard
          title="24"
          value="Program"
          icon={<Heart size={18} />}
        />
        <SummaryCard
          title="12"
          value="Kunjungan"
          icon={<MapPin size={18} />}
        />
        <SummaryCard
          title="Rp 2.4jt"
          value="Terdonasi"
          icon={<Wallet size={18} />}
        />
      </div>
    </Container>
  );
};
