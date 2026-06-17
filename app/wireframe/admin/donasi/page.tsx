export default function WireframeDonasiAdmin() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* <PageHeaderMolecule /> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manajemen Donasi</h1>
          <p className="text-sm text-gray-500 mt-1">Lacak dan kelola data donasi masuk</p>
        </div>
        {/* <ButtonAtom /> */}
        <div className="flex space-x-2">
           <div className="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-900 rounded text-sm font-medium">Export CSV</div>
           <div className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium">Tambah Donasi</div>
        </div>
      </div>

      {/* <StatsCardListOrganism /> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg space-y-3">
            <div className="w-32 h-4 bg-gray-100 rounded"></div>
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* <FilterBarMolecule /> */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-gray-200 rounded-lg">
        <div className="w-full sm:w-64 h-10 bg-gray-50 border border-gray-200 rounded"></div>
        <div className="w-full sm:w-40 h-10 bg-gray-50 border border-gray-200 rounded"></div>
        <div className="w-full sm:w-40 h-10 bg-gray-50 border border-gray-200 rounded"></div>
      </div>

      {/* <TableOrganism /> */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-medium">ID Transaksi</th>
                <th className="px-6 py-4 font-medium">Donatur</th>
                <th className="px-6 py-4 font-medium">Program</th>
                <th className="px-6 py-4 font-medium">Nominal</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-24 h-4 bg-gray-200 rounded font-mono"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                      <div className="w-24 h-3 bg-gray-100 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-40 h-4 bg-gray-100 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 h-4 bg-gray-100 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
