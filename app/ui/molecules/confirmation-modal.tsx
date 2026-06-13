'use client';

import React from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { cn } from '@/app/lib/utils';

export type ConfirmationVariant = 'danger' | 'warning' | 'info';

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantStyles: Record<ConfirmationVariant, { icon: React.ReactNode; bg: string; btn: 'red' | 'light' | 'transparent' }> = {
  danger: {
    icon: <XCircle className="w-12 h-12 text-red-500" />,
    bg: 'bg-red-100',
    btn: 'red',
  },
  warning: {
    icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
    bg: 'bg-yellow-100',
    btn: 'light', // Using light variant with custom styling
  },
  info: {
    icon: <Info className="w-12 h-12 text-blue-500" />,
    bg: 'bg-blue-100',
    btn: 'light',
  },
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'warning',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <Container className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className={cn("mx-auto flex items-center justify-center h-20 w-20 rounded-full mb-6", styles.bg)}>
            {styles.icon}
          </div>
          
          <Txt variant="h3" weight="bold" className="mb-2">
            {title}
          </Txt>
          <Txt variant="body" className="text-lightdark-neutral mb-8">
            {message}
          </Txt>

          <div className="flex gap-4 justify-center">
            <Btn variant="transparent" border="border" borderColor="dark" size="md" onClick={onCancel} className="flex-1">
              {cancelText}
            </Btn>
            <Btn variant={styles.btn} size="md" onClick={onConfirm} className="flex-1">
              {confirmText}
            </Btn>
          </div>
        </div>
      </Container>
    </div>
  );
};
