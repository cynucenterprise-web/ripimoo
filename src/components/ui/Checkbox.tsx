"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { CheckIcon } from "./icons";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  errorMessage?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, errorMessage, id, checked, onChange, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className={`inline-flex items-start gap-2.5 text-xs leading-relaxed select-none ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
          <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
            <input type="checkbox" id={inputId} ref={ref} checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" {...props} />
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                checked ? "border-accent bg-accent text-paper" : "border-line bg-paper peer-hover:border-ink-soft/40"
              } peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-1`}
            >
              {checked && <CheckIcon className="h-3 w-3 stroke-[3]" />}
            </div>
          </div>
          {label && <span className="text-ink-soft">{label}</span>}
        </label>
        {errorMessage && <p className="pl-6.5 text-xs text-red-600">{errorMessage}</p>}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
