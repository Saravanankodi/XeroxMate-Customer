
"use client";

import { Search, X } from "lucide-react";

type StoreSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function StoreSearch({
  value,
  onChange,
}: StoreSearchProps) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
      <Search size={16} className="shrink-0 text-slate-400" />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search shops by name, street, locality or landmark..."
        aria-label="Search print shops"
        className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="rounded p-1 text-slate-400 hover:bg-slate-100"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
