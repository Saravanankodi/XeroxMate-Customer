"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  name?: string;
  options?: SelectOption[];
  value?: string | number;
  onChange?: (e: any) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  containerClassName?: string;
  className?: string;
  required?: boolean;
}

export const Select = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  placeholder = "Select",
  disabled = false,
  containerClassName = "",
  className = "",
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (onChange) {
      onChange({ target: { name, value: opt.value } } as any);
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className={"relative w-full min-w-0 " + (open ? "z-[9999] " : "z-0 ") + containerClassName}>
      {label && (
        <p className="block mb-2 text-[14px] font-medium text-[#374151]">
          {label}
        </p>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={[
          "w-full min-w-0 h-11 rounded-md border text-left pl-4 pr-9 relative",
          "bg-white text-[#161D16] text-sm outline-none transition",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-[#D7E6D6] focus:border-primary",
          disabled ? "opacity-60 cursor-not-allowed" : "",
          className,
        ].join(" ")}
      >
        <span className={"block truncate " + (selectedOption ? "" : "text-[#6B7280]")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform ${open ? "rotate-180" : ""} ${
            error ? "text-red-500" : "text-[#6B7280]"
          }`}
        />
      </button>

      {open && !disabled && (
        <ul className="absolute left-0 right-0 z-10000 mt-1 rounded-xl border border-[#C7C4D8] bg-white shadow-lg max-h-60 overflow-y-auto overflow-x-hidden">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => handleSelect(opt)}
              className={[
                "cursor-pointer px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#131B2E] hover:bg-gray-100 break-words leading-tight",
                opt.disabled ? "opacity-50 cursor-not-allowed" : "",
                opt.value === value ? "bg-gray-50 font-medium" : "",
              ].join(" ")}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

Select.displayName = "Select";
