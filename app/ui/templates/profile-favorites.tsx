import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { DiscoverSection } from "@/app/ui/organisms/discover-section";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface ProfileFavoritesTemplateProps {
  items: { id: string; title: string; category: string; image: string }[];
}

export function ProfileFavoritesTemplate({ items }: ProfileFavoritesTemplateProps) {
  return (
    <ProfileSubpageTemplate
      backHref="/user/profil"
      title="Program Favorit"
      description="Program donasi yang Anda simpan untuk dibantu nanti"
      icon={Heart}
      iconClassName="bg-red-secondary text-red-primary"
    >
      {items.length > 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <DiscoverSection items={items} />
        </div>
      ) : (
        <Container variant="light" radius="2xl" padding="xl" className="text-center space-y-4 border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <Heart size={40} />
          </div>
          <div>
            <Txt weight="bold" className="text-xl">
              Belum ada program favorit
            </Txt>
            <Txt className="text-gray-400">Mulai jelajahi program kebaikan dan simpan yang Anda sukai</Txt>
          </div>
          <Link href="/user/explore" className="inline-block pt-4">
            <Txt className="text-red-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Cari Program <ArrowRight size={18} />
            </Txt>
          </Link>
        </Container>
      )}
    </ProfileSubpageTemplate>
  );
}
