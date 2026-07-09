"use client";

import { useState } from "react";
import Papa from "papaparse";
import { CheckCircle2, Loader2, Sparkles, XCircle } from "lucide-react";

import Dropzone from "./Dropzone";
import ImportStepper from "./ImportStepper";
import PreviewTable from "../preview/PreviewTable";
import ResultTable from "../result/ResultTable";
import { Button } from "@/components/ui/button";

import { CsvRow } from "@/types/csv";
import { uploadCsv } from "@/services/importService";

export default function UploadCard() {
  // Uploaded CSV file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Parsed CSV Preview
  const [parsedData, setParsedData] = useState<CsvRow[]>([]);

  // Loading
  const [isParsing, setIsParsing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Response
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // AI Result
  const [crmRecords, setCrmRecords] = useState<any[]>([]);
  const [importedCount, setImportedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);

  // Processing Time
  const [processingTime, setProcessingTime] = useState("");

  const currentStep = crmRecords.length > 0
    ? 3
    : isUploading
      ? 2
      : parsedData.length > 0
        ? 1
        : 0;

  // Parse CSV
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    setResponseMessage("");
    setIsError(false);
    setCrmRecords([]);
    setImportedCount(0);
    setSkippedCount(0);
    setProcessingTime("");

    setIsParsing(true);

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        setParsedData(results.data);
        setIsParsing(false);
      },

      error: (error) => {
        console.error(error);

        setIsError(true);
        setResponseMessage("We couldn't read that file. Please check the format and try again.");

        setIsParsing(false);
      },
    });
  };

  // Send CSV to Backend
  const handleConfirmImport = async () => {
    if (!selectedFile) {
      setIsError(true);
      setResponseMessage("Please upload a CSV first.");
      return;
    }

    try {
      setIsUploading(true);
      setIsError(false);

      const response = await uploadCsv(selectedFile);

      setCrmRecords(response.records);
      setImportedCount(response.imported);
      setSkippedCount(response.skipped);
      setProcessingTime(response.processingTime);

      setResponseMessage("AI processing completed successfully.");
    } catch (error) {
      console.error(error);

      setIsError(true);
      setResponseMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">

      {/* Header */}
      <div className="mb-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          AI-assisted import
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Import CRM leads from CSV
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Upload a CSV file and AI will extract, clean, and map your leads into the
          GrowEasy CRM format automatically.
        </p>
      </div>

      <ImportStepper currentStep={currentStep} />

      {/* Upload */}
      <div className="mt-10">
        <Dropzone onFileSelect={handleFileSelect} />
      </div>

      {parsedData.length === 0 && !isParsing && (
        <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Upload a CSV file to preview it before AI processing begins.
        </div>
      )}

      {/* Parsing */}
      {isParsing && (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-muted/50 p-4 text-sm font-medium text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Parsing CSV...
        </div>
      )}

      {/* Preview */}
      {parsedData.length > 0 && (
        <>
          <PreviewTable data={parsedData} />

          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              onClick={handleConfirmImport}
              disabled={isUploading}
              size="lg"
              className="px-8"
            >
              {isUploading ? (
                <>
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                  Processing with AI...
                </>
              ) : (
                "Confirm import"
              )}
            </Button>

            {isUploading && (
              <p className="text-sm text-muted-foreground">
                This usually takes a few seconds.
              </p>
            )}
          </div>
        </>
      )}

      {/* Status */}
      {responseMessage && (
        <div
          className={`mt-8 flex items-start gap-3 rounded-xl border p-4 ${
            isError
              ? "border-destructive/30 bg-destructive/10"
              : "border-success/30 bg-success/10"
          }`}
        >
          {isError ? (
            <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
          ) : (
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
          )}

          <div>
            <p className={`font-medium ${isError ? "text-destructive" : "text-success"}`}>
              {responseMessage}
            </p>

            {processingTime && !isError && (
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                Processed in {processingTime}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Result Table (includes its own summary stats) */}
      {crmRecords.length > 0 && (
        <ResultTable
          records={crmRecords}
          imported={importedCount}
          skipped={skippedCount}
        />
      )}

    </div>
  );
}
