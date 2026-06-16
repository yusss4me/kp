"use client";

import React, { useState } from "react";
import { Txt } from "@/app/ui/atoms/text";
import {
  Heart,
  Search,
  User,
  Mail,
  Lock,
  Calendar,
  Wallet,
  MapPin,
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  Star,
  BookOpen,
  HandHeart,
  FileText,
  Download,
  ClipboardList,
  Settings,
} from "lucide-react";
import { DonationCard } from "@/app/ui/molecules/donationCard";
import { StatCard } from "@/app/ui/molecules/stat-card";
import { SearchGroup } from "@/app/ui/molecules/search-group";
import { Toast } from "@/app/ui/molecules/toast";
import { OrphanCard } from "@/app/ui/molecules/orphan-card";
import { ProgramCard } from "@/app/ui/molecules/program-card";
import { ProfileHeader } from "@/app/ui/molecules/profile-header";
import { FormField } from "@/app/ui/molecules/form-fields";
import { PasswordField } from "@/app/ui/molecules/password-field";
import { CategoryCard } from "@/app/ui/molecules/categoryCard";
import { QuickActionCard } from "@/app/ui/molecules/QuickActionCard";
import { VisitingCard } from "@/app/ui/molecules/visitingCard";
import { CampaignerCard } from "@/app/ui/molecules/campaignCard";
import { SummaryCard } from "@/app/ui/molecules/summaty-card";
import { MilestoneCard } from "@/app/ui/molecules/milestoneCard";
import { OwnerAdminCard } from "@/app/ui/molecules/owner-adminCard";
import { OwnerReportCard } from "@/app/ui/molecules/owner-reportCard";
import { DiscoverCard } from "@/app/ui/molecules/discoverCard";
import { RecipientSelector } from "@/app/ui/molecules/RecipientSelector";
import { Statuscard } from "@/app/ui/molecules/landing-iconCard";
import { LabelButton } from "@/app/ui/molecules/label-button";
import { BrandLight, BrandDark } from "@/app/ui/molecules/brand";
import { ListItem } from "@/app/ui/molecules/ListItem";
import { Label } from "@/app/ui/molecules/label";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";
import { ActivitySwitcher } from "@/app/ui/molecules/activitySwitcher";
import { DonationSwitcher } from "@/app/ui/molecules/donationSwitcher";

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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <Txt variant="h6" weight="semibold" color="grey" className="uppercase tracking-wider text-xs">
        {title}
      </Txt>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}

/* ────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────── */
export default function MoleculesWireframePage() {
  const [activeActivity, setActiveActivity] = useState<"program" | "kunjungan">("program");
  const [showConfirm, setShowConfirm] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; variant: "success" | "error" | "warning" | "info" }[]>([
    { id: "1", message: "Data berhasil disimpan!", variant: "success" },
    { id: "2", message: "Terjadi kesalahan pada server.", variant: "error" },
    { id: "3", message: "Periksa koneksi internet Anda.", variant: "warning" },
    { id: "4", message: "Pembaruan tersedia.", variant: "info" },
  ]);

  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="min-h-screen bg-neutral-200 p-6 md:p-10 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <Txt variant="h2" weight="bold" className="text-gray-900">
          Molecules Wireframe
        </Txt>
        <Txt variant="body" color="grey">
          Preview of all molecule-level UI components with placeholder data.
        </Txt>
      </header>

      {/* ── DonationCard ── */}
      <Section title="DonationCard">
        <SubSection title="Examples">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <DonationCard
              id="d1"
              name="Bantu Anak Yatim Sekolah"
              description="Donasi untuk biaya pendidikan anak-anak yatim di Tasikmalaya agar bisa melanjutkan sekolah."
              image="/images/slider-1.jpg"
              categoryTag="Pendidikan"
              target={50000000}
              raised={32500000}
            />
            <DonationCard
              id="d2"
              name="Renovasi Panti Asuhan"
              description="Program renovasi gedung panti asuhan yang sudah mulai rusak demi kenyamanan anak-anak."
              image="/images/slider-2.png"
              categoryTag="Pemberdayaan"
              target={100000000}
              raised={87000000}
            />
          </div>
        </SubSection>
      </Section>

      {/* ── StatCard ── */}
      <Section title="StatCard">
        <SubSection title="Colors & Trends">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <StatCard label="Total Donasi" value="Rp 1.2M" icon={Wallet} color="primary" trend={{ value: 12, isUp: true }} />
            <StatCard label="Donatur Aktif" value="324" icon={Users} color="success" trend={{ value: 8, isUp: true }} />
            <StatCard label="Program Berjalan" value="18" icon={BookOpen} color="info" />
            <StatCard label="Pengeluaran" value="Rp 450Jt" icon={TrendingDown} color="danger" trend={{ value: 3, isUp: false }} />
          </div>
        </SubSection>
      </Section>

      {/* ── OrphanCard ── */}
      <Section title="OrphanCard">
        <SubSection title="Status Variants">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <OrphanCard name="Ahmad Fauzi" age={12} gender="Laki-laki" status="Aktif" />
            <OrphanCard name="Siti Nurhaliza" age={8} gender="Perempuan" status="Baru" />
            <OrphanCard name="Rizky Ramadhan" age={15} gender="Laki-laki" status="Alumni" />
          </div>
        </SubSection>
      </Section>

      {/* ── ProgramCard ── */}
      <Section title="ProgramCard">
        <SubSection title="Examples">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <ProgramCard
              program={{ id: "p1", title: "Beasiswa Pendidikan 2025", target: "Rp 50.000.000", collected: "Rp 32.500.000", progress: 65 }}
            />
            <ProgramCard
              program={{ id: "p2", title: "Renovasi Panti Asuhan", target: "Rp 100.000.000", collected: "Rp 91.000.000", progress: 91 }}
            />
          </div>
        </SubSection>
      </Section>

      {/* ── VisitingCard ── */}
      <Section title="VisitingCard">
        <SubSection title="Status Variants">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <VisitingCard id={1} visitor="Budi Santoso" date="15 Juni 2025" time="10:00" type="Kunjungan Rutin" status="Dikonfirmasi" />
            <VisitingCard id={2} visitor="Ani Wijaya" date="20 Juni 2025" time="14:00" type="Kunjungan Pertama" status="Menunggu" />
          </div>
        </SubSection>
      </Section>

      {/* ── CampaignerCard ── */}
      <Section title="CampaignerCard">
        <SubSection title="Examples">
          <div className="w-full max-w-md space-y-3">
            <CampaignerCard name="Ustadz Ahmad" avatar="/logo/icon.png" title="Koordinator Program" isVerified />
            <CampaignerCard name="Ibu Fatimah" avatar="/logo/icon.png" title="Relawan Aktif" />
          </div>
        </SubSection>
      </Section>

      {/* ── ProfileHeader ── */}
      <Section title="ProfileHeader">
        <div className="w-full bg-red-primary rounded-2xl p-6">
          <ProfileHeader name="Ahmad Suryadi" role="Donatur Premium" image="/logo/icon.png" />
        </div>
      </Section>

      {/* ── SummaryCard ── */}
      <Section title="SummaryCard">
        <SubSection title="Examples">
          <SummaryCard title="12" value="Program" Icon={Heart} />
          <SummaryCard title="5" value="Kunjungan" Icon={MapPin} />
          <SummaryCard title="Rp 2.5Jt" value="Terdonasi" Icon={Wallet} />
        </SubSection>
      </Section>

      {/* ── QuickActionCard ── */}
      <Section title="QuickActionCard">
        <SubSection title="Colors & Variants">
          <div className="w-full max-w-lg space-y-2">
            <QuickActionCard Icon={Heart} label="Donasi" description="Bantu sesama melalui donasi" color="primary" />
            <QuickActionCard Icon={Calendar} label="Kunjungan" description="Jadwalkan kunjungan" color="info" badge={3} />
            <QuickActionCard Icon={BookOpen} label="Program" description="Lihat program berjalan" color="success" />
            <QuickActionCard Icon={FileText} label="Laporan" description="Unduh laporan bulanan" color="warning" />
          </div>
        </SubSection>
      </Section>

      {/* ── DiscoverCard ── */}
      <Section title="DiscoverCard">
        <SubSection title="Examples">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <DiscoverCard title="Program Pendidikan Anak" image="/images/slider-1.jpg" />
            <DiscoverCard title="Kegiatan Sosial Bulanan" image="/images/slider-2.png" />
            <DiscoverCard title="Renovasi Fasilitas" image="/images/slider-3.jpg" />
          </div>
        </SubSection>
      </Section>

      {/* ── CategoryCard ── */}
      <Section title="CategoryCard">
        <SubSection title="Active & Inactive">
          <CategoryCard label="Pendidikan" iconCard={BookOpen} isActive />
          <CategoryCard label="Kemanusiaan" iconCard={HandHeart} />
          <CategoryCard label="Pemberdayaan" iconCard={Users} />
        </SubSection>
      </Section>

      {/* ── MilestoneCard ── */}
      <Section title="MilestoneCard">
        <SubSection title="Examples">
          <div className="w-full max-w-sm bg-red-primary rounded-2xl">
            <MilestoneCard title="Donatur Emas" range="Rp 1jt - Rp 5jt" image="/logo/icon.png" />
          </div>
        </SubSection>
      </Section>

      {/* ── SearchGroup ── */}
      <Section title="SearchGroup">
        <div className="w-full max-w-md">
          <SearchGroup placeholder="Cari program donasi..." />
        </div>
      </Section>

      {/* ── FormField ── */}
      <Section title="FormField">
        <div className="w-full max-w-md space-y-4">
          <FormField label="Email" placeholder="Masukkan email" type="email" icon={Mail} />
          <FormField label="Nama Lengkap" placeholder="Masukkan nama" type="text" icon={User} error="Nama wajib diisi" />
        </div>
      </Section>

      {/* ── PasswordField ── */}
      <Section title="PasswordField">
        <div className="w-full max-w-md space-y-4">
          <PasswordField label="Password" placeholder="Masukkan password" />
          <PasswordField label="Konfirmasi Password" placeholder="Ulangi password" error="Password tidak cocok" />
        </div>
      </Section>

      {/* ── LabelButton ── */}
      <Section title="LabelButton">
        <SubSection title="Examples">
          <LabelButton label="Download Laporan" icon={Download} variant="red" size="md">{""}</LabelButton>
          <LabelButton label="Lihat Detail" icon={Search} variant="light" textColor="dark" size="md">{""}</LabelButton>
        </SubSection>
      </Section>

      {/* ── ActivitySwitcher ── */}
      <Section title="ActivitySwitcher">
        <div className="w-full max-w-md">
          <ActivitySwitcher activeActivity={activeActivity} onActivityChange={setActiveActivity} />
        </div>
      </Section>

      {/* ── DonationSwitcher ── */}
      <Section title="DonationSwitcher">
        <DonationSwitcher />
      </Section>

      {/* ── RecipientSelector ── */}
      <Section title="RecipientSelector">
        <div className="w-full max-w-md">
          <RecipientSelector selectedGroup="Semua Donatur" count={245} />
        </div>
      </Section>

      {/* ── Brand ── */}
      <Section title="Brand">
        <SubSection title="Light & Dark">
          <div className="bg-red-primary p-4 rounded-xl">
            <BrandLight />
          </div>
          <div className="bg-white p-4 rounded-xl">
            <BrandDark />
          </div>
        </SubSection>
      </Section>

      {/* ── Label ── */}
      <Section title="Label">
        <SubSection title="Examples">
          <Label text="Section Title" />
          <Label text="Small Label" className="text-xs text-gray-400" />
        </SubSection>
      </Section>

      {/* ── ListItem ── */}
      <Section title="ListItem">
        <div className="w-full max-w-md bg-white rounded-xl overflow-hidden">
          <ListItem icon={User} label="Profil Saya" />
          <ListItem icon={Wallet} label="Riwayat Donasi" />
          <ListItem icon={Settings} label="Pengaturan" />
        </div>
      </Section>

      {/* ── Statuscard (Landing Icon Card) ── */}
      <Section title="Statuscard (Landing Icon Card)">
        <SubSection title="Examples">
          <div className="w-full max-w-sm bg-red-primary rounded-2xl p-4">
            <Statuscard statusIcon={Heart} title="Transparan" description="Setiap donasi dilaporkan secara detail" />
          </div>
          <div className="w-full max-w-sm bg-red-primary rounded-2xl p-4">
            <Statuscard statusIcon={Users} title="Berdampak" description="Lebih dari 500 jiwa terbantu" />
          </div>
        </SubSection>
      </Section>

      {/* ── OwnerAdminCard ── */}
      <Section title="OwnerAdminCard">
        <div className="w-full max-w-lg">
          <OwnerAdminCard
            admin={[
              { name: "Ahmad Suryadi", role: "Administrator", task: "12 Tugas", color: "bg-red-primary", status: "Aktif" },
              { name: "Budi Hartono", role: "Staff Keuangan", task: "5 Tugas", color: "bg-info", status: "Aktif" },
              { name: "Citra Dewi", role: "Staff Program", task: "0 Tugas", color: "bg-success", status: "Nonaktif" },
            ]}
          />
        </div>
      </Section>

      {/* ── OwnerReportCard ── */}
      <Section title="OwnerReportCard">
        <div className="w-full max-w-lg">
          <OwnerReportCard
            reportData={[
              { id: "r1", title: "Laporan Keuangan Mei 2025", date: "01 Juni 2025", type: "Keuangan", icon: FileText },
              { id: "r2", title: "Laporan Program Q2 2025", date: "15 Juli 2025", type: "Program", icon: ClipboardList },
              { id: "r3", title: "Laporan Donatur Tahunan", date: "01 Januari 2025", type: "Donatur", icon: Download },
            ]}
          />
        </div>
      </Section>

      {/* ── Toast ── */}
      <Section title="Toast">
        <div className="w-full max-w-md space-y-2">
          {toasts.map((t) => (
            <Toast key={t.id} id={t.id} message={t.message} variant={t.variant} duration={0} onClose={removeToast} />
          ))}
        </div>
      </Section>

      {/* ── ErrorDisplay ── */}
      <Section title="ErrorDisplay">
        <SubSection title="Inline">
          <div className="w-full max-w-lg">
            <ErrorDisplay title="Data Tidak Ditemukan" message="Mohon maaf, data yang Anda cari tidak tersedia." />
          </div>
        </SubSection>
        <SubSection title="With Actions">
          <div className="w-full max-w-lg">
            <ErrorDisplay title="Gagal Memuat Data" message="Terjadi kesalahan saat memuat data dari server." actionLabel="Login Ulang" />
          </div>
        </SubSection>
      </Section>

      {/* ── ConfirmationModal ── */}
      <Section title="ConfirmationModal">
        <div className="flex gap-3">
          <Txt variant="small" color="grey">Click to preview:</Txt>
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 bg-red-primary text-white rounded-lg text-sm font-bold hover:bg-red-secondary transition-colors"
          >
            Show Confirmation
          </button>
        </div>
        <ConfirmationModal
          isOpen={showConfirm}
          title="Hapus Data?"
          message="Data yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan?"
          variant="danger"
          confirmText="Hapus"
          cancelText="Batal"
          onConfirm={() => setShowConfirm(false)}
          onCancel={() => setShowConfirm(false)}
        />
      </Section>
    </div>
  );
}
