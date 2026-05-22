import { UpdateList } from "../organisms/UpdateList";

export interface BroadcastTemplateProps {
  className?: string;
}

/**
 * BroadcastTemplate
 * 
 * Template untuk halaman siaran (broadcast).
 * Saat ini mengintegrasikan UpdateList untuk menampilkan 
 * daftar riwayat siaran atau kabar terbaru.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {BroadcastTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen BroadcastTemplate
 */
export const BroadcastTemplate = ({}: BroadcastTemplateProps) => {
  return (
    <UpdateList />
  )
}