"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OwnerAdminFormTemplate, OwnerAdminFormInput } from "@/app/ui/templates/owner-admin-form";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { routes } from "@/app/lib/constants/routes";

const schema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  email: z.string().email(),
  status: z.enum(["Aktif", "Nonaktif"]),
});

export default function TambahAdminPage() {
  const router = useRouter();
  const addAdmin = useYamutiStore((s) => s.addAdmin);
  const form = useForm<OwnerAdminFormInput>({
    resolver: zodResolver(schema),
    defaultValues: { status: "Aktif" },
  });

  const onSubmit = (data: OwnerAdminFormInput) => {
    addAdmin(data);
    router.push(routes.owner.admins.root());
  };

  return (
    <OwnerAdminFormTemplate 
      title="Administrator Baru" 
      form={form} 
      onSubmit={onSubmit} 
      backUrl={routes.owner.admins.root()} 
    />
  );
}
