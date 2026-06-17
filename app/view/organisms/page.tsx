import { Txt } from "@/app/ui/atoms/text";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { MenuListItems } from "@/app/ui/organisms/menuListItems";
import { ProfileCard } from "@/app/ui/organisms/profile-card";
import { ImpactStats } from "@/app/ui/organisms/impact-stats";
import { InventoryTable } from "@/app/ui/organisms/InventoryTable";
import { TransactionTable } from "@/app/ui/organisms/TransactionTable";
import { BookingList } from "@/app/ui/organisms/BookingList";
import { CategoryList } from "@/app/ui/organisms/categoryList";
import { CTASection } from "@/app/ui/organisms/cta-section";
import {
  Home,
  Users,
  Heart,
  Wallet,
  Settings,
  BookOpen,
  Calendar,
  Package,
  Bell,
  BarChart3,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { InventoryItem, FinanceTransaction, VisitBooking } from "@/app/lib/types/entities";

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
const inventoryItems: InventoryItem[] = [
  { id: 1, name: "Beras Premium", category: "Sembako", stock: "150 kg", status: "Cukup" },
  { id: 2, name: "Minyak Goreng", category: "Sembako", stock: "20 Liter", status: "Menipis" },
  { id: 3, name: "Buku Tulis", category: "Alat Tulis", stock: "300 pcs", status: "Cukup" },
  { id: 4, name: "Seragam Sekolah", category: "Pakaian", stock: "5 pcs", status: "Menipis" },
  { id: 5, name: "Obat-obatan", category: "Kesehatan", stock: "0 box", status: "Habis" },
];

const financeTransactions: FinanceTransaction[] = [
  { id: 1, type: "Income", category: "Donasi", amount: "Rp 5.000.000", amountRaw: 5000000, date: "12 Juni 2025", status: "Terverifikasi" },
  { id: 2, type: "Expense", category: "Operasional", amount: "Rp 1.200.000", amountRaw: 1200000, date: "11 Juni 2025", status: "Terverifikasi" },
  { id: 3, type: "Income", category: "Zakat", amount: "Rp 8.500.000", amountRaw: 8500000, date: "10 Juni 2025", status: "Terverifikasi" },
  { id: 4, type: "Expense", category: "Program Pendidikan", amount: "Rp 3.000.000", amountRaw: 3000000, date: "09 Juni 2025", status: "Pending" },
];

const visitBookings: VisitBooking[] = [
  { id: 1, visitor: "Budi Santoso", phone: "08123456789", date: "15 Juni 2025", time: "10:00", type: "Kunjungan Rutin", status: "Dikonfirmasi" },
  { id: 2, visitor: "Ani Wijaya", phone: "08987654321", date: "18 Juni 2025", time: "14:00", type: "Kunjungan Pertama", status: "Menunggu" },
  { id: 3, visitor: "Dewi Lestari", phone: "08111222333", date: "20 Juni 2025", time: "09:00", type: "Kunjungan Rutin", status: "Selesai" },
];

const adminMenuItems = [
  { label: "Dashboard", icon: Home, href: "#" },
  { label: "Anak Asuh", icon: Users, href: "#" },
  { label: "Donasi", icon: Heart, href: "#" },
  { label: "Keuangan", icon: Wallet, href: "#" },
  { label: "Inventaris", icon: Package, href: "#" },
];

const settingsMenuItems = [
  { label: "Pengaturan Akun", icon: Settings, href: "#" },
  { label: "Notifikasi", icon: Bell, href: "#" },
  { label: "Laporan", icon: FileText, href: "#" },
];

/* ────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────── */
export default function OrganismsWireframePage() {
  return (
    <div className="min-h-screen bg-neutral-200 p-6 md:p-10 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <Txt variant="h2" weight="bold" className="text-gray-900">
          Organisms Wireframe
        </Txt>
        <Txt variant="body" color="grey">
          Preview of all organism-level UI components with placeholder data.
        </Txt>
      </header>

      {/* ── DashboardHeader ── */}
      <Section title="DashboardHeader">
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <DashboardHeader
            headerTitle="Dashboard Admin"
            portalLabel="Portal Admin"
            user={{ name: "Ahmad Suryadi", role: "Administrator" }}
          >
            <div className="py-8 text-center text-gray-400">
              <Txt variant="body" color="grey">
                — Main content area placeholder —
              </Txt>
            </div>
          </DashboardHeader>
        </div>
      </Section>

      {/* ── MenuListItems ── */}
      <Section title="MenuListItems">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-sm">
            <MenuListItems title="Menu Utama" listItems={adminMenuItems} />
          </div>
          <div className="max-w-sm">
            <MenuListItems title="Pengaturan" listItems={settingsMenuItems} />
          </div>
        </div>
      </Section>

      {/* ── ProfileCard ── */}
      <Section title="ProfileCard">
        <div className="max-w-md">
          <ProfileCard
            nameUser="Ahmad Suryadi"
            roleUser="Donatur Premium"
            imageUser="/logo/icon.png"
            amountProgramUser="12"
            amountVisitUser="5"
            amountDonatedUser="Rp 2.5Jt"
          />
        </div>
      </Section>

      {/* ── ImpactStats ── */}
      <Section title="ImpactStats">
        <ImpactStats jiwaterbantu={520} danatersalurkan={150} programberjalan={18} pengabdian={12} />
      </Section>

      {/* ── CategoryList ── */}
      <Section title="CategoryList">
        <CategoryList />
      </Section>

      {/* ── InventoryTable ── */}
      <Section title="InventoryTable">
        <InventoryTable items={inventoryItems} />
      </Section>

      {/* ── TransactionTable ── */}
      <Section title="TransactionTable">
        <TransactionTable transactions={financeTransactions} />
      </Section>

      {/* ── BookingList ── */}
      <Section title="BookingList">
        <BookingList bookings={visitBookings} />
      </Section>

      {/* ── CTASection ── */}
      <Section title="CTASection">
        <CTASection />
      </Section>
    </div>
  );
}
