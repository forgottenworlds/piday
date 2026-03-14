"use client";

/**
 * HeroBackground — animated dot grid + pulsing radial glows.
 * Renders as absolute-inset, z-index 0, pointer-events none.
 * Intended as the first child of the Hero <section>.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Dot grid layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(212,168,67,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Primary gold radial glow — center, slow pulse */}
      <div
        className="hero-glow-gold"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "600px",
          height: "600px",
          marginTop: "-300px",
          marginLeft: "-300px",
          background:
            "radial-gradient(circle at center, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0.02) 50%, transparent 75%)",
          borderRadius: "9999px",
          filter: "blur(20px)",
        }}
      />

      {/* Secondary cyan glow — offset top-right, slower + fainter */}
      <div
        className="hero-glow-cyan"
        style={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle at center, rgba(0,212,255,0.03) 0%, transparent 70%)",
          borderRadius: "9999px",
          filter: "blur(30px)",
        }}
      />

      <style>{`
        @keyframes hero-pulse-gold {
          0%   { transform: scale(1);   opacity: 1; }
          50%  { transform: scale(1.1); opacity: 0.75; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes hero-pulse-cyan {
          0%   { transform: scale(1);   opacity: 1; }
          50%  { transform: scale(1.08); opacity: 0.6; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .hero-glow-gold {
          animation: hero-pulse-gold 8s ease-in-out infinite;
        }
        .hero-glow-cyan {
          animation: hero-pulse-cyan 12s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-glow-gold, .hero-glow-cyan { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
