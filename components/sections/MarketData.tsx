"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CornerOrnament from "@/components/svg/CornerOrnament";
import DexScreenerPortal from "@/components/svg/DexScreenerPortal";
import { PLACEHOLDERS } from "@/lib/placeholders";

const STATS = [
  { label: "PRICE", value: PLACEHOLDERS.stats.price },
  { label: "MARKET CAP", value: PLACEHOLDERS.stats.marketCap },
  { label: "HOLDERS", value: PLACEHOLDERS.stats.holders },
  { label: "24H VOLUME", value: PLACEHOLDERS.stats.volume24h },
];

export function MarketData() {
  return (
    <section
      data-section="market-data"
      style={{
        padding: "6rem 0 8rem",
        position: "relative",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            The Circle Is{" "}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              Live
              <span
                className="live-pulse"
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: "#22C55E",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
            </span>
          </SectionHeader>
        </motion.div>

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            position: "relative",
            width: "100%",
            background: "#0F1629",
            border: "1px solid var(--color-gold)",
            borderRadius: "4px",
            padding: "3rem 2rem",
            /* Graph-paper faint grid */
            backgroundImage: [
              "repeating-linear-gradient(0deg, rgba(212,168,67,0.03) 0px, rgba(212,168,67,0.03) 1px, transparent 1px, transparent 40px)",
              "repeating-linear-gradient(90deg, rgba(212,168,67,0.03) 0px, rgba(212,168,67,0.03) 1px, transparent 1px, transparent 40px)",
            ].join(", "),
          }}
        >
          {/* Corner ornaments */}
          <div style={{ position: "absolute", top: "-1px", left: "-1px" }}>
            <CornerOrnament position="top-left" />
          </div>
          <div style={{ position: "absolute", top: "-1px", right: "-1px" }}>
            <CornerOrnament position="top-right" />
          </div>
          <div style={{ position: "absolute", bottom: "-1px", left: "-1px" }}>
            <CornerOrnament position="bottom-left" />
          </div>
          <div style={{ position: "absolute", bottom: "-1px", right: "-1px" }}>
            <CornerOrnament position="bottom-right" />
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:flex"
            style={{
              justifyContent: "center",
              gap: "0",
              width: "100%",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "1 1 0",
                  padding: "1rem 1.5rem",
                  position: "relative",
                }}
              >
                {/* Vertical divider between stats (desktop only) */}
                {i > 0 && (
                  <div
                    className="hidden md:block"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1px",
                      height: "40%",
                      background: "var(--color-gold)",
                      opacity: 0.3,
                    }}
                  />
                )}

                {/* Label */}
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "12px",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    marginBottom: "0.5rem",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {stat.label}
                </span>

                {/* Value */}
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "clamp(1.25rem, 4vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--color-gold)",
                    textAlign: "center",
                    lineHeight: 1.1,
                    wordBreak: "break-all",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* DexScreener portal row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              marginTop: "2.5rem",
            }}
          >
            <DexScreenerPortal href={PLACEHOLDERS.dexScreenerUrl} />
            <ViewOnDexScreenerLink href={PLACEHOLDERS.dexScreenerUrl} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Inline text link "View on DexScreener →" that transitions muted → gold on hover */
function ViewOnDexScreenerLink({ href }: { href: string }) {
  return (
    <>
      <style>{`
        .dex-text-link {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 0.875rem;
          color: var(--color-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .dex-text-link:hover {
          color: var(--color-gold);
        }
      `}</style>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="dex-text-link"
      >
        View on DexScreener →
      </a>
    </>
  );
}
