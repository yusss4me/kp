import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Icn } from "@/app/ui/atoms/Icn";

export interface BadgeProps {
    children?: ReactNode;
    icon?: LucideIcon;
    variant?: "solid" | "soft" | "outline";
    color?: "primary" | "success" | "warning" | "danger" | "info" | "secondary";
    className?: string;
}

/**
 * Badge
 * 
 * Komponen label kecil untuk menampilkan status, kategori, atau informasi singkat.
 * 
 * @param {ReactNode} children - Konten teks atau elemen di dalam badge
 * @param {LucideIcon} icon - Icon optional dari lucide-react
 * @param {"solid" | "soft" | "outline"} variant - Varian gaya visual badge
 * @param {"primary" | "success" | "warning" | "danger" | "info" | "secondary"} color - Warna tema badge
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {BadgeProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Badge
 */

export const Badge = ({ 
    children,
    icon: Icon,
    variant = "soft",
    color = "primary",
    className, 
}: BadgeProps) => {

    const variants = {
        solid: {
            primary: "bg-red-primary text-red-secondary",
            success: "bg-success text-lightdark-primary",
            warning: "bg-warning text-lightdark-primary",
            danger: "bg-danger text-lightdark-primary",
            info: "bg-info text-lightdark-primary",
            secondary: "bg-lightdark-primary text-lightdark-tertiary",
        },
        soft: {
            primary: "bg-red-primary/10 text-red-primary",
            success: "bg-success/10 text-success",
            warning: "bg-warning/10 text-warning",
            danger: "bg-danger/10 text-danger",
            info: "bg-info/10 text-info",
            secondary: "bg-lightdark-secondary text-lightdark-tertiary",
        },
        outline: {
            primary: "border border-red-primary text-red-primary",
            success: "border border-success text-success",
            warning: "border border-warning text-warning",
            danger: "border border-danger text-danger",
            info: "border border-info text-info",
            secondary: "border border-lightdark-neutral text-lightdark-tertiary",
        }
    }

    return (
        <div     
            className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors',
                variants[variant][color],
                className
            )}
        >
            {Icon && <Icn icon={Icon} size={12} color="current" />}
            {children}
        </div>
    );
}