"use client";
import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, CheckCircle2, XCircle, Info } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Icn } from '@/app/ui/atoms/icon';

export type ValidationStatus = 'pending' | 'verified' | 'rejected' | 'warning' | 'dark' | 'light' ;

export interface DataVerificationProps {
  status: ValidationStatus;
  isAdmin?: boolean;
  onVerify?: () => void;
  onReject?: (reason?: string) => void;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * DataVerification
 * 
 * Komponen untuk menampilkan status verifikasi data (Pending, Verified, Rejected).
 * Menyediakan aksi interaktif untuk Admin guna menyetujui atau menolak data.
 * 
 * @param {ValidationStatus} status - Status verifikasi data saat ini
 * @param {boolean} isAdmin - Apakah dalam mode Admin untuk menampilkan aksi verifikasi
 * @param {() => void} onVerify - Handler saat data disetujui/diverifikasi
 * @param {(reason?: string) => void} onReject - Handler saat data ditolak
 * @param {string} title - Judul kustom untuk status verifikasi
 * @param {string} description - Deskripsi kustom untuk status verifikasi
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {DataVerificationProps} props - Properti komponen
 * @returns {JSX.Element} Komponen DataVerification
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
      icon: Info,
      color: 'blue',
      title: title || 'Menunggu Verifikasi',
      desc: description || 'Data sedang dalam proses peninjauan oleh tim YAMUTI.',
      bg: 'bg-info/25',
      border: 'border-info',
      iconBg: 'bg-info',
      textColor: 'text-info',
      descColor: 'text-info',
    },
    verified: {
      icon: ShieldCheck,
      color: 'emerald',
      title: title || 'Data Terverifikasi',
      desc: description || 'Data ini telah diverifikasi valid dan sesuai oleh tim YAMUTI.',
      bg: 'bg-success/25',
      border: 'border-success',
      iconBg: 'bg-success',
      textColor: 'text-success',
      descColor: 'text-success',
    },
    rejected: {
      icon: ShieldAlert,
      color: 'red',
      title: title || 'Data Ditolak',
      desc: description || 'Data ini tidak lolos proses verifikasi. Silakan hubungi admin.',
      bg: 'bg-danger/25',
      border: 'border-danger',
      iconBg: 'bg-danger',
      textColor: 'text-danger',
      descColor: 'text-danger',
    },
    warning: {
      icon: Clock,
      color: 'yellow',
      title: title || 'Perikas Kembali',
      desc: description || 'Periksa kembali data yang telah anda masukkan. Pastikan data sudah benar.',
      bg: 'bg-warning/25',
      border: 'border-warning',
      iconBg: 'bg-warning',
      textColor: 'text-warning',
      descColor: 'text-warning',
    },
    light: {
      icon: Clock,
      color: 'light ',
      title: title || 'Perikas Kembali',
      desc: description || 'Periksa kembali data yang telah anda masukkan. Pastikan data sudah benar.',
      bg: 'bg-lightdark-primary/25',
      border: 'border-lightdark-primary',
      iconBg: 'bg-lightdark-primary',
      textColor: 'text-lightdark-primary',
      descColor: 'text-lightdark-primary',
    },
    dark: {
      icon: Clock,
      color: 'dark',
      title: title || 'Perikas Kembali',
      desc: description || 'Periksa kembali data yang telah anda masukkan. Pastikan data sudah benar.',
      bg: 'bg-lightdark-tertiary/25',
      border: 'border-lightdark-tertiary',
      iconBg: 'bg-lightdark-tertiary',
      textColor: 'text-lightdark-tertiary',
      descColor: 'text-lightdark-tertiary',
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <Container className={cn(
      "p-6 rounded-3xl border transition-all duration-300",
      current.bg,
      current.border,
      className
    )}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Container variant='transparent' className={cn("p-4 text-lightdark-primary rounded-2xl shadow-lg", current.iconBg)}>
          <Icn icon={Icon} size={28} color="current" />
        </Container>
        
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
              className="flex-1 md:flex-none gap-2 text-danger border-danger hover:bg-danger hover:text-white"
              onClick={() => onReject?.()}
            >
              <XCircle size={18} />
              Tolak
            </Btn>
            <Btn 
              variant="transparent" 
              size="sm" 
              className="flex-1 md:flex-none gap-2 text-white bg-success hover:bg-success/95 border-none"
              onClick={() => onVerify?.()}
            >
              <CheckCircle2 size={18} />
              Verifikasi
            </Btn>
          </div>
        )}
      </div>
    </Container>
  );
};
