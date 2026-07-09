import Papa from "papaparse";

export function downloadCsv(records: Record<string, any>[]) {
  if (!records.length) return;

  const csv = Papa.unparse(records);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "groweasy-crm-records.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}