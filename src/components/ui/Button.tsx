"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { SpinnerIcon } from "./icons";

/**
 * Ported from design-reference's Button.tsx — shape/sizing/variant
 * structure kept. redesign-v2: primary is teal (--color-accent), matching
 * every primary CTA in the approved screenshots (Start Free Workspace,
 * Open Workspace Console, Get Pro, Update My Documents) — the earlier
 * redesign-v1 pass used a near-black primary; that's no longer accurate
 * to the source-of-truth screenshots. No dark: variants (light only).
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const SIZE_STYLES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-xs px-3 py-1.5 h-8 gap-1.5",
  md: "text-sm px-4 py-2 h-10 gap-2",
  lg: "text-base px-5 py-2.5 h-12 gap-2.5",
};

const VARIANT_STYLES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-paper hover:bg-accent-strong active:bg-accent-strong shadow-xs",
  secondary: "bg-paper-soft text-ink hover:bg-line active:bg-line",
  outline: "border border-line bg-transparent text-ink hover:bg-paper-soft active:bg-line",
  ghost: "bg-transparent text-ink-soft hover:bg-paper-soft active:bg-line",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-xs",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, className = "", disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 rounded-lg select-none";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${base} ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`}
        {...props}
      >
        {isLoading ? <SpinnerIcon className="shrink-0" /> : leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
