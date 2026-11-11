import type { ReactNode } from "react";
import { InfoIcon, WarningIcon, CheckCircleIcon, ErrorIcon, CloseIcon } from "./icons";

export interface BannerProps {
  variant?: "info" | "warning" | "success" | "error";
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const STYLES: Record<NonNullable<BannerProps["variant"]>, { container: string; icon: ReactNode }> = {
  info: {
    container: "bg-teal/10 border border-teal/30 text-ink",
    icon: <InfoIcon className="text-teal shrink-0 mt-0.5" />,
  },
  warning: {
    container: "bg-amber-50 border border-amber-200 text-amber-950",
    icon: <WarningIcon className="text-amber-700 shrink-0 mt-0.5" />,
  },
  success: {
    container: "bg-emerald-50 border border-emerald-200 text-emerald-950",
    icon: <CheckCircleIcon className="text-emerald-700 shrink-0 mt-0.5" />,
  },
  error: {
    container: "bg-red-50 border border-red-200 text-red-950",
    icon: <ErrorIcon className="text-red-700 shrink-0 mt-0.5" />,
  },
};

export default function Banner({ variant = "info", title, children, action, onDismiss, className = "" }: BannerProps) {
  const s = STYLES[variant];
  return (
    <div role="status" className={`rounded-xl p-4 flex items-start gap-3 ${s.container} ${className}`}>
      {s.icon}
      <div className="flex-1 min-w-0 text-sm">
        {title && <p className="font-semibold text-xs uppercase tracking-wide mb-1 opacity-90">{title}</p>}
        <div className="text-xs leading-relaxed opacity-95">{children}</div>
      </div>
      {action && <div className="shrink-0 ml-2">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 p-1 rounded-md hover:bg-black/5 text-ink-soft hover:text-ink-soft transition-colors"
          aria-label="Dismiss"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
