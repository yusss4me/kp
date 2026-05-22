import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface BackdropProps {
    children: ReactNode;
}

/**
 * Backdrop
 * 
 * Komponen untuk overlay modal atau drawer.
 * Menampilkan lapisan transparan di atas seluruh layar untuk memfokuskan perhatian.
 * 
 * @param {ReactNode} children - Konten yang akan ditampilkan di tengah backdrop
 * @param {BackdropProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Backdrop
 */
export const Backdrop = ({ children }: BackdropProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
        </div>
    )
}