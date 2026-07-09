import { CsvRow } from "@/types/csv";

interface PreviewTableProps {
  data: CsvRow[];
}

export default function PreviewTable({
  data,
}: PreviewTableProps) {
  const headers = Object.keys(data[0]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          {data.length} row{data.length === 1 ? "" : "s"} detected
        </p>
      </div>

      <div className="overflow-auto rounded-xl border border-border">
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
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors odd:bg-transparent even:bg-muted/30 hover:bg-accent/60"
              >
                <td className="border-b border-border px-3 py-2 text-right font-mono text-xs text-muted-foreground">
                  {rowIndex + 1}
                </td>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="border-b border-border px-4 py-2 text-foreground"
                  >
                    {row[header]}
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
