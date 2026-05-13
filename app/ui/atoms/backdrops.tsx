import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface BackdropProps {
    children: ReactNode;
    
}

/**
 * Komponen Backdrop untuk overlay modal atau drawer.
 * Menampilkan lapisan transparan di atas seluruh layar.
 * 
 * @param {ReactNode} children - Konten yang akan ditampilkan di tengah backdrop
 * @returns {JSX.Element} Komponen Backdrop
 */
export const Backdrop = ({ children }: BackdropProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
        </div>
    )
}