import Link from "next/link";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Btn } from "../atoms/button";
import { Table, THead, TBody, TR, TH, TD } from "../atoms/table";
import { Pencil, Trash2 } from "lucide-react";
import type { InventoryItem } from "@/app/lib/types/entities";

export interface InventoryTableProps {
  items: InventoryItem[];
  onDelete?: (id: number) => void;
  className?: string;
  editUrl?: (id: number) => string;
}

export const InventoryTable = ({ items, onDelete, editUrl }: InventoryTableProps) => {
  const statusColor = (status: InventoryItem["status"]) => {
    if (status === "Cukup") return "success" as const;
    if (status === "Menipis") return "warning" as const;
    return "danger" as const;
  };

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
              <TH className="text-right">Aksi</TH>
            </TR>
          </THead>
          <TBody>
            {items.map((item) => (
              <TR key={item.id}>
                <TD className="font-bold text-gray-900">{item.name}</TD>
                <TD className="text-gray-500 font-medium">{item.category}</TD>
                <TD className="font-black text-gray-900">{item.stock}</TD>
                <TD>
                  <Badge color={statusColor(item.status)} variant="solid">
                    {item.status}
                  </Badge>
                </TD>
                <TD>
                  <div className="flex justify-end gap-2">
                    {editUrl && (
                      <Link href={editUrl(item.id)}>
                        <Btn variant="light" size="sm" className="gap-1">
                          <Pencil size={14} /> Edit
                        </Btn>
                      </Link>
                    )}
                    {onDelete && (
                      <Btn
                        type="button"
                        variant="light"
                        size="sm"
                        className="text-red-primary bg-red-50 gap-1"
                        onClick={() => {
                          if (confirm(`Hapus ${item.name}?`)) onDelete(item.id);
                        }}
                      >
                        <Trash2 size={14} /> Hapus
                      </Btn>
                    )}
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
};
