"use client";

import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  showCount?: boolean;
  maxCharacters?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, errorMessage, showCount = false, maxCharacters, value, id, className = "", ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hasError = Boolean(errorMessage);
    const length = typeof value === "string" ? value.length : 0;
    const nearLimit = maxCharacters ? length > maxCharacters * 0.9 : false;
    const overLimit = maxCharacters ? length > maxCharacters : false;

    return (
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={textareaId} className="text-xs font-medium text-ink-soft">
              {label}
              {props.required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
          )}
          {showCount && maxCharacters && (
            <span className={`font-mono text-xs tabular-nums ${overLimit ? "font-semibold text-red-600" : nearLimit ? "text-amber-600" : "text-ink-soft/40"}`}>
              {length} / {maxCharacters}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          aria-invalid={hasError || overLimit}
          className={`w-full rounded-lg border bg-paper p-3 text-sm text-ink transition-colors placeholder:text-ink-soft/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-paper-soft disabled:text-ink-soft/40 ${
            hasError || overLimit ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-line"
          } ${className}`}
          {...props}
        />
        {hasError ? <p className="text-xs text-red-600">{errorMessage}</p> : helperText ? <p className="text-xs text-ink-soft">{helperText}</p> : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
