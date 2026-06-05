import { CreditCard, Heart, History, Wallet, MessageCircle, HelpCircle, Info, Settings, Share2, Star } from "lucide-react";


export const PROFILE_MENU_GROUPS = [
    {
        title: "Dana & Transaksi",
        items: [
            { label: "Dana Tersimpan", icon: CreditCard, href: "/home/profil/wallet" },
            { label: "Program Favorit", icon: Heart, href: "/home/profil/favorites" },
            { label: "Riwayat Donasi", icon: History, href: "/home/profil/history" },
            { label: "Metode Pembayaran", icon: Wallet, href: "/home/profil/payment" }
        ]
    },
    {
        title: "Informasi & Bantuan",
        items: [
            { label: "Hubungi Kami", icon: MessageCircle, href: "/home/profil/contact" },
            { label: "Pusat Bantuan", icon: HelpCircle, href: "/home/profil/help" },
            { label: "Tentang YAMUTI", icon: Info, href: "/home/profil/about" }
        ]
    },
    {
        title: "Lainnya",
        items: [
            { label: "Pengaturan Akun", icon: Settings, href: "/home/profil/settings" },
            { label: "Bagikan Aplikasi", icon: Share2, href: "#" },
            { label: "Beri Rating", icon: Star, href: "#" }
        ]
    }
];
