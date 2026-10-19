
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

const presets = [
  "Staple top-left",
  "Transparent front sheet",
  "Punch 2 holes",
  "Urgent lab submission",
];

interface ShopOperatorNotesProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function ShopOperatorNotes({
  value,
  onChange,
}: ShopOperatorNotesProps) {
  const [internalNotes, setInternalNotes] = useState("");

  const notes = value ?? internalNotes;

  function updateNotes(next: string) {
    if (onChange) {
      onChange(next);
    } else {
      setInternalNotes(next);
    }
  }

  function addPreset(preset: string) {
    const next = notes.trim()
      ? `${notes.trim()}, ${preset}`
      : preset;

    updateNotes(next);
  }

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Menu size={25} className="text-blue-700" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Notes for the Shop Operator
          </h2>
        </div>

        <span className="shrink-0 text-sm font-medium text-slate-600">
          Optional
        </span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
        placeholder="e.g. Print the cover page in colour, staple top-left corner, keep in dry plastic pouch..."
        rows={4}
        className="min-h-36 w-full resize-y rounded-2xl border border-indigo-50 bg-[#f2f3ff] p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 sm:p-6 sm:text-base"
      />

      <div className="mt-5">
        <p className="mb-3 text-sm font-semibold text-gray-700 sm:text-base">
          Quick presets for operator:
        </p>

        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => addPreset(preset)}
              className="inline-flex items-center gap-2 rounded-full bg-[#f2f3ff] px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-indigo-100 active:scale-[0.98] sm:text-base"
            >
              <span className="text-lg leading-none text-blue-600">+</span>
              {preset}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
