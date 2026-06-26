'use client';

import { useRouter } from 'next/navigation';
import { DonationDetailTemplate } from '../templates/donationDetail';
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
  url: string;
  /** URL for the "DONASI SEKARANG" CTA button — context-aware (public vs donatur) */
  donateUrl?: string;
}

const FALLBACK_GALLERY = [
  'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=2070&auto=format&fit=crop',
];

export const DetailProgram = ({ id, url, donateUrl }: DetailProgramProps) => {
  const router = useRouter();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'donasi' | 'volunteer'>('donasi');
  const program = useYamutiStore((s) => (id ? s.getProgramById(id) : undefined));

  if (id && !program) {
    return (
      <Container className="p-10 text-center">
        <Txt className="text-gray-500">Program tidak ditemukan.</Txt>
        <Link href={url} className="text-red-primary font-bold mt-4 inline-block">
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

  const donasiHref = donateUrl || (id ? routes.visitor.donasi(id) : routes.explore());

  return (
    <DonationDetailTemplate
      image={data.image}
      location={data.location}
      title={data.title}
      currentAmount={data.raised}
      targetAmount={data.target}
      author={data.author}
      donorsCount={data.donorsCount}
      daysRemaining={data.daysRemaining}
      description={data.description}
      gallery={data.gallery}
      donateFormUrl={donasiHref}
    />
  );
};
