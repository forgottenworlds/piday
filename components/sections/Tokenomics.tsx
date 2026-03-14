"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import SectionBackground from "@/components/SectionBackground";

interface Feature {
  emoji: string;
  title: string;
  description: string;
  delay: number;
}

const FEATURES: Feature[] = [
  {
    emoji: "📅",
    title: "Built-In Holiday",
    description:
      "Every March 14, the entire internet celebrates Pi Day. No other coin has an annual global catalyst baked into the calendar.",
    delay: 0,
  },
  {
    emoji: "🤝",
    title: "100% Fair Launch",
    description:
      "Launched on Pump.fun. No presale. No team tokens. No insiders. Everyone starts equal.",
    delay: 0.15,
  },
  {
    emoji: "🔄",
    title: "Annual Catalyst",
    description:
      "Every year on March 14, $PIDAY re-enters the conversation. The meme renews itself. Forever.",
    delay: 0.3,
  },
  {
    emoji: "♾️",
    title: "Infinite & Irrational",
    description:
      "Pi never ends and never repeats. Sound like any chart you know? The number that never ends, on the coin that never dies.",
    delay: 0.45,
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      data-animate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: feature.delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        flex: "1 1 240px",
        minWidth: 0,
        background: "rgba(15, 22, 41, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 168, 67, 0.15)",
        borderRadius: "1rem",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "3rem", lineHeight: 1 }} aria-hidden="true">
        {feature.emoji}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "1.25rem",
          color: "var(--color-text)",
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.9375rem",
          color: "var(--color-muted)",
          margin: 0,
          lineHeight: 1.65,
          maxWidth: "280px",
        }}
      >
        {feature.description}
      </p>
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
      <SectionBackground color="gold" />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>Why $PIDAY?</SectionHeader>
        </motion.div>

        {/* Feature cards — 2x2 grid on desktop, single column mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
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
            fontSize: "1.125rem",
            color: "var(--color-muted)",
            textAlign: "center",
            margin: 0,
            maxWidth: "600px",
            lineHeight: 1.7,
          }}
        >
          Launched on Pi Day 2026 on{" "}
          <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
            Pump.fun
          </span>
          . The only coin with a built-in global holiday.
        </motion.p>
      </div>
    </section>
  );
}
