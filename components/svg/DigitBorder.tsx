import React from "react";
import { PI_DIGITS } from "@/lib/pi-digits";

interface DigitBorderProps {
  width: number;
  height: number;
  className?: string;
}

export default function DigitBorder({
  width,
  height,
  className,
}: DigitBorderProps) {
  // Perimeter path for the textPath
  const perimeter = 2 * (width + height);

  // Build enough digit string to fill the perimeter
  // Approximate: 1 character per ~8px at small font sizes
  const charsNeeded = Math.ceil(perimeter / 8) * 2; // double for animation
  const digits = PI_DIGITS.repeat(Math.ceil(charsNeeded / PI_DIGITS.length)).slice(
    0,
    charsNeeded
  );

  const pathId = `digit-border-path-${width}x${height}`;

  // Rectangular path: start top-left, go clockwise
  const d = `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        <path id={pathId} d={d} />
        <style>{`
          .digit-border-text-${width}x${height} {
            font-family: "JetBrains Mono", monospace;
            font-size: 7px;
            fill: rgba(212, 168, 67, 0.5);
            letter-spacing: 1px;
          }
          .digit-border-group-${width}x${height}:hover .digit-border-text-${width}x${height} {
            animation: digit-border-scroll-${width}x${height} 6s linear infinite;
          }
          @keyframes digit-border-scroll-${width}x${height} {
            from { startOffset: 0%; }
            to   { startOffset: 100%; }
          }
        `}</style>
      </defs>

      <g className={`digit-border-group-${width}x${height}`}>
        <text>
          <textPath
            href={`#${pathId}`}
            className={`digit-border-text-${width}x${height}`}
            startOffset="0%"
          >
            {digits}
          </textPath>
        </text>
      </g>
    </svg>
  );
}
