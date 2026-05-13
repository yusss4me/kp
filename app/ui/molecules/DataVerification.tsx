"use client"
import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';

export type ValidationStatus = 'pending' | 'verified' | 'rejected';

interface DataVerificationProps {
  status: ValidationStatus;
  isAdmin?: boolean;
  onVerify?: () => void;
  onReject?: (reason?: string) => void;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * DataVerification Component
 * Displays the verification status of a piece of data.
 * In Admin mode, provides actions to approve or reject.
 * In Public mode, provides a premium "Verified" or "Pending" shield.
 */
export const DataVerification = ({
  status,
  isAdmin = false,
  onVerify,
  onReject,
  title,
  description,
  className,
}: DataVerificationProps) => {
  
  const config = {
    pending: {
      icon: Clock,
      color: 'blue',
      title: title || 'Menunggu Verifikasi',
      desc: description || 'Data sedang dalam proses peninjauan oleh tim YAMUTI.',
      bg: 'bg-blue-50/50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-900',
      descColor: 'text-blue-700',
    },
    verified: {
      icon: ShieldCheck,
      color: 'emerald',
      title: title || 'Data Terverifikasi',
      desc: description || 'Data ini telah diverifikasi valid dan sesuai oleh tim YAMUTI.',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-600',
      textColor: 'text-emerald-900',
      descColor: 'text-emerald-700',
    },
    rejected: {
      icon: ShieldAlert,
      color: 'red',
      title: title || 'Data Ditolak',
      desc: description || 'Data ini tidak lolos proses verifikasi. Silakan hubungi admin.',
      bg: 'bg-red-50/50',
      border: 'border-red-100',
      iconBg: 'bg-red-600',
      textColor: 'text-red-900',
      descColor: 'text-red-700',
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div className={cn(
      "p-6 rounded-3xl border transition-all duration-300",
      current.bg,
      current.border,
      className
    )}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className={cn("p-4 text-white rounded-2xl shadow-lg", current.iconBg)}>
          <Icon size={28} />
        </div>
        
        <div className="flex-1 space-y-1">
          <Txt weight="bold" className={cn("text-lg", current.textColor)}>
            {current.title}
          </Txt>
          <Txt variant="caption" className={cn("leading-relaxed", current.descColor)}>
            {current.desc}
          </Txt>
        </div>

        {isAdmin && status === 'pending' && (
          <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0">
            <Btn 
              variant="light" 
              size="sm" 
              className="flex-1 md:flex-none gap-2 text-red-600 border-red-100 hover:bg-red-50"
              onClick={() => onReject?.()}
            >
              <XCircle size={18} />
              Tolak
            </Btn>
            <Btn 
              variant="red" 
              size="sm" 
              className="flex-1 md:flex-none gap-2 bg-emerald-600 border-emerald-500 hover:bg-emerald-700 text-white"
              onClick={() => onVerify?.()}
            >
              <CheckCircle2 size={18} />
              Verifikasi
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
};
