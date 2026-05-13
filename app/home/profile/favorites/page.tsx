import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Heart, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DiscoverSection } from "@/app/ui/organisms/discoverSction";

export default function FavoritesPage() {
  const favoriteItems = [
    { id: '1', title: 'Pembangunan Masjid Al-Ikhlas', category: 'Pembangunan', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', title: 'Beasiswa Anak Yatim Piatu', category: 'Pendidikan', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <Container className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/home/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-primary transition-colors group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Profil</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-red-primary shadow-sm">
            <Heart size={32} fill="currentColor" />
          </div>
          <div>
            <Txt variant="h2" weight="bold" className="text-3xl">Program Favorit</Txt>
            <Txt className="text-gray-500">Program donasi yang Anda simpan untuk dibantu nanti</Txt>
          </div>
        </div>

        {favoriteItems.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <DiscoverSection items={favoriteItems} />
          </div>
        ) : (
          <Container variant="white" radius="2xl" padding="xl" className="text-center space-y-4 border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Heart size={40} />
            </div>
            <div>
              <Txt weight="bold" className="text-xl">Belum ada program favorit</Txt>
              <Txt className="text-gray-400">Mulai jelajahi program kebaikan dan simpan yang Anda sukai</Txt>
            </div>
            <Link href="/home/donasi/program" className="inline-block pt-4">
              <Txt className="text-red-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Cari Program <ArrowRight size={18} />
              </Txt>
            </Link>
          </Container>
        )}
      </div>
    </Container>
  );
}
