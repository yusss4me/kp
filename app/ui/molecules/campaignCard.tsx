// components/molecules/CampaignerCard.tsx
import React from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';

interface CampaignerProps {
  name: string;
  avatar: string;
  isVerified?: boolean;
}

export const CampaignerCard: React.FC<CampaignerProps> = ({ name, avatar, isVerified }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-gray-900">{name}</h4>
            {isVerified && <CheckCircle2 size={16} className="text-blue-500 fill-blue-500 text-white" />}
          </div>
          <p className="text-xs text-gray-500">Organization</p>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full">
        <Plus size={20} />
      </button>
    </div>
  );
};