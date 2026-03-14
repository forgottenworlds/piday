import React from "react";

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

/**
 * 40px circular social link button with thin gold border.
 * Hover: border fills solid gold, icon becomes white.
 */
export function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <>
      <style>{`
        .social-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          background: transparent;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          text-decoration: none;
          flex-shrink: 0;
        }

        .social-icon-link:hover {
          background-color: var(--color-gold);
          border-color: var(--color-gold);
          color: #ffffff;
        }

        .social-icon-link:hover svg {
          stroke: #ffffff;
          fill: none;
        }

        .social-icon-link:focus-visible {
          outline: 2px solid var(--color-gold);
          outline-offset: 2px;
        }
      `}</style>

      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon-link"
      >
        {children}
      </a>
    </>
  );
}

/* ============================================================
   Inline SVG icon components for social platforms
   ============================================================ */

/** X (Twitter) icon — thin linework, 20×20 */
export function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

/** Telegram paper-plane icon — thin linework, 20×20 */
export function TelegramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

/** DexScreener icon — stylized chart/screen shape */
export function DexScreenerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 17v3M16 17v3M5 20h14" />
      <path d="M7 13l3-4 3 3 4-5" />
    </svg>
  );
}

/** Pump.fun icon — stylized pump/rocket shape */
export function PumpFunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C12 2 6 8 6 14a6 6 0 0 0 12 0C18 8 12 2 12 2Z" />
      <path d="M9 21l-2 1M15 21l2 1" />
      <path d="M12 11v5" />
    </svg>
  );
}
