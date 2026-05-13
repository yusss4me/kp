import React from 'react';
import { Txt } from '../atoms/text';
import { Badge } from '../molecules/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MOCK_BOOKINGS = [
  { id: 1, visitor: 'Bpk. Ahmad Fauzi', date: '28 Apr 2026', time: '10:00', type: 'Personal', status: 'Dikonfirmasi' },
  { id: 2, visitor: 'Komunitas Berbagi', date: '30 Apr 2026', time: '14:00', type: 'Grup', status: 'Menunggu' },
  { id: 3, visitor: 'Ibu Ratnasari', date: '02 Mei 2026', time: '09:00', type: 'Personal', status: 'Dikonfirmasi' },
];

export const BookingList = () => {
  return (
    <div className="space-y-6">
      <Txt variant="h4" weight="bold" className="px-2">Daftar Kunjungan Terdekat</Txt>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_BOOKINGS.map((booking) => (
          <div key={booking.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 hover:shadow-lg transition-all duration-300">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <Txt weight="bold" className="text-lg text-gray-900">{booking.visitor}</Txt>
                   <Badge variant="soft" color="primary">{booking.type}</Badge>
                </div>
                <Badge variant="solid" color={booking.status === 'Dikonfirmasi' ? 'success' : 'warning'}>
                   {booking.status}
                </Badge>
             </div>

             <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-500">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Calendar size={16} className="text-red-primary" />
                   </div>
                   <Txt variant="small" weight="medium">{booking.date}</Txt>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Clock size={16} className="text-red-primary" />
                   </div>
                   <Txt variant="small" weight="medium">{booking.time} WIB</Txt>
                </div>
             </div>

             <div className="pt-2">
                <button className="w-full py-3 bg-gray-50 hover:bg-red-primary/5 text-gray-400 hover:text-red-primary text-xs font-bold rounded-2xl transition-all">
                   Detail Kunjungan
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
