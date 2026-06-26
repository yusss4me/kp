import { CheckCircle2, Heart, ShieldCheck, Users, LucideIcon } from "lucide-react";

/** Konten statis landing page (bukan data API) */
export const LANDING_USER_AVATARS = [
  { id: "1", src: "https://i.pravatar.cc/150?u=1", alt: "User 1" },
  { id: "2", src: "https://i.pravatar.cc/150?u=2", alt: "User 2" },
  { id: "3", src: "https://i.pravatar.cc/150?u=3", alt: "User 3" },
  { id: "4", src: "https://i.pravatar.cc/150?u=4", alt: "User 4" },
];

export const LANDING_SLIDES = [
  { id: "1", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", alt: "Modern Tech Office" },
  { id: "2", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop", alt: "Corporate Collaboration" },
  { id: "3", src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop", alt: "Premium Architecture" },
];

export const LANDING_BENEFITS: { id: string; title: string; description: string; icon: LucideIcon }[] = [
  { id: "1", title: "Transparansi", description: "Laporan keuangan dan program yang transparan", icon: ShieldCheck },
  { id: "2", title: "Aksesibilitas", description: "Kemudahan akses program dan donasi", icon: CheckCircle2 },
  { id: "3", title: "Komunitas", description: "Jaringan donatur dan relawan yang solid", icon: Users },
  { id: "4", title: "Dampak Nyata", description: "Program terukur untuk penerima manfaat", icon: Heart },
];

export const LANDING_PROGRAMS = [
  {
    id: "prog-1",
    title: "Beasiswa Pendidikan Yatim",
    category: "Pendidikan",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
  },
  {
    id: "prog-2",
    title: "Bantuan Pangan Nusantara",
    category: "Kemanusiaan",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "prog-3",
    title: "Pemberdayaan Ekonomi Dhuafa",
    category: "Pemberdayaan",
    image: "https://images.unsplash.com/photo-1559027615-3da11600d5c0?q=80&w=1974&auto=format&fit=crop",
  },
];
