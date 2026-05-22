import { Btn, ButtonProps } from "../atoms/button";
import { Txt } from "../atoms/text";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

export interface LabelButtonProps extends ButtonProps {
    label: string;
    icon?: LucideIcon;
}

/**
 * LabelButton
 * 
 * Komponen tombol yang memiliki label teks dan icon secara berdampingan.
 * Mewarisi semua properti dari atom Button (Btn).
 * 
 * @param {string} label - Teks label utama pada tombol
 * @param {LucideIcon} icon - Icon optional dari lucide-react
 * @param {LabelButtonProps} props - Properti komponen
 * @returns {JSX.Element} Komponen LabelButton
 */
export const LabelButton = ({ 
    label, 
    icon: Icon, 
    ...props 
}: LabelButtonProps) => {
    return (
        <Btn 
            className={cn(
                "gap-4",
            )} 
            {...props}
        >
            <Txt as="span" variant="body" weight="medium" className="text-inherit">
                {label}
            </Txt>
            {Icon && <Icon size={20} />}
        </Btn>
    );
}
