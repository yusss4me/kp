import { ActivityClientTemplate } from "@/app/ui/templates/activity-client-template";

export default function Page() {
  const campaigns = [
    {
      name: "Beasiswa Anak Yatim Piatu",
      categoryTag: "EDU",
      description: "Bantu biaya sekolah untuk 50 anak yatim di Tasikmalaya.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
      target: 50000000,
      raised: 32500000
    },
    {
      name: "Sembako Jum'at Berkah",
      categoryTag: "SOC",
      description: "Program berbagi pangan untuk lansia dhuafa setiap pekan.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      target: 10000000,
      raised: 7800000
    },
    {
      name: "Pembangunan Masjid Al-Ikhlas",
      categoryTag: "BLD",
      description: "Renovasi atap dan tempat wudhu masjid di pelosok desa.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      target: 150000000,
      raised: 45000000
    }
  ];
  return (
    <ActivityClientTemplate campaigns={campaigns} />
  )
}