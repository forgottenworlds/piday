import React from "react";

type Shape = "circle" | "triangle" | "hexagon";

interface GeometricShapeProps {
  shape: Shape;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

function ShapeElement({
  shape,
  cx,
  cy,
  r,
  strokeColor,
  strokeWidth,
}: {
  shape: Shape;
  cx: number;
  cy: number;
  r: number;
  strokeColor: string;
  strokeWidth: number;
}): React.ReactElement {
  const commonProps = {
    fill: "none" as const,
    stroke: strokeColor,
    strokeWidth,
  };

  if (shape === "circle") {
    const length = Math.ceil(2 * Math.PI * r);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        {...commonProps}
        strokeDasharray={length}
        strokeDashoffset={length}
        style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
      />
    );
  }

  if (shape === "triangle") {
    const pts = [0, 1, 2].map((i) => {
      const angle = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
    });
    const d = `M ${pts[0][0]} ${pts[0][1]} L ${pts[1][0]} ${pts[1][1]} L ${pts[2][0]} ${pts[2][1]} Z`;
    const side = r * Math.sqrt(3);
    const length = Math.ceil(3 * side);
    return (
      <path
        d={d}
        {...commonProps}
        strokeDasharray={length}
        strokeDashoffset={length}
        style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
      />
    );
  }

  // hexagon
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 6;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
  const d =
    `M ${pts[0][0]} ${pts[0][1]} ` +
    pts.slice(1).map(([x, y]) => `L ${x} ${y}`).join(" ") +
    " Z";
  const length = Math.ceil(6 * r);
  return (
    <path
      d={d}
      {...commonProps}
      strokeDasharray={length}
      strokeDashoffset={length}
      style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
    />
  );
}

const GeometricShape = React.forwardRef<SVGSVGElement, GeometricShapeProps>(
  (
    {
      shape,
      size = 200,
      strokeColor = "var(--color-gold)",
      strokeWidth = 1.5,
      className,
    },
    ref
  ) => {
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - strokeWidth * 2;

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
        overflow="visible"
      >
        <ShapeElement
          shape={shape}
          cx={cx}
          cy={cy}
          r={r}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }
);

GeometricShape.displayName = "GeometricShape";

export default GeometricShape;
