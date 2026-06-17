export default function WireframeHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center text-gray-900 font-sans">
      {/* Mobile-first constraints for Donatur App */}
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-sm border-x border-gray-200">
        
        {/* <DonaturHeaderOrganism /> */}
        <header className="h-16 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            {/* <AvatarAtom /> */}
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <div className="w-24 h-4 bg-gray-200 rounded mb-1"></div>
              <div className="w-16 h-3 bg-gray-100 rounded"></div>
            </div>
          </div>
          {/* <NotificationIconAtom /> */}
          <div className="w-8 h-8 rounded-full bg-gray-100"></div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* <BottomNavigationOrganism /> */}
        <nav className="h-16 bg-white border-t border-gray-200 flex justify-around items-center absolute bottom-0 w-full z-10 px-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-1 p-2">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-12 h-2 bg-gray-100 rounded"></div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
