'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminProfileTemplate } from "@/app/ui/templates/admin-profile";
import { useAuthStore } from "@/app/lib/stores/auth-store";
import { ToastProvider, useToast } from "@/app/ui/atoms/toast";

function SuperAdminProfileContent() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(authUser?.name || "Owner Yamuti");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { show: showToast } = useToast();

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <AdminProfileTemplate
      name={name}
      setName={setName}
      editing={editing}
      setEditing={setEditing}
      onSave={() => {
        // TODO: Implement save logic
        setEditing(false);
        showToast("success", "Profil berhasil diupdate!");
      }}
      onLogout={async () => {
        await logout();
        router.push("/auth");
      }}
      fileInputRef={fileInputRef}
      onImageUpload={handleImageUpload}
    />
  );
}

export default function Page() {
  return (
    <ToastProvider>
      <SuperAdminProfileContent />
    </ToastProvider>
  );
}
