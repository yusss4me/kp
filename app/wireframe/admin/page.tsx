export default function WireframeAdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* <PageHeaderMolecule /> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Ringkasan aktivitas operasional yayasan</p>
        </div>
        <div className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium">Buat Laporan</div>
      </div>

      {/* <StatsCardListOrganism /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 bg-gray-100 rounded"></div>
              <div className="w-8 h-8 bg-gray-50 rounded-full"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <RecentTasksOrganism /> */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="w-40 h-6 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-3 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="w-4 h-4 rounded bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-full h-4 bg-gray-100 rounded"></div>
                  <div className="w-1/2 h-3 bg-gray-50 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <PendingApprovalsOrganism /> */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex justify-between">
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
            <div className="w-16 h-6 bg-gray-100 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-100 rounded"></div>
                  <div className="w-24 h-3 bg-gray-50 rounded"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-16 h-8 bg-gray-100 rounded"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
