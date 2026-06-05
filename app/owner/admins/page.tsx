"use client";

import { OwnerAdminsTemplate } from "@/app/ui/templates/owner-admins";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function AdminsPage() {
  const admins = useYamutiStore((s) => s.admins);
  const deleteAdmin = useYamutiStore((s) => s.deleteAdmin);

  return <OwnerAdminsTemplate admins={admins} onDelete={deleteAdmin} />;
}
