"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PI_DIGITS } from "@/lib/pi-digits";

// Build a display string: "3.14159..." repeated to fill the ticker
const DISPLAY_STRING = "3." + PI_DIGITS + "   3." + PI_DIGITS + "   ";

/**
 * Full-width 24px strip showing Pi digits scrolling left at ~40px/s.
 * JetBrains Mono, gold at 0.15 opacity. Pauses on hover.
 * Respects prefers-reduced-motion: shows static text when reduced motion is active.
 */
export default function PiDigitTicker() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        style={{
          height: "24px",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "11px",
            color: `rgba(212, 168, 67, 0.15)`,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {"3." + PI_DIGITS}
        </span>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        height: "24px",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Two copies of the content; animation translates -50% for seamless loop */}
      <span
        className="ticker-scroll"
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "11px",
          color: `rgba(212, 168, 67, 0.15)`,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          display: "inline-block",
          willChange: "transform",
        }}
      >
        {DISPLAY_STRING}
        {DISPLAY_STRING}
      </span>
    </div>
  );
}
