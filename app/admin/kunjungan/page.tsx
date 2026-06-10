"use client";

import { AdminKunjunganTemplate } from "@/app/ui/templates/admin-kunjungan";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildKunjunganStats } from "@/app/lib/utils/dashboard-stats";

export default function BookingPage() {
  const bookings = useYamutiStore((s) => s.bookings);
  const deleteBooking = useYamutiStore((s) => s.deleteBooking);

  // API: GET /kunjungan — route belum tersedia; stats dihitung dari data store lokal
  const stats = buildKunjunganStats(bookings);

  return (
    <AdminKunjunganTemplate
      stats={stats}
      bookings={bookings}
      onDeleteBooking={deleteBooking}
    />
  );
}
