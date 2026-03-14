"use client";

import { useEffect, useRef } from "react";
import { PI_DIGITS } from "@/lib/pi-digits";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * HeroBackground — Matrix-style raining Pi digits + dot grid + pulsing radial glows.
 * Renders as absolute-inset, z-index 0, pointer-events none.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let columns: number[] = [];
    let colCount = 0;

    const FONT_SIZE = 28;
    const CHAR_OPACITY_MAX = 0.08;
    const FADE_SPEED = 0.015;
    const DROP_SPEED = 0.06; // cells per frame

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      colCount = Math.ceil(canvas!.width / FONT_SIZE);
      // Preserve existing columns, add new ones — push many far off-screen
      // so only ~30% of columns are active at any time (sparse look)
      while (columns.length < colCount) {
        columns.push(Math.random() < 0.3 ? Math.random() * -30 : -999);
      }
      columns.length = colCount;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      // Semi-transparent black fill to create trail fade effect
      ctx!.fillStyle = `rgba(10, 14, 26, ${FADE_SPEED})`;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `500 ${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx!.textAlign = "center";

      for (let i = 0; i < colCount; i++) {
        const y = columns[i] * FONT_SIZE;

        // Pick a Pi digit based on column + row position
        const charIndex = Math.abs(Math.floor(columns[i] * 7 + i * 13)) % PI_DIGITS.length;
        const char = PI_DIGITS[charIndex];

        // Head of the stream is brighter gold, trail fades to green-gold
        const headY = y;
        if (headY > 0 && headY < canvas!.height) {
          // Bright head character
          ctx!.fillStyle = `rgba(212, 168, 67, ${CHAR_OPACITY_MAX})`;
          ctx!.fillText(char, i * FONT_SIZE + FONT_SIZE / 2, headY);

          // Slightly brighter leading char
          ctx!.fillStyle = `rgba(232, 198, 107, ${CHAR_OPACITY_MAX + 0.04})`;
          ctx!.fillText(char, i * FONT_SIZE + FONT_SIZE / 2, headY);
        }

        // Advance the drop
        columns[i] += DROP_SPEED + Math.random() * 0.2;

        // Reset when off screen — only 2% chance per frame, keeps it sparse
        if (columns[i] * FONT_SIZE > canvas!.height && Math.random() > 0.995) {
          columns[i] = Math.random() * -30;
        }
      }

      animId = requestAnimationFrame(draw);
    }

    // Initial clear
    ctx.fillStyle = "rgba(10, 14, 26, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

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
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        }}
      />

      {/* Dot grid layer — on top of rain for texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(212,168,67,0.06) 1px, transparent 1px)",
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
            "radial-gradient(circle at center, rgba(212,168,67,0.08) 0%, rgba(212,168,67,0.02) 50%, transparent 75%)",
          borderRadius: "9999px",
          filter: "blur(20px)",
        }}
      />

      {/* Secondary cyan glow — offset top-right */}
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
