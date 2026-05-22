import { KunjunganClientTemplate } from "@/app/ui/templates/kunjungan-client";

/**
 * Halaman Kunjungan (Client Role)
 * 
 * Digunakan oleh donatur/klien untuk menjadwalkan kunjungan ke institusi.
 * Dibungkus oleh layout /app/home/layout.tsx yang menyediakan Navbar.
 */
export default function KunjunganPage() {
  return <KunjunganClientTemplate />;
}
