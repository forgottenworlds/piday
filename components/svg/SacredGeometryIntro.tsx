"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SacredGeometryIntroProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

// Approximate path lengths for dasharray/dashoffset initial state
const CIRCLE_OUTER_LEN = Math.ceil(2 * Math.PI * 90);   // r=90  ≈ 566

// Sacred geometry line length (approximate)
const LINE_LEN = 120;

// Logo contour path lengths (approximate)
const CONTOUR_LEN = 220;

export default function SacredGeometryIntro({
  onComplete,
  reducedMotion = false,
}: SacredGeometryIntroProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const svg = svgRef.current;
    if (!svg) return;

    const tl = gsap.timeline({
      onComplete,
    });

    // 1. (0s) Golden center dot appears
    tl.fromTo(
      "#sgCenterDot",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "200px 200px" }
    );

    // 2. (0.3s) Outer circle traces
    tl.to(
      "#sgOuterCircle",
      { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" },
      0.3
    );

    // 3. (1.3s) Sacred geometry lines — 6 elements draw simultaneously
    tl.to(
      ".sg-arc",
      { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.05 },
      1.3
    );
    tl.to(
      ".sg-line",
      { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.05 },
      1.3
    );

    // 4. (2.1s) Logo contour paths converge
    tl.to(
      ".sg-contour",
      { strokeDashoffset: 0, duration: 0.6, ease: "power3.inOut", stagger: 0.04 },
      2.1
    );

    // 5. (2.7s) Fade out
    tl.to(svg, { opacity: 0, duration: 0.3, ease: "power1.in" }, 2.7);

    return () => {
      tl.kill();
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  const gold = "#D4A843";
  const strokeProps = {
    stroke: gold,
    strokeWidth: 1.5,
    fill: "none",
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      width="400"
      height="400"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      {/* Step 1: center dot */}
      <circle
        id="sgCenterDot"
        cx="200"
        cy="200"
        r="4"
        fill={gold}
        opacity={0}
      />

      {/* Step 2: outer circle (r=90) */}
      <circle
        id="sgOuterCircle"
        cx="200"
        cy="200"
        r="90"
        {...strokeProps}
        strokeDasharray={CIRCLE_OUTER_LEN}
        strokeDashoffset={CIRCLE_OUTER_LEN}
      />

      {/* Step 3a: Sacred geometry arcs (Vesica Piscis / flower of life arcs) */}
      {/* Arc 1 — circle centered 90px up */}
      <circle
        className="sg-arc"
        cx="200"
        cy="110"
        r="90"
        {...strokeProps}
        strokeDasharray={CIRCLE_OUTER_LEN}
        strokeDashoffset={CIRCLE_OUTER_LEN}
        clipPath="url(#sgClip)"
      />
      {/* Arc 2 — circle centered 90px down */}
      <circle
        className="sg-arc"
        cx="200"
        cy="290"
        r="90"
        {...strokeProps}
        strokeDasharray={CIRCLE_OUTER_LEN}
        strokeDashoffset={CIRCLE_OUTER_LEN}
        clipPath="url(#sgClip)"
      />

      {/* Step 3b: radial lines */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x2 = 200 + 90 * Math.cos(rad);
        const y2 = 200 + 90 * Math.sin(rad);
        return (
          <line
            key={deg}
            className="sg-line"
            x1="200"
            y1="200"
            x2={x2}
            y2={y2}
            {...strokeProps}
            strokeDasharray={LINE_LEN}
            strokeDashoffset={LINE_LEN}
          />
        );
      })}

      {/* Clip circle so arcs only show inside outer ring */}
      <defs>
        <clipPath id="sgClip">
          <circle cx="200" cy="200" r="91" />
        </clipPath>
      </defs>

      {/* Step 4: Logo contour — outer badge circle (slightly larger), inner shield arc */}
      {/* Outer badge ring */}
      <circle
        className="sg-contour"
        cx="200"
        cy="200"
        r="100"
        {...strokeProps}
        strokeWidth={2}
        strokeDasharray={CONTOUR_LEN + 170}
        strokeDashoffset={CONTOUR_LEN + 170}
      />

      {/* Inner shield shape (arc from top sweeping to bottom, like a crest) */}
      <path
        className="sg-contour"
        d="M 200 110 C 250 110, 270 160, 270 200 C 270 250, 235 285, 200 300 C 165 285, 130 250, 130 200 C 130 160, 150 110, 200 110 Z"
        {...strokeProps}
        strokeDasharray={CONTOUR_LEN + 80}
        strokeDashoffset={CONTOUR_LEN + 80}
      />

      {/* Pi symbol strokes — two vertical bars */}
      <line
        className="sg-contour"
        x1="180"
        y1="175"
        x2="180"
        y2="225"
        {...strokeProps}
        strokeWidth={2}
        strokeDasharray={50}
        strokeDashoffset={50}
      />
      <line
        className="sg-contour"
        x1="220"
        y1="175"
        x2="220"
        y2="225"
        {...strokeProps}
        strokeWidth={2}
        strokeDasharray={50}
        strokeDashoffset={50}
      />
      {/* Pi top bar */}
      <line
        className="sg-contour"
        x1="170"
        y1="175"
        x2="230"
        y2="175"
        {...strokeProps}
        strokeWidth={2}
        strokeDasharray={60}
        strokeDashoffset={60}
      />
    </svg>
  );
}
