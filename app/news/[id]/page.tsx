"use client";

import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { LandingHeader } from "@/app/ui/organisms/Landing-Header";
import { LandingFooter } from "@/app/ui/organisms/Landing-Footer";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Calendar } from "lucide-react";
import Link from "next/link";
import { News } from "@/app/lib/types/entities";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getNewsById } = useYamutiStore();
  
  const [newsItem, setNewsItem] = useState<News | null | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (params.id && typeof params.id === "string") {
      const item = getNewsById(params.id);
      setNewsItem(item);
    }
  }, [params.id, getNewsById]);

  if (!mounted) return null;

  if (newsItem === undefined) {
    return (
      <Container variant="light" className="min-h-screen flex flex-col">
        <LandingHeader />
        <main className="flex-1 flex items-center justify-center">
          <Txt variant="h4" className="text-gray-500">Memuat berita...</Txt>
        </main>
        <LandingFooter />
      </Container>
    );
  }

  if (newsItem === null) {
    return (
      <Container variant="light" className="min-h-screen flex flex-col">
        <LandingHeader />
        <main className="flex-1 flex flex-col items-center justify-center gap-6">
          <Txt variant="h2" weight="bold" className="text-gray-900">Berita Tidak Ditemukan</Txt>
          <Txt variant="body" className="text-gray-500 text-center max-w-md">
            Berita yang Anda cari mungkin telah dihapus atau URL tidak valid.
          </Txt>
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-6 py-3 bg-red-primary text-white rounded-full font-medium hover:bg-red-700 transition-colors"
          >
            <ArrowLeft size={20} /> Kembali ke Beranda
          </button>
        </main>
        <LandingFooter />
      </Container>
    );
  }

  return (
    <Container variant="light" className="min-h-screen flex flex-col">
      <LandingHeader />
      
      <main className="flex-1">
        {/* Hero Image Section */}
        <div className="w-full h-[40vh] md:h-[60vh] relative">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="max-w-4xl mx-auto w-full p-6 md:p-12 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={20} /> Kembali
              </Link>
              <Txt variant="h1" weight="bold" className="text-white">
                {newsItem.title}
              </Txt>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <Txt variant="body">{format(new Date(newsItem.date), "dd MMMM yyyy", { locale: id })}</Txt>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <Txt variant="body">Oleh {newsItem.author}</Txt>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 px-6 max-w-4xl mx-auto bg-white -mt-10 relative z-10 rounded-[40px] shadow-sm border border-gray-100 mb-20">
          <div className="p-4 md:p-8">
            <Txt variant="h5" weight="bold" className="text-gray-900 mb-8 pb-8 border-b border-gray-100 leading-relaxed italic">
              {newsItem.summary}
            </Txt>
            
            <div className="prose prose-lg prose-red max-w-none text-gray-700">
              {/* Split content by newlines to render paragraphs */}
              {newsItem.content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </Container>
  );
}
