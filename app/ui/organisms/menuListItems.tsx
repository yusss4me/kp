

import { LucideIcon } from "lucide-react";
import { Container } from "../atoms/container";
import { ListItem } from "../molecules/ListItem";
import { Label } from "../molecules/label";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  href?: string;
}

export interface MenuListItemsProps {
  title: string;
  listItems: MenuItem[];
}

/**
 * MenuListItems
 * 
 * Komponen untuk menampilkan grup menu navigasi vertikal.
 * Terdiri dari label judul grup dan daftar item menu (ListItem) 
 * yang dibungkus dalam container.
 * 
 * @param {string} title - Judul grup menu
 * @param {MenuItem[]} listItems - Daftar item menu yang akan ditampilkan
 * @param {MenuListItemsProps} props - Properti komponen
 * @returns {JSX.Element} Komponen MenuListItems
 */
export const MenuListItems = ({title, listItems}: MenuListItemsProps) => {
  return (
    <Container className="flex flex-col gap-3">
        <Label text={title} className="px-1 text-gray-400 font-semibold uppercase text-[10px] tracking-widest" />
        <Container className="flex flex-col overflow-hidden rounded-xl bg-white">
            {listItems.map((item, index) => (
                <ListItem 
                    key={index}
                    icon={item.icon} 
                    label={item.label} 
                    href={item.href}
                />
            ))}
        </Container>
    </Container>
  );
};