'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={cn(
        'flex items-center p-4 mb-4 rounded-lg border shadow-sm transition-all duration-300 animate-in slide-in-from-right fade-in',
        variantStyles[variant]
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{variantIcons[variant]}</div>
      <div className="ml-3 text-sm font-medium mr-8">{message}</div>
      <button
        onClick={() => onClose(id)}
        type="button"
        className={cn(
          'ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 focus:ring-2 focus:ring-opacity-50 hover:bg-black/5',
          `text-${variant}-500 focus:ring-${variant}-400`
        )}
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
