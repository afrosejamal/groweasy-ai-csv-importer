import { Request, Response } from "express";

import { parseCsv } from "../utils/parseCsv";
import { batchRecords } from "../utils/batchRecords";
import { extractCRMRecords } from "../services/GroqServices";
import { filterValidRecords } from "../utils/filterValidRecords";

export const importCsv = async (
  req: Request,
  res: Response
) => {
  const startTime = Date.now();

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV uploaded.",
      });
    }

    // Parse CSV
    const rows = await parseCsv(req.file.buffer);


    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Uploaded CSV is empty.",
      });
    }

    // Batch records (25 rows per batch)
    const batches = batchRecords(rows, 25);

    // Process all batches in parallel
    const batchResults = await Promise.all(
      batches.map((batch) => extractCRMRecords(batch))
    );

    // Merge all results into one array
    const allRecords = batchResults.flat();

    // Validate AI output
    const validRecords = filterValidRecords(allRecords);

    const skipped = allRecords.length - validRecords.length;

    const processingTime = `${(
      (Date.now() - startTime) /
      1000
    ).toFixed(2)} sec`;

    return res.status(200).json({
      success: true,

      imported: validRecords.length,

      skipped,

      processingTime,

      records: validRecords,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to import CSV.",
    });
  }
};