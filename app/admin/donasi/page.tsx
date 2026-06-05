"use client";

import { useState } from "react";
import { AdminProgramTemplate } from "@/app/ui/templates/admin-program";
import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { ConfirmationModal } from "@/app/ui/molecules/confirmation-modal";

export default function DonationsPage() {
  const programs = useYamutiStore((s) => s.programs);
  const donations = useYamutiStore((s) => s.pendingDonations);
  const donatur = useYamutiStore((s) => s.donatur);
  const verifyDonation = useYamutiStore((s) => s.verifyDonation);
  const rejectDonation = useYamutiStore((s) => s.rejectDonation);
  const deleteProgram = useYamutiStore((s) => s.deleteProgram);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<string | null>(null);

  const handleDeleteProgramClick = (id: string) => {
    setProgramToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (programToDelete) {
      deleteProgram(programToDelete);
      setProgramToDelete(null);
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setProgramToDelete(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminProgramTemplate
        programs={programs}
        donations={donations}
        donatur={donatur}
        onVerifyDonation={verifyDonation}
        onRejectDonation={rejectDonation}
        onDeleteProgram={handleDeleteProgramClick}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Hapus Program?"
        message="Program ini akan dihapus permanen dan tidak dapat dikembalikan."
        variant="danger"
        confirmText="Hapus"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
