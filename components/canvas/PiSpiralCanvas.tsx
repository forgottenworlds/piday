"use client";

import { useEffect, useRef } from "react";
import { PI_DIGITS } from "@/lib/pi-digits";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PiSpiralCanvasProps {
  className?: string;
  opacity?: number;
}

export default function PiSpiralCanvas({
  className,
  opacity = 0.06,
}: PiSpiralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const opacityRef = useRef(opacity);
  // eslint-disable-next-line react-hooks/refs
  opacityRef.current = opacity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Archimedean spiral: r = a + b * theta
    const a = 20;
    const b = 3;
    const angularStep = 0.25; // radians between digits
    const speed = 0.5; // rad/s

    let animId: number;
    let lastTime = 0;
    // thetaOffset drives continuous expansion
    let thetaOffset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const drawSpiral = (offset: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.min(cx, cy) * 0.92;

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(212, 168, 67, ${opacityRef.current})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let digitIndex = 0;
      let theta = offset;

      while (true) {
        const r = a + b * theta;
        if (r > maxR) break;

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        const ch = PI_DIGITS[digitIndex % PI_DIGITS.length];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(theta + Math.PI / 2);
        ctx.fillText(ch, 0, 0);
        ctx.restore();

        digitIndex++;
        theta += angularStep;
      }
    };

    if (reducedMotion) {
      drawSpiral(0);
    } else {
      const frame = (timestamp: number) => {
        const dt = lastTime === 0 ? 0 : (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        thetaOffset = (thetaOffset + speed * dt) % (2 * Math.PI);
        drawSpiral(thetaOffset);
        animId = requestAnimationFrame(frame);
      };
      animId = requestAnimationFrame(frame);
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
