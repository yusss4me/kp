'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, MapPin, Users, Clock, ChevronDown, Share2, Target } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { Avatar } from '../atoms/avatar';
import { Badge } from '../atoms/badge';
import { cn } from '@/app/lib/utils';
import { useYamutiStore } from '@/app/lib/stores/yamuti-store';
import { routes } from '@/app/lib/constants/routes';

export interface DetailProgramProps {
  id?: string;
}

const FALLBACK_GALLERY = [
  'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=2070&auto=format&fit=crop',
];

export const DetailProgram = ({ id }: DetailProgramProps) => {
  const router = useRouter();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'donasi' | 'volunteer'>('donasi');
  const program = useYamutiStore((s) => (id ? s.getProgramById(id) : undefined));

  if (id && !program) {
    return (
      <Container className="p-10 text-center">
        <Txt className="text-gray-500">Program tidak ditemukan.</Txt>
        <Link href={routes.explore()} className="text-red-primary font-bold mt-4 inline-block">
          Jelajahi Program
        </Link>
      </Container>
    );
  }

  const data = program
    ? {
        image: program.image ?? FALLBACK_GALLERY[0],
        title: program.title,
        category: program.category,
        location: program.location,
        description: program.description,
        target: program.targetAmount,
        raised: program.collectedAmount,
        donorsCount: 100,
        daysRemaining: 30,
        author: { name: 'Yayasan Yamuti', avatar: 'https://i.pravatar.cc/150?u=yamuti' },
        gallery: program.image ? [program.image, ...FALLBACK_GALLERY] : FALLBACK_GALLERY,
      }
    : {
        image: FALLBACK_GALLERY[0],
        title: 'Beasiswa Anak Yatim Piatu',
        category: 'Pendidikan',
        location: 'Tasikmalaya',
        description: 'Program donasi yayasan.',
        target: 100_000_000,
        raised: 500_000,
        donorsCount: 138,
        daysRemaining: 10,
        author: { name: 'Yayasan Yamuti', avatar: 'https://i.pravatar.cc/150?u=yamuti' },
        gallery: FALLBACK_GALLERY,
      };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
      .format(amount)
      .replace('IDR', 'Rp');

  const progress = Math.min((data.raised / data.target) * 100, 100);
  const donasiHref = id ? routes.donasi(id) : routes.explore();

  return (
    <Container className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <div className="relative h-[450px] w-full overflow-hidden">
        <Image src={data.image} alt={data.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center">
          <button type="button" onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-red-500 shadow-lg">
              <Heart size={20} fill="currentColor" />
            </button>
            <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 px-6 space-y-3">
          <Badge variant="solid" color="primary" className="bg-red-500 border-none text-xs">
            {data.category}
          </Badge>
          <div className="flex items-center gap-2 text-white/80">
            <MapPin size={16} />
            <Txt variant="caption" color="light" className="opacity-80">
              {data.location}
            </Txt>
          </div>
          <Txt variant="h3" color="light" weight="bold" className="leading-tight">
            {data.title}
          </Txt>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-baseline">
              <Txt color="light" variant="h6" className="font-bold">
                {formatCurrency(data.raised)}
              </Txt>
              <Txt variant="caption" color="light" className="opacity-60">
                dari {formatCurrency(data.target)}
              </Txt>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          
        </div>
      </div>

      <div className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-8 pb-10 flex-grow shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Avatar src={data.author.avatar} size="sm" />
            <div className="flex items-center gap-1">
              <Txt color="grey" variant="caption">
                Oleh
              </Txt>
              <Txt color="dark" variant="caption" className="font-bold">
                {data.author.name}
              </Txt>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Users size={18} />
              <Txt variant="caption" weight="bold">
                {data.donorsCount}
              </Txt>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock size={18} />
              <Txt variant="caption" weight="bold">
                {data.daysRemaining} hari
              </Txt>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 p-4 bg-red-50 rounded-2xl">
          <Target size={20} className="text-red-500" />
          <div>
            <Txt variant="caption" className="text-gray-500">
              Target Program
            </Txt>
            <Txt variant="body" weight="bold" className="text-red-500">
              {formatCurrency(data.target)}
            </Txt>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <Txt color="grey" variant="h6" weight="bold">
            Tentang Program
          </Txt>
          <div className={cn('text-gray-400 text-sm leading-relaxed', !isDescExpanded && 'line-clamp-5')}>{data.description}</div>
          <button type="button" onClick={() => setIsDescExpanded(!isDescExpanded)} className="flex items-center gap-1 text-red-500 text-sm font-bold">
            {isDescExpanded ? 'Lihat Lebih Sedikit' : 'Baca Selengkapnya'}
            <ChevronDown size={16} className={cn('transition-transform', isDescExpanded && 'rotate-180')} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4">
          {data.gallery.map((img, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
              <Image src={img} alt={`Galeri ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-4">
        <Btn color="light" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-400">
          <MapPin size={24} />
        </Btn>
        <Link href={donasiHref} className="flex-grow">
          <Btn color="red" textColor="light" className="w-full h-14 font-bold rounded-2xl flex items-center justify-center transition-colors">
            DONASI SEKARANG
          </Btn>
        </Link>
      </div>
    </Container>
  );
};
