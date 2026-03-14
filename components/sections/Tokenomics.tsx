"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GeometricShape from "@/components/svg/GeometricShape";
import { PLACEHOLDERS } from "@/lib/placeholders";

/** Inline SVG icon: Pi symbol — represents the total supply derived from π */
function PiSymbolIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M8 12h20M14 12v16M22 12c0 0 0 10-1 14s-3 4-4 3"
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline SVG icon: Flame — represents the burn mechanism */
function FlameIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M18 4c0 0-8 8-8 16a8 8 0 0 0 16 0c0-4-2-7-4-9 0 0 1 4-1 6-1 1-3 1-3-1 0-3 4-7 0-12z"
        stroke="var(--color-gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 28a3 3 0 0 0 3-3c0-2-3-5-3-5s-3 3-3 5a3 3 0 0 0 3 3z"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

/** Inline SVG icon: Shield with lock — represents LP lock security */
function ShieldLockIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M18 3L5 9v8c0 8.5 5.5 16.5 13 19 7.5-2.5 13-10.5 13-19V9L18 3z"
        stroke="var(--color-gold)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="14" y="15" width="8" height="7" rx="1.5"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
      />
      <path
        d="M15.5 15v-2a2.5 2.5 0 0 1 5 0v2"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18.5" r="1" fill="var(--color-gold)" />
    </svg>
  );
}

interface StatItem {
  shape: "circle" | "triangle" | "hexagon";
  icon: React.ReactNode;
  value: string;
  label: string;
  subLabel: string;
  delay: number;
}

const STATS: StatItem[] = [
  {
    shape: "circle",
    icon: <PiSymbolIcon />,
    value: PLACEHOLDERS.tokenomics.totalSupply,
    label: "Total Supply",
    subLabel: "Based on the digits of π",
    delay: 0,
  },
  {
    shape: "triangle",
    icon: <FlameIcon />,
    value: PLACEHOLDERS.tokenomics.burnRate,
    label: "Burn Rate",
    subLabel: "Per transaction, forever",
    delay: 0.3,
  },
  {
    shape: "hexagon",
    icon: <ShieldLockIcon />,
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
        flex: "1 1 200px",
        minWidth: 0,
        background: "rgba(15, 22, 41, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 168, 67, 0.15)",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      {/* Icon above shape */}
      <div style={{ marginBottom: "0.5rem", opacity: 0.9 }}>
        {stat.icon}
      </div>

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
