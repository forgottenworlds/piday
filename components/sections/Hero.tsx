"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SacredGeometryIntro from "@/components/svg/SacredGeometryIntro";
import { ContractAddressBar } from "@/components/ui/ContractAddressBar";
import { BuyButton } from "@/components/ui/BuyButton";
import {
  SocialIcon,
  XIcon,
  TelegramIcon,
  DexScreenerIcon,
} from "@/components/ui/SocialIcon";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PLACEHOLDERS } from "@/lib/placeholders";

const HEADLINE_WORDS = ["Infinite.", "Irrational.", "Unstoppable."];

export default function Hero() {
  const [introComplete, setIntroComplete] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <section
      data-section="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo — always rendered, starts centered, animates to top on intro complete */}
      <motion.div
        initial={false}
        animate={
          introComplete
            ? {
                position: "relative" as const,
                width: 64,
                height: 64,
                marginBottom: 0,
              }
            : {
                position: "relative" as const,
                width: 120,
                height: 120,
                marginBottom: 0,
              }
        }
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ zIndex: 1 }}
      >
        <Image
          src="/images/logo.png"
          alt="$PIDAY logo"
          width={120}
          height={120}
          priority
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </motion.div>

      {/* Sacred geometry intro overlay — sits on top of logo */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <SacredGeometryIntro
              onComplete={handleIntroComplete}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content — revealed after intro */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1rem",
              gap: "1.5rem",
              zIndex: 2,
            }}
          >
            {/* Logo label row */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "var(--color-text)",
                  letterSpacing: "0.02em",
                }}
              >
                $PIDAY
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                piday.online
              </span>
            </motion.div>

            {/* Headline — staggered words */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0 0.5rem",
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    color: "var(--color-text)",
                    textShadow: "0 0 40px rgba(212, 168, 67, 0.15)",
                    lineHeight: 1.15,
                    display: "inline-block",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "1.25rem",
                color: "var(--color-muted)",
                textAlign: "center",
                maxWidth: "600px",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              The only coin with a built-in global holiday. Born on Pi Day 2026.
            </motion.p>

            {/* Contract address */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.45 }}
            >
              <ContractAddressBar address={PLACEHOLDERS.contractAddress} />
            </motion.div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.6 }}
            >
              <BuyButton href={PLACEHOLDERS.buyUrl}>Buy $PIDAY</BuyButton>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.75 }}
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              <SocialIcon href={PLACEHOLDERS.dexScreenerUrl} label="DexScreener">
                <DexScreenerIcon />
              </SocialIcon>
              <SocialIcon href={PLACEHOLDERS.xUrl} label="X (Twitter)">
                <XIcon />
              </SocialIcon>
              <SocialIcon href={PLACEHOLDERS.telegramUrl} label="Telegram">
                <TelegramIcon />
              </SocialIcon>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
