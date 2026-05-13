const Bar: React.FC<{ height: string; active?: boolean }> = ({ height, active }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-8 bg-gray-100 rounded-lg relative h-32 overflow-hidden">
      <div 
        className={`absolute bottom-0 w-full rounded-t-lg transition-all ${active ? 'bg-[#96E072]' : 'bg-gray-300'}`}
        style={{ height }}
      />
    </div>
  </div>
);

export const ActivityChart: React.FC = () => {
  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-xs text-gray-400 font-bold mb-1 uppercase">Your Activity</p>
          <h3 className="text-xl font-black text-gray-900">$2500 Donated</h3>
        </div>
        <button className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full text-xs font-bold border">
          Month <span className="text-[10px]">▼</span>
        </button>
      </div>
      <div className="flex justify-between items-end h-40">
        <Bar height="40%" />
        <Bar height="85%" />
        <Bar height="60%" />
        <Bar height="90%" />
        <Bar height="30%" />
        <Bar height="75%" active />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-3 px-1 uppercase">
        <span>Jun</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span className="text-green-500">Jun</span>
      </div>
    </div>
  );
};