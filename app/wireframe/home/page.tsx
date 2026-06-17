export default function WireframeHomeDashboard() {
  return (
    <div className="space-y-6">
      {/* <DonaturWalletMolecule /> */}
      <div className="p-4 bg-gray-900 text-white rounded-b-2xl shadow-sm">
        <div className="space-y-2 mb-4">
          <div className="w-24 h-4 bg-gray-700 rounded"></div>
          <div className="w-32 h-8 bg-gray-600 rounded"></div>
        </div>
        <div className="flex justify-between items-center bg-gray-800 p-3 rounded-xl">
           <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
             <div className="w-20 h-4 bg-gray-700 rounded"></div>
           </div>
           <div className="px-3 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-lg">Top Up</div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* <QuickActionsOrganism /> */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                 <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* <DonationCampaignsOrganism /> */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Program Pilihan</h2>
            <div className="text-sm text-gray-500 font-medium">Lihat Semua</div>
          </div>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="w-full h-32 bg-gray-100"></div>
                <div className="p-4 space-y-3">
                  <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                      <div className="w-2/3 h-full bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-20 h-3 bg-gray-200 rounded"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <RecentActivityMolecule /> */}
        <div className="space-y-4 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terakhir</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center space-x-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-24 h-3 bg-gray-100 rounded"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
