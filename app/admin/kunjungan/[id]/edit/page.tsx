"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminBookingFormTemplate, BookingFormInput } from "@/app/ui/templates/admin-booking-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

const schema = z.object({
  visitor: z.string().min(2),
  date: z.string().min(1),
  time: z.string().min(1),
  type: z.string().min(1),
  status: z.enum(["Menunggu", "Dikonfirmasi", "Selesai", "Dibatalkan"]),
});

export default function EditKunjunganPage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const booking = useYamutiStore((s) => s.getBookingById(id));
  const updateBooking = useYamutiStore((s) => s.updateBooking);
  const deleteBooking = useYamutiStore((s) => s.deleteBooking);

  const form = useForm<BookingFormInput>({
    resolver: zodResolver(schema),
    values: booking
      ? { visitor: booking.visitor, date: booking.date, time: booking.time, type: booking.type, status: booking.status }
      : undefined,
  });

  if (!booking) {
    return <p className="p-10 text-center text-gray-500">Booking tidak ditemukan.</p>;
  }

  const onSubmit = (data: BookingFormInput) => {
    updateBooking(id, data);
    router.push("/admin/kunjungan");
  };

  const onDelete = () => {
    if (confirm("Hapus jadwal kunjungan ini?")) {
      deleteBooking(id);
      router.push("/admin/kunjungan");
    }
  };

  return (
    <AdminBookingFormTemplate
      title={booking.visitor}
      isEdit
      form={form}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
}
