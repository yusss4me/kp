'use client';

import React from 'react';
import { DashboardHeader } from '../organisms/DashboardHeader';
import { QuickActionCard, QuickActionCardProps } from '../molecules/QuickActionCard';
import { Txt } from '../atoms/text';
import { Container } from '../atoms/container';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface QuickAccessSection {
  id: string;
  title: string;
  items: QuickActionCardProps[];
}

export interface QuickAccessTemplateProps {
  user: {
    name: string;
    role: string;
  };
  headerTitle: string;
  sections: QuickAccessSection[];
  /** Statistik ringkas di bagian atas (opsional) */
  summaryStats?: {
    icon: LucideIcon;
    label: string;
    value: string;
    color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  }[];
}

/**
 * QuickAccessTemplate
 *
 * Template halaman Quick Access yang dirancang khusus untuk tampilan mobile.
 * Menyediakan navigasi cepat berupa kartu aksi yang dikelompokkan per kategori.
 * Setiap kartu langsung mengarah ke halaman tujuan tanpa perlu membuka sidebar.
 *
 * @param {QuickAccessTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen QuickAccessTemplate
 */
export const QuickAccessTemplate = ({
  user,
  headerTitle,
  sections,
  summaryStats,
}: QuickAccessTemplateProps) => {
  return (
    <DashboardHeader user={user} headerTitle={headerTitle}>
      <div className="space-y-8">
        {/* Summary Stats — Quick glance */}
        {summaryStats && summaryStats.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {summaryStats.map((stat, i) => {
              const StatIcon = stat.icon;
              const colorClasses: Record<string, string> = {
                primary: 'bg-red-primary/10 text-red-primary',
                success: 'bg-success/10 text-success',
                warning: 'bg-warning/10 text-warning',
                danger: 'bg-danger/10 text-danger',
                info: 'bg-info/10 text-info',
                secondary: 'bg-lightdark-secondary text-lightdark-tertiary',
              };
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className={cn('p-2.5 rounded-xl', colorClasses[stat.color])}>
                    <StatIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <Txt variant="caption" className="text-gray-400 font-bold uppercase tracking-wider truncate block">
                      {stat.label}
                    </Txt>
                    <Txt variant="h5" weight="bold" className="text-gray-900 truncate block">
                      {stat.value}
                    </Txt>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Sections */}
        {sections.map((section) => (
          <section key={section.id} className="space-y-3">
            <Container className="px-1">
              <Txt variant="h5" weight="bold" className="text-gray-900">
                {section.title}
              </Txt>
            </Container>

            <div className="space-y-2">
              {section.items.map((item, i) => (
                <QuickActionCard
                  key={`${section.id}-${i}`}
                  Icon={item.Icon}
                  label={item.label}
                  description={item.description}
                  href={item.href}
                  color={item.color || 'primary'}
                  badge={item.badge}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Footer CTA — Desktop hint */}
        <div className="hidden md:flex items-center justify-center gap-2 py-6 text-gray-300">
          <Txt variant="small" className="text-gray-300">
            Halaman ini dioptimalkan untuk tampilan mobile
          </Txt>
        </div>
      </div>
    </DashboardHeader>
  );
};
