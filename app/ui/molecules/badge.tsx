import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface BadgeProps {
    children?: ReactNode;
    icon?: LucideIcon;
    variant?: "solid" | "soft" | "outline";
    color?: "primary" | "success" | "warning" | "danger" | "info" | "secondary";
    className?: string;
}

export const Badge = ({ 
    children,
    icon: Icon,
    variant = "soft",
    color = "primary",
    className, 
}: BadgeProps) => {

    const variants = {
        solid: {
            primary: "bg-red-primary text-white",
            success: "bg-success text-white",
            warning: "bg-warning text-white",
            danger: "bg-danger text-white",
            info: "bg-info text-white",
            secondary: "bg-orange-primary text-white",
        },
        soft: {
            primary: "bg-red-primary/10 text-red-primary",
            success: "bg-success/10 text-success",
            warning: "bg-warning/10 text-warning",
            danger: "bg-danger/10 text-danger",
            info: "bg-info/10 text-info",
            secondary: "bg-orange-primary/10 text-orange-primary",
        },
        outline: {
            primary: "border border-red-primary text-red-primary",
            success: "border border-success text-success",
            warning: "border border-warning text-warning",
            danger: "border border-danger text-danger",
            info: "border border-info text-info",
            secondary: "border border-orange-primary text-orange-primary",
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
            {Icon && <Icon size={12} />}
            {children}
        </div>
    );
}