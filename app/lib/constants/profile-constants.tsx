import { CreditCard, Heart, History, Wallet, MessageCircle, HelpCircle, Info, Settings, Share2, Star } from "lucide-react";


export const PROFILE_MENU_GROUPS = [
    {
        title: "Dana & Transaksi",
        items: [
            { label: "Dana Tersimpan", icon: CreditCard, href: "/user/profil/wallet" },
            { label: "Program Favorit", icon: Heart, href: "/user/profil/favorites" },
            { label: "Riwayat Donasi", icon: History, href: "/user/profil/history" },
            { label: "Metode Pembayaran", icon: Wallet, href: "/user/profil/payment" }
        ]
    },
    {
        title: "Informasi & Bantuan",
        items: [
            { label: "Hubungi Kami", icon: MessageCircle, href: "/user/profil/contact" },
            { label: "Pusat Bantuan", icon: HelpCircle, href: "/user/profil/help" },
            { label: "Tentang YAMUTI", icon: Info, href: "/user/profil/about" }
        ]
    },
    {
        title: "Lainnya",
        items: [
            { label: "Pengaturan Akun", icon: Settings, href: "/user/profil/settings" },
            { label: "Bagikan Aplikasi", icon: Share2, href: "#" },
            { label: "Beri Rating", icon: Star, href: "#" }
        ]
    }
];

export const ADMIN_PROFILE_MENU_GROUPS = [
    {
        title: "Navigasi Admin",
        items: [
            { label: "Profil Admin", icon: Settings, href: "/admin/profile" },
            { label: "Kelola Program", icon: Heart, href: "/admin/program" },
            { label: "Verifikasi Donasi", icon: Wallet, href: "/admin/donasi" }
        ]
    }
];

export const OWNER_PROFILE_MENU_GROUPS = [
    {
        title: "Navigasi Owner",
        items: [
            { label: "Profil Owner", icon: Settings, href: "/super_admin/profile" },
            { label: "Laporan Keuangan", icon: History, href: "/super_admin/reports" },
            { label: "Kelola Admin", icon: Info, href: "/super_admin/admins" }
        ]
    }
];
