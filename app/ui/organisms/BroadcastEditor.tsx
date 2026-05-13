'use client';

import React, { useState } from 'react';
import { Send, MessageSquareText, Copy } from 'lucide-react';
import { RecipientSelector } from '../molecules/RecipientSelector';

export const BroadcastEditor: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-black text-gray-900">Broadcast Pesan</h2>

      {/* Responsive two-column layout on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left column: Recipient + Message Editor */}
        <div className="space-y-4">
          {/* Target Penerima */}
          <RecipientSelector selectedGroup="Donatur Tetap" count={124} />

          {/* Editor Pesan */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Isi Pesan
            </label>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan untuk para donatur..."
                className="w-full h-48 sm:h-56 md:h-64 p-4 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-green-500 focus:ring-0 transition-all resize-none text-sm leading-relaxed"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(message)}
                  className="p-2 bg-white shadow-sm border rounded-full text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Templates + Action */}
        <div className="space-y-4">
          {/* Template Cepat */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase ml-1">
              Gunakan Template
            </p>
            <div className="flex flex-wrap gap-2">
              {['Laporan Bulanan', 'Ucapan Terima Kasih', 'Undangan Doa'].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setMessage(
                      `Assalamu'alaikum Warahmatullah, Kami dari YAMUTI ingin menginformasikan ${t.toLowerCase()}...`
                    )
                  }
                  className="px-4 py-2 bg-white border rounded-full text-xs font-bold text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Character counter */}
          <p className="text-xs text-gray-400 ml-1">
            {message.length} karakter
          </p>

          {/* Action Button */}
          <button
            onClick={handleSendWhatsApp}
            disabled={!message.trim()}
            className="w-full bg-[#25D366] hover:bg-[#1ebd59] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-3xl flex items-center justify-center gap-3 shadow-lg shadow-green-100 transition-all active:scale-95"
          >
            <MessageSquareText size={20} />
            Kirim ke WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};