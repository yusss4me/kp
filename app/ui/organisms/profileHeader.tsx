import React from 'react';
import { ShieldCheck, CircleDollarSign, CheckCircle2 } from 'lucide-react';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Img } from '../atoms/image';

interface StatItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => (
  <Container className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
    <Container className="text-gray-400 flex items-center justify-center">{icon}</Container>
    <Container className="flex flex-col">
      <Txt variant="caption" weight="bold" className="text-gray-500 uppercase">{label}</Txt>
      <Txt variant="small" weight="bold" className="text-gray-800">{value}</Txt>
    </Container>
  </Container>
);

export interface ProfileHeaderProps {
  className?: string;
}

/**
 * ProfileHeader
 * 
 * Komponen header profil alternatif yang lebih detail.
 * Menampilkan avatar dengan badge verifikasi, nama, gelar kontribusi, 
 * serta statistik ringkas dalam bentuk StatItem.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ProfileHeaderProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ProfileHeader
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = () => {
  return (
    <Container className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <Container className="flex flex-col items-center mb-6">
        <Container className="relative">
          <Img 
            src="/avatar.jpg" 
            w={96}
            h={96}
            aspect="square"
            
            className="border-4 border-white shadow-md" 
            alt="Profile" 
          />
          <CheckCircle2 className="absolute bottom-1 right-1 text-green-500 fill-white" size={20} />
        </Container>
        <Txt variant="h4" weight="bold" className="mt-3 text-gray-900">XioFik Hasan</Txt>
        <Txt variant="small" className="text-gray-400">Hope Giver</Txt>
      </Container>
      <Container className="grid grid-cols-2 gap-4">
        <StatItem label="Donations" value="52" icon={<ShieldCheck size={18}/>} />
        <StatItem label="Total Donated" value="$450" icon={<CircleDollarSign size={18}/>} />
      </Container>
    </Container>
  );
};