export default function WireframePublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* <PublicHeaderOrganism /> */}
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          {/* <LogoAtom /> */}
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <span className="font-bold text-lg text-gray-700 hidden sm:block">YAMUTI</span>
        </div>
        
        {/* <DesktopNavigationMolecule /> */}
        <nav className="hidden md:flex space-x-6">
          <div className="text-sm font-medium text-gray-500 hover:text-gray-900">Home</div>
          <div className="text-sm font-medium text-gray-500 hover:text-gray-900">Program</div>
          <div className="text-sm font-medium text-gray-500 hover:text-gray-900">Berita</div>
          <div className="text-sm font-medium text-gray-500 hover:text-gray-900">Tentang Kami</div>
        </nav>

        <div className="flex items-center space-x-3">
          {/* <ButtonAtom variant="outline" /> */}
          <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hidden sm:block">Masuk</div>
          {/* <ButtonAtom variant="solid" /> */}
          <div className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded">Donasi Sekarang</div>
          {/* <MobileMenuToggleAtom /> */}
          <div className="w-8 h-8 bg-gray-100 rounded md:hidden"></div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      {/* <PublicFooterOrganism /> */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="w-full max-w-sm h-16 bg-gray-100 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="w-24 h-5 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-100 rounded"></div>
            <div className="w-20 h-4 bg-gray-100 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="w-24 h-5 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-100 rounded"></div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
