
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Minus,
  Plus,
} from "lucide-react";


import Footer from "@/components/layout/Footer";
import OrderStepper from "@/components/layout/OrderStepper";
import DocumentUploadPanel from "@/components/order/DocumentUploadPanel";
import { Header } from "@/components/layout/Header";

type PrintSettings = {
  paper: string;
  color: string;
  sides: string;
  binding: string;
  layout: string;
  finishing: string;
  orientation: string;
  quantity: number;
  pageRange: string;
  instructions: string;
};

const initialSettings: PrintSettings = {
  paper: "A4 Paper (Standard 75 GSM Laser)",
  color: "Black & White (Monochrome Crisp)",
  sides: "Front only (Single Sided)",
  binding: "No binding (Loose Sheets)",
  layout: "1 Page / Sheet (Standard 100%)",
  finishing: "No extra service",
  orientation: "Portrait (Standard Vertical)",
  quantity: 1,
  pageRange: "All",
  instructions: "",
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-full appearance-none rounded-md border border-slate-300 bg-white px-2.5 pr-8 text-xs text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={13}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </span>
    </label>
  );
}

export default function SpecificationsPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] =
    useState<PrintSettings>(initialSettings);

  function updateSetting<K extends keyof PrintSettings>(
    key: K,
    value: PrintSettings[K],
  ) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function continueToStore() {
    if (!file) {
      window.alert("Please upload a document before continuing.");
      return;
    }

    // Temporary navigation until shared order state is implemented.
    // The file and settings are not yet persisted between pages.
    router.push("/order/store");
  }

  function previewDocument() {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const previewWindow = window.open(url, "_blank");

    if (!previewWindow) {
      URL.revokeObjectURL(url);
      window.alert("Please allow pop-ups to preview your document.");
      return;
    }

    // Release the temporary object URL after the preview has opened.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fd] text-slate-800">
      <Header />

      <main className="mx-auto w-full max-w-360 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Page title and progress */}
        <section className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Configure Document Customization
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Fine-tune print paper stock, binding, duplex options, and
              volume specifications.
            </p>
          </div>

          <OrderStepper currentStep={2} />
        </section>

        {/* Main two-column layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* LEFT: Document upload and session file */}
          <section className="space-y-5">
            <DocumentUploadPanel
              onFileChange={setFile}
              maxSizeMB={20}
            />

            {/* Loaded in session */}
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Loaded in Session
              </p>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="shrink-0 rounded-lg bg-rose-50 p-2.5 text-rose-500">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {file?.name || "No document selected"}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {file
                      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB · Ready to configure`
                      : "Upload a file to start configuring"}
                  </p>
                </div>

                {file && (
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      title="Preview document"
                      aria-label="Preview document"
                      onClick={previewDocument}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={20} />
                    </button>

                    <CheckCircle2
                      size={20}
                      className="text-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT: Print configuration */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {/* Selected document header */}
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-700">
                  Applied to: {file?.name || "Select a document"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Print specifications · Configure your preferences
                </p>
              </div>

              <span className="shrink-0 rounded bg-sky-50 px-2 py-1 text-[9px] font-semibold text-sky-700">
                {file ? "FILE SELECTED" : "NO FILE"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              {/* Paper type */}
              <SelectField
                label="Paper Type"
                value={settings.paper}
                onChange={(value) => updateSetting("paper", value)}
                options={[
                  "A4 Paper (Standard 75 GSM Laser)",
                  "A4 Paper (Premium 100 GSM)",
                  "A3 Paper (Standard 75 GSM)",
                  "A5 Paper (Standard 75 GSM)",
                ]}
              />

              {/* Quantity */}
              <div>
                <span className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-slate-500">
                  Quantity (Sets)
                </span>

                <div className="flex h-9 items-center overflow-hidden rounded-md border border-slate-300">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={settings.quantity <= 1}
                    onClick={() =>
                      updateSetting(
                        "quantity",
                        Math.max(1, settings.quantity - 1),
                      )
                    }
                    className="flex h-full items-center border-r border-slate-200 px-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={12} />
                  </button>

                  <span className="flex-1 text-center text-xs font-medium">
                    {settings.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={settings.quantity >= 999}
                    onClick={() =>
                      updateSetting(
                        "quantity",
                        Math.min(999, settings.quantity + 1),
                      )
                    }
                    className="flex h-full items-center border-l border-slate-200 px-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Colour profile */}
              <SelectField
                label="Colour Profile"
                value={settings.color}
                onChange={(value) => updateSetting("color", value)}
                options={[
                  "Black & White (Monochrome Crisp)",
                  "Colour (Standard)",
                  "Colour (High Quality)",
                ]}
              />

              {/* Print sides */}
              <SelectField
                label="Format / Print Sides"
                value={settings.sides}
                onChange={(value) => updateSetting("sides", value)}
                options={[
                  "Front only (Single Sided)",
                  "Front and back (Duplex)",
                ]}
              />

              {/* Binding */}
              <SelectField
                label="Binding Type"
                value={settings.binding}
                onChange={(value) => updateSetting("binding", value)}
                options={[
                  "No binding (Loose Sheets)",
                  "Staple binding",
                  "Spiral binding",
                  "Comb binding",
                ]}
              />

              {/* Page layout */}
              <SelectField
                label="Page Layout (N-up)"
                value={settings.layout}
                onChange={(value) => updateSetting("layout", value)}
                options={[
                  "1 Page / Sheet (Standard 100%)",
                  "2 Pages / Sheet",
                  "4 Pages / Sheet",
                ]}
              />

              {/* Finishing */}
              <SelectField
                label="Lamination & Finishing"
                value={settings.finishing}
                onChange={(value) => updateSetting("finishing", value)}
                options={[
                  "No extra service",
                  "Document lamination",
                  "Glossy cover",
                ]}
              />

              {/* Orientation */}
              <SelectField
                label="Orientation"
                value={settings.orientation}
                onChange={(value) =>
                  updateSetting("orientation", value)
                }
                options={[
                  "Portrait (Standard Vertical)",
                  "Landscape (Horizontal)",
                ]}
              />

              {/* Page range */}
              <label className="block min-w-0">
                <span className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-slate-500">
                  Page Range
                </span>

                <input
                  value={settings.pageRange}
                  onChange={(event) =>
                    updateSetting("pageRange", event.target.value)
                  }
                  placeholder="All or e.g. 1-5, 8"
                  className="h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              {/* Operator instructions */}
              <label className="block min-w-0">
                <span className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-slate-500">
                  Instructions (Optional)
                </span>

                <input
                  value={settings.instructions}
                  onChange={(event) =>
                    updateSetting("instructions", event.target.value)
                  }
                  placeholder="e.g. staple at top-left"
                  maxLength={300}
                  className="h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs outline-none transition focus:border-blue-500 "
                />
              </label>
            </div>
          </section>
        </div>

        {/* Bottom action bar */}
        <section className="sticky bottom-0 z-20 mt-6 flex flex-col justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-5px_20px_rgba(15,23,42,0.04)] backdrop-blur sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {file ? "1 Document Configured" : "No document uploaded"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {settings.quantity} set(s) · {settings.sides} · Laser finish
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <ChevronLeft size={14} />
              Back
            </button>

            <button
              type="button"
              onClick={continueToStore}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-linear-to-r from-sky-700 to-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Continue
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
