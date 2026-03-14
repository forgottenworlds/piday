"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import DigitBorder from "@/components/svg/DigitBorder";
import { XIcon, TelegramIcon } from "@/components/ui/SocialIcon";
import { PLACEHOLDERS } from "@/lib/placeholders";

const INITIAL_DEGEN_COUNT = 3141;

function GatewayCard({
  href,
  icon,
  heading,
  body,
  ctaLabel,
  delay,
}: {
  href: string;
  icon: React.ReactNode;
  heading: string;
  body: React.ReactNode;
  ctaLabel: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{ flex: "1 1 0", minWidth: 0, maxWidth: "500px" }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="gateway-card group"
        style={{
          display: "block",
          textDecoration: "none",
          position: "relative",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {/* DigitBorder as the panel border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <DigitBorder width={500} height={350} />
        </div>

        {/* Panel content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "3rem 2rem",
            minHeight: "350px",
            textAlign: "center",
            background: "rgba(15, 22, 41, 0.6)",
            transition: "background 0.3s ease",
          }}
          className="gateway-inner"
        >
          {/* Icon */}
          <div
            style={{
              color: "var(--color-gold)",
              opacity: 0.85,
            }}
          >
            {icon}
          </div>

          {/* Heading */}
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
            {heading}
          </h3>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1rem",
              color: "var(--color-muted)",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: "280px",
            }}
          >
            {body}
          </p>

          {/* Ghost CTA */}
          <span className="gateway-cta">
            {ctaLabel} →
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export function Community() {
  const [degenCount, setDegenCount] = useState(INITIAL_DEGEN_COUNT);

  useEffect(() => {
    const interval = setInterval(() => {
      setDegenCount((c) => c + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-section="community"
      style={{
        padding: "6rem 0 8rem",
        position: "relative",
        background: "var(--color-bg)",
      }}
    >
      <style>{`
        .gateway-card {
          transition: background 0.3s ease;
        }
        .gateway-card:hover .gateway-inner {
          background: rgba(20, 27, 50, 0.8);
        }
        .gateway-cta {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--color-gold);
          border-radius: 9999px;
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-muted);
          background: transparent;
          transition: color 0.2s ease, background-color 0.2s ease;
          letter-spacing: 0.03em;
        }
        .gateway-card:hover .gateway-cta {
          color: var(--color-gold);
          background-color: rgba(212, 168, 67, 0.06);
        }
        .gateway-icon-wrap svg {
          stroke: var(--color-gold);
        }
      `}</style>

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
          <SectionHeader>The Circle</SectionHeader>
        </motion.div>

        {/* Gateway panels + divider */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            width: "100%",
            alignItems: "stretch",
            gap: "0",
            justifyContent: "center",
          }}
        >
          {/* X Gateway */}
          <div data-animate-gateway style={{ flex: "1 1 0", minWidth: 0, maxWidth: "500px" }}>
          <GatewayCard
            href={PLACEHOLDERS.xUrl}
            delay={0}
            icon={
              <div style={{ transform: "scale(1.8)", display: "inline-flex" }} className="gateway-icon-wrap">
                <XIcon />
              </div>
            }
            heading="Follow @PiDayCoin"
            body="Get memes. Get alpha. Get irrational."
            ctaLabel="Enter"
          />
          </div>

          {/* Vertical divider (desktop) / horizontal divider (mobile) */}
          <div
            className="hidden md:flex"
            aria-hidden="true"
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 1.5rem",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "1px",
                height: "60%",
                background: "var(--color-gold)",
                opacity: 0.3,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Diamond at midpoint */}
              <div
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  border: "1px solid var(--color-gold)",
                  transform: "rotate(45deg)",
                  background: "var(--color-bg)",
                  top: "50%",
                  left: "50%",
                  marginTop: "-4px",
                  marginLeft: "-4px",
                }}
              />
            </div>
          </div>

          {/* Mobile horizontal divider */}
          <div
            className="flex md:hidden"
            aria-hidden="true"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem 0",
              width: "100%",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "40%",
                background: "var(--color-gold)",
                opacity: 0.3,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  border: "1px solid var(--color-gold)",
                  transform: "rotate(45deg)",
                  background: "var(--color-bg)",
                  top: "50%",
                  left: "50%",
                  marginTop: "-4px",
                  marginLeft: "-4px",
                }}
              />
            </div>
          </div>

          {/* Telegram Gateway */}
          <div data-animate-gateway style={{ flex: "1 1 0", minWidth: 0, maxWidth: "500px" }}>
          <GatewayCard
            href={PLACEHOLDERS.telegramUrl}
            delay={0.15}
            icon={
              <div style={{ transform: "scale(1.8)", display: "inline-flex" }} className="gateway-icon-wrap">
                <TelegramIcon />
              </div>
            }
            heading="Join the Circle"
            body={
              <>
                <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
                  {degenCount.toLocaleString()}
                </span>{" "}
                degens and counting.
              </>
            }
            ctaLabel="Enter"
          />
          </div>
        </div>
      </div>
    </section>
  );
}
