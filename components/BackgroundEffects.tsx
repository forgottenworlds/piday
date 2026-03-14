"use client";

/**
 * BackgroundEffects — fixed gradient orbs that float behind all page content.
 * Position: fixed, z-index: 1 (above canvas, below main content at z-10).
 * Pointer-events: none so they never interfere with interaction.
 *
 * Orb colors use very low opacity to stay ambient:
 *   - Pi Gold (#D4A843) at 0.06–0.08
 *   - Pi Blue (#1A3CE6) at 0.03
 *   - Neon Cyan (#00D4FF) at 0.02
 */
export default function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Orb 1 — Gold, top-left quadrant */}
      <div
        className="orb-1"
        style={{
          position: "absolute",
          top: "5%",
          left: "10%",
          width: "520px",
          height: "520px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at center, rgba(212, 168, 67, 0.08) 0%, rgba(212, 168, 67, 0.03) 50%, transparent 75%)",
          filter: "blur(40px)",
          animation: "orb-drift-1 28s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — Gold, bottom-right quadrant */}
      <div
        className="orb-2"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: "480px",
          height: "480px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at center, rgba(212, 168, 67, 0.06) 0%, rgba(212, 168, 67, 0.02) 50%, transparent 75%)",
          filter: "blur(50px)",
          animation: "orb-drift-2 35s ease-in-out infinite",
        }}
      />

      {/* Orb 3 — Pi Blue, center-right */}
      <div
        className="orb-3"
        style={{
          position: "absolute",
          top: "35%",
          right: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at center, rgba(26, 60, 230, 0.05) 0%, rgba(26, 60, 230, 0.02) 50%, transparent 75%)",
          filter: "blur(60px)",
          animation: "orb-drift-3 24s ease-in-out infinite",
        }}
      />

      {/* Orb 4 — Neon Cyan, bottom-left */}
      <div
        className="orb-4"
        style={{
          position: "absolute",
          bottom: "25%",
          left: "5%",
          width: "360px",
          height: "360px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at center, rgba(0, 212, 255, 0.03) 0%, rgba(0, 212, 255, 0.01) 50%, transparent 75%)",
          filter: "blur(55px)",
          animation: "orb-drift-4 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
