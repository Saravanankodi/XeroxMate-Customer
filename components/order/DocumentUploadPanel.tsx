
"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".pptx",
  ".png",
  ".jpg",
  ".jpeg",
];

type DocumentUploadPanelProps = {
  onFileChange?: (file: File | null) => void;
  maxSizeMB?: number;
};

export default function DocumentUploadPanel({
  onFileChange,
  maxSizeMB = 20,
}: DocumentUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;

    const extension = `.${selectedFile.name
      .split(".")
      .pop()
      ?.toLowerCase()}`;

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setError("Unsupported format. Please select a supported document.");
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB} MB.`);
      return;
    }

    setFile(selectedFile);
    setError("");
    onFileChange?.(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onFileChange?.(null);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    selectFile(event.dataTransfer.files?.[0]);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 border-t-[3px] border-t-blue-500 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.04)]">
      <div className="p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Uploaded Source
          </h2>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
              file
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {file ? (
              <CheckCircle2 size={12} />
            ) : (
              <Upload size={11} />
            )}
            {file ? "Upload complete" : "Upload required"}
          </span>
        </div>

        {/* Upload area */}
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="rounded-xl border border-dashed border-sky-200 bg-sky-50/30 px-4 py-6 text-center transition-colors hover:bg-sky-50/70 sm:px-6 sm:py-7"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-600 shadow-sm">
            <FileText size={23} strokeWidth={1.8} />
          </div>

          <h3 className="break-all text-lg font-bold text-slate-800">
            {file ? file.name : "Upload your document"}
          </h3>

          <p className="mt-1.5 text-sm text-slate-500">
            {file
              ? `${formatSize(file.size)} · Ready to customize`
              : "Choose a file or drag and drop it here"}
          </p>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS.join(",")}
            onChange={(event) =>
              selectFile(event.target.files?.[0])
            }
            className="hidden"
          />

          <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
            {file && (
              <button
                type="button"
                onClick={removeFile}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-rose-100 bg-rose-50 px-4 text-xs font-medium text-rose-600 transition hover:bg-rose-100"
              >
                <Trash2 size={13} />
                Remove
              </button>
            )}

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              {file ? <Plus size={14} /> : <Upload size={13} />}
              {file ? "Replace File" : "Add Files"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-[11px] text-rose-700"
          >
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Supported formats */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs text-slate-400">
            Supported:
          </span>

          {["PDF", "DOCX", "PPTX", "PNG", "JPG"].map((format) => (
            <span
              key={format}
              className="rounded bg-slate-100 px-1.5 py-1 text-xs font-medium text-slate-500"
            >
              {format}
            </span>
          ))}
          <span className="ml-auto text-xs text-slate-400">
            Max {maxSizeMB} MB
          </span>
        </div>
      </div>
    </section>
  );
}
