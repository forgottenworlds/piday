import React from "react";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerOrnamentProps {
  position: Position;
  className?: string;
}

// Arc length: quarter circle r=24 → πr/2 ≈ 37.7
const ARC_LEN = Math.ceil((Math.PI / 2) * 24); // 38
// Lines at 60 degrees from corner — length ~28 each
const LINE_LEN = 28;

// Rotation for each corner position
const ROTATIONS: Record<Position, number> = {
  "top-left": 0,
  "top-right": 90,
  "bottom-right": 180,
  "bottom-left": 270,
};

const CornerOrnament = React.forwardRef<SVGSVGElement, CornerOrnamentProps>(
  ({ position, className }, ref) => {
    const rotation = ROTATIONS[position];

    return (
      <svg
        ref={ref}
        viewBox="0 0 40 40"
        width="40"
        height="40"
        className={className}
        aria-hidden="true"
        style={{ transform: `rotate(${rotation}deg)` }}
        overflow="visible"
      >
        {/*
          Base orientation: top-left corner
          Arc: quarter circle from (0, 24) to (24, 0), centered at origin (0,0)
          Lines: two lines radiating at 0° and 60° from corner
        */}
        {/* Quarter circle arc */}
        <path
          d="M 0 24 A 24 24 0 0 1 24 0"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN}
          strokeDashoffset={ARC_LEN}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
        {/* Line at 0° (horizontal, pointing right) */}
        <line
          x1="0"
          y1="0"
          x2={LINE_LEN}
          y2="0"
          stroke="var(--color-gold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={LINE_LEN}
          style={{ transition: "stroke-dashoffset 0.8s ease-out 0.1s" }}
        />
        {/* Line at 60° (pointing down-right) */}
        <line
          x1="0"
          y1="0"
          x2={LINE_LEN * Math.cos((60 * Math.PI) / 180)}
          y2={LINE_LEN * Math.sin((60 * Math.PI) / 180)}
          stroke="var(--color-gold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={LINE_LEN}
          strokeDashoffset={LINE_LEN}
          style={{ transition: "stroke-dashoffset 0.8s ease-out 0.2s" }}
        />
      </svg>
    );
  }
);

CornerOrnament.displayName = "CornerOrnament";

export default CornerOrnament;
