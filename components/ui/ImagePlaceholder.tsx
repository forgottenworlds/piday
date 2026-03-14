import React from "react";

interface ImagePlaceholderProps {
  width: number;
  height: number;
  description: string;
  className?: string;
  rounded?: boolean; // true = full circle, false = rounded-2xl
}

/**
 * Dashed gold-bordered placeholder for AI-generated character images.
 * Used throughout the page to mark where Pepe/William Jones illustrations go.
 */
export default function ImagePlaceholder({
  width,
  height,
  description,
  className = "",
  rounded = false,
}: ImagePlaceholderProps) {
  const borderRadius = rounded ? "9999px" : "1rem";

  return (
    <div
      className={className}
      aria-label={`Image placeholder: ${description}`}
      title={description}
      style={{
        width,
        height,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.375rem",
        padding: "0.5rem",
        borderRadius,
        border: "2px dashed rgba(212, 168, 67, 0.5)",
        background: "rgba(212, 168, 67, 0.05)",
        boxSizing: "border-box",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Camera / image icon */}
      <svg
        width={Math.min(width * 0.3, 28)}
        height={Math.min(height * 0.3, 28)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(212, 168, 67, 0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>

      {/* Description text — only shown if there's enough space */}
      {width >= 80 && height >= 80 && (
        <span
          style={{
            fontFamily: "var(--font-body), Inter, sans-serif",
            fontSize: "10px",
            lineHeight: 1.3,
            color: "rgba(212, 168, 67, 0.5)",
            display: "block",
            maxWidth: "100%",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
}
