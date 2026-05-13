import { DonationDetailTemplate } from '@/app/ui/templates/donationDetail';

export default function DonationProgramPage() {
  const programData = {
    image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=2070&auto=format&fit=crop',
    location: 'Taman Safari Cisarua, Bogor',
    title: 'Konservasi Harimau Sumatra',
    currentAmount: 500000,
    targetAmount: 100000000,
    author: {
      name: 'Fanny',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    },
    donorsCount: 138,
    daysRemaining: 10,
    description: 'Proyek ini adalah bagian dari program atau initiative lebih besar yang dikenal sebagai Program Wilayah Konservasi Tesso Nilo (Tesso Nilo Conservation Landscape Program), dimana di dalamnya termasuk 7 modul: Kejahatan Hutan (Forest Crime), Perlindungan Harimau (Tiger Protection), dan berbagai upaya lainnya untuk menjaga kelestarian satwa langka di Indonesia.',
    gallery: [
      'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534190239940-9ab8944f2b8c?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590424744295-888941764619?q=80&w=1974&auto=format&fit=crop',
    ]
  };

  return <DonationDetailTemplate {...programData} />;
}
