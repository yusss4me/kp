import { cn } from "@/app/lib/utils";
import { SelectHTMLAttributes } from "react";



interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?:string
    options?:{value:string, label:string}[]
    error?:string
    className?:string
    
}
export const Select = ({options,label,error,className, ...props}:SelectProps)=>{
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={props.id} className="text-sm font-semibold text-lightdark-tertiary ml-1">
                    {label}
                </label>
            )}
            <select
                className={cn(
                    'w-full px-4 py-3 rounded-xl border-2 transition-all border-lightdark-tertiary',
                    'focus:border-lightdark-neutral bg-lightdark-secondary text-lightdark-tertiary outline-none',
                    'placeholder:text-lightdark-neutral hover:border-lightdark-neutral',
                    error && 'border-danger',
                    props.disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                {...props}
            >
                <option value="">Pilih {label}</option>
                {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-xs text-danger ml-1">{error}</span>}
        </div>
    );
}