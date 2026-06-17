export default function WireframeAdminKunjungan() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* <PageHeaderMolecule /> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manajemen Kunjungan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola jadwal dan pengajuan kunjungan</p>
        </div>
        {/* <ButtonAtom /> */}
        <div className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium">Buat Jadwal Kunjungan</div>
      </div>

      {/* <TabsMolecule /> */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <div className="border-b-2 border-gray-900 py-4 px-1 text-sm font-medium text-gray-900">Semua</div>
          <div className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Menunggu Persetujuan</div>
          <div className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Selesai</div>
        </nav>
      </div>

      {/* <FilterBarMolecule /> */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-gray-200 rounded-lg">
        <div className="w-full sm:w-64 h-10 bg-gray-50 border border-gray-200 rounded"></div>
        <div className="w-full sm:w-40 h-10 bg-gray-50 border border-gray-200 rounded"></div>
      </div>

      {/* <TableOrganism /> */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-medium">Pengunjung</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Tujuan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="w-48 h-4 bg-gray-200 rounded"></div>
                      <div className="w-32 h-3 bg-gray-100 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-40 h-4 bg-gray-100 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <div className="w-8 h-8 bg-gray-100 rounded"></div>
                      <div className="w-8 h-8 bg-gray-100 rounded"></div>
                    </div>
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
