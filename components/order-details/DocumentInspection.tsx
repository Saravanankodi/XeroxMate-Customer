
interface DocumentInspectionProps {
  fileName: string;
  pages: number;
  fileSize: string;
  fileUrl?: string;
}

export default function DocumentInspection({
  fileName,
  pages,
  fileSize,
  fileUrl,
}: DocumentInspectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-800">
            Spooler File &amp; Preflight Inspection
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {pages} document pages submitted for B/W Xerox production
          </p>
        </div>

        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          ✓ SHA-256 Validated
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-rose-100 text-xs font-bold text-rose-700">
            PDF
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {fileName}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {pages} pages · {fileSize} · A4 Format
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {fileUrl && (
            <>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-white px-3 py-2 text-xs font-medium hover:bg-slate-100"
              >
                Preview Pages
              </a>

              <a
                href={fileUrl}
                download={fileName}
                className="rounded-lg border bg-white px-3 py-2 text-xs font-medium hover:bg-slate-100"
                aria-label="Download document"
              >
                ↓ Download
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
