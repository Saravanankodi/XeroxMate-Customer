"use client";

import { useState } from "react";
import { MessageSquareText, Plus } from "lucide-react";

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
    <section className="rounded-xl bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MessageSquareText
            size={18}
            strokeWidth={2}
            className="shrink-0 text-[#005AB6]"
          />
          <h2 className="font-heading text-lg font-semibold leading-5.5 text-[#131B2E]">
            Notes for the Shop Operator
          </h2>
        </div>

        <span className="shrink-0 text-xs font-semibold leading-3.5 text-[#444651]">
          Optional
        </span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
        placeholder="e.g. Print the cover page in colour, staple top-left corner, keep in dry plastic pouch..."
        rows={3}
        className="mt-4 min-h-24 w-full resize-y rounded-lg bg-[#F2F3FF] p-4 text-sm leading-5 text-[#131B2E] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)] outline-none transition placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#005AB6]/20"
      />

      <div className="mt-5">
        <p className="font-heading text-xs font-medium leading-3.5 text-[#444651]">
          Quick presets for operator:
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => addPreset(preset)}
              className="inline-flex items-center gap-1 rounded-full bg-[#F2F3FF] px-2 py-1 text-xs font-medium leading-3.5 text-[#131B2E] shadow-sm transition hover:bg-[#E5E8FF] active:scale-[0.98]"
            >
              <Plus
                size={10}
                strokeWidth={2.5}
                className="shrink-0 text-[#005AB6]"
              />
              {preset}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
