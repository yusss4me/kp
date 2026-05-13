import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Btn } from '../atoms/button';

interface OrphanFilterProps {
  onSearch: (query: string) => void;
  onAddClick: () => void;
}

export const OrphanFilter = ({ onSearch, onAddClick }: OrphanFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-[28px] border border-gray-100 shadow-sm">
      <div className="relative flex-grow w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Cari nama anak asuh..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-red-primary/20 text-sm font-medium transition-all"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Btn 
          variant="light" 
          className="flex-1 md:flex-none gap-2 h-12 rounded-2xl border border-gray-100"
        >
          <Filter size={18} />
          Filter
        </Btn>
        <Btn 
          variant="red" 
          onClick={onAddClick}
          className="flex-1 md:flex-none gap-2 h-12 rounded-2xl shadow-lg shadow-red- primary/20"
        >
          <Plus size={18} />
          Tambah Anak
        </Btn>
      </div>
    </div>
  );
};
