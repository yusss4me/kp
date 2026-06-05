import Link from "next/link";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Btn } from "../atoms/button";
import { Edit2, Trash2 } from "lucide-react";

interface ProgramCardProps {
  program: {
    id: string;
    title: string;
    target: string;
    collected: string;
    progress: number;
  };
  onDelete?: (id: string) => void;
}

export const ProgramCard = ({ program, onDelete }: ProgramCardProps) => {
    return (
        <div
                key={program.id}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/donations/edit-donasi/${program.id}`}>
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete?.(program.id)}
                    className="p-2 bg-red-50 text-red-primary rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex justify-between items-start gap-4 pr-16">
                  <Txt
                    weight="bold"
                    className="text-lg leading-tight text-gray-900"
                  >
                    {program.title}
                  </Txt>
                  <Badge
                    color={program.progress > 80 ? "success" : "primary"}
                    variant="solid"
                  >
                    {program.progress}%
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-primary rounded-full"
                      style={{ width: `${program.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <Txt
                        variant="caption"
                        className="text-gray-400 font-bold uppercase tracking-wider"
                      >
                        Terkumpul
                      </Txt>
                      <Txt
                        variant="small"
                        weight="bold"
                        className="text-red-primary"
                      >
                        {program.collected}
                      </Txt>
                    </div>
                    <div className="flex flex-col text-right">
                      <Txt
                        variant="caption"
                        className="text-gray-400 font-bold uppercase tracking-wider"
                      >
                        Target
                      </Txt>
                      <Txt
                        variant="small"
                        weight="bold"
                        className="text-gray-900"
                      >
                        {program.target}
                      </Txt>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/admin/donations/edit-donasi/${program.id}`}
                    className="w-full"
                  >
                    <Btn
                      variant="light"
                      size="sm"
                      shape="rounded"
                      className="w-full py-3 bg-gray-50 border-none text-gray-600 hover:text-red-primary"
                    >
                      Edit
                    </Btn>
                  </Link>
                  <Btn
                    type="button"
                    variant="light"
                    size="sm"
                    shape="rounded"
                    onClick={() => onDelete?.(program.id)}
                    className="w-full py-3 bg-red-50/50 border-none text-red-primary/60 hover:text-red-primary hover:bg-red-50"
                  >
                    Hapus
                  </Btn>
                </div>
              </div>
    );
}