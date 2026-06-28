"use client";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { SearchGroup } from "@/app/ui/molecules/search-group";
import { PasswordField } from "@/app/ui/molecules/password-field";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";
import { StatCard } from "@/app/ui/molecules/stat-card";
import { ErrorDisplay } from "@/app/ui/molecules/error-display";
import { BrandLight } from "@/app/ui/molecules/brand";
import { NavLink } from "@/app/ui/molecules/navlink";

import { CategoryCard } from "@/app/ui/molecules/categoryCard";
import { DiscoverCard } from "@/app/ui/molecules/discoverCard";
import { UsersAvatar } from "@/app/ui/molecules/landing-usersAvatar";
import { UserContribution } from "@/app/ui/molecules/landing-userContribution";
import { OrphanCard } from "@/app/ui/molecules/orphan-card";
import { DataVerification } from "@/app/ui/molecules/DataVerification";
import { DonationCard } from "@/app/ui/molecules/donationCard";
import { QuickActionCard } from "@/app/ui/molecules/QuickActionCard";

import Link from "next/link";
import { ChevronLeft, Users, Zap } from "lucide-react";

export default function MoleculesPreview() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <Link href="/wireframe" className="inline-flex items-center text-gray-500 hover:text-red-primary mb-4">
            <ChevronLeft size={20} />
            <span className="font-semibold">Kembali ke Katalog</span>
          </Link>
          <Txt variant="h2" weight="bold" className="text-gray-900">
            Molecules
          </Txt>
          <Txt className="text-gray-500 max-w-2xl">
            Kombinasi dari dua atom atau lebih yang membentuk sebuah elemen fungsional sederhana.
          </Txt>
        </div>

        {/* Section: Search Group */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Search Group</Txt>
          <div className="max-w-md">
            <SearchGroup placeholder="Cari data..." onSearch={() => {}} />
          </div>
        </Container>

        {/* Section: Password Field */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Password Field</Txt>
          <div className="max-w-md">
            <PasswordField label="Kata Sandi" placeholder="Masukkan kata sandi" />
          </div>
        </Container>

        {/* Section: Stat Card */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Stat Card</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              label="Total Anak Asuh" 
              value={150} 
              icon={Users}
              trend={{ value: 12, isUp: true }} 
            />
            <StatCard 
              label="Donatur Aktif" 
              value={89} 
              icon={Users}
              trend={{ value: 5, isUp: false }} 
            />
          </div>
        </Container>

        {/* Section: Confirmation Modal */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Confirmation Modal</Txt>
          <Txt className="text-gray-500 text-sm mb-4">Contoh prop isOpen=true statis untuk preview.</Txt>
          <div className="relative h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
            <ConfirmationModal 
              isOpen={true} 
              title="Konfirmasi Hapus" 
              message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
              onConfirm={() => {}} 
              onCancel={() => {}} 
            />
          </div>
        </Container>

        {/* Section: Error Display */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Error Display</Txt>
          <div className="max-w-md">
            <ErrorDisplay message="Terjadi kesalahan jaringan. Silakan coba lagi beberapa saat." onRetry={() => {}} />
          </div>
        </Container>

        {/* Section: Brand & Navlink */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Brand & Navlink</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Txt weight="bold">Brand Components</Txt>
              <div className="bg-gray-900 p-4 rounded-xl inline-block">
                <BrandLight />
              </div>
            </div>
            <div className="space-y-6">
              <Txt weight="bold">Navlink Variations</Txt>
              <div className="flex flex-col gap-3 max-w-sm bg-gray-100 p-4 rounded-xl border border-gray-100">
                <NavLink href="#" icon={Users} label="Default (Light)" Color="light" />
                <NavLink href="#" icon={Users} label="Active (Red)" Color="red" />
                <div className="bg-gray-900 p-2 rounded-lg">
                  <NavLink href="#" icon={Users} label="Dark Mode" Color="dark" />
                </div>
                <div className="flex justify-center pt-2">
                  <NavLink href="#" icon={Users} label="Icon Top (Col)" direction="col" iconSize={24} />
                </div>
              </div>
            </div>
          </div>
        </Container>


        {/* Section: Cards 1 */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Card Components (Part 1)</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Txt weight="bold">CategoryCard</Txt>
              <CategoryCard label="Pendidikan" iconCard={Users} />
            </div>
            <div className="space-y-4">
              <Txt weight="bold">DiscoverCard</Txt>
              <DiscoverCard title="Jelajahi Program" image="/logo/yamuti.png" href="#" onClick={() => {}} />
            </div>
          </div>
        </Container>

        {/* Section: Cards 2 */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Card Components (Part 2)</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Txt weight="bold">OrphanCard</Txt>
              <OrphanCard name="Ahmad" age={10} gender="Laki-laki" status="Aktif" detailHref="#" />
            </div>
            <div className="space-y-4">
              <Txt weight="bold">DonationCard</Txt>
              <DonationCard id="1" name="Bantu Pendidikan" description="Program donasi buku sekolah." image="/logo/yamuti.png" categoryTag="Pendidikan" target={10000000} raised={5500000} detailHref="#" donateHref="#" />
            </div>
          </div>
        </Container>

        {/* Section: QuickAction & DataVerification */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Quick Actions & Verifications</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Txt weight="bold">QuickActionCard</Txt>
              <QuickActionCard Icon={Zap} label="Donasi Cepat" href="#" variant="list" description="Langsung salurkan bantuan." />
            </div>
            <div className="space-y-4">
              <Txt weight="bold">DataVerification</Txt>
              <DataVerification status="pending" isAdmin={true} onVerify={() => {}} onReject={() => {}} />
            </div>
          </div>
        </Container>

        {/* Section: Landing Components */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Landing Stats & Avatars</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Txt weight="bold">UsersAvatar</Txt>
              <UsersAvatar listImage={[
                { id: "1", src: "/logo/yamuti.png", alt: "User 1" },
                { id: "2", src: "/logo/yamuti.png", alt: "User 2" },
                { id: "3", src: "/logo/yamuti.png", alt: "User 3" }
              ]} />
            </div>
            <div className="space-y-4 bg-gray-900 p-6 rounded-2xl">
              <Txt weight="bold" className="text-white">UserContribution (Dark Mode)</Txt>
              <UserContribution count={1500} />
            </div>
          </div>
        </Container>

      </div>
    </div>
  );
}
