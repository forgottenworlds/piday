import Image from "next/image";
import {
  SocialIcon,
  XIcon,
  TelegramIcon,
  DexScreenerIcon,
  PumpFunIcon,
} from "@/components/ui/SocialIcon";
import { PLACEHOLDERS } from "@/lib/placeholders";

export function Footer() {
  return (
    <footer
      data-section="footer"
      style={{
        paddingTop: "12.5rem",
        paddingBottom: "5rem",
        position: "relative",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="$PIDAY logo"
          width={120}
          height={120}
          style={{ objectFit: "contain" }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 600,
            fontSize: "1.75rem",
            color: "#E8EDF5",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Born on Pi Day 2026. Dies never.
        </p>

        {/* Social icons — 4 icons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <SocialIcon href={PLACEHOLDERS.xUrl} label="X (Twitter)">
            <XIcon />
          </SocialIcon>
          <SocialIcon href={PLACEHOLDERS.telegramUrl} label="Telegram">
            <TelegramIcon />
          </SocialIcon>
          <SocialIcon href={PLACEHOLDERS.dexScreenerUrl} label="DexScreener">
            <DexScreenerIcon />
          </SocialIcon>
          <SocialIcon href={PLACEHOLDERS.pumpFunUrl} label="Pump.fun">
            <PumpFunIcon />
          </SocialIcon>
        </div>

        {/* Gold horizontal rule */}
        <div
          aria-hidden="true"
          style={{
            width: "200px",
            height: "1px",
            background: "var(--color-gold)",
            opacity: 0.5,
          }}
        />

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            opacity: 0.5,
            margin: 0,
            lineHeight: 1.6,
            maxWidth: "600px",
          }}
        >
          $PIDAY is a meme coin with no intrinsic value. This is not financial
          advice.
        </p>
      </div>
    </footer>
  );
}
