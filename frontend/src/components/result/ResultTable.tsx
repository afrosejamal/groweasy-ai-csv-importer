"use client";

import { CheckCircle2, Download, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { downloadCsv } from "@/services/exportService";

interface ResultTableProps {
  records: Record<string, any>[];
  imported: number;
  skipped: number;
}

export default function ResultTable({
  records,
  imported,
  skipped,
}: ResultTableProps) {
  if (!records.length) return null;

  const headers = Object.keys(records[0]);

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Parsed records
        </h2>

        <Button onClick={() => downloadCsv(records)} size="sm">
          <Download data-icon="inline-start" />
          Download CSV
        </Button>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Imported
            </p>
            <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
              {imported}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="size-5" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Skipped
            </p>
            <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
              {skipped}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[500px] overflow-auto rounded-xl border border-border">
        <table className="w-full min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted/70 backdrop-blur">
            <tr>
              <th className="w-12 border-b border-border px-3 py-2.5 text-right font-mono text-xs font-medium text-muted-foreground">
                #
              </th>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-border px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className="transition-colors odd:bg-transparent even:bg-muted/30 hover:bg-accent/60"
              >
                <td className="border-b border-border px-3 py-2 text-right font-mono text-xs text-muted-foreground">
                  {index + 1}
                </td>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border-b border-border px-4 py-2 text-foreground whitespace-nowrap"
                  >
                    {record[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
