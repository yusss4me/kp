"use client";

import { OwnerDonationsTemplate } from "@/app/ui/templates/owner-donations";
import { MOCK_OWNER_OVERSIGHT_STATS, MOCK_OWNER_PROGRAM_PERFORMANCE } from "@/app/constants/mockData";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";

export default function OwnerDonationsPage() {
  const requests = useYamutiStore((s) => s.approvalRequests);
  const approveRequest = useYamutiStore((s) => s.approveRequest);
  const rejectRequest = useYamutiStore((s) => s.rejectRequest);

  return (
    <OwnerDonationsTemplate
      stats={MOCK_OWNER_OVERSIGHT_STATS}
      requests={requests}
      programs={MOCK_OWNER_PROGRAM_PERFORMANCE}
      onApprove={approveRequest}
      onReject={rejectRequest}
    />
  );
}
