'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Heart, 
  MoreHorizontal, 
  MapPin, 
  Users, 
  Clock, 
  ChevronDown,
  Play
} from 'lucide-react';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { ProgressBar } from '@/app/ui/atoms/progressBar';
import { Avatar } from '@/app/ui/atoms/avatar';
import { cn } from '@/app/lib/utils';

interface DonationDetailTemplateProps {
  image: string;
  location: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  author: {
    name: string;
    avatar: string;
  };
  donorsCount: number;
  daysRemaining: number;
  description: string;
  gallery: string[];
}

export const DonationDetailTemplate: React.FC<DonationDetailTemplateProps> = ({
  image,
  location,
  title,
  currentAmount,
  targetAmount,
  author,
  donorsCount,
  daysRemaining,
  description,
  gallery,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'donasi' | 'volunteer'>('donasi');
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Hero Section */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
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
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-success shadow-lg">
              <Heart size={20} fill="currentColor" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Video Play Button Overlay (Optional, based on image) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-success">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Hero Info Content */}
        <div className="absolute bottom-12 left-0 right-0 px-6 space-y-4">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin size={16} />
            <Txt variant="caption" color="white" className="opacity-80">
              {location}
            </Txt>
          </div>
          <Txt variant="h3" color="white" weight="bold" className="leading-tight">
            {title}
          </Txt>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <Txt variant="h6" className="text-warning font-bold">
                {formatCurrency(currentAmount)}
              </Txt>
              <Txt variant="caption" color="white" className="opacity-60">
                Terkumpul dari {formatCurrency(targetAmount)}
              </Txt>
            </div>
            
            {/* Custom Progress Bar to match design */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-warning transition-all duration-500"
                style={{ width: `${Math.min((currentAmount / targetAmount) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Tab Switches */}
          <div className="mt-8 bg-white/20 backdrop-blur-md p-1 rounded-full flex">
            <button 
              onClick={() => setActiveTab('donasi')}
              className={cn(
                "flex-1 py-3 rounded-full text-sm font-bold transition-all",
                activeTab === 'donasi' ? "bg-[#B9E9E0] text-[#1E5D53]" : "text-white"
              )}
            >
              Donasi
            </button>
            <button 
              onClick={() => setActiveTab('volunteer')}
              className={cn(
                "flex-1 py-3 rounded-full text-sm font-bold transition-all",
                activeTab === 'volunteer' ? "bg-[#B9E9E0] text-[#1E5D53]" : "text-white"
              )}
            >
              Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* Detail Content Section */}
      <div className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-8 pb-10 flex-grow shadow-2xl">
        {/* Creator & Stats Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Avatar src={author.avatar} size="sm" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Txt variant="caption" className="text-gray-500">Oleh</Txt>
                <Txt variant="caption" className="text-warning font-bold">{author.name}</Txt>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Users size={18} />
              <Txt variant="caption" weight="bold">{donorsCount}</Txt>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock size={18} />
              <Txt variant="caption" weight="bold">{daysRemaining} hari</Txt>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 mb-8">
          <Txt variant="h6" weight="bold" className="text-gray-900">Deskripsi</Txt>
          <div className={cn(
            "text-gray-400 text-sm leading-relaxed",
            !isDescExpanded && "line-clamp-5"
          )}>
            {description}
          </div>
          <button 
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="flex items-center gap-1 text-success text-sm font-bold"
          >
            {isDescExpanded ? 'Lihat Lebih Sedikit' : 'Baca Selengkapnya'}
            <ChevronDown size={16} className={cn("transition-transform", isDescExpanded && "rotate-180")} />
          </button>
        </div>

        {/* Gallery */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {gallery.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-4">
        <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-400">
          <MapPin size={24} />
        </button>
        <button className="flex-grow h-14 bg-success text-white font-bold rounded-2xl flex items-center justify-center hover:bg-success/90 transition-colors">
          DONASI SEKARANG
        </button>
      </div>
    </div>
  );
};
