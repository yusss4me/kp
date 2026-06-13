"use client";

import { AdminInventoryTemplate } from "@/app/ui/templates/admin-inventory";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildInventoryStats } from "@/app/lib/utils/dashboard-stats";
import { routes } from "@/app/lib/constants/routes";

export default function InventoryPage() {
  const items = useYamutiStore((s) => s.inventory);
  const deleteItem = useYamutiStore((s) => s.deleteInventory);

  // API: GET /inventaris — route belum tersedia; stats dihitung dari data store lokal
  const stats = buildInventoryStats(items);

  return (
    <AdminInventoryTemplate
      stats={stats}
      items={items}
      onDeleteItem={deleteItem}
      addUrl={routes.admin.inventaris.add()}
      editUrl={(id) => routes.admin.inventaris.edit(id)}
    />
  );
}
