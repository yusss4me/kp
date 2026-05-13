import { Btn } from "../atoms/button";
import { Txt } from "../atoms/text";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface LabelButtonProps {
    label: string;
    icon?: LucideIcon;
}

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
