import Link from "next/link";
import React from "react";
import { Txt } from "../atoms/text";
import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";
import { VisitingCard } from "../molecules/visitingCard";
import { Pencil, Trash2 } from "lucide-react";
import type { VisitBooking } from "@/app/lib/types/entities";
import { useState } from "react";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";

export interface BookingListProps {
  bookings: VisitBooking[];
  onDelete?: (id: number | string) => void;
  className?: string;
  editUrl?: (id: number | string) => string;
}

export const BookingList = ({ bookings, onDelete, editUrl }: BookingListProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{id: number | string, name: string} | null>(null);

  const handleDeleteClick = (id: number | string, name: string) => {
    setPendingDelete({ id, name });
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDelete && onDelete) {
      setIsConfirmOpen(false);
      onDelete(pendingDelete.id);
    }
  };

  return (
    <Container className="space-y-6 flex flex-col">
      <Txt variant="h4" weight="bold" className="px-2">
        Daftar Kunjungan
      </Txt>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="space-y-3">
            <VisitingCard
              id={booking.id}
              visitor={booking.visitor}
              date={booking.date}
              time={booking.time}
              type={booking.type}
              status={booking.status}
            />
            <div className="flex gap-2 px-2">
              {editUrl && (
                <Link href={editUrl(booking.id)} className="flex-1">
                  <Btn variant="light" size="sm" shape="rounded" className="w-full gap-1 text-xs font-bold">
                    <Pencil size={14} /> Proses
                  </Btn>
                </Link>
              )}
              {onDelete && (
                <Btn
                  type="button"
                  variant="light"
                  size="sm"
                  shape="rounded"
                  className="flex-1 text-red-primary bg-red-50 text-xs font-bold gap-1"
                  onClick={() => handleDeleteClick(booking.id, booking.visitor)}
                >
                  <Trash2 size={14} /> Hapus
                </Btn>
              )}
            </div>
          </div>
        ))}
      </Container>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Konfirmasi Batal/Hapus"
        message={`Apakah Anda yakin ingin membatalkan dan menghapus data kunjungan ${pendingDelete?.name}? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </Container>
  );
};
