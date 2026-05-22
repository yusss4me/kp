import Link, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface LnkProps extends NextLinkProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "primary" | "secondary" | "muted" | "underline";
    color?: "red" | "dark" | "light";
}

/**
 * Link (Lnk)
 * 
 * Komponen navigasi yang membungkus Next.js Link dengan berbagai 
 * varian gaya dan warna yang konsisten dengan tema aplikasi.
 * 
 * @param {ReactNode} children - Konten link
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {"default" | "primary" | "secondary" | "muted" | "underline"} variant - Varian gaya visual link
 * @param {"red" | "dark" | "light"} color - Warna dasar link
 * @param {LnkProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Link yang telah diformat
 */
export const Lnk: React.FC<LnkProps> = ({ 
    href, 
    children, 
    variant = "default", 
    color = "red",
    className,
    ...props 
}) => {
    const variants = {
        default: "hover:opacity-70",
        primary: "font-bold hover:text-red-primary",
        secondary: "font-medium hover:text-red-primary",
        muted: "text-lightdark-neutral hover:text-lightdark-tertiary",
        underline: "underline underline-offset-4 hover:text-red-primary",
     };

    const colors = {
        red: "text-red-primary",
        dark: "text-lightdark-tertiary",
        light: "text-lightdark-primary",
    };

    return (
        <Link 
            href={href} 
            className={cn(
                "transition-all duration-300 ease-in-out inline-flex items-center gap-1",
                colors[color],
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </Link>
    );
};