'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Heart, MapPin, Users, Clock, ChevronDown, Share2 } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { Avatar } from '../atoms/avatar';
import { cn } from '@/app/lib/utils';

export interface DetailAnakProps {
    id?: string;
}

const mockAnakData: Record<string, {
    image: string;
    name: string;
    age: number;
    location: string;
    description: string;
    target: number;
    raised: number;
    donorsCount: number;
    daysRemaining: number;
    author: { name: string; avatar: string };
    gallery: string[];
}> = {
    default: {
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
        name: 'Ahmad Syaifuddin',
        age: 10,
        location: 'Rumah Yatim, Jakarta Selatan',
        description: 'Ahmad adalah salah satu anak asuh kami yang memiliki semangat belajar yang sangat tinggi. Saat ini ia sedang menempuh pendidikan di bangku sekolah dasar. Donasi ini akan digunakan untuk biaya SPP, seragam sekolah, dan buku pelajaran Ahmad selama satu tahun ke depan.',
        target: 5000000,
        raised: 1500000,
        donorsCount: 42,
        daysRemaining: 15,
        author: {
            name: 'Fanny',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
        },
        gallery: [
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544333346-608687f8b965?q=80&w=1968&auto=format&fit=crop',
        ],
    },
};

export const DetailAnak = ({ id }: DetailAnakProps) => {
    const router = useRouter();
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    const data = (id && mockAnakData[id]) ? mockAnakData[id] : mockAnakData['default'];

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
            .format(amount).replace('IDR', 'Rp');

    const progress = Math.min((data.raised / data.target) * 100, 100);

    return (
        <Container className="flex flex-col min-h-screen bg-gray-50 pb-24">
            {/* Hero */}
            <div className="relative h-[420px] w-full overflow-hidden">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Actions */}
                <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-3">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-red-500 shadow-lg">
                            <Heart size={20} fill="currentColor" />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Hero Info */}
                <div className="absolute bottom-10 left-0 right-0 px-6 space-y-3">
                    <div className="flex items-center gap-2 text-white/80">
                        <MapPin size={16} />
                        <Txt variant="caption" color="light" className="opacity-80">{data.location}</Txt>
                    </div>
                    <Txt variant="h3" color="light" weight="bold" className="leading-tight">{data.name}</Txt>
                    <Txt variant="caption" color="light" className="opacity-70">Usia {data.age} Tahun · Anak Asuh YAMUTI</Txt>

                    <div className="space-y-2 pt-1">
                        <div className="flex justify-between items-baseline">
                            <Txt color="light" variant="h6" className="font-bold">{formatCurrency(data.raised)}</Txt>
                            <Txt variant="caption" color="light" className="opacity-60">dari {formatCurrency(data.target)}</Txt>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-8 pb-10 flex-grow shadow-2xl">
                {/* Author & Stats */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Avatar src={data.author.avatar} size="sm" />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <Txt color="grey" variant="caption">Oleh</Txt>
                                <Txt color="dark" variant="caption" className="font-bold">{data.author.name}</Txt>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Users size={18} />
                            <Txt variant="caption" weight="bold">{data.donorsCount}</Txt>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Clock size={18} />
                            <Txt variant="caption" weight="bold">{data.daysRemaining} hari</Txt>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-3 mb-8">
                    <Txt color="grey" variant="h6" weight="bold">Tentang Anak Asuh</Txt>
                    <div className={cn('text-gray-400 text-sm leading-relaxed', !isDescExpanded && 'line-clamp-5')}>
                        {data.description}
                    </div>
                    <button
                        onClick={() => setIsDescExpanded(!isDescExpanded)}
                        className="flex items-center gap-1 text-red-500 text-sm font-bold"
                    >
                        {isDescExpanded ? 'Lihat Lebih Sedikit' : 'Baca Selengkapnya'}
                        <ChevronDown size={16} className={cn('transition-transform', isDescExpanded && 'rotate-180')} />
                    </button>
                </div>

                {/* Gallery */}
                <div className="flex gap-3 overflow-x-auto pb-4">
                    {data.gallery.map((img, idx) => (
                        <div key={idx} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
                            <img src={img} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Bottom */}
            <div className="bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-4">
                <Btn color="light" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-400">
                    <Heart size={24} />
                </Btn>
                <Btn color="red" textColor="light" className="flex-grow h-14 font-bold rounded-2xl flex items-center justify-center transition-colors">
                    DONASI SEKARANG
                </Btn>
            </div>
        </Container>
    );
};