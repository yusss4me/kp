"use client";

import Link from "next/link";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Container } from "@/app/ui/atoms/container";
import { Badge } from "@/app/ui/atoms/badge";
import { Plus, ShieldCheck, Pencil, Trash2 } from "lucide-react";
import type { OwnerAdmin } from "@/app/lib/types/entities";

interface OwnerAdminsTemplateProps {
  admins: OwnerAdmin[];
  onDelete: (id: string) => void;
  addUrl?: string;
  editUrl?: (id: string) => string;
}

export function OwnerAdminsTemplate({ admins, onDelete, addUrl, editUrl }: OwnerAdminsTemplateProps) {
  return (
    <DashboardHeader headerTitle="Manajemen Administrator">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-primary/10 text-red-primary rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <Txt variant="h4" weight="bold">Daftar Administrator</Txt>
              <Txt variant="caption" className="text-gray-400">Kelola hak akses tim yayasan</Txt>
            </div>
          </div>
          {addUrl && (
            <Link href={addUrl}>
              <Btn variant="red" size="md" shape="rounded" className="gap-2">
                <Plus size={18} />
                Tambah Admin
              </Btn>
            </Link>
          )}
        </div>

        <div className="grid gap-4">
          {admins.map((admin) => (
            <Container key={admin.id} variant="light" radius="2xl" padding="lg" shadow="sm" className="border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Txt weight="bold" className="text-lg">{admin.name}</Txt>
                <Txt className="text-gray-500 text-sm">{admin.role} • {admin.email}</Txt>
              </div>
              <div className="flex items-center gap-3">
                <Badge color={admin.status === "Aktif" ? "success" : "secondary"} variant="solid">
                  {admin.status}
                </Badge>
                {editUrl && (
                  <Link href={editUrl(admin.id)}>
                    <Btn variant="light" size="sm" className="gap-1">
                      <Pencil size={16} /> Edit
                    </Btn>
                  </Link>
                )}
                <Btn
                  variant="light"
                  size="sm"
                  className="text-red-primary bg-red-50 gap-1"
                  onClick={() => {
                    if (confirm(`Hapus admin ${admin.name}?`)) onDelete(admin.id);
                  }}
                >
                  <Trash2 size={16} /> Hapus
                </Btn>
              </div>
            </Container>
          ))}
          {admins.length === 0 && (
            <Txt className="text-center text-gray-400 py-12">Belum ada administrator terdaftar.</Txt>
          )}
        </div>
      </div>
    </DashboardHeader>
  );
}
