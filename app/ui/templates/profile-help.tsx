import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { HelpCircle, Search, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface ProfileHelpTemplateProps {
  faqs: { q: string; a: string }[];
}

export function ProfileHelpTemplate({ faqs }: ProfileHelpTemplateProps) {
  return (
    <ProfileSubpageTemplate
      backHref="/home/profil"
      title="Pusat Bantuan"
      description="Cari solusi atau pelajari lebih lanjut tentang Yamuti"
      icon={HelpCircle}
      iconClassName="bg-blue-50 text-blue-600"
      maxWidth="4xl"
    >
      <div className="relative max-w-xl mx-auto group w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-primary transition-colors" size={20} />
        <input
          type="text"
          placeholder="Cari bantuan..."
          className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-red-primary/50 focus:ring-4 focus:ring-red-primary/5 outline-none transition-all"
        />
      </div>

      <div className="space-y-4">
        <Txt variant="h4" weight="bold" className="px-1">
          Pertanyaan Populer
        </Txt>
        <div className="grid gap-4">
          {faqs.map((faq, i) => (
            <Container key={i} variant="light" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 cursor-pointer group hover:border-red-primary/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Txt weight="bold" className="text-gray-900 group-hover:text-red-primary transition-colors">
                    {faq.q}
                  </Txt>
                  <Txt className="text-gray-500 text-sm line-clamp-1">{faq.a}</Txt>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-red-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Container>
          ))}
        </div>
      </div>

      <Container variant="red" radius="2xl" padding="xl" className="text-center text-white space-y-4 shadow-xl shadow-red-primary/20">
        <Txt variant="h4" weight="bold">
          Masih butuh bantuan?
        </Txt>
        <Txt className="text-white/80">Tim kami siap membantu Anda secara langsung via chat atau email.</Txt>
        <Link href="/home/profil/contact" className="inline-block px-8 py-4 bg-white text-red-primary font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform mt-2">
          Hubungi Tim Support
        </Link>
      </Container>
    </ProfileSubpageTemplate>
  );
}
