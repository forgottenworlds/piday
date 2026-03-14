"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GeometricShape from "@/components/svg/GeometricShape";
import { PLACEHOLDERS } from "@/lib/placeholders";

interface StatItem {
  shape: "circle" | "triangle" | "hexagon";
  emoji: string;
  value: string;
  label: string;
  subLabel: string;
  delay: number;
}

const STATS: StatItem[] = [
  {
    shape: "circle",
    emoji: "🥧",
    value: PLACEHOLDERS.tokenomics.totalSupply,
    label: "Total Supply",
    subLabel: "Based on the digits of π",
    delay: 0,
  },
  {
    shape: "triangle",
    emoji: "🔥",
    value: PLACEHOLDERS.tokenomics.burnRate,
    label: "Burn Rate",
    subLabel: "Per transaction, forever",
    delay: 0.3,
  },
  {
    shape: "hexagon",
    emoji: "🔒",
    value: PLACEHOLDERS.tokenomics.lpLock,
    label: "LP Lock",
    subLabel: "Verified on-chain",
    delay: 0.6,
  },
];

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <motion.div
      data-animate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: stat.delay, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0",
        flex: "1 1 200px",
        minWidth: 0,
        background: "rgba(15, 22, 41, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 168, 67, 0.15)",
        borderRadius: "1rem",
        padding: "1.5rem 2rem",
      }}
    >
      {/* Emoji icon */}
      <span style={{ fontSize: "3.5rem", lineHeight: 1, marginBottom: "0" }} aria-hidden="true">
        {stat.emoji}
      </span>

      {/* Shape with text overlay */}
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <GeometricShape shape={stat.shape} size={200} />
        {/* Centered text overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            padding: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-gold)",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              textAlign: "center",
            }}
          >
            {stat.label}
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              textAlign: "center",
              opacity: 0.7,
            }}
          >
            {stat.subLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tokenomics() {
  return (
    <section
      data-section="tokenomics"
      style={{
        padding: "6rem 0 8rem",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-surface)",
      }}
    >
      {/* Ambient construction lines */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <line
          x1="0"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.05"
        />
        <line
          x1="100%"
          y1="30%"
          x2="0"
          y2="70%"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.05"
        />
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="var(--color-gold)"
          strokeWidth="1"
          opacity="0.03"
        />
      </svg>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4rem",
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
            The Numbers Don&apos;t Lie. They&apos;re Irrational.
          </SectionHeader>
        </motion.div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
            width: "100%",
          }}
        >
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Fair launch tagline */}
        <motion.p
          data-animate
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "1rem",
            color: "var(--color-muted)",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          No team tokens{" "}
          <span style={{ color: "var(--color-gold)" }}>·</span> No presale{" "}
          <span style={{ color: "var(--color-gold)" }}>·</span> No insider
          allocation{" "}
          <span style={{ color: "var(--color-gold)" }}>·</span> 100% fair launch.
        </motion.p>
      </div>
    </section>
  );
}
