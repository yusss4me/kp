import { Btn } from "@/app/ui/atoms/button"

export interface ButtonListProps {
    buttons: { label: string; onClick?: () => void }[];
    className?: string;
}

export const ButtonList = ({ buttons, className }: ButtonListProps) => {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {buttons.map((button, index) => (
                <Btn key={index} onClick={button.onClick} className="">
                    {button.label}
                </Btn>
            ))}
        </div>
    )
}