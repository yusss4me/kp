'use client';

import React, { useState } from 'react';
import { FormActionTemplate, FormFieldConfig } from '@/app/ui/templates/form-action';
import { Btn } from '@/app/ui/atoms/button';
import { useRouter } from 'next/navigation';

export default function DonasiAnakForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulasi request API (menyimpan data donasi)
        setTimeout(() => {
            alert('Data donasi berhasil disimpan!');
            setIsSubmitting(false);
            router.back();
        }, 1500);
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
            title="Formulir Donasi Anak"
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
