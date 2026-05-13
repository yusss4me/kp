import { Input } from '@/app/ui/atoms/input';
import { Btn } from '@/app/ui/atoms/button';
import { Search } from 'lucide-react';

export const SearchGroup = ({ onSearch, className }: { onSearch?: (val: string) => void; className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input 
        placeholder="Cari data..." 
        className="rounded-r-none border-r-0 focus:border-r-2"
      />
      <Btn className="rounded-l-none h-[52px]" variant="orange" shape='rounded'>
        <Search size={20} />
      </Btn>
    </div>
  );
};