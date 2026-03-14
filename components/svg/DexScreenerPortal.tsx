"use client";

import { useState } from "react";
import { PI_DIGITS } from "@/lib/pi-digits";

interface DexScreenerPortalProps {
  href: string;
  className?: string;
}

// Circumference of digit ring (r=44): 2π×44 ≈ 276.5
const RING_CIRCUMFERENCE = Math.ceil(2 * Math.PI * 44);

// Build enough digits to fill the ring circumference
// ~7px per char at 8px font
const RING_CHARS = Math.ceil(RING_CIRCUMFERENCE / 7);
const ringText = PI_DIGITS.slice(0, RING_CHARS);

export default function DexScreenerPortal({
  href,
  className,
}: DexScreenerPortalProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="View on DexScreener"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 100 100"
        width="80"
        height="80"
        aria-hidden="true"
        overflow="visible"
      >
        <defs>
          {/* Circular text path for digit ring */}
          <path
            id="dex-ring-path"
            d="M 50 6 A 44 44 0 1 1 49.99 6"
          />
          <style>{`
            .dex-ring-group {
              transform-origin: 50px 50px;
              animation: portal-rotate 12s linear infinite;
            }
            .dex-ring-group.fast {
              animation-duration: 4s;
            }
            .dex-bar {
              fill: white;
              transition: fill 0.2s ease;
            }
            .dex-portal-link:hover .dex-bar {
              fill: #00D4FF;
            }
            .dex-border-circle {
              stroke: var(--color-gold);
              transition: stroke-opacity 0.2s ease;
            }
          `}</style>
        </defs>

        {/* Gold border circle */}
        <circle
          className="dex-border-circle"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={hovered ? 2 : 1.5}
          strokeOpacity={hovered ? 1 : 0.8}
        />

        {/* Rotating Pi digit ring */}
        <g className={`dex-ring-group${hovered ? " fast" : ""}`}>
          <text
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "7px",
              fill: `rgba(212, 168, 67, ${hovered ? 0.9 : 0.55})`,
            }}
          >
            <textPath href="#dex-ring-path">
              {ringText}
            </textPath>
          </text>
        </g>

        {/* Bar chart icon — 3 ascending bars, centered */}
        {/* Bar heights: 10, 16, 22 — base y=68 */}
        <rect className="dex-bar" x="30" y="58" width="8" height="10" rx="1" />
        <rect className="dex-bar" x="46" y="52" width="8" height="16" rx="1" />
        <rect className="dex-bar" x="62" y="46" width="8" height="22" rx="1" />
      </svg>
    </a>
  );
}
