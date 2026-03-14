"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContractAddressBar } from "@/components/ui/ContractAddressBar";
import { BuyButton } from "@/components/ui/BuyButton";
import RomanNumeral from "@/components/svg/RomanNumeral";
import ConnectingLine from "@/components/svg/ConnectingLine";
import { PLACEHOLDERS } from "@/lib/placeholders";

interface Step {
  numeral: 1 | 2 | 3;
  title: string;
  body: string;
  delay: number;
}

const STEPS: Step[] = [
  {
    numeral: 1,
    title: "Get a Wallet",
    body: "Download Phantom or Solflare. Fund it with SOL from any exchange.",
    delay: 0,
  },
  {
    numeral: 2,
    title: "Copy the Contract",
    body: "Tap the address above — or the one below. Paste it into Jupiter or Pump.fun.",
    delay: 0.15,
  },
  {
    numeral: 3,
    title: "Swap for $PIDAY",
    body: "Set slippage to 3–5%. Confirm the swap. Welcome to the circle.",
    delay: 0.3,
  },
];

const STEP_LABELS = ["I. Prepare", "II. Inscribe", "III. Enter"];

function StepCard({ step, index }: { step: Step; index: number }) {
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
        gap: "1rem",
        position: "relative",
      }}
    >
      {/* Step label (I. Prepare, etc.) */}
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          display: "block",
        }}
      >
        {STEP_LABELS[index]}
      </span>

      {/* Roman numeral */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RomanNumeral numeral={step.numeral} />
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

        {/* Connecting line + Step cards */}
        <div style={{ width: "100%", position: "relative" }}>
          {/* Horizontal connecting line — desktop only, centered vertically in step area */}
          <div
            className="hidden md:flex"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 0,
              width: "60%",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <ConnectingLine orientation="horizontal" />
          </div>

          {/* Vertical connecting line — mobile only */}
          <div
            className="flex md:hidden"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 0,
              height: "60%",
              flexDirection: "column",
              alignItems: "center",
            }}
            aria-hidden="true"
          >
            <ConnectingLine orientation="vertical" />
          </div>

          {/* Steps — flex row desktop, col mobile */}
          <div
            className="flex flex-col md:flex-row"
            style={{ position: "relative", zIndex: 1, gap: "0" }}
          >
            {STEPS.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
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
          {/* Gold hr divider */}
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

          {/* Address + Buy side by side desktop, stacked mobile */}
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
