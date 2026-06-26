'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminProfileTemplate } from "@/app/ui/templates/admin-profile";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { useDashboardSummary } from "@/app/lib/hooks/useDashboard";
import { ToastProvider, useToast } from "@/app/ui/atoms/toast";
import { getImageUrl } from "@/app/lib/utils/image";

// ─── Inner page (butuh akses ke useToast, jadi harus di dalam Provider) ───────

function AdminProfilePageContent() {
  const authUser = useAuthStore((s) => s.user);
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const updateProfileApi = useAuthStore((s) => s.updateProfileApi);
  const updateUser = useAuthStore((s) => s.updateUser);
  const { show: showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(authUser?.name || "Administrator");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ambil data statistik dari API dashboard
  const { data: dashboardData } = useDashboardSummary();

  const totalDonasi = dashboardData
    ? `Rp ${(dashboardData.total_donasi_bulan_ini ?? dashboardData.total_donation ?? 0).toLocaleString("id-ID")}`
    : "-";
  const programAktif = dashboardData
    ? String(dashboardData.total_anak_asuh ?? dashboardData.total_anak ?? "-")
    : "-";
  const menungguVerifikasi = dashboardData
    ? String(dashboardData.kunjungan_menunggu ?? dashboardData.pending_visits ?? "-")
    : "-";

  const handleSave = async () => {
    if (!name.trim()) {
      showToast("error", "Nama tidak boleh kosong.");
      return;
    }
    setIsSaving(true);
    try {
      const result = await updateProfileApi({ name: name.trim() });
      if (result.success) {
        updateUser({ name: name.trim() });
        setEditing(false);
        showToast("success", result.message || "Profil berhasil diperbarui.");
      } else {
        showToast("error", result.error || "Gagal memperbarui profil.");
      }
    } catch {
      showToast("error", "Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/auth");
  };

  return (
    <AdminProfileTemplate
      name={name}
      image={authUser?.image ? getImageUrl(authUser.image) : ""}
      setName={setName}
      editing={editing}
      setEditing={setEditing}
      onSave={handleSave}
      onLogout={handleLogout}
      fileInputRef={fileInputRef}
      onImageUpload={() => fileInputRef.current?.click()}
      totalDonasi={totalDonasi}
      programAktif={programAktif}
      menungguVerifikasi={menungguVerifikasi}
    />
  );
}

// ─── Page export — bungkus dengan ToastProvider ────────────────────────────────

export default function Page() {
  return (
    <ToastProvider>
      <AdminProfilePageContent />
    </ToastProvider>
  );
}

