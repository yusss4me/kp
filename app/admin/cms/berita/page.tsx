"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DashboardHeader } from "@/app/ui/organisms/dashboard-header";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Input } from "@/app/ui/atoms/input";
import { Textarea } from "@/app/ui/atoms/textarea";
import { Plus, Newspaper, Trash2, Edit2, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { createArtikel, updateArtikel, deleteArtikel, fetchArtikelList } from "@/app/lib/api/services/artikel";
import { getImageUrl } from "@/app/lib/utils/image";

const formSchema = z.object({
  title: z.string().min(1, "Judul Berita wajib diisi"),
  summary: z.string().optional(),
  content: z.string().min(1, "Konten wajib diisi"),
  author: z.string().optional(),
  thumbnail: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      const data = await fetchArtikelList();
      setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      author: "",
    },
  });

  const handleOpenAddForm = () => {
    reset({
      title: "",
      summary: "",
      content: "",
      author: "",
    });
    setEditingId(null);
    setPreviewImage(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
    reset({
      title: item.judul,
      summary: "", // Dummy or derived
      content: item.konten,
      author: "",
    });
    setEditingId(item.id);
    setPreviewImage(getImageUrl(item.thumbnail_url || item.thumbnail));
    setIsFormOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setValue("thumbnail", selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (editingId) {
        await updateArtikel(editingId, {
          judul: data.title,
          konten: data.content,
          kategori_id: '1',
          thumbnail: data.thumbnail,
        });
      } else {
        await createArtikel({
          judul: data.title,
          konten: data.content,
          kategori_id: '1',
          thumbnail: data.thumbnail,
        });
      }
      setIsFormOpen(false);
      loadNews();
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan berita");
    }
  };

  const handleDelete = async (itemId: string) => {
    if (confirm("Hapus berita ini?")) {
      try {
        await deleteArtikel(itemId);
        loadNews();
      } catch (e) {
        console.error(e);
        alert("Gagal menghapus berita");
      }
    }
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
            variant="red"
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
                <Input {...register("title")} placeholder="Masukkan judul..." error={errors.title?.message} />
              </div>
              <div className="space-y-2">
                <Txt variant="body" weight="bold">Penulis</Txt>
                <Input {...register("author")} placeholder="Nama penulis" error={errors.author?.message} />
              </div>
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Gambar Thumbnail</Txt>
              {previewImage ? (
                <div className="relative aspect-video w-full md:w-1/2 rounded-2xl overflow-hidden group border-2 border-transparent hover:border-red-primary/30 transition-all cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 bg-white rounded-full shadow-lg">
                      <ImageIcon className="text-red-primary" size={24} />
                    </div>
                    <Txt variant="caption" weight="bold" className="text-white mt-3">Ganti Foto</Txt>
                  </div>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
              ) : (
                <div className="relative aspect-video w-full md:w-1/2 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 group hover:border-red-primary/30 hover:bg-red-50/10 transition-all cursor-pointer">
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-gray-400 group-hover:text-red-primary" size={24} />
                  </div>
                  <Txt variant="caption" weight="bold" className="text-gray-400 group-hover:text-red-primary">Klik untuk Unggah Foto</Txt>
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Ringkasan (Max 150 karakter)</Txt>
              <Textarea {...register("summary")} placeholder="Singkat, padat, jelas..." rows={2} error={errors.summary?.message} />
            </div>

            <div className="space-y-2">
              <Txt variant="body" weight="bold">Konten Lengkap</Txt>
              <Textarea {...register("content")} placeholder="Isi berita..." rows={8} error={errors.content?.message} />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Btn type="button" variant="transparent" size="md" shape="rounded" border="border" borderColor="dark" onClick={() => setIsFormOpen(false)}>
                Batal
              </Btn>
              <Btn type="submit" isLoading={isSubmitting} variant="red" size="md" shape="rounded" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                {editingId ? "Simpan Perubahan" : "Publikasikan"}
              </Btn>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Memuat artikel...</div>
        ) : (
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getImageUrl(item.thumbnail_url || item.thumbnail)} alt={item.judul} className="w-full h-full object-cover bg-gray-100" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <Txt variant="h5" weight="bold" className="line-clamp-2">{item.judul}</Txt>
                    </div>
                    <Txt variant="caption" className="text-gray-500">
                      {item.created_at ? format(new Date(item.created_at), "dd MMMM yyyy", { locale: id }) : "Hari ini"} • Oleh {item.author || "Admin"}
                    </Txt>
                    <Txt variant="body" className="text-gray-600 line-clamp-3 text-sm">
                      {item.konten ? item.konten.substring(0, 150) + "..." : ""}
                    </Txt>
                    <div className="pt-4 flex gap-2 border-t border-gray-50 mt-4">
                      <Btn 
                        variant="transparent" 
                        border="border"
                        borderColor="dark"
                        className="flex-1 gap-2 text-blue-600 border-blue-200 hover:bg-blue-50" 
                        onClick={() => handleEdit(item)}
                      >
                        <Edit2 size={16} /> Edit
                      </Btn>
                      <Btn 
                        variant="transparent" 
                        border="border"
                        borderColor="dark"
                        className="flex-1 gap-2 text-red-600 border-red-200 hover:bg-red-50" 
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={16} /> Hapus
                      </Btn>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardHeader>
  );
}
