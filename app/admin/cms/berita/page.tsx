"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { DashboardHeader } from "@/app/ui/organisms/DashboardHeader";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { InputBox } from "@/app/ui/atoms/input";
import { TextAreaBox } from "@/app/ui/atoms/textarea";
import { Plus, Newspaper, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { News } from "@/app/lib/types/entities";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const formSchema = z.object({
  title: z.string().min(1, "Judul Berita wajib diisi"),
  summary: z.string().min(1, "Ringkasan wajib diisi").max(150, "Maksimal 150 karakter"),
  content: z.string().min(1, "Konten wajib diisi"),
  author: z.string().min(1, "Penulis wajib diisi"),
  imageUrl: z.string().url("Format URL tidak valid").min(1, "URL Gambar wajib diisi"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminNewsPage() {
  const { news, addNews, updateNews, deleteNews } = useYamutiStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      author: "",
      imageUrl: "",
    },
  });

  const handleOpenAddForm = () => {
    reset({
      title: "",
      summary: "",
      content: "",
      author: "",
      imageUrl: "",
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: News) => {
    reset({
      title: item.title,
      summary: item.summary,
      content: item.content,
      author: item.author,
      imageUrl: item.imageUrl,
    });
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (editingId) {
      updateNews(editingId, data);
    } else {
      addNews({
        ...data,
        date: new Date().toISOString(),
      });
    }
    setIsFormOpen(false);
  };

  return (
    <DashboardHeader headerTitle="Manajemen Berita">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <Newspaper size={24} />
            </div>
            <div>
              <Txt variant="h4" weight="bold">
                Berita & Artikel
              </Txt>
              <Txt variant="caption" className="text-gray-400">
                Kelola berita terkini yang akan ditampilkan di halaman utama.
              </Txt>
            </div>
          </div>
          <Btn
            variant="primary"
            size="md"
            shape="rounded"
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none"
            onClick={handleOpenAddForm}
          >
            <Plus size={18} />
            Tambah Berita
          </Btn>
        </div>

        {isFormOpen && (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl space-y-6">
            <Txt variant="h4" weight="bold" className="mb-4">
              {editingId ? "Edit Berita" : "Tambah Berita Baru"}
            </Txt>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Txt variant="body" weight="bold">Judul Berita</Txt>
                <InputBox {...register("title")} placeholder="Masukkan judul..." error={errors.title?.message} />
              </div>
              <div className="space-y-2">
                <Txt variant="body" weight="bold">Penulis</Txt>
                <InputBox {...register("author")} placeholder="Nama penulis" error={errors.author?.message} />
              </div>
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">URL Gambar Header</Txt>
              <InputBox {...register("imageUrl")} placeholder="https://..." error={errors.imageUrl?.message} />
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Ringkasan (Max 150 karakter)</Txt>
              <TextAreaBox {...register("summary")} placeholder="Singkat, padat, jelas..." rows={2} error={errors.summary?.message} />
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Konten Lengkap</Txt>
              <TextAreaBox {...register("content")} placeholder="Isi berita..." rows={8} error={errors.content?.message} />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Btn type="button" variant="outline" size="md" shape="rounded" onClick={() => setIsFormOpen(false)}>
                Batal
              </Btn>
              <Btn type="submit" variant="primary" size="md" shape="rounded" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                {editingId ? "Simpan Perubahan" : "Publikasikan"}
              </Btn>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length === 0 ? (
            <div className="col-span-full bg-white p-10 rounded-[32px] border border-gray-100 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Newspaper size={32} />
              </div>
              <div>
                <Txt variant="h5" weight="bold">Belum Ada Berita</Txt>
                <Txt variant="body" className="text-gray-400">Silakan tambah berita baru untuk ditampilkan.</Txt>
              </div>
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 w-full relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <Txt variant="h5" weight="bold" className="line-clamp-2">{item.title}</Txt>
                  </div>
                  <Txt variant="caption" className="text-gray-500">
                    {format(new Date(item.date), "dd MMMM yyyy", { locale: id })} • Oleh {item.author}
                  </Txt>
                  <Txt variant="body" className="text-gray-600 line-clamp-3 text-sm">
                    {item.summary}
                  </Txt>
                  <div className="pt-4 flex gap-2 border-t border-gray-50 mt-4">
                    <Btn 
                      variant="outline" 
                      className="flex-1 gap-2 text-blue-600 border-blue-200 hover:bg-blue-50" 
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 size={16} /> Edit
                    </Btn>
                    <Btn 
                      variant="outline" 
                      className="flex-1 gap-2 text-red-600 border-red-200 hover:bg-red-50" 
                      onClick={() => {
                        if (confirm("Hapus berita ini?")) deleteNews(item.id);
                      }}
                    >
                      <Trash2 size={16} /> Hapus
                    </Btn>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardHeader>
  );
}
