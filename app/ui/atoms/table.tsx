import { cn } from "@/app/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
    className?: string;
}

/**
 * Komponen Table untuk menampilkan data dalam bentuk tabel
 * 
 * @param {ReactNode} children - Konten tabel yang akan ditampilkan
 * @param {string} className - Class tambahan Tailwind CSS
 * @returns {JSX.Element} Komponen tabel
 */
export const Table = ({ children, className, ...props }: TableProps) => {
    return (
        <table className={cn("w-full text-sm text-gray-500 dark:text-gray-400", className)} {...props}>
            {children}
        </table>
    )
}