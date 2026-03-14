"use client";

import { useEffect, useState } from "react";

/**
 * Fixed bottom-center scroll indicator: a thin vertical golden line ending in
 * a small circle. Animates with a gentle bob (plumb-bob keyframe).
 * Fades out when scrollY > 100px.
 * Click scrolls to the element with data-section="tokenomics".
 */
export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const target = document.querySelector<HTMLElement>(
      '[data-section="tokenomics"]'
    );
    if (target) {
      const top =
        target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to Tokenomics section"
      className="plumb-bob"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 50,
      }}
    >
      {/* Vertical line */}
      <div
        style={{
          width: "1px",
          height: "54px",
          background: "var(--color-gold)",
          opacity: 0.6,
        }}
      />
      {/* End circle */}
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "9999px",
          background: "var(--color-gold)",
          marginTop: "2px",
          opacity: 0.8,
        }}
      />
    </button>
  );
}
