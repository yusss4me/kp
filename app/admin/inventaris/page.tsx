"use client";

import { AdminInventoryTemplate } from "@/app/ui/templates/admin-inventory";
import { MOCK_ADMIN_INVENTORY_STATS } from "@/app/constants/mockData";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function InventoryPage() {
  const inventory = useYamutiStore((s) => s.inventory);
  const deleteInventory = useYamutiStore((s) => s.deleteInventory);

  return (
    <AdminInventoryTemplate
      stats={MOCK_ADMIN_INVENTORY_STATS}
      items={inventory}
      onDeleteItem={deleteInventory}
    />
  );
}
