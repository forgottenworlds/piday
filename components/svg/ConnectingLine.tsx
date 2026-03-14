import React from "react";

interface ConnectingLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function ConnectingLine({
  orientation = "horizontal",
  className,
}: ConnectingLineProps) {
  const isHorizontal = orientation === "horizontal";

  // Horizontal: 140×24 viewBox, nodes at x=12, x=70, x=128 — y=12
  // Vertical:   24×140 viewBox, nodes at y=12, y=70, y=128 — x=12
  const vbW = isHorizontal ? 140 : 24;
  const vbH = isHorizontal ? 24 : 140;

  // Node positions
  const nodes = isHorizontal
    ? [
        { cx: 12, cy: 12, r: 3 },
        { cx: 70, cy: 12, r: 3 },
        { cx: 128, cy: 12, r: 5 }, // third node is larger
      ]
    : [
        { cx: 12, cy: 12, r: 3 },
        { cx: 12, cy: 70, r: 3 },
        { cx: 12, cy: 128, r: 5 },
      ];

  // Line endpoints
  const lineStart = isHorizontal ? { x1: 12, y1: 12, x2: 128, y2: 12 } : { x1: 12, y1: 12, x2: 12, y2: 128 };

  // Motion path for the moving dot (same as the line)
  const motionPath = isHorizontal
    ? "M 12 12 L 128 12"
    : "M 12 12 L 12 128";

  const filterId = `glow-${orientation}`;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={vbW}
      height={vbH}
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        {/* Glow filter for third node */}
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connecting line */}
      <line
        {...lineStart}
        stroke="var(--color-gold)"
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Nodes (first two normal, third with glow) */}
      {nodes.map(({ cx, cy, r }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--color-gold)"
          fillOpacity={i < 2 ? 0.7 : 1}
          filter={i === 2 ? `url(#${filterId})` : undefined}
        />
      ))}

      {/* Moving gold dot via animateMotion */}
      <circle r="2.5" fill="var(--color-gold)" fillOpacity="0.9">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={motionPath}
        />
      </circle>
    </svg>
  );
}
