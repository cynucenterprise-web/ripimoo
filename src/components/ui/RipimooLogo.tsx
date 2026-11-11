/**
 * Ported from design-reference/src/components/ui/RipimooLogo.tsx — the
 * emblem's own artwork and internal teal palette are kept exactly as
 * designed (it's the brand mark, a deliberate exception to the "existing
 * tokens win" rule). Only the wordmark text color was changed, from the
 * design's zinc-900/zinc-50 (light/dark) to the site's own `text-ink`
 * token — no dark mode on this site, and headings elsewhere already use
 * `text-ink`, not a hardcoded gray.
 */
const SIZE_MAP = {
  sm: { box: "w-7 h-7", svg: 28, title: "text-base", subtitle: "text-[9px]", gap: "gap-2" },
  md: { box: "w-9 h-9", svg: 36, title: "text-lg", subtitle: "text-[10px]", gap: "gap-2.5" },
  lg: { box: "w-12 h-12", svg: 48, title: "text-2xl", subtitle: "text-xs", gap: "gap-3.5" },
  xl: { box: "w-16 h-16", svg: 64, title: "text-3xl", subtitle: "text-sm", gap: "gap-4" },
} as const;

export interface RipimooLogoProps {
  size?: keyof typeof SIZE_MAP;
  showWordmark?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

export default function RipimooLogo({
  size = "md",
  showWordmark = true,
  showSubtitle = false,
  className = "",
}: RipimooLogoProps) {
  const s = SIZE_MAP[size];

  return (
    <div className={`inline-flex items-center ${s.gap} select-none ${className}`}>
      <div
        className={`${s.box} rounded-xl shadow-xs flex items-center justify-center shrink-0 overflow-hidden relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 ring-1 ring-teal-500/30`}
      >
        <svg width={s.svg} height={s.svg} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1">
          <defs>
            <linearGradient id="logo-paper-front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0fdfa" />
            </linearGradient>
            <linearGradient id="logo-sync-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <filter id="logo-doc-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#042f2e" floodOpacity="0.4" />
            </filter>
          </defs>
          <line x1="8" y1="32" x2="56" y2="32" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="32" y1="8" x2="32" y2="56" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="2 3" />
          <g opacity="0.9">
            <rect x="13" y="11" width="27" height="38" rx="3.5" fill="#14b8a6" fillOpacity="0.45" stroke="#5eead4" strokeOpacity="0.7" strokeWidth="1.2" />
            <line x1="18" y1="18" x2="28" y2="18" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
            <line x1="18" y1="24" x2="35" y2="24" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.7" />
            <line x1="18" y1="29" x2="31" y2="29" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.7" />
          </g>
          <g filter="url(#logo-doc-shadow)">
            <rect x="23" y="15" width="28" height="38" rx="3.5" fill="url(#logo-paper-front)" stroke="#ccfbf1" strokeWidth="1" />
            <rect x="28" y="21" width="13" height="3" rx="1.5" fill="#0f766e" />
            <circle cx="45" cy="22.5" r="1.5" fill="#0d9488" />
            <line x1="28" y1="28" x2="46" y2="28" stroke="#0f766e" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="28" y1="33" x2="41" y2="33" stroke="#0d9488" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.9" />
            <line x1="28" y1="38" x2="44" y2="38" stroke="#0f766e" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <path d="M15 36 C 11 44, 20 54, 30 52 C 37 50.5, 42 46, 44 42" fill="none" stroke="url(#logo-sync-glow)" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="44" cy="42" r="3.2" fill="#2dd4bf" />
          <circle cx="44" cy="42" r="1.6" fill="#ffffff" />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col justify-center">
          <span className={`font-bold tracking-tight text-ink leading-none ${s.title}`}>Ripimoo</span>
          {showSubtitle && (
            <span className={`font-semibold tracking-wide text-teal-700 mt-1 uppercase leading-none ${s.subtitle}`}>
              CV &amp; Cover Letter Tailoring
            </span>
          )}
        </div>
      )}
    </div>
  );
}
