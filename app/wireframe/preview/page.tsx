"use client";

import React, { useState } from "react";
import { Txt } from "@/app/ui/atoms/text";
import { Badge } from "@/app/ui/atoms/badge";
import { LandingTemplate } from "@/app/ui/templates/landing";
import { ExploreTemplate } from "@/app/ui/templates/explore";
import { DonationDetailTemplate } from "@/app/ui/templates/donationDetail";
import { ProfileTemplate } from "@/app/ui/templates/profile";
import { QuickAccessTemplate } from "@/app/ui/templates/quick-access";
import {
  LANDING_USER_AVATARS,
  LANDING_SLIDES,
  LANDING_BENEFITS,
} from "@/app/lib/constants/landing-content";
import {
  Heart,
  MapPin,
  Wallet,
  Package,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  Shield,
  LogOut,
  User,
  Calendar,
  Users,
  Monitor,
  Smartphone,
} from "lucide-react";

/* ────────────────────────────────────────────
 * Dummy Data
 * ──────────────────────────────────────────── */
const exploreCampaigns = [
  {
    id: "c1",
    name: "Beasiswa Pendidikan Anak Yatim",
    categoryTag: "Pendidikan",
    description: "Bantu biaya sekolah anak-anak yatim agar bisa meraih masa depan cerah.",
    image: "/images/slider-1.jpg",
    target: 50000000,
    raised: 32500000,
  },
  {
    id: "c2",
    name: "Renovasi Panti Asuhan",
    categoryTag: "Pemberdayaan",
    description: "Renovasi gedung panti yang sudah rusak demi kenyamanan anak-anak.",
    image: "/images/slider-2.png",
    target: 100000000,
    raised: 87000000,
  },
  {
    id: "c3",
    name: "Bantuan Kemanusiaan Bencana",
    categoryTag: "Kemanusiaan",
    description: "Salurkan bantuan untuk korban bencana alam di berbagai daerah.",
    image: "/images/slider-3.jpg",
    target: 75000000,
    raised: 15000000,
  },
];

const profileMenuList = [
  {
    title: "Akun",
    items: [
      { label: "Data Pribadi", icon: User, href: "#" },
      { label: "Keamanan", icon: Shield, href: "#" },
      { label: "Notifikasi", icon: Bell, href: "#" },
    ],
  },
  {
    title: "Aktivitas",
    items: [
      { label: "Riwayat Donasi", icon: Heart, href: "#" },
      { label: "Kunjungan", icon: MapPin, href: "#" },
      { label: "Favorit", icon: CreditCard, href: "#" },
    ],
  },
  {
    title: "Bantuan",
    items: [
      { label: "FAQ", icon: HelpCircle, href: "#" },
      { label: "Syarat & Ketentuan", icon: FileText, href: "#" },
      { label: "Keluar", icon: LogOut, href: "#" },
    ],
  },
];

const quickAccessSections = [
  {
    id: "manajemen",
    title: "Manajemen",
    items: [
      { Icon: Users, label: "Kelola Anak Asuh", description: "Tambah, edit, dan lihat data anak asuh", color: "primary" as const },
      { Icon: Package, label: "Inventaris", description: "Kelola stok barang panti", color: "info" as const },
      { Icon: Calendar, label: "Jadwal Kunjungan", description: "Atur dan pantau kunjungan", color: "success" as const, badge: 3 },
    ],
  },
  {
    id: "keuangan",
    title: "Keuangan",
    items: [
      { Icon: Wallet, label: "Transaksi", description: "Lihat riwayat keuangan", color: "warning" as const },
      { Icon: FileText, label: "Laporan", description: "Generate laporan bulanan", color: "secondary" as const },
    ],
  },
];

/* ────────────────────────────────────────────
 * Template Registry
 * ──────────────────────────────────────────── */
type TemplateEntry = {
  name: string;
  description: string;
  render: () => React.ReactNode;
};

const templates: TemplateEntry[] = [
  {
    name: "LandingTemplate",
    description: "Halaman utama landing page dengan hero slider, statistik dampak, dan manfaat.",
    render: () => (
      <LandingTemplate
        usersAvatar={LANDING_USER_AVATARS}
        userContribution={12000}
        slide={LANDING_SLIDES}
        title="Membangun Masa Depan Bersama Yamuti"
        desc="Wujudkan kepedulian Anda melalui program donasi yang transparan dan berdampak nyata bagi sesama yang membutuhkan."
        impact={{ jiwaterbantu: 520, danatersalurkan: 150, programberjalan: 18, pengabdian: 12 }}
        benefits={LANDING_BENEFITS}
        whyUsTitle="Mengapa Menyalurkan Melalui Yamuti?"
        whyUsSubtitle="Kami memastikan setiap rupiah yang Anda berikan dikelola dengan amanah dan profesional untuk dampak maksimal."
        whyUsImage="/images/slider-1.jpg"
        experience="12 Tahun"
      />
    ),
  },
  {
    name: "ExploreTemplate",
    description: "Halaman eksplorasi kampanye donasi dengan daftar campaign.",
    render: () => (
      <div className="max-w-2xl mx-auto">
        <ExploreTemplate campaigns={exploreCampaigns} />
      </div>
    ),
  },
  {
    name: "DonationDetailTemplate",
    description: "Halaman detail donasi dengan gambar, progress, dan informasi campaign.",
    render: () => (
      <div className="max-w-md mx-auto">
        <DonationDetailTemplate
          image="/images/slider-1.jpg"
          location="Tasikmalaya, Jawa Barat"
          title="Beasiswa Pendidikan Anak Yatim 2025"
          currentAmount={32500000}
          targetAmount={50000000}
          author={{ name: "Yayasan Yamuti", avatar: "/logo/icon.png" }}
          donorsCount={128}
          daysRemaining={45}
          description="Program beasiswa ini ditujukan untuk membantu anak-anak yatim di wilayah Tasikmalaya agar dapat melanjutkan pendidikan formal mereka. Dana yang terkumpul akan digunakan untuk biaya sekolah, buku pelajaran, seragam, dan kebutuhan pendidikan lainnya."
          gallery={["/images/slider-1.jpg", "/images/slider-2.png", "/images/slider-3.jpg"]}
        />
      </div>
    ),
  },
  {
    name: "ProfileTemplate",
    description: "Halaman profil pengguna dengan info, statistik, dan menu navigasi.",
    render: () => (
      <div className="max-w-4xl mx-auto">
        <ProfileTemplate
          user={{ name: "Ahmad Suryadi", role: "Donatur Premium", image: "/logo/icon.png" }}
          amountProgramUser="12"
          amountVisitUser="5"
          amountDonatedUser="Rp 2.5Jt"
          listMenu={profileMenuList}
        />
      </div>
    ),
  },
  {
    name: "QuickAccessTemplate",
    description: "Halaman akses cepat admin dengan ringkasan dan aksi cepat.",
    render: () => (
      <div className="max-w-lg mx-auto">
        <QuickAccessTemplate
          user={{ name: "Admin Yayasan", role: "Administrator" }}
          headerTitle="Akses Cepat"
          sections={quickAccessSections}
          summaryStats={[
            { icon: Users, label: "Anak Asuh", value: "48", color: "primary" },
            { icon: Wallet, label: "Dana Bulan Ini", value: "Rp 15Jt", color: "success" },
            { icon: Package, label: "Stok Barang", value: "320", color: "info" },
            { icon: Calendar, label: "Kunjungan", value: "8", color: "warning" },
          ]}
        />
      </div>
    ),
  },
];

/* ────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────── */
export default function PreviewPage() {
  const [selected, setSelected] = useState<string>(templates[0].name);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  const active = templates.find((t) => t.name === selected) ?? templates[0];
  const isMobile = viewport === "mobile";

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-3">
          <Txt variant="h5" weight="bold" className="text-gray-900">Template Preview</Txt>
          <Badge variant="soft" color="secondary">Template</Badge>
        </div>

        {/* Template Selector */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-red-primary/30"
        >
          {templates.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Viewport Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isMobile
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Monitor size={14} />
            Desktop
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isMobile
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Smartphone size={14} />
            Mobile
          </button>
        </div>
      </header>

      {/* Active Template Label */}
      <div className="px-6 pt-4 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {active.name}
        </span>
      </div>

      {/* Main Preview Area — Single Template */}
      <main className="flex-1 overflow-y-auto p-6 flex justify-center">
        {isMobile ? (
          /* ── Mobile Frame ── */
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              375 × 812 — iPhone View
            </span>
            <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl shrink-0">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-10" />
              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[2.25rem] overflow-y-auto overflow-x-hidden">
                {active.render()}
              </div>
            </div>
          </div>
        ) : (
          /* ── Desktop View ── */
          <div className="w-full">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              {active.render()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
