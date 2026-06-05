"use client";

import { AdminKunjunganTemplate } from "@/app/ui/templates/admin-kunjungan";
import { MOCK_ADMIN_KUNJUNGAN_STATS } from "@/app/constants/mockData";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function BookingPage() {
  const bookings = useYamutiStore((s) => s.bookings);
  const deleteBooking = useYamutiStore((s) => s.deleteBooking);

  return (
    <AdminKunjunganTemplate
      stats={MOCK_ADMIN_KUNJUNGAN_STATS}
      bookings={bookings}
      onDeleteBooking={deleteBooking}
    />
  );
}
