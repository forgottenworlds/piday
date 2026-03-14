"use client";

import { useState, useRef } from "react";

type CopyStatus = "idle" | "copied" | "failed";

interface UseCopyToClipboardReturn {
  status: CopyStatus;
  copy: (text: string) => Promise<void>;
}

/**
 * Hook that copies text to the clipboard.
 * Returns the current status ("idle" | "copied" | "failed") and a copy function.
 * Status automatically resets to "idle" after 2300ms.
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async (text: string): Promise<void> => {
    // Clear any existing reset timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      // Fallback: hidden textarea + execCommand
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setStatus("copied");
      } catch {
        setStatus("failed");
      }
    }

    // Reset to idle after 2300ms
    timeoutRef.current = setTimeout(() => {
      setStatus("idle");
    }, 2300);
  };

  return { status, copy };
}
