"use client";

import { useEffect } from "react";
import { AdminInventoryTemplate } from "@/app/ui/templates/admin-inventory";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildInventoryStats } from "@/app/lib/utils/dashboard-stats";
import { routes } from "@/app/lib/constants/routes";

export default function InventoryPage() {
  const items = useYamutiStore((s) => s.inventory);
  const deleteItem = useYamutiStore((s) => s.deleteInventory);
  const fetchInventaris = useYamutiStore((s) => s.fetchInventaris);

  // API: GET /inventaris
  useEffect(() => {
    fetchInventaris();
  }, [fetchInventaris]);

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
