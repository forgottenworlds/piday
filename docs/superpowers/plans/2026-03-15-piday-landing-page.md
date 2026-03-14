# $PIDAY Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the piday.online landing page — a scroll-driven, sacred-mathematics-themed single-page site for the $PIDAY meme coin on Solana.

**Architecture:** Next.js 16 App Router with a single `page.tsx` composing 7 scroll-driven sections. Persistent Canvas background renders concentric Pi digit rings. GSAP ScrollTrigger orchestrates all scroll-driven animations. SVG path animations draw sacred geometry. Framer Motion handles non-scroll component transitions (toast). All content is static — no API calls, no database.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, shadcn, GSAP (ScrollTrigger), Framer Motion, Canvas 2D API, SVG

**Spec:** `docs/superpowers/specs/2026-03-15-piday-landing-page-design.md`

---

## File Map

```
app/
  layout.tsx              — MODIFY: fonts, metadata, favicons, body class
  page.tsx                — MODIFY: compose all sections + GSAP scroll orchestration
  globals.css             — MODIFY: design system variables, base styles, CSS animations

components/
  ui/
    Toast.tsx             — Copy-confirmation toast (Framer Motion)
    ContractAddressBar.tsx — CA pill with click-to-copy
    BuyButton.tsx         — Primary CTA with inner light + ripple hover
    SocialIcon.tsx        — Circular gold-bordered icon link
    SectionHeader.tsx     — Reusable section heading (Space Grotesk 600, 36px)
  canvas/
    PiDigitRings.tsx      — Full-page fixed Canvas: concentric rotating digit rings
    PiSpiralCanvas.tsx    — Section C: expanding Archimedean spiral of digits
  svg/
    SacredGeometryIntro.tsx — Hero load animation: dot → circle → geometry → logo
    GeometricShape.tsx    — Reusable stroke-draw shape (circle/triangle/hexagon)
    GoldenSpiral.tsx      — Archimedean spiral replacing "?" in "Why Pi?"
    CornerOrnament.tsx    — Quarter-arc + 60-degree construction mark
    RomanNumeral.tsx      — SVG Roman numerals (I, II, III) with stroke draw
    ConnectingLine.tsx    — Horizontal/vertical line with traveling light dot
    DigitBorder.tsx       — Text-on-path Pi digits forming a rectangle border
    DexScreenerPortal.tsx — Circular gateway with rotating digit ring
  sections/
    Hero.tsx              — Section A: hero with load animation
    Tokenomics.tsx        — Section B: three geometric constructions
    Story.tsx             — Section C: "Why Pi?" narrative
    MarketData.tsx        — Section D: stats panel + DexScreener portal
    HowToBuy.tsx          — Section E: three-step ritual
    Community.tsx         — Section F: X + Telegram gateways
    Footer.tsx            — Section G: the singularity
  PiDigitTicker.tsx       — Top-of-page scrolling inscription strip
  ScrollIndicator.tsx     — Plumb-line scroll indicator with bob animation
  ScrollOrchestrator.tsx  — GSAP ScrollTrigger master choreographer for all sections

hooks/
  useReducedMotion.ts     — prefers-reduced-motion media query hook
  useCopyToClipboard.ts   — Clipboard API with fallback + toast state
  useCountUp.ts           — Number counting/odometer animation hook

lib/
  pi-digits.ts            — First 2000 digits of Pi as a string
  placeholders.ts         — All placeholder URLs, addresses, stats
  fonts.ts                — Font configuration (Space Grotesk, Inter, JetBrains Mono)
```

---

## Chunk 1: Foundation & Shared Infrastructure

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install GSAP and Framer Motion**

```bash
npm install gsap framer-motion
```

- [ ] **Step 2: Verify installation**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install gsap and framer-motion"
```

---

### Task 2: Font configuration

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create font configuration**

Create `lib/fonts.ts`:

```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600", "700"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400"],
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["500"],
  display: "swap",
});
```

- [ ] **Step 2: Update layout.tsx to use new fonts**

Replace the Geist fonts in `app/layout.tsx` with the new fonts. Import from `@/lib/fonts`. Apply all three CSS variable classes to `<body>`. Remove Geist imports entirely.

```typescript
import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "$PIDAY — The Infinite Meme Coin | piday.online",
  description: "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add lib/fonts.ts app/layout.tsx
git commit -m "feat: configure Space Grotesk, Inter, JetBrains Mono fonts"
```

---

### Task 3: Design system — CSS variables and base styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with design system**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  /* Color palette */
  --color-bg: #0A0E1A;
  --color-surface: #0F1629;
  --color-primary: #1A3CE6;
  --color-accent: #00D4FF;
  --color-gold: #D4A843;
  --color-text: #E8EDF5;
  --color-muted: #6B7A99;
  --color-success: #22C55E;
}

@theme inline {
  --color-bg: var(--color-bg);
  --color-surface: var(--color-surface);
  --color-primary: var(--color-primary);
  --color-accent: var(--color-accent);
  --color-gold: var(--color-gold);
  --color-text: var(--color-text);
  --color-muted: var(--color-muted);
  --color-success: var(--color-success);
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-inter);
  /* Intentionally overrides Tailwind's default --font-mono so that
     the `font-mono` utility class produces JetBrains Mono */
  --font-mono: var(--font-jetbrains-mono);
}

/* Base styles */
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  overflow-x: hidden;
}

/* Focus states — keyboard only */
*:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

/* Reduced motion — only affects CSS @keyframes animations.
   GSAP scroll-driven animations are handled by useReducedMotion hook
   in ScrollOrchestrator.tsx. Do NOT add transition-duration override
   here — it would break GSAP's programmatic animations. */
@media (prefers-reduced-motion: reduce) {
  .ticker-scroll,
  .plumb-bob,
  .pulse-glow,
  .live-pulse,
  .portal-rotate {
    animation: none !important;
  }
}

/* Pi digit ticker animation */
@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Plumb line bob */
@keyframes plumb-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* Pulse for CTA glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(26, 60, 230, 0.3); }
  50% { box-shadow: 0 0 35px rgba(26, 60, 230, 0.5); }
}

/* Live indicator pulse */
@keyframes live-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

/* Gold text flare for illuminated words */
@keyframes gold-flare {
  0% { color: var(--color-text); }
  30% { color: var(--color-gold); }
  100% { color: var(--color-text); }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: design system with color palette, typography, CSS animations"
```

---

### Task 4: Shared data — Pi digits and placeholders

**Files:**
- Create: `lib/pi-digits.ts`
- Create: `lib/placeholders.ts`

- [ ] **Step 1: Create Pi digits constant**

Create `lib/pi-digits.ts` — a string containing the first 2000 decimal digits of Pi (no "3." prefix, just the decimals). This is used by the ticker, canvas rings, and spiral visualizations.

```typescript
// First 2000 decimal digits of Pi (after the "3.")
// 40 lines x 50 chars = 2000 digits
export const PI_DIGITS =
  "14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679" +
  "82148086513282306647093844609550582231725359408128" +
  "48111745028410270193852110555964462294895493038196" +
  "44288109756659334461284756482337867831652712019091" +
  "45648566923460348610454326648213393607260249141273" +
  "72458700660631558817488152092096282925409171536436" +
  "78925903600113305305488204665213841469519415116094" +
  "33057270365759591953092186117381932611793105118548" +
  "07446237996274956735188575272489122793818301194912" +
  "98336733624406566430860213949463952247371907021798" +
  "60943702770539217176293176752384674818467669405132" +
  "00056812714526356082778577134275778960917363717872" +
  "14684409012249534301465495853710507922796892589235" +
  "42019956112129021960864034418159813629774771309960" +
  "51870721134999999837297804995105973173281609631859" +
  "50244594553469083026425223082533446850352619311881" +
  "71010003137838752886587533208381420617177669147303" +
  "59825349042875546873115956286388235378759375195778" +
  "18577805321712268066130019278766111959092164201989" +
  "38095257201065485863278865936153381827968230301952" +
  "03530185296899577362259941389124972177528347913151" +
  "55748572424541506959508295331168617278558890750983" +
  "81754637464939319255060400927701671139009848824012" +
  "85836160356370766010471018194295559619894676783744" +
  "94482553797747268471040475346462080466842590694912" +
  "93313677028989152104752162056966024058038150193511" +
  "25338243003558764024749647326391419927260426992279" +
  "67823547816360093417216412199245863150302861829745" +
  "55706749838505494588586926995690927210797509302955" +
  "32116534498720275596023648066549911988183479775356" +
  "63698074265425278625518184175746728909777727938000" +
  "81647060016145249192173217214772350141441973568548" +
  "16136115735255213347574184946843852332390739414333" +
  "45477624168625189835694855620992192221842725502542" +
  "56887671790494601653466804988627232791786085784383" +
  "82796797668145410095388378636095068006422512520511" +
  "73929848960841284886269456042419652850222106611863" +
  "06744278622039194945047123713786960956364371917287" +
  "46776465757396241389086583264599581339047802759009";

// Full Pi string with "3." prefix
export const PI_FULL = "3." + PI_DIGITS;
```

- [ ] **Step 2: Create placeholders config**

Create `lib/placeholders.ts`:

```typescript
export const PLACEHOLDERS = {
  contractAddress: "PIDAY1x7kP9mN3rQ2vS8tW5yB4cF6hJ0dL2nR4kX4K9",
  buyUrl: "#",
  xHandle: "@PiDayCoin",
  xUrl: "#",
  telegramUrl: "#",
  dexScreenerUrl: "#",
  pumpFunUrl: "#",
  stats: {
    price: "$0.000314",
    marketCap: "$985.2K",
    holders: "1,592",
    volume24h: "$127.4K",
  },
  tokenomics: {
    totalSupply: "3,141,592,653",
    burnRate: "3.14%",
    lpLock: "314 Days",
  },
} as const;
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add lib/pi-digits.ts lib/placeholders.ts
git commit -m "feat: add Pi digits constant and placeholder data"
```

---

### Task 5: Shared hooks

**Files:**
- Create: `hooks/useReducedMotion.ts`
- Create: `hooks/useCopyToClipboard.ts`
- Create: `hooks/useCountUp.ts`

- [ ] **Step 1: Create reduced motion hook**

Create `hooks/useReducedMotion.ts`:

```typescript
"use client";

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
```

- [ ] **Step 2: Create clipboard hook**

Create `hooks/useCopyToClipboard.ts`:

```typescript
"use client";

import { useState, useCallback } from "react";

type CopyStatus = "idle" | "copied" | "failed";

export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2300);
  }, []);

  return { status, copy };
}
```

- [ ] **Step 3: Create count-up hook**

Create `hooks/useCountUp.ts`:

```typescript
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  startOnMount?: boolean;
  decimals?: number;
  separator?: string;
}

export function useCountUp({
  end,
  duration = 2000,
  startOnMount = false,
  decimals = 0,
  separator = ",",
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const rafRef = useRef<number>(0);

  const start = useCallback(() => {
    setIsRunning(true);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
        setIsRunning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [end, duration]);

  useEffect(() => {
    if (startOnMount) start();
    return () => cancelAnimationFrame(rafRef.current);
  }, [startOnMount, start]);

  const formatted = value.toFixed(decimals).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    separator
  );

  return { value, formatted, isRunning, start };
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add hooks/
git commit -m "feat: add useReducedMotion, useCopyToClipboard, useCountUp hooks"
```

---

### Task 6: Shared UI components — Toast

**Files:**
- Create: `components/ui/Toast.tsx`

- [ ] **Step 1: Create Toast component**

Create `components/ui/Toast.tsx` — uses Framer Motion for entrance/exit. Displays at bottom-right. Supports "copied" and "failed" variants.

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  status: "idle" | "copied" | "failed";
}

export function Toast({ status }: ToastProps) {
  return (
    <AnimatePresence>
      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 font-[family-name:var(--font-inter)] text-sm"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-gold)",
            color: "var(--color-text)",
          }}
        >
          {status === "copied" ? (
            <>
              <span style={{ color: "var(--color-gold)" }}>&#10003;</span>
              <span>Copied! Now go ape. π</span>
            </>
          ) : (
            <span>Couldn&apos;t copy — select and copy manually.</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Toast.tsx
git commit -m "feat: add Toast component with Framer Motion animations"
```

---

### Task 7: Shared UI components — ContractAddressBar, BuyButton, SocialIcon, SectionHeader

**Files:**
- Create: `components/ui/ContractAddressBar.tsx`
- Create: `components/ui/BuyButton.tsx`
- Create: `components/ui/SocialIcon.tsx`
- Create: `components/ui/SectionHeader.tsx`

- [ ] **Step 1: Create ContractAddressBar**

Create `components/ui/ContractAddressBar.tsx`:

A gold-bordered pill showing the contract address. Full address on desktop, truncated (first 6 + last 4 chars) on mobile. Clicking anywhere copies to clipboard and triggers the Toast.

Key details:
- Thin 1px gold border, rounded-full
- JetBrains Mono font
- Hover: border opacity increases
- Uses `useCopyToClipboard` hook
- Renders the `Toast` component internally
- Accepts `address: string` prop

- [ ] **Step 2: Create BuyButton**

Create `components/ui/BuyButton.tsx`:

The primary CTA pill button. Pi Blue fill with radial gradient (lighter at center). On hover, inner light intensifies and a gold ring ripple effect expands outward (CSS `::after` pseudo-element scaling from 100% to 120% with opacity 1→0). Active state: `scale(0.98)`.

Key details:
- `href` prop for the buy link
- `target="_blank"` + `rel="noopener noreferrer"`
- `animation: pulse-glow` from globals.css (subtle ambient pulse)
- Space Grotesk font, white text, 18px

- [ ] **Step 3: Create SocialIcon**

Create `components/ui/SocialIcon.tsx`:

Small circular link (40px) with thin gold border. Accepts `href`, `label`, and `icon` (React node) props. Hover: border fills gold, icon goes white. All external links use `target="_blank"` + `rel="noopener noreferrer"`.

Provide inline SVG icons for: X (Twitter), Telegram, DexScreener, Pump.fun. Export a `SOCIAL_ICONS` record mapping platform names to SVG elements.

- [ ] **Step 4: Create SectionHeader**

Create `components/ui/SectionHeader.tsx`:

Reusable section heading. Space Grotesk 600, 36px, centered, Ghost White. Accepts `children` and optional `className` props. Simple presentational component.

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/
git commit -m "feat: add ContractAddressBar, BuyButton, SocialIcon, SectionHeader components"
```

---

## Chunk 2: Canvas & SVG Infrastructure

### Task 8: Pi Digit Rings — persistent Canvas background

**Files:**
- Create: `components/canvas/PiDigitRings.tsx`

- [ ] **Step 1: Create the PiDigitRings component**

Create `components/canvas/PiDigitRings.tsx`:

A full-viewport fixed Canvas component that renders concentric rings of Pi digits rotating at different speeds. This is the persistent background layer for the entire page.

Implementation details:
- `"use client"` component
- Full-viewport `<canvas>` with `position: fixed`, `inset: 0`, `z-index: 0`, `pointer-events: none`
- On mount, initialize ~8-12 concentric rings at varying radii (evenly spaced from center to beyond viewport corners)
- Each ring: a circle of Pi digits rendered as text along the circumference
  - Font: JetBrains Mono (load via CSS, use `ctx.font`)
  - Color: `rgba(212, 168, 67, 0.04)` (Pi Gold at 4% opacity)
  - Font size: varies by ring (8-14px, larger rings use bigger text)
  - Digits pulled from `PI_DIGITS` constant, each ring starts at a different offset
- Each ring rotates at a different angular velocity — alternate clockwise/counter-clockwise
  - Innermost: ~0.02 rad/s, outermost: ~0.005 rad/s
- Animation loop via `requestAnimationFrame`
- Accept a `scrollProgress` prop (0-1) that subtly modulates ring speeds (speeds increase slightly with scroll, creating the "breathing" effect)
- Accept a `convergence` prop (0-1) for the footer effect — at 1, all rings collapse to center point; at 0, normal positions
- Resize handler for canvas dimensions on window resize
- `useReducedMotion`: if true, render rings statically (no rotation)
- Performance: if frame time exceeds 33ms (below 30fps), reduce ring count by 2 on next frame

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/canvas/PiDigitRings.tsx
git commit -m "feat: add PiDigitRings persistent canvas background"
```

---

### Task 9: Pi Spiral Canvas — Section C ambient element

**Files:**
- Create: `components/canvas/PiSpiralCanvas.tsx`

- [ ] **Step 1: Create PiSpiralCanvas**

Create `components/canvas/PiSpiralCanvas.tsx`:

A canvas element that renders Pi digits along an expanding Archimedean spiral. Used in Section C (Story).

Implementation details:
- `"use client"` component
- Archimedean spiral: `r = a + b * theta` where `a = 20` (starting radius), `b = 3` (expansion rate)
- Digits placed along the spiral path at regular angular intervals
- Font: JetBrains Mono 10px, gold at 0.06 opacity (0.04 on mobile via prop)
- Spiral continuously expands: `theta` increases at ~0.5 rad/s, adding new digits at the outer edge
- Desktop: ~500px wide canvas, positioned absolutely
- Mobile: full container width
- Accept `className` for positioning
- `useReducedMotion`: if true, render a static spiral (no expansion animation)

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/canvas/PiSpiralCanvas.tsx
git commit -m "feat: add PiSpiralCanvas for expanding Archimedean digit spiral"
```

---

### Task 10: SVG primitives — GeometricShape

**Files:**
- Create: `components/svg/GeometricShape.tsx`

- [ ] **Step 1: Create GeometricShape component**

Create `components/svg/GeometricShape.tsx`:

A reusable SVG component that draws a geometric shape (circle, triangle, or hexagon) with stroke animation. Used in Section B (Tokenomics).

Props:
- `shape: "circle" | "triangle" | "hexagon"`
- `size: number` (SVG viewBox dimension)
- `strokeColor?: string` (default: Pi Gold)
- `strokeWidth?: number` (default: 1.5)
- `animate?: boolean` (default: true)
- `duration?: number` (animation duration in seconds, default: 1.2)
- `delay?: number` (stagger delay in seconds, default: 0)
- `className?: string`

Implementation:
- Generate SVG path for each shape:
  - Circle: standard SVG `<circle>` element
  - Triangle: equilateral triangle inscribed in circle
  - Hexagon: regular hexagon inscribed in circle
- Stroke animation via `stroke-dasharray` and `stroke-dashoffset`:
  - Set `dasharray` to path total length
  - Animate `dashoffset` from total length to 0
  - Use CSS transition or GSAP (CSS preferred since these are scroll-triggered by parent)
- No fill — stroke only
- `ref` forwarded for GSAP targeting by parent components

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/svg/GeometricShape.tsx
git commit -m "feat: add GeometricShape SVG component with stroke-draw animation"
```

---

### Task 11: SVG primitives — SacredGeometryIntro

**Files:**
- Create: `components/svg/SacredGeometryIntro.tsx`

- [ ] **Step 1: Create SacredGeometryIntro component**

Create `components/svg/SacredGeometryIntro.tsx`:

The hero's load animation SVG. This is a complex timed sequence:

1. (0s) Golden dot appears at center — small `<circle>` fading in
2. (0.3s) Circle traces outward from the dot — `stroke-dashoffset` animation on a larger circle, ~1s duration
3. (1.3s) Sacred geometry lines extend — 4-6 additional SVG paths (arcs, intersecting lines) draw themselves simultaneously, ~0.8s
4. (2.1s) Lines converge to form a simplified logo crest outline — 6-8 traced contour paths that evoke the badge shape, ~0.6s
5. (2.7s) SVG fades out (opacity 0) while the actual logo.png fades in (opacity 1) at the same position — 0.3s crossfade

Implementation:
- All paths pre-defined as SVG `<path>` elements with `stroke-dasharray` / `stroke-dashoffset`
- Animation driven by a GSAP timeline (`gsap.timeline()`) created on mount
- Accept an `onComplete` callback prop — fired when the full sequence finishes, so the parent can trigger headline text appearance
- Accept `reducedMotion: boolean` — if true, skip animation entirely and show the logo immediately
- SVG viewBox: `"0 0 400 400"` centered

The developer should create simplified SVG paths that evoke the logo's shape (outer circle, inner shield/badge shape, π stroke outlines). These do NOT need to be pixel-perfect traces — just enough geometry to suggest the form before the crossfade.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/svg/SacredGeometryIntro.tsx
git commit -m "feat: add SacredGeometryIntro hero load animation"
```

---

### Task 12: SVG primitives — remaining components

**Files:**
- Create: `components/svg/GoldenSpiral.tsx`
- Create: `components/svg/CornerOrnament.tsx`
- Create: `components/svg/RomanNumeral.tsx`
- Create: `components/svg/ConnectingLine.tsx`
- Create: `components/svg/DigitBorder.tsx`
- Create: `components/svg/DexScreenerPortal.tsx`

- [ ] **Step 1: Create GoldenSpiral**

`components/svg/GoldenSpiral.tsx` — Archimedean spiral (~2.5 turns, sizing matches ~120px x-height) with a gold dot beneath. Stroke-draw animation via `stroke-dashoffset`. Ref forwarded for GSAP control.

- [ ] **Step 2: Create CornerOrnament**

`components/svg/CornerOrnament.tsx` — Quarter-circle arc (radius ~24px) with two intersecting lines at 60 degrees. Accepts `position: "top-left" | "top-right" | "bottom-left" | "bottom-right"` prop to mirror/rotate. Stroke-draw animation. Gold stroke.

- [ ] **Step 3: Create RomanNumeral**

`components/svg/RomanNumeral.tsx` — Renders "I", "II", or "III" as SVG paths (simple vertical strokes). Accepts `numeral: 1 | 2 | 3` prop. Stroke-draw animation with staggered strokes. Gold color, ~40px tall.

- [ ] **Step 4: Create ConnectingLine**

`components/svg/ConnectingLine.tsx` — Horizontal (or vertical on mobile) SVG line connecting 3 nodes (small circles). A gold dot (the "traveling light") animates along the path continuously using `<animateMotion>` or GSAP. Accepts `orientation: "horizontal" | "vertical"` prop. The third node is slightly larger with a gold glow (SVG `<filter>` with `feGaussianBlur`).

- [ ] **Step 5: Create DigitBorder**

`components/svg/DigitBorder.tsx` — Rectangle border composed of Pi digits along a rectangular `<textPath>`. Digits in JetBrains Mono, gold, small. On hover (controlled via parent CSS class), the text offset animates to create a conveyor-belt effect. Accepts `width`, `height` props.

- [ ] **Step 6: Create DexScreenerPortal**

`components/svg/DexScreenerPortal.tsx` — 80px circular gateway. Gold circle border with Pi digits on a circular `<textPath>` rotating continuously (CSS animation). Inside: a simple bar-chart icon (3 ascending rectangles) in white. Hover state: rotation accelerates, border brightens, icon fills cyan.

- [ ] **Step 7: Verify build**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add components/svg/
git commit -m "feat: add GoldenSpiral, CornerOrnament, RomanNumeral, ConnectingLine, DigitBorder, DexScreenerPortal SVG components"
```

---

## Chunk 3: Page Sections

### Task 13: PiDigitTicker and ScrollIndicator

**Files:**
- Create: `components/PiDigitTicker.tsx`
- Create: `components/ScrollIndicator.tsx`

- [ ] **Step 1: Create PiDigitTicker**

`components/PiDigitTicker.tsx`:

A thin (24px) full-width strip at the top of the page showing Pi digits scrolling left at ~40px/s. CSS `animation: ticker-scroll` (defined in globals.css). JetBrains Mono, gold at 0.15 opacity. Duplicate the content string so it loops seamlessly (two copies side by side, animation translates -50%).

Pauses on hover via `animation-play-state: paused` on `:hover`.

`useReducedMotion`: if true, display static (no scroll animation).

- [ ] **Step 2: Create ScrollIndicator**

`components/ScrollIndicator.tsx`:

A thin vertical golden line (1px, ~60px tall) ending in a small circle (~6px). Uses `animation: plumb-bob` for a gentle bobbing effect. Fixed at bottom-center of the viewport. Clicking it scrolls to Section B via `window.scrollTo({ top: target, behavior: "smooth" })` (JS-driven, not CSS `scroll-behavior`, to avoid GSAP conflicts).

Fades out when `scrollY > 100px` — use a scroll event listener to toggle opacity.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add components/PiDigitTicker.tsx components/ScrollIndicator.tsx
git commit -m "feat: add PiDigitTicker and ScrollIndicator components"
```

---

### Task 14: Section A — Hero

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero section**

`components/sections/Hero.tsx`:

The first viewport. Composes:
- `SacredGeometryIntro` (the load animation SVG)
- Logo image (`logo.png` via `next/image`, fades in after SVG animation completes)
- Headline: "Infinite. Irrational. Unstoppable." — staggered word appearance (each word fades in with 0.3s delay after the previous). Space Grotesk 700, 72-80px desktop / 40-48px mobile, white with `text-shadow: 0 0 40px rgba(212, 168, 67, 0.15)`
- Subheadline text
- `ContractAddressBar` component
- `BuyButton` component
- Row of `SocialIcon` components (X, Telegram, DexScreener)
- Logo + "$PIDAY" brand lockup at top-center (visible after load animation)

Layout: `min-h-screen`, flex column, items centered, justify center. Relative positioning so the `ScrollIndicator` can be placed at bottom.

State management:
- `introComplete: boolean` — toggled by `SacredGeometryIntro`'s `onComplete` callback
- When `introComplete` is false, only the SVG animation is visible
- When true, logo crossfades in, then headline words stagger in, then remaining elements fade up

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with load animation sequence"
```

---

### Task 15: Section B — Tokenomics

**Files:**
- Create: `components/sections/Tokenomics.tsx`

- [ ] **Step 1: Create Tokenomics section**

`components/sections/Tokenomics.tsx`:

Composes:
- `SectionHeader` with "The Numbers Don't Lie. They're Irrational."
- Three `GeometricShape` components (circle, triangle, hexagon) in a horizontal row (flex, gap, stack vertically on mobile)
- Each shape has overlaid text: the stat number (Pi Gold, JetBrains Mono, large) + label (muted slate) + sub-label
- Numbers use `useCountUp` hook — triggered when the section enters viewport (via `ref` + IntersectionObserver or GSAP ScrollTrigger callback)
- Below: the fair launch statement with gold dot separators
- Faint golden construction lines in background — implemented as absolute-positioned SVG paths at low opacity

Data sourced from `PLACEHOLDERS.tokenomics`.

The shapes stagger entrance: left at 0s delay, center at 0.3s, right at 0.6s. Assign `data-` attributes or refs for GSAP to target during scroll orchestration (Task 22).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Tokenomics.tsx
git commit -m "feat: add Tokenomics section with geometric construction stats"
```

---

### Task 16: Section C — Story

**Files:**
- Create: `components/sections/Story.tsx`

- [ ] **Step 1: Create Story section**

`components/sections/Story.tsx`:

Composes:
- Heading: "Why Pi" in 120px+ Space Grotesk Bold, followed by the `GoldenSpiral` SVG component (replacing the "?" glyph). Arrange inline — "Why Pi" as text, then the spiral SVG positioned to read as "Why Pi?"
- Three paragraphs with gold illumination treatment on key phrases
  - Wrap highlighted phrases in `<span>` elements with a class that applies `animation: gold-flare` when triggered
  - Trigger via IntersectionObserver or GSAP ScrollTrigger when each paragraph enters view
- `PiSpiralCanvas` positioned on the right side (desktop) or behind text (mobile)
  - Desktop: `absolute right-0 top-1/2 -translate-y-1/2 w-[500px]`
  - Mobile: `absolute inset-0 w-full opacity-[0.04]`

Content: left-aligned, max-width 680px, centered on page with `mx-auto`. Generous padding.

Vertical gold rule on the left: a `div` with `width: 1px`, gold background, spanning the section height. Positioned absolutely.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Story.tsx
git commit -m "feat: add Story section with golden spiral heading and illuminated text"
```

---

### Task 17: Section D — Market Data

**Files:**
- Create: `components/sections/MarketData.tsx`

- [ ] **Step 1: Create MarketData section**

`components/sections/MarketData.tsx`:

Composes:
- `SectionHeader` with "The Circle Is Live" — append a small green dot `<span>` with `animation: live-pulse` next to "Live"
- A panel `<div>` with dark surface background, thin gold border (1px solid gold), and `CornerOrnament` at each of the four corners (absolute-positioned)
- Stats row: four metrics in a horizontal flex row (2x2 grid on mobile via `grid grid-cols-2 md:flex`)
  - Each metric: label (top, JetBrains Mono 12px uppercase letter-spaced muted) + value (Pi Gold JetBrains Mono 32px, uses `useCountUp`)
  - Thin gold vertical dividers between metrics (1px wide `<div>`, 40% height, vertically centered) — hide on mobile grid
- Faint graph-paper background: CSS `background-image` with `linear-gradient` grid pattern at ~0.03 opacity
- `DexScreenerPortal` centered below stats with "View on DexScreener →" text link beside it
- All values from `PLACEHOLDERS.stats`

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/MarketData.tsx
git commit -m "feat: add MarketData section with stats panel and DexScreener portal"
```

---

### Task 18: Section E — How to Buy

**Files:**
- Create: `components/sections/HowToBuy.tsx`

- [ ] **Step 1: Create HowToBuy section**

`components/sections/HowToBuy.tsx`:

Composes:
- `SectionHeader` with "Join the Circle"
- `ConnectingLine` component (horizontal on desktop, vertical on mobile)
- Three step cards overlaying the connecting line's nodes:
  - Each card: `RomanNumeral` SVG at top → title (Space Grotesk 600, 24px) → description (Inter 16px, muted)
  - Step content from spec: "Get a Wallet" / "Copy the Contract" / "Swap for $PIDAY"
- Below steps, separated by a thin gold `<hr>`:
  - `ContractAddressBar` and `BuyButton` side by side (desktop) / stacked (mobile)

Steps layout: flex row desktop, flex col mobile. Each step is a flex column, items center, text center. Steps positioned over the connecting line's three nodes.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/HowToBuy.tsx
git commit -m "feat: add HowToBuy section with three-step ritual"
```

---

### Task 19: Section F — Community

**Files:**
- Create: `components/sections/Community.tsx`

- [ ] **Step 1: Create Community section**

`components/sections/Community.tsx`:

Two gateway panels side by side (stack on mobile):

Each gateway:
- `DigitBorder` SVG as the panel border
- Platform icon (thin gold linework SVG — X or Telegram)
- Heading: "Follow @PiDayCoin" / "Join the Circle"
- Tagline in muted slate
- Ghost CTA button: "Enter →" — transparent bg, thin gold border, gold text on hover
- Entire panel is an `<a>` link wrapping the content
- Hover: digit border animation class toggled (starts conveyor belt), background shifts to `rgba(15, 22, 41, 0.5)`, CTA text goes gold — all via CSS `:hover` on the parent `<a>`

Telegram gateway: "3,141" rendered in Pi Gold, with a slow incrementing animation (setInterval, +1 every 3 seconds).

Between panels: vertical gold divider (1px, 60% height) with diamond shape (`<div>` rotated 45deg, 8px, gold border) at midpoint. On mobile: horizontal divider with diamond.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Community.tsx
git commit -m "feat: add Community section with X and Telegram gateways"
```

---

### Task 20: Section G — Footer

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer section**

`components/sections/Footer.tsx`:

Minimal centered layout with 200px+ top padding.

Content stack (flex col, items center, gaps):
1. Logo image (`logo.png`, ~120px, via `next/image`)
2. "Born on Pi Day 2026. Dies never." — Space Grotesk 600, 28px
3. Row of `SocialIcon` components: X, Telegram, DexScreener, Pump.fun
4. Gold horizontal rule: `<div>` 200px wide, 1px height, gold bg, centered
5. Disclaimer: JetBrains Mono, 12px, muted slate at 0.5 opacity

No animations on this section's content (the background canvas handles the converge/expand effect).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat: add Footer section"
```

---

### Task 21: Page composition and layout metadata

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Compose page.tsx**

Replace `app/page.tsx` entirely. Import and render all sections in order:

```tsx
import { PiDigitTicker } from "@/components/PiDigitTicker";
import { PiDigitRings } from "@/components/canvas/PiDigitRings";
import { Hero } from "@/components/sections/Hero";
import { Tokenomics } from "@/components/sections/Tokenomics";
import { Story } from "@/components/sections/Story";
import { MarketData } from "@/components/sections/MarketData";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Community } from "@/components/sections/Community";
import { Footer } from "@/components/sections/Footer";
import { ScrollIndicator } from "@/components/ScrollIndicator";
// ScrollOrchestrator import added in Task 22

export default function Home() {
  return (
    <>
      <PiDigitRings />
      <PiDigitTicker />
      <main className="relative z-10">
        <Hero />
        <Tokenomics />
        <Story />
        <MarketData />
        <HowToBuy />
        <Community />
        <Footer />
      </main>
      <ScrollIndicator />
      {/* <ScrollOrchestrator /> added in Task 22 */}
    </>
  );
}
```

Note: `PiDigitRings` and `ScrollIndicator` require `"use client"`. Since `page.tsx` imports them, it may need to be a client component, OR these components should handle their own client boundary internally. Prefer keeping `page.tsx` as a server component and having each interactive child use `"use client"` at its own file level.

- [ ] **Step 2: Update layout.tsx — full metadata and favicons**

Expand the `metadata` export in `app/layout.tsx` with all SEO/social meta from spec Section 6. Add favicon links. Set `themeColor`. Add `metadataBase`.

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://piday.online"),
  title: "$PIDAY — The Infinite Meme Coin | piday.online",
  description: "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
  openGraph: {
    title: "$PIDAY — The Infinite Meme Coin | piday.online",
    description: "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
    url: "https://piday.online",
    siteName: "$PIDAY",
    images: [{ url: "/images/og_card.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$PIDAY — The Infinite Meme Coin | piday.online",
    description: "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday.",
    images: ["/images/og_card.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16" },
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: "/images/favicon_io/apple-touch-icon.png",
    shortcut: "/images/favicon_io/favicon.ico",
  },
  manifest: "/images/favicon_io/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  themeColor: "#0A0E1A",
};
```

Also update the `<html>` tag to include `className="dark"` since this is always dark mode.

- [ ] **Step 3: Update site.webmanifest**

Update `public/images/favicon_io/site.webmanifest`: change `theme_color` and `background_color` to `#0A0E1A`. Update icon `src` paths to `/images/favicon_io/...`.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Visual verification**

```bash
npm run dev
```

Open browser, verify: all sections render in order, background canvas visible, fonts loading, dark theme applied. This is the first time seeing the full page assembled — expect layout issues to exist. Note them but don't fix yet (that's Task 23).

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/layout.tsx public/images/favicon_io/site.webmanifest
git commit -m "feat: compose full page with all sections, complete metadata and favicons"
```

---

## Chunk 4: Scroll Orchestration & Polish

### Task 22: GSAP ScrollTrigger orchestration

**Files:**
- Create: `components/ScrollOrchestrator.tsx`
- Modify: `app/page.tsx` (add ScrollOrchestrator)

- [ ] **Step 1: Create ScrollOrchestrator**

Create `components/ScrollOrchestrator.tsx`:

A `"use client"` component that registers GSAP plugins and sets up all scroll-driven animations. This is the master choreographer.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);
```

Inside a `useEffect`:

**Section B entrance (Tokenomics):**
- Trigger: when Section B enters viewport
- Animate: geometric shapes stroke-draw (via `stroke-dashoffset` on SVG refs), staggered 0.3s
- Animate: numbers count up (trigger the `start()` method on countUp refs)
- Animate: fair launch text fades in after shapes complete

**Section C entrance (Story):**
- Trigger: when Section C enters viewport
- Animate: golden spiral SVG draws itself
- Animate: each paragraph fades in + translateY(20px→0), staggered
- Animate: gold flare on highlighted phrases (toggle CSS class)
- Animate: vertical gold rule fades in on left

**Section D entrance (Market Data):**
- Trigger: when Section D enters viewport
- Animate: corner ornaments draw themselves
- Animate: stat numbers count up
- Animate: portal CTA fades in

**Section E entrance (How to Buy):**
- Trigger: when Section E enters viewport
- Animate: connecting line draws itself
- Animate: roman numerals draw sequentially
- Animate: step content fades in staggered
- Animate: conversion block fades in last

**Section F entrance (Community):**
- Trigger: when Section F enters viewport
- Animate: digit borders draw themselves
- Animate: panel content fades in

**Section G (Footer):**
- Trigger: when footer enters viewport
- Update `PiDigitRings` convergence prop to 1 (rings collapse to center)
- When footer scrolls past 50%, convergence reverses (rings expand again)

**Scroll transitions between sections:**
All follow the convention in spec Section 4 (trigger at 80%, 300px scroll distance, power2.inOut easing). These are visual flourishes — implement them as GSAP ScrollTrigger-pinned sequences:

- Hero → Tokenomics: Logo disintegrates into digit particles, drift to three clusters
- Tokenomics → Story: Shapes shrink and fade, construction lines sweep left
- Story → Market Data: Spiral expands then contracts to horizontal band
- Market Data → How to Buy: Panel border deconstructs, side lines split into three
- How to Buy → Community: Nodes merge from three to two
- Community → Footer: Panels drift down, digit rings converge

**Implementation approach for transitions:** Each transition is a GSAP timeline pinned between two sections using `ScrollTrigger.create()` with `pin: true` and `scrub: true`. The `start` and `end` values define the 300px scroll window. Elements are animated on a scrubbed timeline within that window.

**Reduced motion:** If `useReducedMotion()` returns true, skip all scroll animations. Instead, set all elements to their final visible state immediately.

Each section component should expose DOM refs (via `forwardRef` or `data-*` attributes) for the orchestrator to target. Use `gsap.utils.toArray("[data-animate='section-b']")` pattern for targeting.

- [ ] **Step 2: Add ref attributes to section components**

Go back through each section component (Hero, Tokenomics, Story, MarketData, HowToBuy, Community, Footer) and add `data-section="hero"`, `data-section="tokenomics"`, etc. to their root elements. Add `data-animate` attributes to individual animatable elements (shapes, text, etc.) so the ScrollOrchestrator can target them with `gsap.utils.toArray()`.

- [ ] **Step 3: Add ScrollOrchestrator to page.tsx**

Import and render `<ScrollOrchestrator />` inside the `<>` fragment in `page.tsx`, after all sections.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Visual verification**

```bash
npm run dev
```

Scroll through the entire page and verify:
- Each section animates in on scroll
- Geometric shapes draw themselves
- Numbers count up
- Scroll transitions between sections fire
- Footer convergence effect works
- Reduced motion: toggle in OS settings or browser devtools, confirm animations are replaced with fade-ins

- [ ] **Step 6: Commit**

```bash
git add components/ScrollOrchestrator.tsx app/page.tsx components/sections/
git commit -m "feat: add GSAP ScrollTrigger orchestration for all section animations and transitions"
```

---

### Task 23: Responsive polish and accessibility

**Files:**
- Modify: various section components
- Modify: `app/globals.css`

- [ ] **Step 1: Mobile layout verification and fixes**

Run dev server and test at 640px, 768px, and 1024px widths. Fix any layout issues:

Key responsive requirements:
- Hero: text 40-48px, CTA full-width
- Tokenomics: shapes stack vertically
- Story: spiral canvas moves behind text at 0.04 opacity
- Market Data: stats grid 2x2, hide vertical dividers
- How to Buy: steps stack, connecting line goes vertical
- Community: gateways stack, divider becomes horizontal
- Footer: identical to desktop

Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) in existing components. Fix any overflows, text wrapping issues, or spacing problems.

- [ ] **Step 2: Test accessibility**

Verify:
- Tab through all interactive elements — focus ring visible (gold outline)
- Focus ring hidden on mouse click (`:focus-visible` only)
- All images have `alt` text
- All links have accessible labels
- Semantic HTML: `<main>`, `<section>`, `<footer>`, `<nav>` used appropriately
- `prefers-reduced-motion` disables animations

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive layout polish and accessibility improvements"
```

---

### Task 24: Pre-hydration state and final build

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Add pre-hydration state**

The spec requires: "Before JS hydration, the page shows a static centered logo on void black background."

In `Hero.tsx`, ensure the logo image is rendered in the initial server-side HTML (not behind a client-side state gate). The construction animation SVG should overlay it and be hidden by default, becoming visible only after hydration.

Approach:
- Render logo.png as a static `<img>` or `next/image` centered on a void black background — this is the SSR output
- On client mount, `SacredGeometryIntro` overlays and plays the animation, then crossfades to reveal the already-rendered logo
- Users on slow connections see the logo immediately (good)
- Users with JS see the full animation experience

- [ ] **Step 2: Final build and lint**

```bash
npm run lint
npm run build
```

Fix any lint errors or type errors. The build must succeed cleanly.

- [ ] **Step 3: Final visual verification**

```bash
npm run dev
```

Full walkthrough:
1. Page loads — construction animation plays
2. Hero content appears after animation
3. Scroll through all 7 sections
4. Each section animates on entry
5. Transitions between sections are smooth
6. Footer digit rings converge and expand
7. Copy CA to clipboard — toast appears
8. Buy button links work
9. Social links open in new tabs
10. Mobile: repeat on 640px viewport
11. Reduced motion: confirm simple fade-ins

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add pre-hydration state, final lint and build fixes"
```

---

## Execution Notes

- **No traditional tests.** This is a visual landing page with no business logic, no API, no database. Testing = TypeScript compilation + visual verification in browser. Each task's "verify" step is `npm run build`.
- **GSAP ScrollTrigger** requires `"use client"` components. Keep the scroll orchestration in a dedicated client component, not in page.tsx.
- **Canvas rendering** should use `requestAnimationFrame` for the animation loop. Clean up the loop in `useEffect` return.
- **SVG path lengths** for `stroke-dasharray` animation: calculate with `path.getTotalLength()` at runtime, or hardcode approximate values.
- **Image optimization**: Use `next/image` for `logo.png` with explicit `width`/`height`. The OG card is only used in meta tags, not rendered on page.
- **GSAP free tier**: Confirm the site qualifies under GSAP's no-charge license before launch.
