import React from "react";

interface RomanNumeralProps {
  numeral: 1 | 2 | 3;
  className?: string;
}

// Each stroke is a vertical line ~40px tall.
// I = 1 stroke, II = 2 strokes, III = 3 strokes
// viewBox grows with stroke count for consistent spacing
const STROKE_HEIGHT = 40;
const STROKE_WIDTH_PX = 2;
const SPACING = 8; // gap between strokes
const PAD = 4;

function buildStrokes(count: number): {
  lines: { x: number; y1: number; y2: number }[];
  viewBoxWidth: number;
} {
  const viewBoxWidth =
    PAD * 2 + count * STROKE_WIDTH_PX + (count - 1) * SPACING;
  const lines = Array.from({ length: count }, (_, i) => ({
    x: PAD + i * (STROKE_WIDTH_PX + SPACING) + STROKE_WIDTH_PX / 2,
    y1: PAD,
    y2: PAD + STROKE_HEIGHT,
  }));
  return { lines, viewBoxWidth };
}

const RomanNumeral = React.forwardRef<SVGSVGElement, RomanNumeralProps>(
  ({ numeral, className }, ref) => {
    const { lines, viewBoxWidth } = buildStrokes(numeral);
    const viewBoxHeight = PAD * 2 + STROKE_HEIGHT;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        width={viewBoxWidth}
        height={viewBoxHeight}
        className={className}
        aria-label={["I", "II", "III"][numeral - 1]}
        overflow="visible"
      >
        {lines.map(({ x, y1, y2 }, i) => (
          <line
            key={i}
            x1={x}
            y1={y1}
            x2={x}
            y2={y2}
            stroke="var(--color-gold)"
            strokeWidth={STROKE_WIDTH_PX}
            strokeLinecap="round"
            strokeDasharray={STROKE_HEIGHT}
            strokeDashoffset={STROKE_HEIGHT}
            style={{
              transition: `stroke-dashoffset 0.6s ease-out ${i * 0.1}s`,
            }}
          />
        ))}
      </svg>
    );
  }
);

RomanNumeral.displayName = "RomanNumeral";

export default RomanNumeral;
