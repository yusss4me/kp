'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleMore, X } from 'lucide-react';
import { BroadcastEditor } from './BroadcastEditor';
import { cn } from '@/app/lib/utils';

export const BroadcastBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mock template data similar to what was on the pages
  const templatePesan = [
    {
      nama_template: "Update Kegiatan",
      isi: "update kegiatan rutin anak-anak"
    },
    {
      nama_template: "Ucapan Terima Kasih",
      isi: "terima kasih atas donasi Anda bulan ini"
    },
    {
      nama_template: "Kabar Prestasi",
      isi: "kabar prestasi dari anak-anak asuh"
    }
  ];

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="z-[60]">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-4 md:right-8 flex items-center justify-center w-14 h-14 bg-red-primary text-white rounded-full shadow-xl shadow-red-primary/30 hover:scale-105 hover:bg-red-primary/90 transition-all active:scale-95 z-[60]",
          // Push button higher on mobile to avoid overlapping the bottom navbar
          "bottom-[80px] md:bottom-8"
        )}
        aria-label={isOpen ? "Tutup Broadcast" : "Buka Broadcast"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} /> : <MessageCircleMore size={28} />}
      </button>

      {/* Floating Panel (Flyout) */}
      {isOpen && (
        <div className={cn(
          "fixed right-4 md:right-8 z-[60] overflow-hidden",
          "w-[calc(100vw-2rem)] md:w-[700px] max-h-[75vh]",
          "bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] border border-gray-100",
          "animate-in fade-in slide-in-from-bottom-8 duration-300",
          // Position panel above the button
          "bottom-[144px] md:bottom-28"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h3 className="font-bold text-gray-900 text-lg">Broadcast Pesan</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-red-primary hover:bg-red-50 rounded-full transition-colors"
              aria-label="Tutup Panel Broadcast"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content Scrollable Area */}
          <div className="p-6 overflow-y-auto max-h-[calc(75vh-73px)] custom-scrollbar">
            {/* 
              We wrap BroadcastEditor inside a scaled container or standard container 
              We hide its internal header since we already have one in the panel
            */}
            <div className="[&>div>h2]:hidden">
              <BroadcastEditor templatePesan={templatePesan} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
