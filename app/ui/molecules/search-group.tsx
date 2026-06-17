"use client";

import { useState } from "react";
import { Input } from "@/app/ui/atoms/input";
import { Btn } from "@/app/ui/atoms/button";
import { Search } from "lucide-react";

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
 * Memicu onSearch saat tombol ditekan atau Enter pada input.
 *
 * @param {(val: string) => void} onSearch - Handler saat pencarian dilakukan
 * @param {string} placeholder - Teks placeholder input
 * @param {string} className - Class tambahan Tailwind CSS
 * @returns {JSX.Element} Komponen SearchGroup
 */
export const SearchGroup = ({ placeholder, onSearch, className }: SearchGroupProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Cari..."}
        className="rounded-r-none border-r-0 focus:border-r-2"
      />
      <Btn
        className="rounded-l-none h-[52px]"
        variant="red"
        shape="rounded"
        onClick={handleSubmit}
        aria-label="Cari"
      >
        <Search size={20} />
      </Btn>
    </div>
  );
};
