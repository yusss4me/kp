"use client";


import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Txt } from "../atoms/text";
import { Icn } from "../atoms/Icn";
import { Lnk } from "../atoms/link";
import { Btn } from "../atoms/button";


/**
 * Props for the NavLink component.
 */
export interface NavLinkProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
  Color?: "red" | "dark" | "light" | undefined;
  labelClassName?: string;
  activeClassName?: string;
  iconSize?: number;
  showLabel?: boolean;
  direction?: "row" | "col";
  onClick?: () => void;
}

/**
 * NavLink
 * 
 * Komponen tautan navigasi yang menangani status aktif secara otomatis 
 * dan mendukung kombinasi icon serta label.
 * 
 * @param {string} href - URL tujuan navigasi
 * @param {string} label - Label teks yang ditampilkan
 * @param {LucideIcon} icon - Icon optional dari lucide-react
 * @param {string} className - Class tambahan untuk container (Link)
 * @param {string} labelClassName - Class tambahan untuk label teks
 * @param {string} activeClassName - Class tambahan saat link sedang aktif
 * @param {number} iconSize - Ukuran icon dalam pixel (default: 20)
 * @param {boolean} showLabel - Apakah menampilkan label teks (default: true)
 * @param {"row" | "col"} direction - Arah konten (horizontal/vertikal)
 * @param {() => void} onClick - Handler saat link diklik
 * @param {NavLinkProps} props - Properti komponen
 * @returns {JSX.Element} Komponen NavLink
 */
export const NavLink = ({
  href,
  label,
  icon: Icon,
  className,
  Color,
  labelClassName,
  activeClassName,
  iconSize = 20,
  showLabel = true,
  direction = "row",
  onClick,
}: NavLinkProps) => {
  const pathname = usePathname();
  
  // Logic to determine if the current route matches this link
  const isActive = 
    pathname === href || 
    (href !== "/" && pathname.startsWith(href));

  return (
    <Lnk
      href={href}
      onClick={onClick}
      color={Color}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md transition-all duration-200 ",
        direction === "col" ? "flex-col justify-center text-center" : "flex-row",
        className
      )}
    >
      
      

      {Icon && (
        <div className="flex items-center justify-center shrink-0 cursor-pointer">
          <Icn
            icon={Icon}
            size={iconSize}
            color="current"
            className={cn(
              "transition-all duration-200",
              isActive ? "text-current" : "text-red-secondary opacity-80"
            )}
            />
        </div>
      )}
      {showLabel && (
        <Txt as="label" color="current" className={cn(
          "transition-colors duration-200 cursor-pointer", 
          isActive ? "text-current" : "text-red-secondary",
          labelClassName
        )}>
          {label}
        </Txt>
      )}
      
     
    </Lnk>
  );
};

export default NavLink;
