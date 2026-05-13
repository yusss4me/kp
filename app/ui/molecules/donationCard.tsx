import React from 'react';
import { MessageCircle, Phone, Heart } from 'lucide-react';

interface DonationCardProps {
  name: string;
  description: string;
  image: string;
  categoryTag: string;
  target: number;
  raised: number;
}

export const DonationCard: React.FC<DonationCardProps> = ({ name, description, image, categoryTag, target, raised }) => {
  const percentage = Math.min(Math.round((raised / target) * 100), 100);
  
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-5 hover:shadow-md transition-shadow duration-300">
      <div className="flex gap-5">
        <div className="relative shrink-0">
            <img src={image} className="w-24 h-24 rounded-[24px] object-cover" alt={name} />
            <div className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg">
                <Heart size={12} fill="currentColor" />
            </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-bold text-gray-900 truncate text-base">{name}</h4>
            <span className="shrink-0 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-wider">
              {categoryTag}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Progress Section */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-end">
            <div className="space-y-0.5">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">Terkumpul</p>
                <p className="text-sm font-black text-red-600">Rp {raised.toLocaleString('id-ID')}</p>
            </div>
            <p className="text-[10px] font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md">{percentage}%</p>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
                className="h-full bg-red-600 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%` }}
            />
        </div>
        <div className="flex justify-between">
            <p className="text-[9px] text-gray-400">Target: <span className="font-bold text-gray-600">Rp {target.toLocaleString('id-ID')}</span></p>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-all active:scale-95 border border-gray-100">
          Detail
        </button>
        <button className="flex-[2] py-3 bg-red-600 text-white rounded-2xl font-bold text-xs hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-100">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
};