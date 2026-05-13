import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import { Btn } from "../atoms/button";

interface ProfileHeaderProps {
  name: string;
  role: string;
  image: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  image,
}) => {
  return (
    <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-white/50 shadow-lg overflow-hidden bg-white/10">
            <Image
              src={image}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-red-primary rounded-full" />
        </div>
        <div className="flex flex-col gap-0.5">
          <Txt variant="h4" weight="bold" color="white" font="jakarta" className="text-xl">
            {name}
          </Txt>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <Txt variant="small" color="white" font="jakarta" className="opacity-80">
              {role}
            </Txt>
          </div>
        </div>
      </div>
      <Link href="/home/profile" className="w-full sm:w-auto">
        <Btn
          variant="light"
          size="sm"
          shape="rounded"
          className="w-full sm:w-auto py-2.5 px-6 shadow-lg bg-white/10 border-white/20 text-white hover:bg-white hover:text-red-primary active:scale-[0.98] transition-all font-bold"
        >
          Lihat Profil
        </Btn>
      </Link>
    </Container>
  );
};
