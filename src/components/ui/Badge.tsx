import type { HTMLAttributes, ReactNode } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "accent" | "warning" | "error" | "success";
  size?: "sm" | "md";
  children: ReactNode;
}

const VARIANT_STYLES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-paper-soft text-ink-soft",
  accent: "bg-teal/15 text-ink",
  warning: "bg-amber-50 text-amber-800",
  error: "bg-red-50 text-red-700",
  success: "bg-emerald-50 text-emerald-700",
};

const SIZE_STYLES: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "text-[11px] px-2 py-0.5 rounded-md font-medium",
  md: "text-xs px-2.5 py-1 rounded-md font-medium",
};

export default function Badge({ children, variant = "neutral", size = "sm", className = "", ...props }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
