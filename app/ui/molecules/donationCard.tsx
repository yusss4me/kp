import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Img } from '@/app/ui/atoms/image';
import { Txt } from '@/app/ui/atoms/text';
import { Btn } from '@/app/ui/atoms/button';
import { Badge } from '@/app/ui/atoms/badge';
import { Icn } from '@/app/ui/atoms/Icn';
import { ProgressBar } from '@/app/ui/atoms/progressBar';
import { Container } from '@/app/ui/atoms/container';

export interface DonationCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryTag: string;
  target: number;
  raised: number;
  /** URL halaman detail, contoh `/home/aktivitas/anak/1` */
  detailHref?: string;
  /** URL aksi donasi, contoh `/home/donasi/prog-1` */
  donateHref?: string;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  id,
  name,
  description,
  image,
  categoryTag,
  target,
  raised,
  detailHref,
  donateHref,
}) => {
  const cardInner = (
    <Container
      variant="light"
      radius="2xl"
      shadow="lg"
      padding="md"
      border="md"
      bordercolor="light"
      className="mb-5 hover:shadow-md transition-shadow duration-300"
    >
      <Container gap="lg" className="flex">
        <Container className="relative shrink-0">
          <Img src={image} alt={name} w={100} h={100} rounded="lg" aspect="square" />
        </Container>

        <Container className="flex flex-col flex-1 min-w-0">
          <Container className="flex justify-between items-start gap-2">
            <Txt variant="h6" weight="bold" className="truncate">
              {name}
            </Txt>
            <Badge variant="soft" color="primary" className="shrink-0 rounded-lg text-[10px] uppercase tracking-wider">
              {categoryTag}
            </Badge>
          </Container>
          <Txt variant="small" color="grey" className="mt-2 line-clamp-2">
            {description}
          </Txt>
        </Container>
      </Container>

      <Container padding="sm" className="mt-6 space-y-2">
        <Container className="justify-between items-end">
          <Container className="space-y-0.5">
            <Txt variant="caption" color="grey" className="font-medium uppercase tracking-tight">
              Terkumpul
            </Txt>
            <Txt variant="small" weight="bold" color="red">
              Rp {raised.toLocaleString('id-ID')}
            </Txt>
          </Container>
          <Container variant="light" radius="rounded" padding="sm">
            <Txt variant="caption" weight="bold" color="dark">
              {Math.min(Math.round((raised / target) * 100), 100)}%
            </Txt>
          </Container>
        </Container>
        <ProgressBar current={raised} target={target} />
        <Txt variant="caption" color="grey">
          Target: <span className="font-bold text-gray-600">Rp {target.toLocaleString('id-ID')}</span>
        </Txt>
      </Container>

      <Container gap="md" className="flex mt-6">
        {detailHref ? (
          <Link href={detailHref} className="flex-1">
            <Btn variant="light" textColor="dark" size="sm" shape="rounded" className="w-full py-3 text-xs">
              Detail
            </Btn>
          </Link>
        ) : (
          <Btn variant="light" textColor="dark" size="sm" shape="rounded" className="flex-1 py-3 text-xs" disabled>
            Detail
          </Btn>
        )}
        {donateHref ? (
          <Link href={donateHref} className="flex-1">
            <Btn variant="red" size="sm" shape="rounded" className="w-full py-3 text-xs shadow-lg shadow-red-100">
              Donasi Sekarang
            </Btn>
          </Link>
        ) : (
          <Btn variant="red" size="sm" shape="rounded" className="flex-1 py-3 text-xs">
            Donasi Sekarang
          </Btn>
        )}
      </Container>
    </Container>
  );

  return <div id={id}>{cardInner}</div>;
};
