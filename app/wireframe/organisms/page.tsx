import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { ProfileCard } from "@/app/ui/organisms/profile-card";
import { SummaryGrid } from "@/app/ui/organisms/sumary-grid";
import { Header } from "@/app/ui/organisms/header";
import { Footer } from "@/app/ui/organisms/footer";
import { AdminProfileMenuGroup } from "@/app/ui/organisms/AdminProfileMenuGroup";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function OrganismsPreview() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-50/50 to-transparent -z-10" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <Link href="/wireframe" className="inline-flex items-center text-gray-500 hover:text-red-primary mb-4">
            <ChevronLeft size={20} />
            <span className="font-semibold">Kembali ke Katalog</span>
          </Link>
          <Txt variant="h2" weight="bold" className="text-gray-900">
            Organisms
          </Txt>
          <Txt className="text-gray-500 max-w-2xl">
            Komponen kompleks yang membentuk sebagian besar antarmuka pengguna, terdiri dari gabungan 
            *atoms* dan *molecules*. Contohnya seperti Navbar, Header, Tabel, atau Card terintegrasi.
          </Txt>
        </div>

        {/* Section: Dashboard Header */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Dashboard Header</Txt>
          <div className="border border-gray-200 rounded-xl overflow-hidden relative">
            <DashboardHeader headerTitle="Pratinjau Dashboard Header">
              <div className="p-8 text-center text-gray-400">
                Area Konten Utama
              </div>
            </DashboardHeader>
          </div>
        </Container>

        {/* Section: Profile Card */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Profile Card</Txt>
          <div className="max-w-md">
            <ProfileCard 
              nameUser="M. Ardiansyah" 
              roleUser="Administrator" 
              imageUser="/logo/yamuti.png" 
              amountProgramUser="12"
              amountVisitUser="45"
              amountDonatedUser="Rp 5.000.000"
            />
          </div>
        </Container>

        {/* Section: Summary Grid */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Summary Grid</Txt>
          <SummaryGrid />
        </Container>

        {/* Section: Header & Footer */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Public Header & Footer</Txt>
          <div className="space-y-8">
            <div className="border border-gray-200 rounded-xl overflow-hidden relative min-h-[100px] bg-gray-100">
              <Header />
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden relative">
              <Footer />
            </div>
          </div>
        </Container>

        {/* Section: Admin Menu Group */}
        <Container className="p-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/30 rounded-3xl space-y-8">
          <Txt variant="h3" weight="bold" className="border-b border-gray-100 pb-4 text-gray-900">Admin Profile Menu Group</Txt>
          <div className="max-w-xs border border-gray-200 rounded-xl bg-white p-4 shadow-sm">
            <AdminProfileMenuGroup />
          </div>
        </Container>

      </div>
    </div>
  );
}
