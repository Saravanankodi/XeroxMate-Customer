
import type { InputHTMLAttributes } from "react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({
  label,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const checkboxId =
    id ?? (props.name ? `checkbox-${props.name}` : undefined);

  return (
    <label
      htmlFor={checkboxId}
      className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600"
    >
      <input
        {...props}
        id={checkboxId}
        type="checkbox"
        className={[
          "h-4 w-4 rounded border-slate-300 accent-blue-600",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200",
          className,
        ].join(" ")}
      />
      {label}
    </label>
  );
}
