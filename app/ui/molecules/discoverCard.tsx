import React from 'react';
import Link from 'next/link';
import { Img } from '@/app/ui/atoms/image';
import { Btn } from '@/app/ui/atoms/button';
import { Container } from '@/app/ui/atoms/container';
import { Txt } from '@/app/ui/atoms/text';
import { routes } from '@/app/lib/constants/routes';

export interface DiscoverCardProps {
  title: string;
  image: string;
  href?: string;
  onClick?: () => void;
}

export const DiscoverCard: React.FC<DiscoverCardProps> = ({ title, image, href, onClick }) => {
  const content = (
    <Btn
      onClick={onClick}
      variant="light"
      textColor="dark"
      border="border"
      shape="rounded"
      borderColor="light"
      className="flex-col min-w-[240px] w-full overflow-hidden shadow-sm active:scale-95 transition-transform h-full"
    >
      <Container className="relative h-32 w-full">
        <Img src={image} alt={title} width={500} height={500} className="w-full h-full object-cover" />
        
      </Container>
      <Container variant="transparent" padding="md">
        <Txt color="current" className="font-bold leading-tight line-clamp-2">
          {title}
        </Txt>
      </Container>
    </Btn>
  );

  if (href) {
    return (
      <Link href={href} className="block min-w-[240px] md:min-w-0 md:flex-1">
        {content}
      </Link>
    );
  }

  return content;
};
