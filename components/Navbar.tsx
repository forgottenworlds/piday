"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Tokenomics", selector: '[data-section="tokenomics"]' },
  { label: "Story", selector: '[data-section="story"]' },
  { label: "Buy", selector: '[data-section="how-to-buy"]' },
  { label: "Community", selector: '[data-section="community"]' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
      e.preventDefault();
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <nav
      aria-label="Site navigation"
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "calc(100% - 2rem)",
        maxWidth: "700px",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.35s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1.25rem",
          background: "rgba(10, 14, 26, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(212, 168, 67, 0.15)",
          borderRadius: "9999px",
        }}
      >
        {/* Left: Logo + brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/logo.png"
            alt="$PIDAY logo"
            width={32}
            height={32}
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--color-text)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            $PIDAY
          </span>
        </div>

        {/* Right: Nav links (hidden on mobile) */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map(({ label, selector }) => (
            <a
              key={label}
              href={selector}
              onClick={(e) => handleNavClick(e, selector)}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.875rem",
                color: "var(--color-muted)",
                textDecoration: "none",
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                transition: "color 0.2s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-gold)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgba(212, 168, 67, 0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-muted)";
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
