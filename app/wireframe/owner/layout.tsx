export default function WireframeOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans">
      {/* <OwnerSidebarOrganism /> */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="font-bold text-lg text-gray-700 tracking-wider">OWNER PORTAL</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {/* <SidebarMenuMolecule /> */}
          <div className="h-10 bg-gray-100 rounded flex items-center px-4 text-gray-900 text-sm font-medium">Dashboard</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Foundation</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Admins</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Donations Overview</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Reports</div>
          <div className="h-10 hover:bg-gray-50 rounded flex items-center px-4 text-gray-500 text-sm font-medium border border-transparent hover:border-gray-200 transition-colors">Settings</div>
        </nav>
        <div className="p-4 border-t border-gray-200">
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
        {/* <HeaderOrganism /> */}
        <header className="h-16 flex-shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center">
             <div className="w-8 h-8 bg-gray-100 rounded md:hidden mr-4"></div>
             <div className="hidden sm:flex space-x-2">
                <div className="w-32 h-8 bg-gray-50 border border-gray-200 rounded"></div>
             </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-gray-100"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
