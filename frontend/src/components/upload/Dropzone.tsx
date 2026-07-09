"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function Dropzone({
  onFileSelect,
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },

    multiple: false,

    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
        isDragActive
          ? "border-primary bg-accent/60"
          : "border-border bg-muted/30 hover:border-primary/50 hover:bg-accent/40"
      }`}
    >
      <input {...getInputProps()} />

      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-105">
        <UploadCloud className="size-6" />
      </div>

      <h2 className="mt-4 text-base font-semibold text-foreground">
        {isDragActive ? "Drop your file to upload" : "Drag and drop your CSV here"}
      </h2>

      <p className="mt-1.5 text-sm text-muted-foreground">
        or click to browse
      </p>

      <p className="mt-4 text-xs text-muted-foreground/70">
        Supports .csv files only
      </p>
    </div>
  );
}
