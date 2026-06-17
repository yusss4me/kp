'use client';

import React from 'react';
import { DashboardHeader } from '@/app/ui/organisms/dashboard-header';
import { QuickActionCard, QuickActionCardProps } from '@/app/ui/molecules/QuickActionCard';
import { Txt } from '@/app/ui/atoms/text';
import { Container } from '@/app/ui/atoms/container';
import { LucideIcon } from 'lucide-react';
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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        {/* Summary Stats — Quick glance */}
        {summaryStats && summaryStats.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {summaryStats.map((stat, i) => {
              const StatIcon = stat.icon;
              const colorClasses: Record<string, string> = {
                primary: 'bg-red-primary/10 text-red-primary group-hover:bg-red-primary group-hover:text-white',
                success: 'bg-success/10 text-success group-hover:bg-success group-hover:text-white',
                warning: 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-white',
                danger: 'bg-danger/10 text-danger group-hover:bg-danger group-hover:text-white',
                info: 'bg-info/10 text-info group-hover:bg-info group-hover:text-white',
                secondary: 'bg-lightdark-secondary text-lightdark-tertiary group-hover:bg-gray-500 group-hover:text-white',
              };
              return (
                <div
                  key={i}
                  className="group flex flex-col justify-center gap-3 p-5 rounded-[1.25rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-500">
                     <StatIcon size={80} />
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={cn('p-2.5 rounded-xl transition-colors duration-300 shadow-inner', colorClasses[stat.color])}>
                      <StatIcon size={20} className="stroke-[2]" />
                    </div>
                  </div>
                  <div className="min-w-0 relative z-10">
                    <Txt variant="h4" weight="bold" className="text-gray-900 truncate block group-hover:text-red-primary transition-colors duration-300">
                      {stat.value}
                    </Txt>
                    <Txt variant="caption" className="text-gray-500 font-medium tracking-wide truncate block mt-0.5">
                      {stat.label}
                    </Txt>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <section key={section.id} className="space-y-3" style={{ animationDelay: `${idx * 100}ms` }}>
              <Container className="px-1 flex items-center justify-between">
                <Txt variant="h5" weight="bold" className="text-gray-900">
                  {section.title}
                </Txt>
              </Container>

              <div className="space-y-2.5">
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
        </div>

        {/* Footer CTA — Desktop hint */}
        <div className="hidden md:flex flex-col items-center justify-center gap-2 py-8 mt-4 text-center">
          <div className="w-12 h-1 bg-gray-200 rounded-full mb-2"></div>
          <Txt variant="small" className="text-gray-400">
            Halaman ini dioptimalkan untuk akses dan pengelolaan cepat dari perangkat mobile.
          </Txt>
        </div>
      </div>
    </DashboardHeader>
  );
};
