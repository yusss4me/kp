'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { ArrowLeft, Package, MapPin, Truck, Info } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { Input } from '../atoms/input';

export interface DetailBarangProps {
    id?: string;
}

const barangSchema = z.object({
    jenisBarang: z.string().min(3, 'Jenis barang minimal 3 karakter'),
    estimasi: z.string().min(1, 'Estimasi harus diisi'),
    alamat: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
    catatan: z.string().optional(),
});

type BarangFormValues = z.infer<typeof barangSchema>;

const mockBarangData: Record<string, {
    image: string;
    title: string;
    description: string;
    kebutuhan: string[];
}> = {
    default: {
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop',
        title: 'Donasi Barang Layak Pakai',
        description: 'Bantu kami mengumpulkan barang layak pakai untuk disalurkan kepada anak-anak asuh dan keluarga dhuafa binaan YAMUTI. Setiap barang yang Anda sumbangkan akan memberi manfaat nyata bagi mereka yang membutuhkan.',
        kebutuhan: ['Pakaian layak pakai (segala usia)', 'Perlengkapan sekolah & buku', 'Sembako & kebutuhan pokok', 'Mainan edukatif anak', 'Peralatan rumah tangga'],
    },
};

export const DetailBarang = ({ id }: DetailBarangProps) => {
    const router = useRouter();
    const data = (id && mockBarangData[id]) ? mockBarangData[id] : mockBarangData['default'];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BarangFormValues>({ resolver: zodResolver(barangSchema) });

    const onSubmit = async (formData: BarangFormValues) => {
        console.log('Barang form:', formData);
        await new Promise(r => setTimeout(r, 1000));
        alert('Pengajuan donasi barang berhasil dikirim! (Simulasi)');
    };

    return (
        <Container className="flex flex-col min-h-screen bg-gray-50 pb-24">
            {/* Hero */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <Image src={data.image} alt={data.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <div className="absolute bottom-8 left-0 right-0 px-6 space-y-2">
                    <div className="flex items-center gap-2 text-white">
                        <Package size={20} />
                        <Txt variant="caption" color="light" className="opacity-80 font-bold uppercase tracking-widest text-xs">
                            Donasi Barang
                        </Txt>
                    </div>
                    <Txt variant="h3" color="light" weight="bold" className="leading-tight">{data.title}</Txt>
                </div>
            </div>

            {/* Content */}
            <div className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-8 pb-10 flex-grow shadow-2xl space-y-6">
                {/* Description */}
                <div className="space-y-2">
                    <Txt color="grey" variant="h6" weight="bold">Tentang Program</Txt>
                    <Txt className="text-gray-400 text-sm leading-relaxed">{data.description}</Txt>
                </div>

                {/* Kebutuhan */}
                <div className="p-4 bg-red-50 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                        <Info size={18} className="text-red-500" />
                        <Txt variant="body" weight="bold" className="text-red-600">Barang yang Dibutuhkan</Txt>
                    </div>
                    <ul className="space-y-1.5">
                        {data.kebutuhan.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-red-500/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <Txt variant="h6" weight="bold" className="text-gray-800">Ajukan Penjemputan</Txt>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Jenis Barang"
                            placeholder="Contoh: Pakaian, Buku, Sembako"
                            {...register('jenisBarang')}
                            error={errors.jenisBarang?.message}
                        />
                        <Input
                            label="Estimasi Berat / Jumlah"
                            placeholder="Contoh: 5 kg / 2 Dus"
                            {...register('estimasi')}
                            error={errors.estimasi?.message}
                        />
                        <Input
                            label="Alamat Penjemputan"
                            placeholder="Masukkan alamat lengkap"
                            {...register('alamat')}
                            error={errors.alamat?.message}
                        />
                        <Input
                            label="Catatan Tambahan (Opsional)"
                            placeholder="Contoh: Hubungi sebelum datang"
                            {...register('catatan')}
                        />
                        <Btn
                            type="submit"
                            variant="red"
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full py-4 rounded-2xl shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 font-bold"
                        >
                            <Truck size={20} />
                            Ajukan Penjemputan
                        </Btn>
                    </form>
                </div>

                {/* Info */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <Txt variant="caption" className="text-gray-500">
                            Tim kami akan menghubungi Anda dalam 1×24 jam untuk konfirmasi jadwal penjemputan.
                        </Txt>
                    </div>
                </div>
            </div>
        </Container>
    );
};