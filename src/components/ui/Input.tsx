"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorMessage, leftElement, rightElement, id, className = "", disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(errorMessage);

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-ink-soft">
            {label}
            {props.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && <div className="pointer-events-none absolute left-3 flex items-center text-ink-soft">{leftElement}</div>}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`w-full rounded-lg border bg-paper px-3 py-2 text-sm text-ink transition-colors placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-paper-soft disabled:text-ink-soft/40 ${
              leftElement ? "pl-9" : ""
            } ${rightElement ? "pr-9" : ""} ${hasError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-line"} ${className}`}
            {...props}
          />
          {rightElement && <div className="absolute right-3 flex items-center text-ink-soft">{rightElement}</div>}
        </div>
        {hasError ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-ink-soft">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
