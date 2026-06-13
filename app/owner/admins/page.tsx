"use client";

import { OwnerAdminsTemplate } from "@/app/ui/templates/owner-admins";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

export default function AdminsPage() {
  const admins = useYamutiStore((s) => s.admins);
  const deleteAdmin = useYamutiStore((s) => s.deleteAdmin);

  return (
    <OwnerAdminsTemplate
      admins={admins}
      onDelete={deleteAdmin}
      addUrl={routes.owner.admins.add()}
      editUrl={(id) => routes.owner.admins.edit(id)}
    />
  );
}
