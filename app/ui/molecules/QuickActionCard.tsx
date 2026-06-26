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
  /**
   * @param {'list' | 'grid'} variant
   * - `list` (default): baris horizontal dengan ikon di kiri, teks di kanan, arrow di ujung kanan
   * - `grid`: kotak persegi dengan ikon di atas dan label di bawah — cocok untuk grid 2-3 kolom
   */
  variant?: 'list' | 'grid';
}

/**
 * QuickActionCard
 *
 * Komponen kartu aksi cepat dengan icon, label, dan dukungan link (href), deskripsi, badge,
 * serta desain modern beranimasi halus saat di-hover.
 * Mendukung dua layout: `list` (horizontal) dan `grid` (vertikal/kotak).
 */
export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  Icon,
  label,
  description,
  href,
  color = 'primary',
  badge,
  variant = 'list',
}) => {
  const colorStyles: Record<string, string> = {
    primary: 'bg-red-primary/10 text-red-primary group-hover:bg-red-primary group-hover:text-white',
    success: 'bg-success/10 text-success group-hover:bg-success group-hover:text-white',
    warning: 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-white',
    danger: 'bg-danger/10 text-danger group-hover:bg-danger group-hover:text-white',
    info: 'bg-info/10 text-info group-hover:bg-info group-hover:text-white',
    secondary: 'bg-gray-100 text-gray-500 group-hover:bg-gray-500 group-hover:text-white',
  };

  const labelHoverColor: Record<string, string> = {
    primary: 'group-hover:text-red-primary',
    success: 'group-hover:text-success',
    warning: 'group-hover:text-warning',
    danger: 'group-hover:text-danger',
    info: 'group-hover:text-info',
    secondary: 'group-hover:text-gray-600',
  };

  /* ── Varian LIST (default) ── */
  const ListContent = (
    <div className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-primary/20 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-red-50/10 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center gap-4 relative z-10 min-w-0">
        <div className={cn(
          'shrink-0 p-3 rounded-xl transition-colors duration-300 shadow-inner',
          colorStyles[color]
        )}>
          <Icon size={20} className="stroke-[2]" />
        </div>
        <div className="flex flex-col min-w-0">
          <Txt variant="h6" weight="bold" className={cn('text-gray-900 transition-colors duration-300 truncate', labelHoverColor[color])}>
            {label}
          </Txt>
          {description && (
            <Txt variant="small" className="text-gray-500 mt-0.5 line-clamp-1 group-hover:text-gray-600 transition-colors">
              {description}
            </Txt>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10 shrink-0 ml-2">
        {badge && (
          <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-[11px] font-bold text-white bg-red-primary rounded-full shadow-sm">
            {badge}
          </span>
        )}
        <ChevronRight size={16} className="text-gray-300 group-hover:text-red-primary group-hover:translate-x-0.5 transition-all duration-300" />
      </div>
    </div>
  );

  /* ── Varian GRID (kotak, ikon di atas, label di bawah) ── */
  const GridContent = (
    <div className="group flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-primary/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden aspect-square sm:aspect-auto sm:h-full sm:min-h-[110px] md:min-h-[120px] sm:py-5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className={cn(
        'relative z-10 p-3.5 rounded-2xl transition-colors duration-300 shadow-inner',
        colorStyles[color]
      )}>
        <Icon size={22} className="stroke-[2]" />
      </div>

      <div className="relative z-10 text-center min-w-0 w-full px-1">
        <Txt variant="small" weight="bold" className={cn('text-gray-800 transition-colors duration-300 truncate block', labelHoverColor[color])}>
          {label}
        </Txt>
        {badge && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold text-white bg-red-primary rounded-full shadow-sm mt-1">
            {badge}
          </span>
        )}
      </div>
    </div>
  );

  const CardContent = variant === 'grid' ? GridContent : ListContent;

  if (href) {
    return (
      <Link href={href} className="block outline-none">
        {CardContent}
      </Link>
    );
  }

  return <div className="cursor-default">{CardContent}</div>;
};