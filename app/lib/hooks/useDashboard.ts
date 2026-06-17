import { useQuery } from "@tanstack/react-query";
import { fetchDashboardSummary } from "@/app/lib/api/services/dashboard";

/** React Query hook for fetching dashboard summary (Admin & Owner) */
export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchDashboardSummary,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
}
