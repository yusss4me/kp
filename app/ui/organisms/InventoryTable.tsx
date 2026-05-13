import React from 'react';
import { Txt } from '../atoms/text';
import { Badge } from '../molecules/badge';

const MOCK_INVENTORY = [
  { id: 1, name: 'Beras Medium', category: 'Logistik Pangan', stock: '250 Kg', status: 'Cukup' },
  { id: 2, name: 'Minyak Goreng', category: 'Logistik Pangan', stock: '12 Liter', status: 'Menipis' },
  { id: 3, name: 'Seragam Sekolah SMA', category: 'Pakaian', stock: '15 Stel', status: 'Cukup' },
  { id: 4, name: 'Buku Tulis A5', category: 'Alat Tulis', stock: '5 Pack', status: 'Menipis' },
  { id: 5, name: 'Susu Formula', category: 'Kebutuhan Bayi', stock: '20 Kaleng', status: 'Cukup' },
];

export const InventoryTable = () => {
  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <Txt variant="h4" weight="bold" className="text-gray-900">Daftar Stok Barang</Txt>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Nama Barang</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Kategori</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Jumlah Stok</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_INVENTORY.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-5 font-bold text-gray-900">{item.name}</td>
                <td className="px-8 py-5 text-gray-500 font-medium">{item.category}</td>
                <td className="px-8 py-5 font-black text-gray-900">{item.stock}</td>
                <td className="px-8 py-5">
                   <Badge variant="soft" color={item.status === 'Menipis' ? 'danger' : 'success'}>
                      {item.status}
                   </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
