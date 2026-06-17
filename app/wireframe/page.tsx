export default function WireframePublicLanding() {
  return (
    <div className="w-full">
      {/* <HeroSectionOrganism /> */}
      <section className="relative bg-gray-50 border-b border-gray-200 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-3/4 mx-auto h-12 sm:h-16 bg-gray-200 rounded"></div>
          <div className="w-2/3 mx-auto h-6 sm:h-8 bg-gray-100 rounded"></div>
          <div className="flex justify-center space-x-4 pt-4">
            <div className="w-32 h-12 bg-gray-900 rounded"></div>
            <div className="w-32 h-12 bg-white border border-gray-300 rounded"></div>
          </div>
        </div>
      </section>

      {/* <StatsSectionOrganism /> */}
      <section className="py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="w-20 h-8 bg-gray-200 rounded mx-auto"></div>
                <div className="w-24 h-4 bg-gray-100 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <ProgramHighlightOrganism /> */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="w-48 h-8 bg-gray-200 rounded mx-auto"></div>
            <div className="w-64 h-4 bg-gray-100 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                <div className="w-full h-48 bg-gray-100"></div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                  <div className="w-full h-12 bg-gray-50 rounded"></div>
                  {/* Progress Bar Molecule */}
                  <div className="mt-auto pt-4 space-y-2">
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="w-1/2 h-full bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-16 h-3 bg-gray-200 rounded"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
