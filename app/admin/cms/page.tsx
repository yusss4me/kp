"use client";

import { AdminSocialMediaTemplate } from "@/app/ui/templates/admin-social-media";
import { Globe, MessageCircle, Share2 } from "lucide-react";

export default function Page() {
  // API: GET /artikel/stats — route belum tersedia di backend (404)
  const stats = [
    { label: "Total Postingan", value: "—", icon: Share2, color: "primary" as const },
    { label: "Jangkauan Luas", value: "—", icon: Globe, color: "secondary" as const },
    { label: "Pesan Masuk", value: "—", icon: MessageCircle, color: "success" as const },
  ];

  const platforms = [
    { name: "WhatsApp Channel", icon: MessageCircle, status: "Disconnected" as const, color: "text-green-600" },
    { name: "Website Resmi", icon: Globe, status: "Disconnected" as const, color: "text-blue-600" },
    { name: "Portal Berita", icon: Share2, status: "Disconnected" as const, color: "text-red-primary" },
  ];

  return <AdminSocialMediaTemplate stats={stats} platforms={platforms} />;
}
