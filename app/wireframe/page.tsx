import Link from "next/link";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { ChevronRight, Layers, Box, LayoutPanelLeft } from "lucide-react";

export default function WireframeIndex() {
  const categories = [
    {
      title: "Atoms",
      description: "Komponen dasar terkecil seperti Button, Input, Txt, Avatar.",
      href: "/wireframe/atoms",
      icon: <Box size={24} className="text-red-primary" />,
      color: "bg-red-50",
    },
    {
      title: "Molecules",
      description: "Gabungan beberapa atom yang membentuk fungsionalitas sederhana, seperti SearchBar, FormField.",
      href: "/wireframe/molecules",
      icon: <Layers size={24} className="text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Organisms",
      description: "Komponen kompleks yang membentuk bagian spesifik dari UI, seperti Navbar, Header, Table.",
      href: "/wireframe/organisms",
      icon: <LayoutPanelLeft size={24} className="text-purple-500" />,
      color: "bg-purple-50",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-32 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-primary"></span>
            </span>
            <Txt variant="caption" weight="bold" className="text-gray-600 tracking-wider uppercase">
              Design System Showcase
            </Txt>
          </div>
          <Txt variant="h2" weight="bold" className="text-gray-900 tracking-tight">
            Katalog Komponen UI YAMUTI
          </Txt>
          <Txt className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Eksplorasi kumpulan *Atomic Design* yang membangun antarmuka sistem secara keseluruhan. 
            Dikurasi khusus untuk *developer* agar proses integrasi desain lebih mudah dan konsisten.
          </Txt>
        </div>

        {/* Grid Katalog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block">
              <Container className="h-full p-8 bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-gray-200/40 rounded-3xl hover:border-red-primary/20 hover:shadow-2xl hover:shadow-red-primary/10 transition-all duration-500 cursor-pointer flex flex-col group-hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform duration-500 ease-out`}>
                    {cat.icon}
                  </div>
                  <Txt variant="h3" weight="bold" className="text-gray-900">{cat.title}</Txt>
                </div>
                <Txt className="text-gray-500 flex-grow mb-8 leading-relaxed">
                  {cat.description}
                </Txt>
                <div className="mt-auto flex items-center justify-between text-sm font-bold text-gray-400 group-hover:text-red-primary transition-colors">
                  <span>Eksplorasi Komponen</span>
                  <div className="p-2 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
                    <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Container>
            </Link>
          ))}
        </div>

        {/* Existing Routes Notice */}
        <div className="pt-16 pb-8 text-center">
          <Txt variant="small" weight="bold" className="text-gray-400 uppercase tracking-widest mb-6 block">
            Pratinjau Layout Lengkap (Template/Pages)
          </Txt>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/wireframe/admin" className="px-6 py-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:text-red-primary hover:border-red-100 hover:shadow-md transition-all font-semibold">
              Dashboard Admin
            </Link>
            <Link href="/wireframe/owner" className="px-6 py-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:text-red-primary hover:border-red-100 hover:shadow-md transition-all font-semibold">
              Dashboard Super Admin
            </Link>
            <Link href="/wireframe/home" className="px-6 py-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:text-red-primary hover:border-red-100 hover:shadow-md transition-all font-semibold">
              Public Landing Page
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
