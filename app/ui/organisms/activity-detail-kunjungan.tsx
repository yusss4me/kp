'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Info, CheckCircle } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { Input } from '../atoms/input';

export interface DetailKunjunganProps {
    id?: string;
}

const kunjunganSchema = z.object({
    fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
    institution: z.string().optional(),
    purpose: z.string().min(5, 'Keperluan minimal 5 karakter'),
    visitDate: z.string().min(1, 'Tanggal harus dipilih'),
    visitTime: z.string().min(1, 'Waktu harus dipilih'),
    participantCount: z.number({ message: 'Jumlah peserta harus angka' }).min(1, 'Minimal 1 peserta'),
});

type KunjunganFormValues = z.infer<typeof kunjunganSchema>;

const mockKunjunganData: Record<string, {
    image: string;
    title: string;
    address: string;
    description: string;
    jamOperasional: string;
    ketentuanList: string[];
}> = {
    default: {
        image: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?q=80&w=2070&auto=format&fit=crop',
        title: 'Kunjungan ke Yayasan YAMUTI',
        address: 'Jl. Raya Yamuti No. 12, Jakarta Selatan',
        description: 'Kami mengundang para donatur, relawan, dan masyarakat umum untuk berkunjung langsung ke yayasan kami. Kunjungan ini bertujuan untuk mempererat silaturahmi dan memberikan gambaran nyata tentang program-program yang sedang berjalan.',
        jamOperasional: 'Senin – Jumat, 08.00 – 16.00 WIB',
        ketentuanList: [
            'Daftarkan kunjungan minimal 2 hari sebelumnya',
            'Bawa kartu identitas yang berlaku (KTP/SIM)',
            'Konfirmasi akan dikirim via WhatsApp/Email',
            'Kunjungan grup maksimal 30 orang',
            'Dress code: berpakaian sopan dan rapi',
        ],
    },
};

export const DetailKunjungan = ({ id }: DetailKunjunganProps) => {
    const router = useRouter();
    const data = (id && mockKunjunganData[id]) ? mockKunjunganData[id] : mockKunjunganData['default'];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<KunjunganFormValues>({ resolver: zodResolver(kunjunganSchema) });

    const onSubmit = async (formData: KunjunganFormValues) => {
        console.log('Kunjungan form:', formData);
        await new Promise(r => setTimeout(r, 1000));
        alert('Pengajuan kunjungan berhasil dikirim! (Simulasi)');
    };

    return (
        <Container className="flex flex-col min-h-screen bg-gray-50 pb-24">
            {/* Hero */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <Image src={data.image} alt={data.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute top-6 left-0 right-0 px-6">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <div className="absolute bottom-8 left-0 right-0 px-6 space-y-2">
                    <div className="flex items-center gap-2 text-white/80">
                        <Calendar size={16} />
                        <Txt variant="caption" color="light" className="opacity-80 uppercase tracking-widest text-xs font-bold">
                            Kunjungan Silaturahmi
                        </Txt>
                    </div>
                    <Txt variant="h3" color="light" weight="bold" className="leading-tight">{data.title}</Txt>
                    <div className="flex items-center gap-2 text-white/70">
                        <MapPin size={14} />
                        <Txt variant="caption" color="light" className="opacity-70">{data.address}</Txt>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-8 pb-10 flex-grow shadow-2xl space-y-6">
                {/* Jam Operasional */}
                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl">
                    <div className="p-2 bg-red-100 rounded-xl">
                        <Clock size={20} className="text-red-500" />
                    </div>
                    <div>
                        <Txt variant="caption" className="text-gray-500">Jam Operasional</Txt>
                        <Txt variant="body" weight="bold" className="text-red-600">{data.jamOperasional}</Txt>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Txt color="grey" variant="h6" weight="bold">Tentang Kunjungan</Txt>
                    <Txt className="text-gray-400 text-sm leading-relaxed">{data.description}</Txt>
                </div>

                {/* Ketentuan */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Info size={18} className="text-gray-500" />
                        <Txt variant="body" weight="bold" className="text-gray-700">Ketentuan Kunjungan</Txt>
                    </div>
                    <ul className="space-y-2">
                        {data.ketentuanList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-500">
                                <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form */}
                <div className="space-y-4 pt-2">
                    <Txt variant="h6" weight="bold" className="text-gray-800">Formulir Pengajuan</Txt>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Nama Lengkap"
                            placeholder="Masukkan nama lengkap Anda"
                            {...register('fullName')}
                            error={errors.fullName?.message}
                        />
                        <Input
                            label="Instansi / Perusahaan (Opsional)"
                            placeholder="Nama instansi, kosongkan jika pribadi"
                            {...register('institution')}
                            error={errors.institution?.message}
                        />
                        <Input
                            label="Keperluan Kunjungan"
                            placeholder="Contoh: Penyerahan donasi, silaturahmi"
                            {...register('purpose')}
                            error={errors.purpose?.message}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Tanggal Kunjungan"
                                type="date"
                                {...register('visitDate')}
                                error={errors.visitDate?.message}
                            />
                            <Input
                                label="Waktu"
                                type="time"
                                {...register('visitTime')}
                                error={errors.visitTime?.message}
                            />
                        </div>
                        <Input
                            label="Jumlah Peserta"
                            type="number"
                            placeholder="Contoh: 5"
                            {...register('participantCount', { valueAsNumber: true })}
                            error={errors.participantCount?.message}
                        />

                        <Btn
                            type="submit"
                            variant="red"
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full py-4 rounded-2xl shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 font-bold"
                        >
                            <Users size={20} />
                            Kirim Pengajuan Kunjungan
                        </Btn>
                    </form>
                </div>

                {/* Info konfirmasi */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Txt variant="caption" className="text-gray-500 text-center block">
                        Pengajuan Anda akan diproses dalam waktu maksimal 1×24 jam. Kami akan menghubungi Anda melalui nomor terdaftar.
                    </Txt>
                </div>
            </div>
        </Container>
    );
};