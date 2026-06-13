// components/molecules/QuickActionCard.tsx

'use client';
import React from 'react';
import Link from 'next/link';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { Txt } from '../atoms/text';
import { cn } from '@/app/lib/utils';

export interface QuickActionCardProps {
  Icon: LucideIcon;
  label: string;
  description?: string;
  href?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  badge?: string | number;
}

/**
 * QuickActionCard
 * 
 * Komponen kartu aksi cepat dengan icon, label, dan dukungan link (href), deskripsi, badge, 
 * serta desain modern beranimasi halus saat di-hover.
 */
export const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  Icon, 
  label, 
  description, 
  href, 
  color = 'primary',
  badge 
}) => {
  const colorStyles: Record<string, string> = {
    primary: 'bg-red-primary/10 text-red-primary group-hover:bg-red-primary group-hover:text-white',
    success: 'bg-success/10 text-success group-hover:bg-success group-hover:text-white',
    warning: 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-white',
    danger: 'bg-danger/10 text-danger group-hover:bg-danger group-hover:text-white',
    info: 'bg-info/10 text-info group-hover:bg-info group-hover:text-white',
    secondary: 'bg-gray-100 text-gray-500 group-hover:bg-gray-500 group-hover:text-white',
  };

  const CardContent = (
    <div className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-primary/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-red-50/10 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={cn(
          "p-3 rounded-xl transition-colors duration-300 shadow-inner",
          colorStyles[color]
        )}>
          <Icon size={22} className="stroke-[2]" />
        </div>
        <div className="flex flex-col">
          <Txt variant="h6" weight="bold" className="text-gray-900 group-hover:text-red-primary transition-colors duration-300">
            {label}
          </Txt>
          {description && (
            <Txt variant="small" className="text-gray-500 mt-0.5 line-clamp-1 group-hover:text-gray-600 transition-colors">
              {description}
            </Txt>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        {badge && (
          <span className="flex items-center justify-center min-w-[24px] h-[24px] px-2 text-[11px] font-bold text-white bg-red-primary rounded-full shadow-md animate-in zoom-in duration-300">
            {badge}
          </span>
        )}
        <ChevronRight size={18} className="text-gray-300 group-hover:text-red-primary group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block outline-none">
        {CardContent}
      </Link>
    );
  }

  return <div className="cursor-default">{CardContent}</div>;
};