
"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "./Button";

interface DocumentUploadProps {
  onFilesSelected?: (files: File[]) => void;
  multiple?: boolean;
}

export default function DocumentUpload({
  onFilesSelected,
  multiple = true,
}: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const accept =
    ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.webp";

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const selectedFiles = Array.from(fileList);
      setFiles((previous) =>
        multiple ? [...previous, ...selectedFiles] : selectedFiles
      );
      onFilesSelected?.(selectedFiles);
    },
    [multiple, onFilesSelected]
  );

  return (
    <section className="w-full rounded-2xl border border-white/70 bg-background p-5 text-white shadow-[0_24px_65px_rgba(0,0,0,0.65)] sm:p-8 md:rounded-3xl md:p-6">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload documents. Press Enter to browse files."
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-90 cursor-pointer flex-col items-center justify-center rounded-2xl border-[3px] border-dashed px-4 py-6 text-center transition-colors duration-200 sm:min-h-100 sm:px-8 md:rounded-3xl ${
          isDragging
            ? "border-sky-300 bg-sky-400/10"
            : "border-sky-800 hover:border-sky-500"
        }`}
      >
        {/* Upload icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground bg-background">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-7 w-7 text-primary-dark"
            aria-hidden="true"
          >
            <path
              d="M24 28V5m0 0L13 16M24 5l11 11"
              stroke="currentColor"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.5 30v9a3 3 0 0 0 3 3h31a3 3 0 0 0 3-3v-9"
              stroke="currentColor"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="font-heading text-xl font-bold leading-tight text-white sm:text-2xl">
          {isDragging ? "Drop your files here" : "Upload your document"}
        </h2>

        <p className="mt-6 max-w-125 text-xs leading-8 text-slate-400 sm:text-sm">
          Drag &amp; drop files here or browse from your device.
        </p>

        <div className="mt-8 rounded-full bg-[#111a2e] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white sm:px-7 sm:text-sm">
          PDF, Word, PowerPoint, Excel, text and image files
        </div>

        <Button
          variant="primary"
          className="mt-3"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}

        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M13 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="16.5"
              cy="14.5"
              r="3.5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m19 17 2 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Browse Files
        </Button>
      </div>

      {/* Helper text */}
      <div className="mt-8 flex items-center justify-center gap-4 px-1 text-left sm:mt-9">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 shrink-0 text-sky-400"
          aria-hidden="true"
        >
          <path
            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M13 2v7h7M8 15l3 3 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-xs text-black sm:text-sm">
          After uploading, choose a shop and customize every file.
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <p className="text-sm font-semibold text-slate-300">
            Selected files ({files.length})
          </p>

          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-white">{file.name}</p>
                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() =>
                  setFiles((previous) =>
                    previous.filter((_, i) => i !== index)
                  )
                }
                className="shrink-0 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
