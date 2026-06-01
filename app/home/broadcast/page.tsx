import { BroadcastEditor } from "@/app/ui/organisms/BroadcastEditor";

export default function Page() {
  return (
    <div className="mx-auto">
      <BroadcastEditor
        templatePesan={[
          { nama_template: "Pemberitahuan Donasi", isi: "terkait kegiatan donasi" },
          { nama_template: "Pembayaran Tagihan", isi: "terkait pembayaran tagihan" },
          { nama_template: "Informasi Kegiatan", isi: "terkait informasi kegiatan" },
        ]}
      />
    </div>
  )
}