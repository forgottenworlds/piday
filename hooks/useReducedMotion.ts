"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the user has requested reduced motion via their OS/browser
 * preference (`prefers-reduced-motion: reduce`). Listens for real-time changes.
 *
 * The initial value is read lazily to avoid a synchronous setState call inside
 * the effect body, which ESLint flags as a potential cascade-render issue.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    // Safe to access window here because this runs only on the client.
    // During SSR, useState initialiser is called on the server where window
    // doesn't exist, so we default to false.
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}
