"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Toast } from "./Toast";

interface ContractAddressBarProps {
  address: string;
  className?: string;
}

/**
 * Gold-bordered pill that displays a contract address in JetBrains Mono.
 * Shows the full address on desktop and a truncated version (first 6 + last 4)
 * on mobile. Clicking anywhere copies the full address to clipboard.
 */
export function ContractAddressBar({
  address,
  className = "",
}: ContractAddressBarProps) {
  const { status, copy } = useCopyToClipboard();

  const truncated = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <>
      <style>{`
        .ca-bar {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--color-gold);
          border-radius: 9999px;
          padding: 0.5rem 1.25rem;
          background-color: transparent;
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 14px;
          color: var(--color-text);
          letter-spacing: 0.02em;
        }
        .ca-bar:hover {
          border-color: rgba(212, 168, 67, 0.8);
          background-color: rgba(212, 168, 67, 0.05);
        }
      `}</style>
      <button
        onClick={() => copy(address)}
        aria-label={`Copy contract address: ${address}`}
        title="Click to copy contract address"
        className={`ca-bar ${className}`}
      >
        {/* Copy icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          style={{ flexShrink: 0, opacity: 0.6 }}
        >
          <rect
            x="1"
            y="4"
            width="8"
            height="9"
            rx="1.5"
            stroke="var(--color-gold)"
            strokeWidth="1.2"
          />
          <path
            d="M4 4V2.5A1.5 1.5 0 0 1 5.5 1h7A1.5 1.5 0 0 1 14 2.5v7A1.5 1.5 0 0 1 12.5 11H11"
            stroke="var(--color-gold)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Full address — visible on md+ screens */}
        <span className="hidden md:inline">{address}</span>

        {/* Truncated address — visible on small screens */}
        <span className="inline md:hidden">{truncated}</span>
      </button>

      <Toast status={status} />
    </>
  );
}
