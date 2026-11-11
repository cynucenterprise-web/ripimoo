import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING_STYLES: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6 md:p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, title, subtitle, action, padding = "md", className = "", ...props }, ref) => (
    <div ref={ref} className={`bg-paper border border-line rounded-xl ${className}`} {...props}>
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-ink">{title}</h3>}
            {subtitle && <p className="text-xs text-ink-soft mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={PADDING_STYLES[padding]}>{children}</div>
    </div>
  )
);
Card.displayName = "Card";

export default Card;
