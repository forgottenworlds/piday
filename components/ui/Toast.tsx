"use client";

import { AnimatePresence, motion } from "framer-motion";

type ToastStatus = "idle" | "copied" | "failed";

interface ToastProps {
  status: ToastStatus;
}

/**
 * Fixed-position toast notification displayed at bottom-right.
 * Uses Framer Motion AnimatePresence for enter/exit animations.
 * Visible when status is "copied" or "failed".
 */
export function Toast({ status }: ToastProps) {
  const isVisible = status !== "idle";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={status}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 50,
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-gold)",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "14px",
            color: "var(--color-text)",
            maxWidth: "320px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          {status === "copied" ? (
            <>
              {/* Gold checkmark icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M3 8L6.5 11.5L13 5"
                  stroke="var(--color-gold)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Copied! Now go ape. π</span>
            </>
          ) : (
            <>
              {/* Warning icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M8 2L14 13H2L8 2Z"
                  stroke="var(--color-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6.5V9"
                  stroke="var(--color-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="11" r="0.75" fill="var(--color-muted)" />
              </svg>
              <span>
                Couldn&rsquo;t copy — select and copy manually.
              </span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
