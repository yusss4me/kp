// components/molecules/CategoryCard.tsx
import React from 'react';

// Definisi interface untuk type-safety
interface CategoryCardProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  colorScheme?: 'green' | 'blue' | 'red' | 'purple';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  label, 
  icon, 
  isActive = false, 
  onClick,
  colorScheme = 'blue'
}) => {
  // Mapping warna berdasarkan skema untuk menjaga konsistensi brand
  const colors = {
    green: isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700',
    blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700',
    red: isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700',
    purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200
        min-w-[100px] gap-2 shadow-sm active:scale-95 cursor-pointer
        ${colors[colorScheme]}
        ${isActive ? 'shadow-md ring-2 ring-offset-2 ring-blue-400' : 'hover:bg-opacity-80'}
      `}
    >
      {/* Container Ikon (Atom) */}
      <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20' : 'bg-white'}`}>
        {icon}
      </div>
      
      {/* Label (Atom) */}
      <span className="text-xs font-bold uppercase tracking-wider">
        {label}
      </span>
    </button>
  );
};