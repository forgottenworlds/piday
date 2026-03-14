"use client";

import { motion } from "framer-motion";
import GoldenSpiral from "@/components/svg/GoldenSpiral";
import PiSpiralCanvas from "@/components/canvas/PiSpiralCanvas";

const PARA_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export default function Story() {
  return (
    <section
      data-section="story"
      style={{
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Background Pi spiral canvas — desktop */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden md:block"
        style={{ opacity: 0.06, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <PiSpiralCanvas opacity={0.06} />
      </div>

      {/* Background Pi spiral canvas — mobile */}
      <div
        className="absolute inset-0 w-full h-full block md:hidden"
        style={{ opacity: 0.04, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <PiSpiralCanvas opacity={0.04} />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "680px",
            marginLeft: 0,
            marginRight: "auto",
            position: "relative",
          }}
        >
          {/* Left vertical rule */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-2rem",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--color-gold)",
              opacity: 0.1,
            }}
          />

          {/* Heading: "Why Pi" + GoldenSpiral as "?" */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "flex-end",
              gap: "0.25rem",
              marginBottom: "3rem",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(5rem, 10vw, 7.5rem)",
                lineHeight: 1,
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              Why Pi
            </h2>
            {/* GoldenSpiral acts as the question mark */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "flex-end",
                marginBottom: "0.75rem",
                flexShrink: 0,
              }}
            >
              <GoldenSpiral />
            </span>
          </motion.div>

          {/* Paragraph 1 */}
          <motion.p
            data-animate
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={PARA_VARIANTS}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1.125rem",
              color: "var(--color-text)",
              lineHeight: 1.8,
              marginBottom: "2rem",
              marginTop: 0,
            }}
          >
            Pi is{" "}
            <span className="gold-flare-target">infinite</span> and{" "}
            <span className="gold-flare-target">irrational</span> — it never
            ends and never repeats. Sound like any chart you know?
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            data-animate
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={PARA_VARIANTS}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1.125rem",
              color: "var(--color-text)",
              lineHeight: 1.8,
              marginBottom: "2rem",
              marginTop: 0,
            }}
          >
            March 14 is{" "}
            <span className="gold-flare-target">Pi Day</span> worldwide.
            It&apos;s also{" "}
            <span className="gold-flare-target">Einstein&apos;s birthday</span>.
            Every year, billions of people celebrate. Every year, $PIDAY
            re-enters the conversation.
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            data-animate
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={PARA_VARIANTS}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1.125rem",
              color: "var(--color-text)",
              lineHeight: 1.8,
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            No other coin has a built-in global holiday. Annual catalyst.
            Infinite meme potential. The number that never ends, on{" "}
            <span className="gold-flare-target">the coin that never dies</span>.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
