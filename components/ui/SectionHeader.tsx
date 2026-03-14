import React from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Presentational section heading component.
 * Space Grotesk 600, 36px, centered, Ghost White.
 */
export function SectionHeader({ children, className = "" }: SectionHeaderProps) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 600,
        fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
        lineHeight: 1.2,
        textAlign: "center",
        color: "var(--color-text)",
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}
