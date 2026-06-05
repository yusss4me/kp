export function generateId(prefix = ""): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export function generateNumericId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
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
