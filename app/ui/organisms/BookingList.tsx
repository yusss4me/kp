import Link from "next/link";
import React from "react";
import { Txt } from "../atoms/text";
import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";
import { VisitingCard } from "../molecules/visitingCard";
import { Pencil, Trash2 } from "lucide-react";
import type { VisitBooking } from "@/app/lib/types/entities";

export interface BookingListProps {
  bookings: VisitBooking[];
  onDelete?: (id: number) => void;
  className?: string;
}

export const BookingList = ({ bookings, onDelete }: BookingListProps) => {
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
              <Link href={`/admin/kunjungan/${booking.id}/edit`} className="flex-1">
                <Btn variant="light" size="sm" shape="rounded" className="w-full gap-1 text-xs font-bold">
                  <Pencil size={14} /> Edit
                </Btn>
              </Link>
              {onDelete && (
                <Btn
                  type="button"
                  variant="light"
                  size="sm"
                  shape="rounded"
                  className="flex-1 text-red-primary bg-red-50 text-xs font-bold gap-1"
                  onClick={() => {
                    if (confirm(`Batalkan kunjungan ${booking.visitor}?`)) onDelete(booking.id);
                  }}
                >
                  <Trash2 size={14} /> Hapus
                </Btn>
              )}
            </div>
          </div>
        ))}
      </Container>
    </Container>
  );
};
