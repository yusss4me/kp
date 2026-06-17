export default function WireframeAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans">
      {/* <AdminSidebarOrganism /> */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="font-bold text-lg text-gray-700 tracking-wider">ADMIN PORTAL</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* <SidebarMenuMolecule /> */}
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-4">Utama</div>
          <div className="h-10 bg-gray-100 rounded flex items-center px-4 text-gray-900 text-sm font-medium">Dashboard</div>
          
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Manajemen</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Anak Asuh</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Broadcast</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">CMS & Berita</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Donasi</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Inventaris</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Keuangan</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Kunjungan</div>
        </nav>
        <div className="p-4 border-t border-gray-200">
          {/* <UserProfileMolecule /> */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <div className="w-24 h-4 bg-gray-200 rounded mb-1"></div>
              <div className="w-16 h-3 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <AdminHeaderOrganism /> */}
        <header className="h-16 flex-shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center">
             {/* <MobileMenuButtonAtom /> */}
             <div className="w-8 h-8 bg-gray-100 rounded md:hidden mr-4"></div>
             <div className="hidden sm:flex space-x-2">
                <div className="w-24 h-8 bg-gray-50 border border-gray-200 rounded"></div>
                <div className="w-24 h-8 bg-gray-50 border border-gray-200 rounded"></div>
             </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <NotificationIconAtom /> */}
            <div className="w-8 h-8 rounded-full bg-gray-100"></div>
            {/* <ButtonAtom /> */}
            <div className="w-20 h-8 rounded bg-gray-100 hidden sm:block"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
