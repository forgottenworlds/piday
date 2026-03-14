/**
 * SectionBackground — subtle static dot grid + faint radial glow.
 * Drop it as the first child of any section that has position: relative.
 * It renders absolute-inset with pointer-events: none so it never
 * intercepts clicks.
 */

interface SectionBackgroundProps {
  color?: "gold" | "cyan";
  className?: string;
}

export default function SectionBackground({
  color = "gold",
  className,
}: SectionBackgroundProps) {
  const glowColor =
    color === "gold"
      ? "rgba(212,168,67,0.03)"
      : "rgba(0,212,255,0.025)";

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Dot grid — lower opacity than hero version */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(212,168,67,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Single static radial glow, offset toward center-left */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "25%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          borderRadius: "9999px",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
