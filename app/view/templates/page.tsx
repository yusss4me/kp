"use client";

import React, { useState } from "react";
import { Txt } from "@/app/ui/atoms/text";
import { Container } from "@/app/ui/atoms/container";
import { Btn } from "@/app/ui/atoms/button";
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
  BookOpen,
  Calendar,
  Users,
  Package,
  Bell,
  Settings,
  CreditCard,
  FileText,
  HelpCircle,
  Shield,
  Eye,
  LogOut,
  User,
} from "lucide-react";

/* ────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <Txt variant="h4" weight="bold" className="text-gray-800 border-b border-gray-200 pb-2">
        {title}
      </Txt>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

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
 * Page
 * ──────────────────────────────────────────── */
export default function TemplatesWireframePage() {
  return (
    <div className="min-h-screen bg-neutral-200 p-6 md:p-10 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <Txt variant="h2" weight="bold" className="text-gray-900">
          Templates Wireframe
        </Txt>
        <Txt variant="body" color="grey">
          Preview of full-page template layouts assembled from organisms and molecules with placeholder data.
        </Txt>
      </header>

      {/* ── LandingTemplate ── */}
      <Section title="LandingTemplate">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
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
            programs={[]}
          />
        </div>
      </Section>

      {/* ── ExploreTemplate ── */}
      <Section title="ExploreTemplate">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg max-w-2xl">
          <ExploreTemplate campaigns={exploreCampaigns} />
        </div>
      </Section>

      {/* ── DonationDetailTemplate ── */}
      <Section title="DonationDetailTemplate">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg max-w-md">
          <DonationDetailTemplate
            image="/images/slider-1.jpg"
            location="Tasikmalaya, Jawa Barat"
            title="Beasiswa Pendidikan Anak Yatim 2025"
            currentAmount={32500000}
            targetAmount={50000000}
            author={{ name: "Yayasan Yamuti", avatar: "/logo/icon.png" }}
            donorsCount={128}
            daysRemaining={45}
            description="Program beasiswa ini ditujukan untuk membantu anak-anak yatim di wilayah Tasikmalaya agar dapat melanjutkan pendidikan formal mereka. Dana yang terkumpul akan digunakan untuk biaya sekolah, buku pelajaran, seragam, dan kebutuhan pendidikan lainnya. Kami berkomitmen untuk menyalurkan donasi secara transparan dan akuntabel."
            gallery={["/images/slider-1.jpg", "/images/slider-2.png", "/images/slider-3.jpg"]}
          />
        </div>
      </Section>

      {/* ── ProfileTemplate ── */}
      <Section title="ProfileTemplate">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg max-w-4xl">
          <ProfileTemplate
            user={{ name: "Ahmad Suryadi", role: "Donatur Premium", image: "/logo/icon.png" }}
            amountProgramUser="12"
            amountVisitUser="5"
            amountDonatedUser="Rp 2.5Jt"
            listMenu={profileMenuList}
          />
        </div>
      </Section>

      {/* ── QuickAccessTemplate ── */}
      <Section title="QuickAccessTemplate">
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg max-w-lg">
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
      </Section>
    </div>
  );
}
