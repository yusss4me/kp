"use client";

import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { Txt } from "@/app/ui/atoms/text";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

export function LandingNewsSection() {
  const { news } = useYamutiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || news.length === 0) return null;

  // Show only top 3 latest news
  const latestNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50/50 rounded-[40px] my-10">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3 text-red-primary">
            <Newspaper size={24} />
            <Txt variant="h5" weight="bold" className="uppercase tracking-wider">
              Kabar Terbaru
            </Txt>
          </div>
          <Txt variant="h2" weight="bold" className="text-gray-900">
            Berita & Artikel
          </Txt>
          <Txt variant="body" className="text-gray-500">
            Ikuti perkembangan terbaru, cerita inspiratif, dan laporan kegiatan dari Yayasan Yamuti.
          </Txt>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestNews.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`} className="group block">
            <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-56 w-full relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-8 space-y-4">
                <Txt variant="caption" className="text-red-primary font-medium">
                  {format(new Date(item.date), "dd MMMM yyyy", { locale: id })}
                </Txt>
                <Txt variant="h4" weight="bold" className="text-gray-900 line-clamp-2 group-hover:text-red-primary transition-colors">
                  {item.title}
                </Txt>
                <Txt variant="body" className="text-gray-600 line-clamp-3">
                  {item.summary}
                </Txt>
                <div className="pt-4 flex items-center gap-2 text-red-primary font-medium">
                  Baca Selengkapnya
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
