import { cn } from "@/app/lib/utils";
import { ReactNode, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}

export interface THeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export interface TBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export interface TRProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
}

export interface THProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children: ReactNode;
}

export interface TDProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children: ReactNode;
}

/**
 * Table
 * 
 * Komponen tabel dasar untuk menampilkan data terstruktur dalam baris dan kolom.
 * 
 * @param {ReactNode} children - Konten di dalam tabel
 * @param {TableProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Table
 */
export const Table = ({ children, className, ...props }: TableProps) => {
    return (
        <table className={cn("w-full text-center border-collapse", className)} {...props}>
            {children}
        </table>
    );
};

/**
 * THead
 * 
 * Komponen pembungkus baris header tabel.
 * 
 * @param {ReactNode} children - Konten di dalam header tabel
 * @param {THeadProps} props - Properti komponen
 * @returns {JSX.Element} Komponen THead
 */
export const THead = ({ children, className, ...props }: THeadProps) => {
    return (
        <thead className={cn("bg-lightdark-primary border border-lightdark-tertiary text-lightdark-tertiary", className)} {...props}>
            {children}
        </thead>
    );
};

/**
 * TBody
 * 
 * Komponen pembungkus konten utama tabel.
 * 
 * @param {ReactNode} children - Konten di dalam bodi tabel
 * @param {TBodyProps} props - Properti komponen
 * @returns {JSX.Element} Komponen TBody
 */
export const TBody = ({ children, className, ...props }: TBodyProps) => {
    return (
        <tbody className={cn("divide-y divide-lightdark-tertiary", className)} {...props}>
            {children}
        </tbody>
    );
};

/**
 * TR
 * 
 * Komponen baris tabel.
 * 
 * @param {ReactNode} children - Konten di dalam baris tabel
 * @param {TRProps} props - Properti komponen
 * @returns {JSX.Element} Komponen TR
 */
export const TR = ({ children, className, ...props }: TRProps) => {
    return (
        <tr className={cn("hover:bg-lightdark-primary border-b border-lightdark-tertiary transition-colors group", className)} {...props}>
            {children}
        </tr>
    );
};

/**
 * TH
 * 
 * Komponen sel header tabel.
 * 
 * @param {ReactNode} children - Konten di dalam sel header tabel
 * @param {THProps} props - Properti komponen
 * @returns {JSX.Element} Komponen TH
 */
export const TH = ({ children, className, ...props }: THProps) => {
    return (
        <th 
            className={cn(
                "px-8 py-5 text-xs font-bold text-lightdark-tertiary uppercase tracking-widest", 
                className
            )} 
            {...props}
        >
            {children}
        </th>
    );
};

/**
 * TD
 * 
 * Komponen sel data tabel.
 * 
 * @param {ReactNode} children - Konten di dalam sel data tabel
 * @param {TDProps} props - Properti komponen
 * @returns {JSX.Element} Komponen TD
 */
export const TD = ({ children, className, ...props }: TDProps) => {
    return (
        <td className={cn("px-8 py-5 text-sm text-lightdark-tertiary", className)} {...props}>
            {children}
        </td>
    );
};