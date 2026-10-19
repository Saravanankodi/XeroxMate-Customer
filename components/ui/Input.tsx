
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      leftIcon,
      rightIcon,
      id,
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) {
    const inputId =
      id ?? (props.name ? `input-${props.name}` : undefined);

    return (
      <div className={`w-full space-y-2 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-slate-700"
          >
            {label}
          </label>
        )}

        <div
          className={[
            "flex min-h-11.5 items-center gap-3 rounded-xl border bg-white px-3 shadow-sm",
            "transition focus-within:ring-4",
            error
              ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-100"
              : "border-blue-200 focus-within:border-blue-500 focus-within:ring-blue-100",
          ].join(" ")}
        >
          {leftIcon && (
            <span className="shrink-0 text-blue-600">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error && inputId ? `${inputId}-error` : undefined}
            className={[
              "min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900",
              "outline-none placeholder:text-slate-400",
              className,
            ].join(" ")}
            {...props}
          />

          {rightIcon && (
            <span className="shrink-0 text-slate-500">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p
            id={inputId ? `${inputId}-error` : undefined}
            role="alert"
            className="text-xs text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
