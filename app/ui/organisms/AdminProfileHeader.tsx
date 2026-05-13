'use client';
import React from 'react';
import { ShieldCheck, LayoutDashboard, Clock, Wallet } from 'lucide-react';
import { Txt } from '../atoms/text';

export const AdminProfileHeader: React.FC = () => {
  return (
    <div className="bg-red-primary p-8 rounded-b-[40px] shadow-xl relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
      
      <div className="flex items-center gap-6 relative z-10">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
            className="w-20 h-20 rounded-[28px] object-cover border-4 border-white/20 shadow-xl" 
            alt="Administrator" 
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 w-5 h-5 rounded-full border-4 border-red-primary flex items-center justify-center">
            <ShieldCheck size={10} className="text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <Txt variant="h5" weight="bold" color="white">M. Ardiansyah</Txt>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full border border-white/10">
            <span className="text-[10px] text-white font-black uppercase tracking-widest">Administrator</span>
          </div>
        </div>
      </div>

      {/* Admin Quick Stats Card */}
      <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
              <Wallet size={16} className="text-white/60 mb-2" />
              <p className="text-white font-black text-lg">Rp 152.4jt</p>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Total Donasi</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
              <LayoutDashboard size={16} className="text-white/60 mb-2" />
              <p className="text-white font-black text-lg">24</p>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Program Aktif</p>
          </div>
          <div className="col-span-2 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <div className="bg-warning/20 p-2 rounded-xl">
                      <Clock size={16} className="text-warning" />
                  </div>
                  <div>
                      <p className="text-white font-black text-sm">8 Menunggu</p>
                      <p className="text-white/60 text-[10px] font-bold">Verifikasi Donasi</p>
                  </div>
              </div>
              <button className="px-4 py-2 bg-white text-red-primary rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95">
                  Proses
              </button>
          </div>
      </div>
    </div>
  );
};
