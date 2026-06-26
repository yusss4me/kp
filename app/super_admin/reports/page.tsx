"use client";

import { useState } from "react";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { FileText, Download } from "lucide-react";
import { Input } from "@/app/ui/atoms/input";
import { pdf } from "@react-pdf/renderer";
import BaseReportDocument from "@/app/ui/templates/reportDocument";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { useAuthStore } from "@/app/lib/stores/auth-store";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState("");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const orphans = useYamutiStore((s) => s.orphans);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const inventory = useYamutiStore((s) => s.inventory);
  const authUser = useAuthStore((s) => s.user);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      let title = "Laporan Operasional Yayasan";
      let headers: { label: string; key: string; width: string }[] = [];
      let sourceData: Record<string, string | number>[] = [];

      switch (reportType) {
        case "anak_asuh":
          // API: GET /anak-asuh — data dari store (diisi via fetchOrphans)
          title = "Laporan Data Registrasi Anak Asuh";
          headers = [
            { label: "ID", key: "id", width: "15%" },
            { label: "Nama Anak", key: "name", width: "40%" },
            { label: "Gender", key: "gender", width: "25%" },
            { label: "Status", key: "status", width: "20%" },
          ];
          sourceData = orphans.map((o) => ({
            id: o.id,
            name: o.name,
            gender: o.kategori_bayi ? "Bayi" : "Anak",
            status: o.status,
          }));
          break;

        case "donasi":
          // API: GET /donasi — route belum tersedia; data dari store lokal
          title = "Laporan Rekapitulasi Kas Masuk Donasi";
          headers = [
            { label: "ID Transaksi", key: "id", width: "15%" },
            { label: "Nama Program", key: "nama", width: "40%" },
            { label: "Metode", key: "tipe", width: "25%" },
            { label: "Jumlah", key: "jumlah", width: "20%" },
          ];
          sourceData = pendingDonations.map((d) => ({
            id: d.id,
            nama: d.nama,
            tipe: d.tipe,
            jumlah: d.jumlah,
          }));
          break;

        case "inventaris":
          // API: GET /inventaris — route belum tersedia; data dari store lokal
          title = "Laporan Mutasi Barang & Inventaris Logistik";
          headers = [
            { label: "Kode Logistik", key: "id", width: "30%" },
            { label: "Volume Stok", key: "jumlah", width: "70%" },
          ];
          sourceData = inventory.map((i) => ({
            id: `${i.id} (${i.name})`,
            jumlah: i.stock,
          }));
          break;

        default:
          title = `Laporan Aktivitas Rutin (${reportType})`;
          headers = [{ label: "Deskripsi Operasional", key: "info", width: "100%" }];
          sourceData = [{ info: `Dokumen rekapitulasi data ${reportType} siap dikoneksikan ke backend.` }];
          break;
      }

      if (exportFormat !== "pdf") {
        alert(`Format .${exportFormat} sedang dikembangkan oleh tim Backend. Silakan pilih format PDF.`);
        setIsGenerating(false);
        return;
      }

      const blob = await pdf(
        <BaseReportDocument
          title={title}
          startDate={startDate}
          endDate={endDate}
          headers={headers}
          data={sourceData}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `YAMUTI_LAPORAN_${reportType.toUpperCase()}_${startDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal memproses file PDF laporan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardHeader
      headerTitle="Laporan"
      user={{ name: authUser?.name || "Owner Yamuti", role: "Pemilik Yayasan" }}
    >
      <div className="flex flex-col gap-6">
        <Container className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-red-primary/10 rounded-2xl flex items-center justify-center text-red-primary">
              <FileText size={28} />
            </div>
            <div>
              <Txt variant="h4" weight="bold" className="text-gray-900">Buat Laporan Baru</Txt>
              <Txt variant="caption" className="text-gray-400">Generate laporan aktivitas dan keuangan yayasan</Txt>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Txt variant="small" weight="bold" className="text-gray-700">Jenis Laporan</Txt>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all text-sm"
                  required
                >
                  <option value="">Pilih Jenis Laporan</option>
                  <option value="donasi">Laporan Donasi</option>
                  <option value="kunjungan">Laporan Kunjungan</option>
                  <option value="inventaris">Laporan Mutasi Barang / Inventaris</option>
                  <option value="anak_asuh">Data Anak Asuh</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <Txt variant="small" weight="bold" className="text-gray-700">Format Ekspor</Txt>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all text-sm"
                  required
                >
                  <option value="pdf">PDF Document (.pdf)</option>
                  <option value="excel">Excel Spreadsheet (.xlsx)</option>
                  <option value="csv">CSV (.csv)</option>
                </select>
              </div>

              <Input
                label="Tanggal Mulai"
                type="date"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                required
              />
              <Input
                label="Tanggal Akhir"
                type="date"
                value={endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Btn type="submit" variant="red" size="lg" className="px-8 shadow-lg shadow-red-primary/20 gap-2" isLoading={isGenerating}>
                <Download size={20} />
                {isGenerating ? "Menyusun PDF..." : "Generate Laporan"}
              </Btn>
            </div>
          </form>
        </Container>
      </div>
    </DashboardHeader>
  );
}
