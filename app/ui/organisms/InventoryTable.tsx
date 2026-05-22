import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Table, THead, TBody, TR, TH, TD } from "../atoms/table";

const MOCK_INVENTORY = [
  {
    id: 1,
    name: "Beras Medium",
    category: "Logistik Pangan",
    stock: "250 Kg",
    status: "Cukup",
  },
  {
    id: 2,
    name: "Minyak Goreng",
    category: "Logistik Pangan",
    stock: "12 Liter",
    status: "Menipis",
  },
  {
    id: 3,
    name: "Seragam Sekolah SMA",
    category: "Pakaian",
    stock: "15 Stel",
    status: "Cukup",
  },
  {
    id: 4,
    name: "Buku Tulis A5",
    category: "Alat Tulis",
    stock: "5 Pack",
    status: "Menipis",
  },
  {
    id: 5,
    name: "Susu Formula",
    category: "Kebutuhan Bayi",
    stock: "20 Kaleng",
    status: "Cukup",
  },
];

export interface InventoryTableProps {
  className?: string;
}

/**
 * InventoryTable
 * 
 * Komponen tabel untuk menampilkan daftar stok barang logistik (Inventory).
 * Menampilkan nama barang, kategori, jumlah stok, dan status ketersediaan.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {InventoryTableProps} props - Properti komponen
 * @returns {JSX.Element} Komponen InventoryTable
 */
export const InventoryTable = ({}: InventoryTableProps) => {
  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <Txt variant="h4" weight="bold" className="text-gray-900">
          Daftar Stok Barang
        </Txt>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <THead>
            <TR>
              <TH>Nama Barang</TH>
              <TH>Kategori</TH>
              <TH>Jumlah Stok</TH>
              <TH>Status</TH>
            </TR>
          </THead>
          <TBody>
            {MOCK_INVENTORY.map((item) => (
              <TR key={item.id}>
                <TD className="font-bold text-gray-900">{item.name}</TD>
                <TD className="text-gray-500 font-medium">{item.category}</TD>
                <TD className="font-black text-gray-900">{item.stock}</TD>
                <TD>
                  <Badge
                    variant="soft"
                    color={item.status === "Menipis" ? "danger" : "success"}
                  >
                    {item.status}
                  </Badge>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};
