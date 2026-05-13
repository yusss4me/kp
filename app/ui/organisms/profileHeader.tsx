import React from 'react';
import { ShieldCheck, CircleDollarSign, CheckCircle2 } from 'lucide-react';

interface StatItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
    <div className="text-gray-400">{icon}</div>
    <div>
      <p className="text-[10px] text-gray-500 uppercase font-bold">{label}</p>
      <p className="text-sm font-black text-gray-800">{value}</p>
    </div>
  </div>
);

export const ProfileHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img src="/avatar.jpg" className="w-24 h-24 rounded-full border-4 border-white shadow-md" alt="Profile" />
          <CheckCircle2 className="absolute bottom-1 right-1 text-green-500 fill-white" size={20} />
        </div>
        <h2 className="text-xl font-black mt-3 text-gray-900">XioFik Hasan</h2>
        <p className="text-sm text-gray-400">Hope Giver</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatItem label="Donations" value="52" icon={<ShieldCheck size={18}/>} />
        <StatItem label="Total Donated" value="$450" icon={<CircleDollarSign size={18}/>} />
      </div>
    </div>
  );
};