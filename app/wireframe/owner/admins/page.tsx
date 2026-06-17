export default function WireframeOwnerAdmins() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* <PageHeaderMolecule /> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Manajemen Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola hak akses dan staf administrator yayasan</p>
        </div>
        {/* <ButtonAtom /> */}
        <div className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium">Tambah Admin Baru</div>
      </div>

      {/* <FilterBarMolecule /> */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border border-gray-200 rounded-lg">
        <div className="w-full sm:w-64 h-10 bg-gray-50 border border-gray-200 rounded"></div>
      </div>

      {/* <CardGridOrganism /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 hover:shadow-sm transition-shadow">
            {/* <AvatarAtom /> */}
            <div className="w-20 h-20 bg-gray-100 rounded-full"></div>
            <div className="space-y-2 w-full flex flex-col items-center">
              <div className="w-32 h-5 bg-gray-200 rounded"></div>
              <div className="w-40 h-3 bg-gray-100 rounded"></div>
              <div className="w-24 h-6 bg-gray-50 border border-gray-200 rounded-full mt-2"></div>
            </div>
            <div className="w-full pt-4 border-t border-gray-100 flex justify-center space-x-3">
               <div className="w-20 h-8 bg-gray-50 rounded"></div>
               <div className="w-20 h-8 bg-gray-50 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
