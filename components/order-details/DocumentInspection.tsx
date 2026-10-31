
import { Download, Eye, FileText, ShieldCheck } from "lucide-react";

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
    <section className="flex flex-col gap-4 rounded-xl border border-[#E2E7F4] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-lg leading-6 font-bold text-[#0F172A]">
            Spooler File &amp; Preflight Inspection
          </h3>
          <p className="text-sm leading-4 text-[#64748B]">
            {pages === 1 ? "1 document" : `${pages} document pages`} submitted for B/W xerox production
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-sm leading-4 font-semibold text-[#047857]">
          <ShieldCheck size={14} className="shrink-0 text-[#10B981]" />
          SHA-256 Validated
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2E8F0]/80 bg-[#F8FAFC]/70 p-4">
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex size-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-[#FECACA] bg-[#FEE2E2]">
            <FileText size={20} className="text-[#DC2626]" />
            <span className="text-[9px] leading-[14px] font-extrabold tracking-[0.45px] text-[#DC2626] uppercase">
              PDF
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate font-heading text-sm leading-5 font-bold text-[#0F172A]">
              {fileName}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs leading-4">
              <span className="font-medium text-[#334155]">
                {pages} {pages === 1 ? "page" : "pages"}
              </span>
              <span className="text-[#64748B]">·</span>
              <span className="text-[#64748B]">{fileSize}</span>
              <span className="text-[#64748B]">·</span>
              <span className="text-[#64748B]">A4 Format</span>
            </div>
          </div>
        </div>

        {fileUrl && (
          <div className="flex items-center gap-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs leading-4 font-semibold text-[#334155] transition hover:bg-slate-50"
            >
              <Eye size={14} className="text-[#64748B]" />
              Preview Pages
            </a>

            <a
              href={fileUrl}
              download={fileName}
              className="inline-flex size-[34px] items-center justify-center rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB] transition hover:bg-blue-100"
              aria-label="Download document"
            >
              <Download size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
