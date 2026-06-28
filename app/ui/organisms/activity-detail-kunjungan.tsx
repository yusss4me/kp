'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Info, CheckCircle, User, Phone, FileText, Users } from 'lucide-react';
import { Txt } from '../atoms/text';
import { Btn } from '../atoms/button';
import { Container } from '../atoms/container';
import { getKunjunganById, KunjunganRecord, updateKunjunganStatus } from '@/app/lib/api/services/kunjungan';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export interface DetailKunjunganData {
    image: string;
    title: string;
    address: string;
    jamOperasional: string;
    description: string;
    ketentuanList: string[];
}

export interface DetailKunjunganProps {
    id?: string;
    url: string;
    data?: DetailKunjunganData;
    isAdmin?: boolean;
}

export const DetailKunjungan = ({ id, url, data, isAdmin }: DetailKunjunganProps) => {
    const router = useRouter();
    const [record, setRecord] = useState<KunjunganRecord | null>(null);
    const [loading, setLoading] = useState(!!id);
    const [isUpdating, setIsUpdating] = useState(false);

    const defaultData: DetailKunjunganData = data ?? {
        image: '/images/hero.png',
        title: 'Kunjungan Silaturahmi',
        address: 'Yayasan Yamuti, Tasikmalaya',
        jamOperasional: 'Senin - Sabtu, 08:00 - 17:00',
        description: 'Silaturahmi ke Yayasan Yamuti untuk melihat langsung aktivitas anak-anak asuh.',
        ketentuanList: ['Harus membuat janji temu terlebih dahulu', 'Jumlah peserta minimal 1 orang', 'Menjaga ketertiban dan kebersihan'],
    };

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            try {
                const result = await getKunjunganById(id as string);
                setRecord(result);
            } catch (err) {
                console.error('Failed to fetch kunjungan detail', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (status: string) => {
        if (!id || !record) return;
        try {
            setIsUpdating(true);
            await updateKunjunganStatus(id as string, status as any);
            setRecord({ ...record, status });
            alert(`Status berhasil diubah menjadi ${status}`);
        } catch (err: any) {
            const errorDetail = err.response?.data;
            console.error('Failed to update status', errorDetail || err);
            alert(`Gagal mengubah status kunjungan. Pesan dari server: ${errorDetail?.message || JSON.stringify(errorDetail) || 'Error Internal'}`);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Container className="flex flex-col min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-red-primary px-6 pt-8 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <Txt variant="h5" color="light" weight="bold">Detail Kunjungan</Txt>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/80">
                        <Calendar size={16} />
                        <Txt variant="caption" color="light" className="opacity-80 uppercase tracking-widest text-xs font-bold">
                            Kunjungan Silaturahmi
                        </Txt>
                    </div>
                    <Txt variant="h3" color="light" weight="bold" className="leading-tight">{defaultData.title}</Txt>
                    <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(defaultData.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors hover:underline underline-offset-4"
                    >
                        <MapPin size={14} />
                        <Txt variant="caption" color="light" className="opacity-70">{defaultData.address}</Txt>
                    </a>
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
                        <Txt variant="body" weight="bold" className="text-red-600">{defaultData.jamOperasional}</Txt>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Txt color="grey" variant="h6" weight="bold">Tentang Kunjungan</Txt>
                    <Txt className="text-gray-400 text-sm leading-relaxed">{defaultData.description}</Txt>
                </div>

                {/* Ketentuan */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Info size={18} className="text-gray-500" />
                        <Txt variant="body" weight="bold" className="text-gray-700">Ketentuan Kunjungan</Txt>
                    </div>
                    <ul className="space-y-2">
                        {defaultData.ketentuanList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-500">
                                <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Data Pengunjung */}
                <div className="space-y-4 pt-2">
                    <Txt variant="h6" weight="bold" className="text-gray-800">Data Pengunjung</Txt>

                    {loading ? (
                        <div className="p-6 text-center">
                            <Txt className="text-gray-400">Memuat data pengunjung...</Txt>
                        </div>
                    ) : record && Object.keys(record).length > 0 ? (
                        <div className="space-y-4">
                            {/* Status Badge */}
                            <div className="flex items-center gap-2">
                                {record.status === 'APPROVED' || record.status === 'approved' || record.status === 'Disetujui' || record.status === 'Dikonfirmasi' ? (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        <CheckCircle size={16} /> Disetujui
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                        <Clock size={16} /> Menunggu Persetujuan
                                    </div>
                                )}
                            </div>

                            {/* Visitor Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-red-500">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <Txt variant="caption" className="text-gray-500">Nama Pengunjung</Txt>
                                        <Txt variant="body" weight="bold" className="text-gray-800">{record.nama_pengunjung || 'Anonim'}</Txt>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-red-500">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <Txt variant="caption" className="text-gray-500">No. Telepon</Txt>
                                        <Txt variant="body" weight="bold" className="text-gray-800">{record.nomor_telepon || '-'}</Txt>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-red-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <Txt variant="caption" className="text-gray-500">Tujuan Kunjungan</Txt>
                                        <Txt variant="body" weight="bold" className="text-gray-800">{record.tujuan_kunjungan || '-'}</Txt>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-red-500">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <Txt variant="caption" className="text-gray-500">Jadwal Kunjungan</Txt>
                                        <Txt variant="body" weight="bold" className="text-gray-800">
                                            {record.slot_waktu ? format(new Date(record.slot_waktu), 'dd MMM yyyy, HH:mm', { locale: idLocale }) + ' WIB' : '-'}
                                        </Txt>
                                    </div>
                                </div>

                                {record.jumlah_pengunjung && (
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                        <div className="p-2 bg-white rounded-xl shadow-sm text-red-500">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <Txt variant="caption" className="text-gray-500">Jumlah Peserta</Txt>
                                            <Txt variant="body" weight="bold" className="text-gray-800">{record.jumlah_pengunjung} orang</Txt>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ID Kunjungan */}
                            {id && (
                                <div className="pt-4 border-t border-gray-100">
                                    <Txt variant="caption" className="text-gray-400 text-center block">
                                        ID Kunjungan: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</span>
                                    </Txt>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 text-center bg-gray-50 rounded-2xl">
                            <Txt className="text-gray-400">Data pengunjung belum tersedia.</Txt>
                        </div>
                    )}
                </div>

                {/* Admin Actions */}
                {isAdmin && record && Object.keys(record).length > 0 && (
                    <div className="pt-8 border-t border-gray-100">
                        <Txt variant="h6" weight="bold" className="text-gray-800 mb-4">Aksi Admin</Txt>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Btn 
                                onClick={() => handleUpdateStatus('APPROVED')}
                                isLoading={isUpdating}
                                variant="red" 
                                className="flex-1 bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg shadow-green-500/20"
                            >
                                <CheckCircle size={18} className="mr-2" /> Terima Kunjungan
                            </Btn>
                            <Btn 
                                onClick={() => handleUpdateStatus('REJECTED')}
                                isLoading={isUpdating}
                                variant="light" 
                                className="flex-1 text-red-600 bg-red-50 hover:bg-red-100 active:scale-95"
                            >
                                Tolak Kunjungan
                            </Btn>
                            <Btn 
                                onClick={() => handleUpdateStatus('COMPLETED')}
                                isLoading={isUpdating}
                                variant="light" 
                                className="flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95"
                            >
                                Tandai Selesai
                            </Btn>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};