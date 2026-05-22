import { Input } from '@/app/ui/atoms/input';
import { Btn } from '@/app/ui/atoms/button';
import { Search } from 'lucide-react';

export interface SearchGroupProps {
  onSearch?: (val: string) => void;
  placeholder?: string;

  className?: string;
}

/**
 * SearchGroup
 * 
 * Komponen grup pencarian yang menggabungkan input teks 
 * dan tombol cari dengan gaya visual yang menyatu.
 * 
 * @param {(val: string) => void} onSearch - Handler saat pencarian dilakukan
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {SearchGroupProps} props - Properti komponen
 * @returns {JSX.Element} Komponen SearchGroup
 */
export const SearchGroup = ({ placeholder,onSearch, className }: SearchGroupProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input 
        placeholder={placeholder} 
        className="rounded-r-none border-r-0 focus:border-r-2"
      />
      <Btn className="rounded-l-none h-[52px]" variant="red" shape='rounded'>
        <Search size={20} />
      </Btn>
    </div>
  );
};