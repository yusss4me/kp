'use client';

import React, { useState } from 'react';
import { Send, MessageSquareText, Copy } from 'lucide-react';
import { RecipientSelector } from '../molecules/RecipientSelector';
import { Container } from '../atoms/container';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Textarea } from '../atoms/textarea';

export interface BroadcastEditorProps {
  className?: string;
}

/**
 * BroadcastEditor
 * 
 * Komponen editor untuk membuat dan mengirim pesan siaran (broadcast).
 * Mendukung pemilihan grup penerima, penggunaan template pesan, 
 * perhitungan jumlah karakter, dan integrasi pengiriman via WhatsApp.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {BroadcastEditorProps} props - Properti komponen
 * @returns {JSX.Element} Komponen BroadcastEditor
 */
export const BroadcastEditor: React.FC<BroadcastEditorProps> = () => {
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <Container className="w-full space-y-6 flex flex-col">
      <Txt variant="h2" weight="bold" className="text-2xl font-black text-gray-900">
        Broadcast Pesan
      </Txt>

      {/* Responsive two-column layout on md+ */}
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left column: Recipient + Message Editor */}
        <Container className="space-y-4 flex flex-col">
          {/* Target Penerima */}
          <RecipientSelector selectedGroup="Donatur Tetap" count={124} />

          {/* Editor Pesan */}
          <Container className="space-y-2 flex flex-col">
            <Txt variant="caption" color="grey" weight="bold" className="uppercase ml-1">
              Isi Pesan
            </Txt>
            <Container className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan untuk para donatur..."
                className="w-full h-48 sm:h-56 md:h-64 p-4 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-red-primary focus:ring-0 transition-all resize-none text-sm leading-relaxed"
              />
              <Container className="absolute bottom-4 right-4 flex gap-2">
                <Btn
                  variant="transparent"
                  textColor="dark"
                  onClick={() => navigator.clipboard.writeText(message)}
                  className="p-2 bg-white shadow-sm border rounded-full text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Copy size={18} />
                </Btn>
              </Container>
            </Container>
          </Container>
        </Container>

        {/* Right column: Templates + Action */}
        <Container className="space-y-4 flex flex-col">
          {/* Template Cepat */}
          <Container className="space-y-3 flex flex-col">
            <Txt variant="caption" weight="bold" className="text-gray-400 uppercase ml-1">
              Gunakan Template
            </Txt>
            <Container className="flex flex-wrap gap-2">
              {['Laporan Bulanan', 'Ucapan Terima Kasih', 'Undangan Doa'].map((t) => (
                <Btn
                  key={t}
                  variant="transparent"
                  textColor="dark"
                  borderColor="light"
                  border="border"
                  shape="circle"
                  onClick={() =>
                    setMessage(
                      `Assalamu'alaikum Warahmatullah, Kami dari YAMUTI ingin menginformasikan ${t.toLowerCase()}...`
                    )
                  }
                  className="px-4 py-2 bg-white hover:border-green-500 hover:text-green-600 transition-colors text-xs font-bold text-gray-600"
                >
                  {t}
                </Btn>
              ))}
            </Container>
          </Container>

          {/* Character counter */}
          <Txt variant="caption" className="text-gray-400 ml-1">
            {message.length} karakter
          </Txt>

          {/* Action Button */}
          <Btn
            variant="transparent"
            size="lg"
            shape="rounded"
            onClick={handleSendWhatsApp}
            disabled={!message.trim()}
            className="w-full bg-red-primary hover:bg-red-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-3xl flex items-center justify-center gap-3 shadow-lg shadow-red-primary/50 transition-all active:scale-95 border-none"
          >
            <MessageSquareText size={20} />
            Kirim ke WhatsApp
          </Btn>
        </Container>
      </Container>
    </Container>
  );
};