"use client";

import { useEffect } from "react";
import { AdminKunjunganTemplate } from "@/app/ui/templates/admin-kunjungan";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildKunjunganStats } from "@/app/lib/utils/dashboard-stats";
import { routes } from "@/app/lib/constants/routes";

export default function BookingPage() {
  const bookings = useYamutiStore((s) => s.bookings);
  const deleteBooking = useYamutiStore((s) => s.deleteBooking);
  const fetchBookings = useYamutiStore((s) => s.fetchBookings);

  // API: GET /kunjungan
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const stats = buildKunjunganStats(bookings);

  return (
    <AdminKunjunganTemplate
      stats={stats}
      bookings={bookings}
      onDeleteBooking={deleteBooking}
      addUrl={routes.admin.kunjungan.add()}
      editUrl={(id) => routes.admin.kunjungan.detail(id)}
    />
  );
}
