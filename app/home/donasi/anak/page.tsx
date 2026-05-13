import { DonationDetailTemplate } from '@/app/ui/templates/donationDetail';

export default function DonationAnakPage() {
  const childData = {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    location: 'Rumah Yatim, Jakarta Selatan',
    title: 'Beasiswa Pendidikan untuk Ahmad Syaifuddin',
    currentAmount: 1500000,
    targetAmount: 5000000,
    author: {
      name: 'Fanny',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    },
    donorsCount: 42,
    daysRemaining: 15,
    description: 'Ahmad adalah salah satu anak asuh kami yang memiliki semangat belajar yang sangat tinggi. Saat ini ia sedang menempuh pendidikan di bangku sekolah dasar. Donasi ini akan digunakan untuk biaya SPP, seragam sekolah, dan buku pelajaran Ahmad selama satu tahun ke depan.',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544333346-608687f8b965?q=80&w=1968&auto=format&fit=crop',
    ]
  };

  return <DonationDetailTemplate {...childData} />;
}
