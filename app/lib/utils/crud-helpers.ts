export function generateId(prefix = ""): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export function generateNumericId(items: { id: number | string }[]): number {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map((i) => typeof i.id === 'number' ? i.id : parseInt(i.id, 10) || 0));
  return maxId + 1;
}

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export function calcProgress(collected: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((collected / target) * 100));
}

export function programToListItem(program: {
  targetAmount: number;
  collectedAmount: number;
  title: string;
}): { target: string; collected: string; progress: number } {
  return {
    target: formatRupiah(program.targetAmount),
    collected: formatRupiah(program.collectedAmount),
    progress: calcProgress(program.collectedAmount, program.targetAmount),
  };
}

export function parseAmount(value: any): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const str = String(value);
  // Remove trailing decimal zeroes (.00 or ,00) that typically come from SQL decimals
  const cleanStr = str.replace(/\.\d{2}$/, "").replace(/,\d{2}$/, "");
  // Extract only the numbers
  return parseInt(cleanStr.replace(/[^0-9]/g, "")) || 0;
}
