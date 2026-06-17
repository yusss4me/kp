export default function WireframeOwnerSettings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* <PageHeaderMolecule /> */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Pengaturan Sistem Yayasan</h1>
        <p className="text-sm text-gray-500 mt-1">Konfigurasi global platform YAMUTI</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* <TabsMolecule /> */}
        <div className="border-b border-gray-200 px-6 overflow-x-auto">
          <nav className="flex space-x-6 min-w-max">
            <div className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900">Informasi Yayasan</div>
            <div className="border-b-2 border-transparent py-4 text-sm font-medium text-gray-500">Keamanan</div>
            <div className="border-b-2 border-transparent py-4 text-sm font-medium text-gray-500">Integrasi Pembayaran</div>
          </nav>
        </div>

        <div className="p-6 space-y-8">
          {/* Settings Section */}
          <section className="space-y-4">
            <div>
              <div className="w-32 h-5 bg-gray-200 rounded mb-1"></div>
              <div className="w-64 h-3 bg-gray-100 rounded"></div>
            </div>
            
            <div className="space-y-4">
              {/* <FormFieldMolecule /> */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="sm:col-span-2">
                  <div className="w-full h-10 bg-gray-50 border border-gray-200 rounded"></div>
                </div>
              </div>
              
              {/* <FormFieldMolecule /> */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="w-32 h-4 bg-gray-200 rounded mt-2"></div>
                <div className="sm:col-span-2">
                  <div className="w-full h-24 bg-gray-50 border border-gray-200 rounded"></div>
                  <div className="w-48 h-3 bg-gray-100 rounded mt-2"></div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Logo Section */}
          <section className="space-y-4">
            <div>
              <div className="w-32 h-5 bg-gray-200 rounded mb-1"></div>
              <div className="w-64 h-3 bg-gray-100 rounded"></div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center">
                 <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="w-32 h-8 bg-gray-100 rounded"></div>
                <div className="w-48 h-3 bg-gray-100 rounded"></div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* <FormActionsMolecule /> */}
          <div className="flex justify-end space-x-3 pt-2">
            <div className="w-20 h-10 bg-gray-50 border border-gray-200 rounded"></div>
            <div className="w-32 h-10 bg-gray-900 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
