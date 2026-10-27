
"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "./Button";
import { Upload } from "../icons";
import { FolderSearch } from "lucide-react";

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
    <section className="w-full max-w-140 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-lg shadow-slate-200/50 sm:p-5 md:rounded-3xl">
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
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null
            )
          ) {
            setIsDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-80 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors duration-200 sm:min-h-100 sm:px-8 md:rounded-3xl ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/40"
        }`}
      >
        {/* Upload icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
          <Upload className=""/>
        </div>

        <h2 className="font-heading text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
          {isDragging ? "Drop your files here" : "Upload your document"}
        </h2>

        <p className="mt-4 max-w-125 text-xs leading-6 text-slate-500 sm:text-sm">
          Drag &amp; drop files here or browse from your device.
        </p>

        <div className="mt-4 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-7 sm:text-sm">
          PDF, Word, PowerPoint, Excel, text and image files
        </div>

        <Button
          variant="primary"
          className="mt-4"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <FolderSearch className="h-5 w-5"/>
          Browse Files
        </Button>
      </div>

      {/* Helper text */}
      <div className="mt-6 flex items-center justify-center gap-3 px-1 text-left sm:mt-7">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-blue-600"
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

        <p className="text-xs leading-5 text-slate-600 sm:text-sm">
          After uploading, choose a shop and customize every file.
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-slate-800">
            Selected files ({files.length})
          </p>

          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">
                  {file.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
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
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
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
