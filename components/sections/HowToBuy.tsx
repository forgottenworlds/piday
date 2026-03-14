"use client";

import { motion } from "framer-motion";
import { Wallet, ClipboardCopy, ArrowRightLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContractAddressBar } from "@/components/ui/ContractAddressBar";
import { BuyButton } from "@/components/ui/BuyButton";
import SectionBackground from "@/components/SectionBackground";
import { PLACEHOLDERS } from "@/lib/placeholders";

interface Step {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}

const STEPS: Step[] = [
  {
    icon: <Wallet size={40} strokeWidth={1.5} />,
    title: "Get a Wallet",
    body: "Download Phantom or Solflare. Fund it with SOL from any exchange.",
    delay: 0,
  },
  {
    icon: <ClipboardCopy size={40} strokeWidth={1.5} />,
    title: "Copy the Contract",
    body: "Tap the address above — or the one below. Paste it into Jupiter or Pump.fun.",
    delay: 0.15,
  },
  {
    icon: <ArrowRightLeft size={40} strokeWidth={1.5} />,
    title: "Swap for $PIDAY",
    body: "Set slippage to 3–5%. Confirm the swap. Welcome to the circle.",
    delay: 0.3,
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: step.delay, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1 1 0",
        minWidth: 0,
        padding: "2rem 1.5rem",
        textAlign: "center",
        gap: "0.5rem",
        position: "relative",
        background: "rgba(15, 22, 41, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 168, 67, 0.15)",
        borderTop: "2px solid rgba(212, 168, 67, 0.4)",
        borderRadius: "1rem",
      }}
    >
      {/* Lucide icon */}
      <div style={{ color: "var(--color-gold)", marginBottom: "0.25rem" }}>
        {step.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "var(--color-text)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {step.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "1rem",
          color: "var(--color-muted)",
          margin: 0,
          lineHeight: 1.65,
          maxWidth: "260px",
        }}
      >
        {step.body}
      </p>
    </motion.div>
  );
}

export function HowToBuy() {
  return (
    <section
      data-section="how-to-buy"
      style={{
        padding: "6rem 0 8rem",
        position: "relative",
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>Join the Circle</SectionHeader>
        </motion.div>

        {/* Step cards */}
        <div style={{ width: "100%", position: "relative" }}>
          <div
            className="flex flex-col md:flex-row"
            style={{ position: "relative", zIndex: 1, gap: "1.5rem" }}
          >
            {STEPS.map((step) => (
              <StepCard key={step.title} step={step} />
            ))}
          </div>
        </div>

        {/* Conversion block — contract address + buy button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: "100%" }}
        >
          <div
            aria-hidden="true"
            style={{
              height: "1px",
              background: "var(--color-gold)",
              opacity: 0.2,
              marginBottom: "2.5rem",
              width: "100%",
            }}
          />
          <div
            className="flex flex-col md:flex-row"
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            <ContractAddressBar address={PLACEHOLDERS.contractAddress} />
            <BuyButton href={PLACEHOLDERS.buyUrl}>Buy $PIDAY</BuyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
