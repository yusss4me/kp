'use client';

import React, { useState } from 'react';
import { FormActionTemplate, FormFieldConfig } from '@/app/ui/templates/form-action';
import { Btn } from '@/app/ui/atoms/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useYamutiStore } from '@/app/lib/stores/yamuti-store';
import { formatRupiah } from '@/app/lib/utils/crud-helpers';

export default function DonasiAnakForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const anakId = searchParams.get('anakId');
    const getOrphanById = useYamutiStore((s) => s.getOrphanById);
    const addPendingDonation = useYamutiStore((s) => s.addPendingDonation);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const orphan = anakId ? getOrphanById(Number(anakId)) : undefined;
    const anakLabel = orphan ? orphan.name : 'Anak Asuh';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const data = new FormData(form);
        const nominal = Number(data.get('nominal'));
        const metode = String(data.get('metode_pembayaran'));

        try {
            await addPendingDonation({
                nama: `Donasi ${anakLabel} — ${String(data.get('nama_donatur'))}`,
                description: String(data.get('catatan') || 'Donasi anak asuh'),
                tipe: metode.replace('_', ' '),
                jumlah: formatRupiah(nominal),
                tanggal: new Date().toLocaleString('id-ID'),
            });
        } catch (e) {
            console.error(e);
        }

        setTimeout(() => {
            router.back();
        }, 500);
    };

    const formFields: FormFieldConfig[] = [
        {
            name: 'nama_donatur',
            label: 'Nama Donatur',
            type: 'text',
            placeholder: 'Masukkan nama donatur',
            required: true,
        },
        {
            name: 'nominal',
            label: 'Nominal Donasi (Rp)',
            type: 'number',
            placeholder: 'Contoh: 150000',
            min: 0,
            required: true,
        },
        {
            name: 'metode_pembayaran',
            label: 'Metode Pembayaran',
            type: 'select',
            required: true,
            options: [
                { value: 'transfer_bank', label: 'Transfer Bank' },
                { value: 'tunai', label: 'Tunai' },
                { value: 'qris', label: 'QRIS' },
            ]
        },
        {
            name: 'catatan',
            label: 'Catatan Tambahan (Opsional)',
            type: 'textarea',
            placeholder: 'Tambahkan catatan donasi jika ada...',
            rows: 3,
        }
    ];

    return (
        <FormActionTemplate
            title={`Donasi untuk ${anakLabel}`}
            description="Lengkapi data di bawah ini untuk mencatat donasi yang masuk untuk anak asuh."
            onSubmit={handleSubmit}
            fields={formFields}
            actions={
                <>
                    <Btn 
                        type="button" 
                        variant="transparent" 
                        className="flex-1 border border-gray-300" 
                        onClick={() => router.back()}
                    >
                        Batal
                    </Btn>
                    <Btn 
                        type="submit" 
                        variant="red" 
                        className="flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Donasi'}
                    </Btn>
                </>
            }
        />
    );
}
