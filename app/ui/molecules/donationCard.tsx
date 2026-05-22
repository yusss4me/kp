import React from 'react';
import { Heart } from 'lucide-react';
import { Img } from '@/app/ui/atoms/image';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Badge } from '@/app/ui/atoms/badge';
import { Icn } from '@/app/ui/atoms/icon';
import { ProgressBar } from '@/app/ui/atoms/progressBar';
import { Container } from '@/app/ui/atoms/container';

export interface DonationCardProps {
  name: string;
  description: string;
  image: string;
  categoryTag: string;
  target: number;
  raised: number;
}

/**
 * DonationCard
 * 
 * Komponen kartu program donasi yang lengkap dengan informasi progres, 
 * target, dan aksi donasi.
 * 
 * @param {string} name - Nama program donasi
 * @param {string} description - Deskripsi singkat program donasi
 * @param {string} image - URL gambar sampul program
 * @param {string} categoryTag - Label kategori program
 * @param {number} target - Nilai target donasi yang ingin dicapai
 * @param {number} raised - Nilai donasi yang sudah terkumpul saat ini
 * @param {DonationCardProps} props - Properti komponen
 * @returns {JSX.Element} Komponen DonationCard
 */
export const DonationCard: React.FC<DonationCardProps> = ({ name, description, image, categoryTag, target, raised }) => {
  return (
    <Container
      variant="light"
      radius="2xl"
      
      shadow='lg'
      padding='md'
      border='md'
      bordercolor='light'
      className="  mb-5 hover:shadow-md transition-shadow duration-300"
    >
      <Container gap='lg' className='flex'>
        <Container className="relative shrink-0">
          <Img
            src={image}
            alt={name}
            w={100}
            h={100}
            rounded="lg"
            aspect="square"
          />
          <Container variant='red' radius='full' shadow='lg' padding='sm' className="absolute -top-2 -right-2 ">
            <Icn icon={Heart} size={12} color="light" />
          </Container>
        </Container>

        <Container  className="flex flex-col flex-1 min-w-0">
          <Container className="flex justify-between items-start gap-2">
            <Txt variant="h6" weight="bold"  className=" truncate">
              {name}
            </Txt>
            <Badge variant="soft" color="primary" className="shrink-0 rounded-lg text-[10px] uppercase tracking-wider">
              {categoryTag}
            </Badge>
          </Container>
          <Txt variant="small" color='grey'  className="mt-2 line-clamp-2">
            {description}
          </Txt>
        </Container>
      </Container>

      {/* Progress Section */}
      <Container  padding='sm' className=" mt-6 space-y-2">
        <Container className=" justify-between items-end">
          <Container className="space-y-0.5">
            <Txt variant="caption" color='grey' className="font-medium uppercase tracking-tight">
              Terkumpul
            </Txt>
            <Txt variant="small" weight="bold" color='red'>
              Rp {raised.toLocaleString('id-ID')}
            </Txt>
          </Container>
          <Container variant='light' radius='rounded' padding='sm'>

          <Txt variant="caption" weight="bold" color='dark'>
            {Math.min(Math.round((raised / target) * 100), 100)}%
          </Txt>
          </Container>
        </Container>
        <ProgressBar current={raised} target={target} />
        <Txt variant="caption" color='grey'>
          Target:{' '}
          <span className="font-bold text-gray-600">
            Rp {target.toLocaleString('id-ID')}
          </span>
        </Txt>
      </Container>

      <Container gap='md' className="flex mt-6">
        <Btn
          variant="light"
          textColor='dark'
          size="sm"
          shape="rounded"
          className="flex-1 py-3  text-xs"
        >
          Detail
        </Btn>
        <Btn
          variant="red"
          size="sm"
          shape="rounded"
          className="flex py-3 text-xs shadow-lg shadow-red-100"
        >
          Donasi Sekarang
        </Btn>
      </Container>
    </Container>
  );
};