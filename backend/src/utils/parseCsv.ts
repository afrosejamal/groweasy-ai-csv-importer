import csv from "csv-parser";
import { Readable } from "stream";

export function parseCsv(buffer: Buffer): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    const rows: Record<string, string>[] = [];

    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", reject);
  });
}