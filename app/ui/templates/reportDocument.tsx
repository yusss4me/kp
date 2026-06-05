"use client";

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Registrasi Font standar agar layout PDF konsisten dan profesional
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.1/Helvetica.ttf", fontWeight: "normal" },
    { src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.1/Helvetica-Bold.ttf", fontWeight: "bold" },
  ],
});

// Desain Styling PDF formal berbasis susunan poin-poin koordinat (Points)
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1f2937", backgroundColor: "#ffffff" },
  
  // KOP SURAT YAYASAN
  kopContainer: { flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#dc2626", paddingBottom: 12, marginBottom: 20, alignItems: "center" },
  kopTextWrapper: { flex: 1 },
  namaYayasan: { fontSize: 16, fontWeight: "bold", color: "#b91c1c", marginBottom: 2, uppercase: true },
  subKop: { fontSize: 9, color: "#4b5563", marginBottom: 1 },
  
  // INFO DOKUMEN LAPORAN
  titleLaporan: { fontSize: 13, fontWeight: "bold", textAlign: "center", textTransform: "uppercase", marginBottom: 6, color: "#111827" },
  periodeLaporan: { fontSize: 9, textAlign: "center", color: "#6b7280", marginBottom: 20 },
  
  // TABEL DATA DINAMIS
  table: { display: "flex", width: "auto", borderStyle: "solid", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 4, overflow: "hidden", marginBottom: 25 },
  tableRow: { flexDirection: "row", minHeight: 24, alignItems: "center" },
  tableHeaderRow: { backgroundColor: "#f9fafb", borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  tableCellHeader: { fontWeight: "bold", color: "#374151", padding: 6, fontSize: 9 },
  tableCell: { padding: 6, borderBottomWidth: 1, borderBottomColor: "#f3f4f6", color: "#4b5563" },
  
  // TANDA TANGAN (SIGNATURE)
  signatureContainer: { flexDirection: "row", justifyContent: "flex-end", marginTop: 30 },
  signatureBox: { width: 160, textAlign: "center" },
  sigKota: { fontSize: 9, color: "#374151", marginBottom: 50 },
  sigNama: { fontSize: 10, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#111827", paddingBottom: 2 },
  sigRole: { fontSize: 9, color: "#6b7280", marginTop: 2 }
});

// Interface struktur properti data penampung
interface ReportField {
  label: string;
  key: string;
  width: string; // contoh: "25%"
}

interface BaseReportDocumentProps {
  title: string;
  startDate: string;
  endDate: string;
  headers: ReportField[];
  data: any[];
}

export default function BaseReportDocument({ title, startDate, endDate, headers, data }: BaseReportDocumentProps) {
  // Format Tanggal sederhana untuk tampilan
  const formatIndoDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 1. KOP SURAT RESMI YAMUTI */}
        <View style={styles.kopContainer}>
          <View style={styles.kopTextWrapper}>
            <Text style={styles.namaYayasan}>Yayasan Mutiara Titipan Illahi (YAMUTI)</Text>
            <Text style={styles.subKop}>Akte Notaris No. 12/2024 · SK Kemenkumham RI</Text>
            <Text style={styles.subKop}>Sekretariat: Kota Tasikmalaya, West Java, Indonesia</Text>
          </View>
        </View>

        {/* 2. JUDUL & PERIODE LAPORAN */}
        <Text style={styles.titleLaporan}>{title}</Text>
        <Text style={styles.periodeLaporan}>
          Periode: {formatIndoDate(startDate)} s/d {formatIndoDate(endDate)}
        </Text>

        {/* 3. MERENDER TABEL DATA SECARA DINAMIS */}
        <View style={styles.table}>
          {/* Baris Judul Kolom (Header) */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            {headers.map((head, i) => (
              <View key={i} style={{ width: head.width, paddingLeft: 4 }}>
                <Text style={styles.tableCellHeader}>{head.label}</Text>
              </View>
            ))}
          </View>

          {/* Baris Isi Data */}
          {data.length === 0 ? (
            <View style={styles.tableRow}>
              <View style={{ width: "100%", padding: 10, textAlign: "center" }}>
                <Text style={{ color: "#9ca3af" }}>Tidak ada data pada periode ini.</Text>
              </View>
            </View>
          ) : (
            data.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {headers.map((head, colIndex) => (
                  <View key={colIndex} style={{ width: head.width, paddingLeft: 4 }}>
                    <Text style={styles.tableCell}>
                      {/* Cek jika data bertipe boolean untuk kategori bayi */}
                      {typeof row[head.key] === "boolean" 
                        ? (row[head.key] ? "Ya" : "Tidak") 
                        : row[head.key]?.toString() || "-"}
                    </Text>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>

        {/* 4. VALIDASI TANDA TANGAN OWNER YAYASAN */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.sigKota}>Tasikmalaya, {formatIndoDate(new Date().toISOString().split('T')[0])}</Text>
            <Text style={styles.sigNama}>Bpk. Owner Yamuti</Text>
            <Text style={styles.sigRole}>Pemilik Yayasan</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}