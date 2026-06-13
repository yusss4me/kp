'use client';
import React, { useState } from 'react';
import { Icn } from "../atoms/Icn";
import { Txt } from "../atoms/text";
import { Container } from "../atoms/container";
import { Btn } from '../atoms/button';

type DonationTarget = 'anak' | 'program' | 'kunjungan' | 'sumbangan';

/**
 * DonationSwitcher
 * 
 * Komponen pengalih (switch) sederhana untuk memilih antara 
 * donasi anak atau program donasi atau kunjungan atau sumbangan.
 * 
 * @returns {JSX.Element} Komponen DonationSwitcher
 */
export const DonationSwitcher: React.FC = () => {
  const [target, setTarget] = useState<DonationTarget>('program');

  return (
    <Container className="flex bg-white rounded-2xl p-1 shadow-sm w-full max-w-md mx-auto">
      <Btn
        variant='light'
        textColor='red'
        onClick={() => setTarget('anak')}
        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
          target === 'anak' ? 'bg-red-primary text-lightdark-primary' : 'text-lightdark-neutral'
        }`}
      >
        Donasi Anak
      </Btn>
      <Btn
        variant="light"
        textColor="red"
        onClick={() => setTarget('program')}
        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
          target === 'program' ? 'bg-red-primary text-lightdark-primary' : 'text-lightdark-neutral'
        }`}
      >
        Program Donasi
      </Btn>
      <Btn
        variant="light"
        textColor="red"
        onClick={() => setTarget('kunjungan')}
        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
          target === 'kunjungan' ? 'bg-red-primary text-lightdark-primary' : 'text-lightdark-neutral'
        }`}
      >
        Program Kunjungan
      </Btn>
      <Btn
        variant="light"
        textColor="red"
        onClick={() => setTarget('sumbangan')}
        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
          target === 'sumbangan' ? 'bg-red-primary text-lightdark-primary' : 'text-lightdark-neutral'
        }`}
      >
        Program Sumbangan
      </Btn>
    </Container>
  );
};