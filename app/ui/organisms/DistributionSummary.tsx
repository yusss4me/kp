import React from "react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Badge } from "../atoms/badge";
import { Table, THead, TBody, TR, TH, TD } from "../atoms/table";
import { Building2, ArrowRightLeft } from "lucide-react";
import type { FundDistribution } from "@/app/lib/types/entities";

export interface DistributionSummaryProps {
  distributions: FundDistribution[];
}

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export const DistributionSummary = ({ distributions }: DistributionSummaryProps) => {
  const totalBranch = distributions.reduce((s, d) => s + d.branchAmount, 0);
  const totalCentral = distributions.reduce((s, d) => s + d.centralAmount, 0);
  const totalAll = totalBranch + totalCentral;
  const branchPercent = totalAll > 0 ? Math.round((totalBranch / totalAll) * 100) : 10;
  const centralPercent = totalAll > 0 ? 100 - branchPercent : 90;

  return (
    <Container className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <Container className="p-8 border-b border-gray-50 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
          <ArrowRightLeft size={20} />
        </div>
        <div>
          <Txt variant="h4" weight="bold" className="text-gray-900">
            Distribusi Dana Otomatis
          </Txt>
          <Txt variant="caption" className="text-gray-400 font-medium">
            Setiap pemasukan otomatis dibagi 10% cabang & 90% yayasan pusat
          </Txt>
        </div>
      </Container>

      {/* Visual Split Bar */}
      <Container className="px-8 pt-6 pb-2">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <Txt variant="caption" weight="bold" className="text-gray-600">
              Dana Cabang ({branchPercent}%)
            </Txt>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <Txt variant="caption" weight="bold" className="text-gray-600">
              Yayasan Pusat ({centralPercent}%)
            </Txt>
          </div>
        </div>
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-gray-100">
          <div
            className="bg-info transition-all duration-500"
            style={{ width: `${branchPercent}%` }}
          />
          <div
            className="bg-amber-500 transition-all duration-500"
            style={{ width: `${centralPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <Txt variant="caption" weight="bold" className="text-info">
            {formatRp(totalBranch)}
          </Txt>
          <Txt variant="caption" weight="bold" className="text-amber-600">
            {formatRp(totalCentral)}
          </Txt>
        </div>
      </Container>

      {/* Distribution History Table */}
      <Container className="px-4 pb-4 overflow-x-auto">
        {distributions.length === 0 ? (
          <Container className="py-12 flex flex-col items-center justify-center text-center">
            <div className="p-4 rounded-2xl bg-gray-50 text-gray-300 mb-3">
              <Building2 size={32} />
            </div>
            <Txt variant="body" className="text-gray-400 font-medium">
              Belum ada distribusi dana.
            </Txt>
            <Txt variant="caption" className="text-gray-300">
              Distribusi otomatis tercatat saat Anda menambah transaksi pemasukan.
            </Txt>
          </Container>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Tanggal</TH>
                <TH>Total Pemasukan</TH>
                <TH>Dana Cabang (10%)</TH>
                <TH>Yayasan Pusat (90%)</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {distributions.map((d) => (
                <TR key={d.id}>
                  <TD className="text-gray-400 text-sm font-medium">{d.date}</TD>
                  <TD className="font-bold text-gray-900">{formatRp(d.totalAmount)}</TD>
                  <TD className="font-bold text-info">{formatRp(d.branchAmount)}</TD>
                  <TD className="font-bold text-amber-600">{formatRp(d.centralAmount)}</TD>
                  <TD>
                    <Badge
                      variant="soft"
                      color={d.status === "Terkirim" ? "success" : "secondary"}
                    >
                      {d.status}
                    </Badge>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Container>
    </Container>
  );
};
