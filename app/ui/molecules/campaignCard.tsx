// components/molecules/CampaignerCard.tsx
import React from 'react';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Container } from '@/app/ui/atoms/container';
import { Avatar } from '@/app/ui/atoms/avatar';
import { Icn } from '@/app/ui/atoms/Icn';
import { Plus, CheckCircle2 } from 'lucide-react';

export interface CampaignerCardProps {
  name: string;
  avatar: string;
  title: string;
  isVerified?: boolean;
}

/**
 * CampaignerCard
 * 
 * Komponen kartu profil ringkas untuk penggalang dana (campaigner).
 * Menampilkan avatar, nama, status verifikasi, dan gelar.
 * 
 * @param {string} name - Nama penggalang dana / campaigner
 * @param {string} avatar - URL foto profil campaigner
 * @param {string} title - Gelar atau jabatan campaigner
 * @param {boolean} isVerified - Apakah akun campaigner telah diverifikasi
 * @param {CampaignerCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen CampaignerCard
 */
export const CampaignerCard: React.FC<CampaignerCardProps> = ({ name, avatar, title, isVerified }) => {
  return (
    <Container 
    variant='light'
    padding='md'
    shadow='md'
    radius='full'
    
    className="flex items-center justify-between"
    >
      <Container className="flex items-center gap-3">
        <Avatar src={avatar} alt={name}  />
        <Container>
          <Container className="flex items-center gap-1">
            <Txt variant="h4" weight="bold" color="default" >{name}</Txt>
            <Container radius='full' variant='info'>
            {isVerified && <Icn icon={CheckCircle2} color='light' />}
            </Container>
          </Container>
          <Txt variant="caption" weight="normal" color="default">{title}</Txt>
        </Container>
      </Container>
      <Btn variant="transparent" textColor='dark'>
        <Icn icon={Plus} />
      </Btn>
    </Container>
  );
};