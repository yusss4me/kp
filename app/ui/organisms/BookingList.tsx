import React from "react";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Calendar, Clock } from "lucide-react";
import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";
import { VisitingCard } from "../molecules/visitingCard";

const MOCK_BOOKINGS = [
  {
    id: 1,
    visitor: "Bpk. Ahmad Fauzi",
    date: "28 Apr 2026",
    time: "10:00",
    type: "Personal",
    status: "Dikonfirmasi",
  },
  {
    id: 2,
    visitor: "Komunitas Berbagi",
    date: "30 Apr 2026",
    time: "14:00",
    type: "Grup",
    status: "Menunggu",
  },
  {
    id: 3,
    visitor: "Ibu Ratnasari",
    date: "02 Mei 2026",
    time: "09:00",
    type: "Personal",
    status: "Dikonfirmasi",
  },
];

export interface BookingListProps {
  className?: string;
}

/**
 * BookingList
 * 
 * Komponen untuk menampilkan daftar rencana kunjungan (booking) terdekat.
 * Menampilkan kartu kunjungan yang berisi nama pengunjung, tanggal, 
 * waktu, tipe kunjungan, dan status konfirmasi.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {BookingListProps} props - Properti komponen
 * @returns {JSX.Element} Komponen BookingList
 */
export const BookingList = ({}: BookingListProps) => {
  return (
    <Container className="space-y-6 flex flex-col">
      <Txt variant="h4" weight="bold" className="px-2">
        Daftar Kunjungan
      </Txt>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_BOOKINGS.map((booking) => (
          <VisitingCard
            key={booking.id}
            id={booking.id}
            visitor={booking.visitor}
            date={booking.date}
            time={booking.time}
            type={booking.type}
            status={booking.status}
            className="w-full"
          />
        ))}
      </Container>
    </Container>
  );
};
