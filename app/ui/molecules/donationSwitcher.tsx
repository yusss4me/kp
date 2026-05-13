'use client';
import React, { useState } from 'react';

type DonationTarget = 'anak' | 'program';

export const DonationSwitcher: React.FC = () => {
  const [target, setTarget] = useState<DonationTarget>('program');

  return (
    <div className="flex bg-white rounded-2xl p-1 shadow-sm w-full max-w-md mx-auto">
      <button
        onClick={() => setTarget('anak')}
        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
          target === 'anak' ? 'bg-red-600 text-white' : 'text-gray-500'
        }`}
      >
        Donasi Anak
      </button>
      <button
        onClick={() => setTarget('program')}
        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
          target === 'program' ? 'bg-red-600 text-white' : 'text-gray-500'
        }`}
      >
        Program Donasi
      </button>
    </div>
  );
};