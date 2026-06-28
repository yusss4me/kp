export default function WireframePublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* <PublicHeaderOrganism /> */}
      

      <main className="flex-1 w-full">
        {children}
      </main>

      {/* <PublicFooterOrganism /> */}
      
    </div>
  );
}
