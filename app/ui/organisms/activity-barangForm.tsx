import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";
import { Input } from "../atoms/input";
import { Icn } from "../atoms/icon";
import { Container } from "../atoms/container";
import { Package } from "lucide-react";

interface ActivityBarangFormProps {
    
}

export const ActivityBarangForm = ({}:ActivityBarangFormProps) => {

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Container className="p-6 border border-gray-100 shadow-sm space-y-6 rounded-2xl bg-white">
              <div className="flex items-center gap-4 text-red-primary">
                <div className="p-3 bg-red-50 rounded-2xl text-red-primary">
                  <Icn icon={Package} size={24} color="current" />
                </div>
                <div>
                  <Txt weight="bold" className="text-gray-900">Sumbangan Barang</Txt>
                  <Txt variant="caption" className="text-gray-500">Kirimkan barang layak pakai untuk yang membutuhkan</Txt>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <Input label="Jenis Barang" placeholder="Contoh: Pakaian, Buku, Sembako" />
                <Input label="Estimasi Berat/Jumlah" placeholder="Contoh: 5 kg / 2 Dus" />
                <Input label="Alamat Penjemputan" placeholder="Masukkan alamat lengkap" />
                <Btn variant="red" size="lg" className="w-full mt-4">Ajukan Penjemputan</Btn>
              </div>
            </Container>

            <div className="bg-red-secondary p-4 rounded-2xl border border-red-primary/10 flex gap-3">
              <div className="text-red-primary pt-1">ℹ️</div>
              <Txt variant="caption" className="text-red-primary/90 font-medium">
                Barang akan kami salurkan ke panti asuhan dan keluarga dhuafa binaan YAMUTI.
              </Txt>
            </div>
          </div>
    )
}