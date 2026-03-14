"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
}

interface UseCountUpReturn {
  value: number;
  formatted: string;
  isRunning: boolean;
  start: () => void;
}

/**
 * Animates a number from 0 to `end` over `duration` ms with ease-out cubic easing.
 * Returns the current numeric value, a formatted string with thousand separators,
 * a running flag, and a `start` function to (re-)trigger the animation.
 */
export function useCountUp({
  end,
  duration = 1500,
  decimals = 0,
}: UseCountUpOptions): UseCountUpReturn {
  const [value, setValue] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const formatValue = useCallback(
    (val: number): string => {
      const fixed = val.toFixed(decimals);
      // Apply thousand separators to the integer part
      const parts = fixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    [decimals]
  );

  const start = useCallback(() => {
    // Cancel any in-progress animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    setValue(0);
    setIsRunning(true);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
        setIsRunning(false);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [end, duration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    value,
    formatted: formatValue(value),
    isRunning,
    start,
  };
}
