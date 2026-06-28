"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminBookingFormTemplate, BookingFormInput } from "@/app/ui/templates/admin-booking-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";
import { useState } from "react";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";

const schema = z.object({
  visitor: z.string().min(2, "Nama pengunjung wajib diisi"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Waktu wajib diisi"),
  type: z.string().min(1, "Tipe kunjungan wajib diisi"),
  status: z.enum(["Menunggu", "Dikonfirmasi", "Selesai", "Dibatalkan"]),
});

export default function EditKunjunganPage() {
  const params = useParams();
  const id = Number(params.id);
  const router = useRouter();
  const booking = useYamutiStore((s) => s.getBookingById(id));
  const updateBooking = useYamutiStore((s) => s.updateBooking);
  const deleteBooking = useYamutiStore((s) => s.deleteBooking);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<BookingFormInput>({
    resolver: zodResolver(schema),
    values: booking
      ? { visitor: booking.visitor, phone: booking.phone || "", date: booking.date, time: booking.time, type: booking.type, status: booking.status }
      : undefined,
  });

  if (!booking) {
    return <p className="p-10 text-center text-gray-500">Booking tidak ditemukan.</p>;
  }

  const onSubmit = (data: BookingFormInput) => {
    updateBooking(id, data);
    router.push(routes.admin.kunjungan.root());
  };

  const onDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmOpen(false);
    deleteBooking(id);
    router.push(routes.admin.kunjungan.root());
  };

  return (
    <>
      <AdminBookingFormTemplate
        title={booking.visitor}
        isEdit
        form={form}
        onSubmit={onSubmit}
        onDelete={onDelete}
        backUrl={routes.admin.kunjungan.root()}
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Konfirmasi Hapus"
        message="Apakah Anda yakin ingin menghapus jadwal kunjungan ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
