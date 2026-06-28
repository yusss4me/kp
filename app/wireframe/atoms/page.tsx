"use client";
import { useToast, ToastProvider } from "@/app/ui/atoms/toast";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Avatar } from "@/app/ui/atoms/avatar";
import { Badge } from "@/app/ui/atoms/badge";
import { Checkbox } from "@/app/ui/atoms/checkbox";
import { Textarea } from "@/app/ui/atoms/textarea";
import { ProgressBar } from "@/app/ui/atoms/progressBar";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { Icn } from "@/app/ui/atoms/Icn";
import { Img } from "@/app/ui/atoms/image";
import { Lnk } from "@/app/ui/atoms/link";
import { Select } from "@/app/ui/atoms/select";
import { ActivityBadge } from "@/app/ui/atoms/activityBadge";
import { CalendarDay } from "@/app/ui/atoms/calenderDay";
import { Table, THead, TBody, TR, TH, TD } from "@/app/ui/atoms/table";
import Link from "next/link";
import { ChevronLeft, Home, User, Settings } from "lucide-react";

function ToastShowcase() {
  const { show } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Btn variant="light" onClick={() => show("info", "Ini adalah pesan informasi", 3000)}>
        Show Info
      </Btn>
      <Btn variant="transparent" className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-100" onClick={() => show("success", "Berhasil disimpan!", 3000)}>
        Show Success
      </Btn>
      <Btn variant="red" onClick={() => show("error", "Terjadi kesalahan!", 3000)}>
        Show Error
      </Btn>
    </div>
  );
}

export default function AtomsPreview() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-50/50 to-transparent -z-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <Link href="/wireframe" className="inline-flex items-center text-gray-500 hover:text-red-primary mb-4">
            <ChevronLeft size={20} />
            <span className="font-semibold">Kembali ke Katalog</span>
          </Link>
          <Txt variant="h2" weight="bold" className="text-gray-900">
            Atoms
          </Txt>
          <Txt className="text-gray-500 max-w-2xl">
            Komponen terkecil yang tidak bisa dipecah lagi tanpa kehilangan fungsinya. 
            Meliputi tipografi, tombol, input dasar, dan elemen visual kecil.
          </Txt>
        </div>

        {/* Section: Typography (Txt) */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Typography (Txt)</Txt>
          <div className="space-y-4">
            <Txt variant="h1">Heading 1 (h1)</Txt>
            <Txt variant="h2">Heading 2 (h2)</Txt>
            <Txt variant="h3">Heading 3 (h3)</Txt>
            <Txt variant="h4">Heading 4 (h4)</Txt>
            <Txt variant="body">Body (p) - The quick brown fox jumps over the lazy dog.</Txt>
            <Txt variant="small">Small - The quick brown fox jumps over the lazy dog.</Txt>
            <Txt variant="caption">Caption - The quick brown fox jumps over the lazy dog.</Txt>
          </div>
        </Container>

        {/* Section: Button (Btn) */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Button (Btn)</Txt>
          
          <div className="space-y-4">
            <Txt weight="bold">Variants</Txt>
            <div className="flex flex-wrap gap-4">
              <Btn variant="red">Red (Primary)</Btn>
              <Btn variant="light">Light</Btn>
              <Btn variant="outline">Outline</Btn>
              <Btn variant="transparent">Transparent</Btn>
            </div>
            
            <Txt weight="bold" className="pt-4">Sizes</Txt>
            <div className="flex flex-wrap items-center gap-4">
              <Btn variant="red" size="sm">Small</Btn>
              <Btn variant="red" size="md">Medium</Btn>
              <Btn variant="red" size="lg">Large</Btn>
            </div>
          </div>
        </Container>

        {/* Section: Input */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Input</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Default Input" placeholder="Type here..." />
            <Input label="Input with Error" placeholder="Type here..." error="This field is required" />
            <Input label="Disabled Input" placeholder="Type here..." disabled />
            <Input label="Password Input" type="password" placeholder="Enter password" />
          </div>
        </Container>

        {/* Section: Textarea & Checkbox */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Textarea & Checkbox</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea label="Deskripsi" placeholder="Masukkan deskripsi lengkap di sini..." rows={4} />
            <div className="space-y-4">
              <Txt weight="bold">Checkbox States</Txt>
              <Checkbox label="Checkbox Biasa" />
              <Checkbox label="Checkbox Dicentang (Default)" defaultChecked />
              <Checkbox label="Checkbox Disabled" disabled />
              <Checkbox label="Checkbox Error" error="Harus dicentang" />
            </div>
          </div>
        </Container>

        {/* Section: Progress Bar & Skeleton */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Progress Bar & Skeleton</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Txt weight="bold">Progress Bar</Txt>
              <ProgressBar current={45} target={100} />
              <ProgressBar current={100} target={100} />
            </div>
            <div className="space-y-4">
              <Txt weight="bold">Skeleton Loading</Txt>
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Section: Badges & Avatars */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Avatar & Badge</Txt>
          
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <Txt weight="bold">Avatars</Txt>
              <div className="flex gap-4">
                <Avatar src="/logo/yamuti.png" alt="Avatar" size={32} />
                <Avatar src="/logo/yamuti.png" alt="Avatar" size={48} />
                <Avatar src="/logo/yamuti.png" alt="Avatar" size={64} />
              </div>
            </div>
            
            <div className="space-y-3">
              <Txt weight="bold">Badges</Txt>
              <div className="flex gap-4">
                <Badge variant="solid">Solid</Badge>
                <Badge variant="soft">Soft</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
          </div>
        </Container>

        {/* Section: Additional Atoms */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Additional Atoms</Txt>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Icn & ActivityBadge */}
            <div className="space-y-6">
              <Txt weight="bold">Icons (Icn)</Txt>
              <div className="flex gap-4">
                <Icn icon={Home} color="default" size={24} />
                <Icn icon={User} color="red" size={24} />
                <Icn icon={Settings} color="info" size={24} />
              </div>

              <Txt weight="bold" className="pt-4">Activity Badges</Txt>
              <div className="flex gap-4">
                <ActivityBadge type="pemberdayaan" />
                <ActivityBadge type="pendidikan" />
                <ActivityBadge type="kemanusiaan" />
              </div>
            </div>

            {/* Select & Link */}
            <div className="space-y-6">
              <Txt weight="bold">Select Dropdown</Txt>
              <div className="space-y-4">
                <Select 
                  label="Default Select" 
                  options={[
                    { label: "Pendidikan", value: "pendidikan" },
                    { label: "Kesehatan", value: "kesehatan" }
                  ]} 
                />
                <Select 
                  label="Error Select" 
                  error="Pilihan tidak valid"
                  options={[
                    { label: "Kemanusiaan", value: "kemanusiaan" }
                  ]} 
                />
                <Select 
                  label="Disabled Select" 
                  disabled
                  options={[
                    { label: "Terkunci", value: "terkunci" }
                  ]} 
                />
              </div>

              <Txt weight="bold" className="pt-4">Link (Lnk)</Txt>
              <div className="flex flex-col gap-2">
                <Lnk href="#" variant="primary">Primary Link</Lnk>
                <Lnk href="#" variant="secondary">Secondary Link</Lnk>
                <Lnk href="#" variant="muted">Muted Link</Lnk>
                <Lnk href="#" variant="underline">Underline Link</Lnk>
                <Lnk href="#" color="red">Red Link</Lnk>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Calendar Day */}
            <div className="space-y-4">
              <Txt weight="bold">Calendar Day</Txt>
              <div className="flex gap-2">
                <CalendarDay day={14} />
                <CalendarDay day={15} isCurrentMonth />
                <CalendarDay day={16} isCurrentMonth isSelected />
              </div>
            </div>

            {/* Img */}
            <div className="space-y-4">
              <Txt weight="bold">Image (Img)</Txt>
              <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-gray-100">
                <Img src="/logo/yamuti.png" alt="Yamuti Logo" />
              </div>
            </div>

            {/* Toast */}
            <div className="space-y-4 md:col-span-2 pt-4">
              <Txt weight="bold">Toast Notifications</Txt>
              <ToastProvider>
                <ToastShowcase />
              </ToastProvider>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-4 pt-4">
            <Txt weight="bold">Table Base</Txt>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <Table>
                <THead>
                  <TR>
                    <TH>No</TH>
                    <TH>Nama</TH>
                    <TH>Kategori</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD>1</TD>
                    <TD>Donasi Pendidikan</TD>
                    <TD>Pendidikan</TD>
                  </TR>
                  <TR>
                    <TD>2</TD>
                    <TD>Bantuan Bencana</TD>
                    <TD>Kemanusiaan</TD>
                  </TR>
                </TBody>
              </Table>
            </div>
          </div>
        </Container>

        {/* Section: Container */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Container</Txt>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Container variant="light" shadow="md" padding="lg" radius="xl" border="sm" bordercolor="light">
              <Txt weight="bold">Light Container</Txt>
              <Txt variant="small" className="text-gray-500">shadow="md", radius="xl"</Txt>
            </Container>
            <Container variant="red" shadow="lg" padding="md" radius="rounded">
              <Txt weight="bold" className="text-white">Red Container</Txt>
              <Txt variant="small" className="text-white/80">variant="red", radius="rounded"</Txt>
            </Container>
            <Container variant="dark" shadow="none" padding="sm" border="default" bordercolor="dark">
              <Txt weight="bold" className="text-white">Dark Container</Txt>
              <Txt variant="small" className="text-gray-400">variant="dark", border="default"</Txt>
            </Container>
          </div>
        </Container>

      </div>
    </div>
  );
}
