import { CreditCard, Heart, History, Wallet, MessageCircle, HelpCircle, Info, Settings, Share2, Star } from "lucide-react";


export const PROFILE_MENU_GROUPS = [
    {
        title: "Dana & Transaksi",
        items: [
            { label: "Dana Tersimpan", icon: CreditCard, href: "/home/profile/wallet" },
            { label: "Program Favorit", icon: Heart, href: "/home/profile/favorites" },
            { label: "Riwayat Donasi", icon: History, href: "/home/profile/history" },
            { label: "Metode Pembayaran", icon: Wallet, href: "/home/profile/payment" }
        ]
    },
    {
        title: "Informasi & Bantuan",
        items: [
            { label: "Hubungi Kami", icon: MessageCircle, href: "/home/profile/contact" },
            { label: "Pusat Bantuan", icon: HelpCircle, href: "/home/profile/help" },
            { label: "Tentang YAMUTI", icon: Info, href: "/home/profile/about" }
        ]
    },
    {
        title: "Lainnya",
        items: [
            { label: "Pengaturan Akun", icon: Settings, href: "/home/profile/settings" },
            { label: "Bagikan Aplikasi", icon: Share2, href: "#" },
            { label: "Beri Rating", icon: Star, href: "#" }
        ]
    }
];
