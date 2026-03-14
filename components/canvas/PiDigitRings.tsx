"use client";

import { useEffect, useRef } from "react";
import { PI_DIGITS } from "@/lib/pi-digits";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PiDigitRingsProps {
  scrollProgress?: number;
  convergence?: number;
}

interface Ring {
  radius: number;
  digitOffset: number;
  angularVelocity: number;
  currentAngle: number;
  fontSize: number;
}

function buildRings(
  cx: number,
  cy: number,
  ringCount: number
): Ring[] {
  const maxRadius = Math.sqrt(cx * cx + cy * cy);
  const rings: Ring[] = [];
  for (let i = 0; i < ringCount; i++) {
    const t = ringCount === 1 ? 0.5 : i / (ringCount - 1);
    const radius = 60 + t * (maxRadius - 60);
    const baseFontSize = 8 + t * 6; // 8–14px
    const baseVelocity = 0.02 - t * 0.015; // 0.02 → 0.005
    const direction = i % 2 === 0 ? 1 : -1;
    rings.push({
      radius,
      digitOffset: (i * 157) % PI_DIGITS.length,
      angularVelocity: direction * baseVelocity,
      currentAngle: (i * Math.PI) / 4,
      fontSize: baseFontSize,
    });
  }
  return rings;
}

export default function PiDigitRings({
  scrollProgress = 0,
  convergence = 0,
}: PiDigitRingsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  // Stable refs so the animation loop always reads latest props without
  // re-running the effect. Updated synchronously during render so the canvas
  // draw loop always sees the current value.
  const scrollProgressRef = useRef(scrollProgress);
  const convergenceRef = useRef(convergence);
  // eslint-disable-next-line react-hooks/refs
  scrollProgressRef.current = scrollProgress;
  // eslint-disable-next-line react-hooks/refs
  convergenceRef.current = convergence;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;
    let ringCount = 10;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const getRings = (): Ring[] => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      return buildRings(cx, cy, ringCount);
    };

    let rings = getRings();

    const drawFrame = (timestamp: number) => {
      const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000;
      const frameTime = timestamp - lastTime;
      lastTime = timestamp;

      // Performance adaptation
      if (frameTime > 33 && ringCount > 2) {
        ringCount = Math.max(2, ringCount - 2);
        rings = getRings();
      }

      const sc = scrollProgressRef.current;
      const conv = convergenceRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      rings.forEach((ring, idx) => {
        if (!reducedMotion) {
          // scrollProgress subtly modulates speed (±20%)
          const speedMod = 1 + sc * 0.2;
          ring.currentAngle += ring.angularVelocity * dt * speedMod;
        }

        // convergence: collapse radius toward center
        const displayRadius = ring.radius * (1 - conv * 0.85);

        const circumference = 2 * Math.PI * displayRadius;
        const charSpacing = ring.fontSize * 0.65;
        const digitCount = Math.max(1, Math.floor(circumference / charSpacing));

        ctx.save();
        ctx.font = `${ring.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = "rgba(212, 168, 67, 0.04)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let j = 0; j < digitCount; j++) {
          const angle =
            ring.currentAngle + (j / digitCount) * 2 * Math.PI;
          const digitIndex =
            (ring.digitOffset + j) % PI_DIGITS.length;
          const ch = PI_DIGITS[digitIndex];

          const x = cx + displayRadius * Math.cos(angle);
          const y = cy + displayRadius * Math.sin(angle);

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(ch, 0, 0);
          ctx.restore();
        }

        ctx.restore();
        void idx; // suppress unused-var lint
      });

      animId = requestAnimationFrame(drawFrame);
    };

    if (reducedMotion) {
      // Single static draw
      const staticDraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        rings.forEach((ring) => {
          const circumference = 2 * Math.PI * ring.radius;
          const charSpacing = ring.fontSize * 0.65;
          const digitCount = Math.max(1, Math.floor(circumference / charSpacing));
          ctx.save();
          ctx.font = `${ring.fontSize}px "JetBrains Mono", monospace`;
          ctx.fillStyle = "rgba(212, 168, 67, 0.04)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          for (let j = 0; j < digitCount; j++) {
            const angle =
              ring.currentAngle + (j / digitCount) * 2 * Math.PI;
            const digitIndex = (ring.digitOffset + j) % PI_DIGITS.length;
            const ch = PI_DIGITS[digitIndex];
            const x = cx + ring.radius * Math.cos(angle);
            const y = cy + ring.radius * Math.sin(angle);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 2);
            ctx.fillText(ch, 0, 0);
            ctx.restore();
          }
          ctx.restore();
        });
      };
      staticDraw();
    } else {
      animId = requestAnimationFrame(drawFrame);
    }

    const handleResize = () => {
      resize();
      rings = getRings();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}
