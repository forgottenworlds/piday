import React from "react";

interface BuyButtonProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Large pill CTA button with Pi Blue radial gradient fill and pulse-glow animation.
 * Hover reveals an intensified radial gradient and a gold ring ripple via ::after.
 * Active state: scale(0.98). Opens in a new tab.
 */
export function BuyButton({
  href,
  className = "",
  children = "Buy $PIDAY",
}: BuyButtonProps) {
  return (
    <>
      <style>{`
        .buy-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.875rem 2.5rem;
          border-radius: 9999px;
          border: none;
          background: radial-gradient(ellipse at 50% 40%, #e8bf5a 0%, #D4A843 60%, #b88c2e 100%);
          color: #0A0E1A;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.15s ease, background 0.2s ease;
        }

        .buy-button::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          border: 2px solid var(--color-gold);
          opacity: 0;
          transform: scale(1);
          transition: opacity 0.3s ease, transform 0.4s ease;
          pointer-events: none;
        }

        .buy-button:hover {
          background: radial-gradient(ellipse at 50% 35%, #f0cc6a 0%, #ddb84f 50%, #D4A843 100%);
        }

        .buy-button:hover::after {
          opacity: 0.6;
          transform: scale(1.12);
        }

        .buy-button:active {
          transform: scale(0.98);
        }

        .buy-button:focus-visible {
          outline: 2px solid var(--color-gold);
          outline-offset: 4px;
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`buy-button pulse-glow ${className}`}
      >
        {children}
      </a>
    </>
  );
}
