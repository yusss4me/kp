"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminBookingFormTemplate, BookingFormInput } from "@/app/ui/templates/admin-booking-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  visitor: z.string().min(2),
  date: z.string().min(1),
  time: z.string().min(1),
  type: z.string().min(1),
  status: z.enum(["Menunggu", "Dikonfirmasi", "Selesai", "Dibatalkan"]),
});

export default function TambahKunjunganPage() {
  const router = useRouter();
  const addBooking = useYamutiStore((s) => s.addBooking);
  const form = useForm<BookingFormInput>({
    resolver: zodResolver(schema),
    defaultValues: { status: "Menunggu", type: "Personal" },
  });

  const onSubmit = async (data: BookingFormInput) => {
    try {
      await addBooking(data);
      router.push(routes.admin.kunjungan.root());
    } catch (error) {
      console.error(error);
      router.push(routes.admin.kunjungan.root());
    }
  };

  return (
    <AdminBookingFormTemplate
      title="Booking baru"
      form={form}
      onSubmit={onSubmit}
      backUrl={routes.admin.kunjungan.root()}
    />
  );
}
