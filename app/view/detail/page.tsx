"use client";

import React, { useState } from "react";
import { Txt } from "@/app/ui/atoms/text";
import { Badge } from "@/app/ui/atoms/badge";
import { DetailProgram } from "@/app/ui/organisms/activity-detail-program";
import { DetailKunjungan } from "@/app/ui/organisms/activity-detail-kunjungan";
import { DetailAnak } from "@/app/ui/organisms/activity-detail-anak";
import { DonationDetailTemplate } from "@/app/ui/templates/donationDetail";
import { DonationFormTemplate } from "@/app/ui/templates/donation-form";
import { Monitor, Smartphone } from "lucide-react";

/* ────────────────────────────────────────────
 * Component Registry
 * ──────────────────────────────────────────── */
type ComponentEntry = {
  name: string;
  description: string;
  role: string;
  render: () => React.ReactNode;
};

const components: ComponentEntry[] = [
  {
    name: "DetailProgram",
    description: "Organism — Detail program donasi dengan hero image, progress bar, dan CTA donasi.",
    role: "Home / Public",
    render: () => (
      <DetailProgram
        url="#"
        donateUrl="#"
      />
    ),
  },
  {
    name: "DetailKunjungan",
    description: "Organism — Detail kunjungan dengan jam operasional, ketentuan, dan form pengajuan.",
    role: "Home / Admin / Public",
    render: () => (
      <DetailKunjungan
        url="#"
        data={{
          image: "/images/slider-2.png",
          title: "Kunjungan Silaturahmi Ramadhan",
          address: "Yayasan Yamuti, Tasikmalaya",
          jamOperasional: "Senin - Sabtu, 08:00 - 17:00",
          description: "Silaturahmi ke Yayasan Yamuti untuk melihat langsung aktivitas anak-anak asuh, berbagi keceriaan, dan menyalurkan donasi secara langsung.",
          ketentuanList: [
            "Harus membuat janji temu terlebih dahulu",
            "Jumlah peserta minimal 1 orang",
            "Menjaga ketertiban dan kebersihan",
            "Dilarang mengambil foto tanpa izin",
          ],
        }}
      />
    ),
  },
  {
    name: "DetailAnak",
    description: "Organism — Detail profil anak asuh dengan info pribadi dan tombol edit.",
    role: "Admin",
    render: () => (
      <DetailAnak url="#" />
    ),
  },
  {
    name: "DonationDetailTemplate",
    description: "Template — Detail lengkap program donasi dengan galeri, progress, dan tab donasi/volunteer.",
    role: "Home (Donatur)",
    render: () => (
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
    ),
  },
  {
    name: "DonationFormTemplate",
    description: "Template — Form checkout donasi dengan validasi, pilihan nominal, dan metode pembayaran.",
    role: "Public / Donatur",
    render: () => (
      <DonationFormTemplate activityId="demo-123" />
    ),
  },
];

/* ────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────── */
export default function DetailWireframePage() {
  const [selected, setSelected] = useState<string>(components[0].name);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("mobile");

  const active = components.find((c) => c.name === selected) ?? components[0];
  const isMobile = viewport === "mobile";

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Txt variant="h5" weight="bold" className="text-gray-900">Detail Pages Preview</Txt>
          <Badge variant="soft" color="secondary">Detail</Badge>
        </div>

        {/* Component Selector */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-red-primary/30"
        >
          {components.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
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

      {/* Active Component Info */}
      <div className="px-6 pt-4 shrink-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {active.name}
          </span>
          <Badge variant="outline" color="info">{active.role}</Badge>
        </div>
        <Txt variant="caption" className="text-gray-500">
          {active.description}
        </Txt>
      </div>

      {/* Main Preview Area */}
      <main className="flex-1 overflow-y-auto p-6 flex justify-center">
        {isMobile ? (
          /* Mobile Frame */
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              375 x 812 — iPhone View
            </span>
            <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl shrink-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-10" />
              <div className="w-full h-full bg-white rounded-[2.25rem] overflow-y-auto overflow-x-hidden">
                {active.render()}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop View */
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              {active.render()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
