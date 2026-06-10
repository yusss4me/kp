"use client";

import { OwnerDonationsTemplate } from "@/app/ui/templates/owner-donations";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { buildOwnerOversightStats, buildProgramPerformance } from "@/app/lib/utils/dashboard-stats";

export default function OwnerDonationsPage() {
  const requests = useYamutiStore((s) => s.approvalRequests);
  const programs = useYamutiStore((s) => s.programs);
  const pendingDonations = useYamutiStore((s) => s.pendingDonations);
  const approveRequest = useYamutiStore((s) => s.approveRequest);
  const rejectRequest = useYamutiStore((s) => s.rejectRequest);

  // API: GET /owner/oversight — route belum tersedia; stats dihitung dari store lokal
  const stats = buildOwnerOversightStats(programs, pendingDonations);
  const programPerformance = buildProgramPerformance(programs);

  return (
    <OwnerDonationsTemplate
      stats={stats}
      requests={requests}
      programs={programPerformance}
      onApprove={approveRequest}
      onReject={rejectRequest}
    />
  );
}
