import { DonationList } from "../organisms/donationList";

export interface AktivitasTemplateProps {
  className?: string;
}

/**
 * AktivitasTemplate
 * 
 * Template untuk halaman aktivitas donasi dan layanan yayasan.
 * Mengintegrasikan DonationList untuk mengelola berbagai tipe 
 * kontribusi donatur.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {AktivitasTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen AktivitasTemplate
 */
export const AktivitasTemplate = ({}: AktivitasTemplateProps) => {
  return (

    <DonationList />

  )
}