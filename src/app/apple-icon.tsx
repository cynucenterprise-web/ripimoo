import { ImageResponse } from "next/og";

// Same artwork as src/app/icon.svg (design-reference/public/favicon.svg) —
// Apple touch icons need a PNG, so this redraws the same paths as JSX for
// next/og's Satori renderer rather than reusing the .svg file directly.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width={180} height={180} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="50%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>
          <linearGradient id="paper-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdfa" />
          </linearGradient>
          <linearGradient id="sync-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#bg-grad)" />
        <line x1="8" y1="32" x2="56" y2="32" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 3" />
        <g opacity="0.85">
          <rect x="13" y="11" width="28" height="38" rx="4" fill="#14b8a6" fillOpacity="0.4" stroke="#5eead4" strokeOpacity="0.6" strokeWidth="1.5" />
          <line x1="18" y1="18" x2="28" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="18" y1="24" x2="35" y2="24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          <line x1="18" y1="29" x2="32" y2="29" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </g>
        <g>
          <rect x="23" y="15" width="28" height="38" rx="4" fill="url(#paper-front)" stroke="#ccfbf1" strokeWidth="1" />
          <rect x="28" y="21" width="13" height="3" rx="1.5" fill="#0f766e" />
          <circle cx="45" cy="22.5" r="1.5" fill="#0d9488" />
          <line x1="28" y1="28" x2="46" y2="28" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="28" y1="33" x2="42" y2="33" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.85" />
          <line x1="28" y1="38" x2="44" y2="38" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <path d="M15 36 C 11 44, 20 54, 30 52 C 37 50.5, 42 46, 44 42" fill="none" stroke="url(#sync-glow)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="44" cy="42" r="3.5" fill="#2dd4bf" />
        <circle cx="44" cy="42" r="1.8" fill="#ffffff" />
      </svg>
    ),
    { ...size }
  );
}
