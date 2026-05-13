import { CreditCard, Heart, History, Wallet, MessageCircle, HelpCircle, Info, Settings, Share2, Star } from "lucide-react";
import React from "react";

export const PROFILE_MENU_GROUPS = [
    {
        title: "Dana & Transaksi",
        items: [
            { label: "Dana Tersimpan", icon: React.createElement(CreditCard, { size: 20 }), href: "/home/profile/wallet" },
            { label: "Program Favorit", icon: React.createElement(Heart, { size: 20 }), href: "/home/profile/favorites" },
            { label: "Riwayat Donasi", icon: React.createElement(History, { size: 20 }), href: "/home/profile/history" },
            { label: "Metode Pembayaran", icon: React.createElement(Wallet, { size: 20 }), href: "/home/profile/payment" }
        ]
    },
    {
        title: "Informasi & Bantuan",
        items: [
            { label: "Hubungi Kami", icon: React.createElement(MessageCircle, { size: 20 }), href: "/home/profile/contact" },
            { label: "Pusat Bantuan", icon: React.createElement(HelpCircle, { size: 20 }), href: "/home/profile/help" },
            { label: "Tentang YAMUTI", icon: React.createElement(Info, { size: 20 }), href: "/home/profile/about" }
        ]
    },
    {
        title: "Lainnya",
        items: [
            { label: "Pengaturan Akun", icon: React.createElement(Settings, { size: 20 }), href: "/home/profile/settings" },
            { label: "Bagikan Aplikasi", icon: React.createElement(Share2, { size: 20 }), href: "#" },
            { label: "Beri Rating", icon: React.createElement(Star, { size: 20 }), href: "#" }
        ]
    }
];
