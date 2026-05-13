"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";

/**
 * Props for the NavLink component.
 */
interface NavLinkProps {
  /** The destination URL */
  href: string;
  /** The text label to display */
  label: string;
  /** Optional icon component from lucide-react */
  icon?: LucideIcon;
  /** Optional additional CSS classes for the container */
  className?: string;
  /** Optional additional CSS classes for the label */
  labelClassName?: string;
  /** Optional CSS classes to apply when the link is active */
  activeClassName?: string;
  /** Size of the icon in pixels. Defaults to 20. */
  iconSize?: number;
  /** Whether to show the label text. Defaults to true. */
  showLabel?: boolean;
  /** Direction of the link content. Defaults to 'row'. */
  direction?: "row" | "col";
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * A reusable navigation link component that automatically handles active states
 * and supports optional icons and labels.
 */
export const NavLink = ({
  href,
  label,
  icon: Icon,
  className,
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
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md transition-all duration-200 ",
        direction === "col" ? "flex-col justify-center text-center" : "flex-row",
        className
      )}
    >
      

      {Icon && (
        <div className="flex items-center justify-center shrink-0 cursor-pointer">
          <Icon 
            size={iconSize} 
            className={cn(
              "transition-all duration-200",
              isActive ? "text-lightdark-primary" : "text-red-secondary opacity-80"
            )} 
            />
        </div>
      )}
      {showLabel && (
        <Txt as="label" color="white" className={cn(
          "transition-colors duration-200 cursor-pointer", 
          isActive ? "text-lightdark-primary" : "text-red-secondary",
          labelClassName
        )}>
          {label}
        </Txt>
      )}
     
    </Link>
  );
};

export default NavLink;
