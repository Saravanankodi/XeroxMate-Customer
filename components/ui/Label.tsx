
import * as React from "react";

type LabelVariant = "solid" | "soft" | "outline" | "ghost";
type LabelColor = "blue" | "green" | "red" | "yellow" | "purple" | "gray";
type LabelSize = "sm" | "md" | "lg";

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: LabelVariant;
  color?: LabelColor;
  size?: LabelSize;
  dot?: boolean;
  dotColor?: string;
}

const colorStyles: Record<LabelColor, Record<LabelVariant, string>> = {
  blue: {
    solid: "bg-blue-600 text-white border-blue-600",
    soft: "bg-blue-100 text-blue-800 border-blue-200",
    outline: "bg-transparent text-blue-700 border-blue-300",
    ghost: "bg-transparent text-blue-700 border-transparent",
  },
  green: {
    solid: "bg-emerald-600 text-white border-emerald-600",
    soft: "bg-emerald-50 text-emerald-700 border-emerald-200",
    outline: "bg-transparent text-emerald-700 border-emerald-300",
    ghost: "bg-transparent text-emerald-700 border-transparent",
  },
  red: {
    solid: "bg-red-600 text-white border-red-600",
    soft: "bg-red-50 text-red-700 border-red-200",
    outline: "bg-transparent text-red-700 border-red-300",
    ghost: "bg-transparent text-red-700 border-transparent",
  },
  yellow: {
    solid: "bg-amber-500 text-white border-amber-500",
    soft: "bg-amber-50 text-amber-800 border-amber-200",
    outline: "bg-transparent text-amber-700 border-amber-300",
    ghost: "bg-transparent text-amber-700 border-transparent",
  },
  purple: {
    solid: "bg-violet-600 text-white border-violet-600",
    soft: "bg-violet-50 text-violet-700 border-violet-200",
    outline: "bg-transparent text-violet-700 border-violet-300",
    ghost: "bg-transparent text-violet-700 border-transparent",
  },
  gray: {
    solid: "bg-slate-700 text-white border-slate-700",
    soft: "bg-slate-100 text-slate-700 border-slate-200",
    outline: "bg-transparent text-slate-600 border-slate-300",
    ghost: "bg-transparent text-slate-600 border-transparent",
  },
};

const sizeStyles: Record<LabelSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1.5",
  md: "px-3 py-1 text-sm gap-2",
  lg: "px-4 py-1.5 text-base gap-2",
};

const dotStyles: Record<LabelColor, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  red: "bg-red-500",
  yellow: "bg-amber-500",
  purple: "bg-violet-500",
  gray: "bg-slate-500",
};

export function Label({
  children,
  variant = "soft",
  color = "blue",
  size = "md",
  dot = false,
  dotColor,
  className = "",
  ...props
}: LabelProps) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center rounded-full border font-semibold",
        "leading-5 transition-colors",
        colorStyles[color][variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={[
            "h-2 w-2 shrink-0 rounded-full",
            dotColor ?? dotStyles[color],
          ].join(" ")}
        />
      )}
      {children}
    </span>
  );
}
