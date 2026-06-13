import { Edit2, Trash2 } from "lucide-react";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Btn } from "../atoms/button";
import Link from "next/link";
import { ProgramCard } from "../molecules/program-card";

interface ProgramSectionAdminProps {
    programs: {
        id: string;
        title: string;
        target: string;
        collected: string;
        progress: number;
    }[];
    onDeleteProgram?: (id: string) => void;
    editUrl?: (id: string) => string;
}

export const ProgramSectionAdmin = ({ programs, onDeleteProgram, editUrl }: ProgramSectionAdminProps) => {
    return (
        <section className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <Txt variant="h4" weight="bold">
                      Program Donasi Aktif
                    </Txt>
                    <Txt
                      variant="caption"
                      className="text-red-primary font-bold cursor-pointer hover:underline"
                    >
                      Kelola Semua Program
                    </Txt>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                      <ProgramCard key={program.id} program={program} onDelete={onDeleteProgram} editUrl={editUrl} />
                    ))}
                  </div>
                </section>
    );
}