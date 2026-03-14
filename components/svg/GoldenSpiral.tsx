import React from "react";

interface GoldenSpiralProps {
  className?: string;
}

// Archimedean spiral as a polyline approximated into SVG path
// ~2.5 turns, ~120px bounding box. Origin at center (60,60).
// r = a + b*theta, a=4, b=4, theta 0 → 5π
function buildSpiralPath(): string {
  const cx = 60;
  const cy = 60;
  const a = 4;
  const b = 4;
  const totalAngle = 2.5 * 2 * Math.PI; // 2.5 turns
  const steps = 300;
  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * totalAngle;
    const r = a + b * theta;
    const x = cx + r * Math.cos(theta - Math.PI / 2);
    const y = cy + r * Math.sin(theta - Math.PI / 2);
    points.push(i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return points.join(" ");
}

// Approximate path length for dash animation
const SPIRAL_PATH_LENGTH = 800;

const GoldenSpiral = React.forwardRef<SVGSVGElement, GoldenSpiralProps>(
  ({ className }, ref) => {
    const spiralPath = buildSpiralPath();

    return (
      <svg
        ref={ref}
        viewBox="0 0 120 130"
        width="120"
        height="130"
        className={className}
        aria-hidden="true"
        overflow="visible"
      >
        {/* Spiral path */}
        <path
          d={spiralPath}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={SPIRAL_PATH_LENGTH}
          strokeDashoffset={SPIRAL_PATH_LENGTH}
          style={{ transition: "stroke-dashoffset 1.8s ease-out" }}
        />
        {/* Gold dot beneath — the "period" of π */}
        <circle
          cx="60"
          cy="122"
          r="2.5"
          fill="var(--color-gold)"
          opacity={0}
          style={{ transition: "opacity 0.4s ease-out 1.6s" }}
        />
      </svg>
    );
  }
);

GoldenSpiral.displayName = "GoldenSpiral";

export default GoldenSpiral;
