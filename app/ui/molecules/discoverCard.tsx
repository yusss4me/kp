import React from 'react';

interface DiscoverCardProps {
  title: string;
  image: string;
  category: string;
  onClick?: () => void;
}

export const DiscoverCard: React.FC<DiscoverCardProps> = ({ title, image, category, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="min-w-[240px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-transform"
    >
      <div className="relative h-32 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-800 leading-tight line-clamp-2">{title}</h4>
      </div>
    </div>
  );
};