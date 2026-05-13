import React from 'react';
import { Txt } from '../atoms/text';
import { Badge } from '../molecules/badge';
import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';

const MOCK_TRANSACTIONS = [
  { id: 1, type: 'Income', category: 'Donasi Umum', amount: 'Rp 2.500.000', date: '25 Apr 2026', status: 'Selesai' },
  { id: 2, type: 'Expense', category: 'Listrik & Air', amount: 'Rp 850.000', date: '24 Apr 2026', status: 'Selesai' },
  { id: 3, type: 'Income', category: 'Donasi Pendidikan', amount: 'Rp 5.000.000', date: '22 Apr 2026', status: 'Selesai' },
  { id: 4, type: 'Expense', category: 'Sembako Bulanan', amount: 'Rp 3.200.000', date: '20 Apr 2026', status: 'Selesai' },
  { id: 5, type: 'Income', category: 'Zakat Mal', amount: 'Rp 10.000.000', date: '18 Apr 2026', status: 'Selesai' },
];

export const TransactionTable = () => {
  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <Txt variant="h4" weight="bold" className="text-gray-900">Riwayat Transaksi</Txt>
        <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
           <MoreVertical size={20} className="text-gray-400" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaksi</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Kategori</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Jumlah</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Tanggal</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${tx.type === 'Income' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                         {tx.type === 'Income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      </div>
                      <Txt weight="bold" className="text-gray-900">{tx.type === 'Income' ? 'Pemasukan' : 'Pengeluaran'}</Txt>
                   </div>
                </td>
                <td className="px-8 py-5 text-gray-500 font-medium">{tx.category}</td>
                <td className={`px-8 py-5 font-black ${tx.type === 'Income' ? 'text-success' : 'text-danger'}`}>
                   {tx.type === 'Income' ? '+' : '-'} {tx.amount}
                </td>
                <td className="px-8 py-5 text-gray-400 text-sm font-medium">{tx.date}</td>
                <td className="px-8 py-5">
                   <Badge variant="soft" color="success">
                      {tx.status}
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
