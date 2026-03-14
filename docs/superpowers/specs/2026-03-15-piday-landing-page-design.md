# $PIDAY Landing Page — Design Specification

**Project:** piday.online
**Date:** 2026-03-15
**Status:** Approved
**Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + shadcn

---

## 1. Design Concept: "Sacred Mathematics, Cinematically Revealed"

The page is a scroll-driven ritual. You don't read it — you uncover it. Every section is a scene in a mathematical film. Sacred geometry constructs itself before your eyes. Numbers aren't decoration — they're the architecture.

The aesthetic is dark, precise, and ancient-feeling, but unmistakably crypto. The Pepe-as-William-Jones logo bridges meme energy with mathematical gravitas.

**Core principles:**
- Light comes from *within* and *behind* elements — luminous gold ink on obsidian paper
- Cyan is used sparingly, like a scalpel, not a floodlight
- Every section transition is a mathematical metamorphosis driven by scroll
- No generic glassmorphism, no neon overload, no web3 starter pack

---

## 2. Design System

### 2.1 Color Palette

| Name         | Hex       | CSS Variable       | Usage                                   |
|--------------|-----------|---------------------|-----------------------------------------|
| Void Black   | `#0A0E1A` | `--color-bg`        | Page background                         |
| Deep Navy    | `#0F1629` | `--color-surface`   | Card/section backgrounds                |
| Pi Blue      | `#1A3CE6` | `--color-primary`   | Primary buttons, headings               |
| Neon Cyan    | `#00D4FF` | `--color-accent`    | Sparse highlights, hover states         |
| Pi Gold      | `#D4A843` | `--color-gold`      | Numbers, borders, sacred geometry lines |
| Ghost White  | `#E8EDF5` | `--color-text`      | Body text                               |
| Muted Slate  | `#6B7A99` | `--color-muted`     | Secondary text, labels                  |
| Success Green| `#22C55E` | `--color-success`   | Live indicator only                     |

### 2.2 Typography

| Role              | Font           | Weight     | Size                          |
|-------------------|----------------|------------|-------------------------------|
| Display / Hero    | Space Grotesk  | 700 (Bold) | 72-80px desktop / 40-48px mobile |
| Headings          | Space Grotesk  | 600 (Semi) | 28-36px                       |
| Section Titles    | Space Grotesk  | 700 (Bold) | 120px+ (Story heading)        |
| Body              | Inter          | 400        | 16-18px                       |
| Monospace / Data  | JetBrains Mono | 500        | 14-18px                       |
| Stats Numbers     | JetBrains Mono | 500        | 32px                          |

All fonts loaded via `next/font/google` for optimal loading.

### 2.3 Animation Stack

| Technology       | Purpose                                              |
|------------------|------------------------------------------------------|
| GSAP ScrollTrigger | Scroll-driven choreography for all section reveals and transitions |
| SVG path animation | Sacred geometry line-drawing effects (strokes that draw themselves) |
| Canvas (2D)      | Concentric Pi digit rings background                 |
| CSS animations   | Ambient effects (rotations, pulses, glows)           |
| Framer Motion    | React component entrance/exit animations             |

**No performance constraints.** Animations are the product. Go heavy.

---

## 3. Persistent Background Layer

A full-page `<canvas>` element renders concentric rings of Pi's decimal digits (thousands of them). Each ring rotates at a different speed — like the gears of an astrolabe.

- Digit font: JetBrains Mono, gold color at ~0.04 opacity
- Multiple rings at varying radii, rotating clockwise and counter-clockwise
- As the user scrolls, the rings subtly shift speed and scale — the page breathes
- In the footer, the rings converge to center; then slowly expand again (infinite loop)

This canvas sits behind all content with `position: fixed` and `z-index: 0`.

---

## 4. Section Designs

### 4.1 Section A — Hero (First Viewport)

**Purpose:** Instantly communicate what $PIDAY is, build trust, convert without scrolling.

#### Load Animation (~3 seconds)

1. Black void. A single golden dot appears at dead center
2. The dot traces a circle (SVG stroke animation, ~1s). Circle completes
3. From the circle, thin golden lines extend — constructing sacred geometry fragments (vesica piscis arcs, flower of life hints). SVG stroke-dasharray animation
4. The geometry lines converge inward, forming the circular crest shape of the logo
5. The full $PIDAY logo (Pepe-as-William-Jones crest) materializes at center, emerging from within the constructed geometry. Scale from ~80% to 100% with a subtle gold glow bloom
6. Headline text materializes beneath: **"Infinite."** *(beat)* **"Irrational."** *(beat)* **"Unstoppable."** — each word staggered ~0.3s. Space Grotesk 700, 72-80px, white with faint warm gold text-shadow
7. Remaining hero elements fade up

#### Hero Content (after animation settles)

- **Pi Digit Inscription Strip** — Top of viewport. 24px height. Pi digits in JetBrains Mono, muted gold at ~0.15 opacity, scrolling left continuously. Styled as ancient inscription, not stock ticker. Pauses on hover
- **Logo + "$PIDAY"** — The logo shrinks to ~64px, settles top-center. "$PIDAY" in Space Grotesk 700 beside it. Below: "piday.online" in muted slate
- **Headline** — "Infinite. Irrational. Unstoppable." stays prominent
- **Subheadline** — "The only coin with a built-in global holiday. Born on Pi Day 2026." Inter 20px, muted slate
- **Contract Address Bar** — Thin gold-bordered pill. CA in JetBrains Mono. Hover: border brightens. Click: copies to clipboard. Toast: "Copied! Now go ape. π" — bottom-right, gold checkmark, 2s duration
- **Primary CTA** — "Buy $PIDAY" pill button. Pi Blue fill with radial gradient (slightly lighter at center — light trapped under glass). Hover: inner light intensifies + thin gold ring ripple expands outward from button edge
- **Social Links Row** — DexScreener, X, Telegram. Small circular icons with thin gold borders. Hover: border fills gold, icon goes white
- **Scroll Indicator** — Thin golden line descending from center, ending in a small circle (plumb line). Subtle bob animation. Fades at 100px scroll offset

#### Scroll Transition → Tokenomics

The large logo watermark in the background begins to disintegrate — forms fracture into individual floating digits. These drift and swirl, then converge into three clusters (becoming the three tokenomics numbers). Sacred geometry lines morph to frame the new section — circles, triangles, hexagons drawing themselves into position.

---

### 4.2 Section B — Tokenomics: "The Numbers Don't Lie. They're Irrational."

**Purpose:** Prove the numbers are clean. Trust through transparent data.

#### Section Header

"The Numbers Don't Lie. They're Irrational." — Space Grotesk 600, 36px, centered.

#### Layout

Three stat displays in a horizontal row (stack vertically on mobile). NOT cards with backgrounds — **geometric constructions with numbers at their center**. Each is an SVG that draws itself on scroll:

**Construction 1 — Circle:**
- A circle constructs itself (SVG stroke animation, gold line, ~1.2s)
- **3,141,592,653** materializes at center — Pi Gold, JetBrains Mono, large
- Below: "Total Supply" in muted slate
- Small text: "Based on the digits of π"

**Construction 2 — Triangle:**
- Three strokes draw sequentially to form a triangle
- **3.14%** appears at center
- "Burn Rate" / "Per transaction, forever"

**Construction 3 — Hexagon:**
- Six strokes draw sequentially
- **314 Days** appears at center
- "LP Lock" / "Verified on-chain"

Constructions stagger left → center → right, offset ~0.3s each. Numbers inside use a counting/odometer animation (digits spin up to final values).

#### Below the Triad

*"No team tokens · No presale · No insider allocation · 100% fair launch."* — centered, Inter, muted slate. Gold dots (·) as separators.

#### Ambient Detail

Faint golden construction lines (compass marks, ruler guides) linger behind the shapes — like a page from Euclid's notebook.

#### Scroll Transition → Story

The three geometric shapes rotate and shrink, falling into the background layer to join the concentric digit rings. Construction lines sweep left, forming a subtle vertical golden rule that frames the next section.

---

### 4.3 Section C — The Story: "Why Pi?"

**Purpose:** Narrative depth that makes people share the coin, not just buy it.

#### Layout

Left-aligned prose block, max-width ~680px, centered on page. Generous whitespace. The quiet moment in the film.

#### The Heading

"Why Pi?" at 120px+ Space Grotesk Bold. **The question mark is a golden spiral** — Fibonacci/Archimedes spiral drawn with SVG path animation as it enters view (~1s, thin gold stroke). Replaces the standard glyph.

#### Content — Three Paragraphs

Each fades in sequentially on scroll with a subtle 20px upward drift. Key phrases have a **gold illumination treatment**: text briefly flares to Pi Gold as it enters the viewport, then settles back to Ghost White — like words being *illuminated* in the medieval manuscript sense.

1. **"The Number"** — "Pi is infinite and irrational — it never ends and never repeats. Sound like any chart you know?"
   - Gold flare: "infinite" and "irrational"

2. **"The Date"** — "March 14 is Pi Day worldwide. It's also Einstein's birthday. Every year, billions of people celebrate. Every year, $PIDAY re-enters the conversation."
   - Gold flare: "Pi Day" and "Einstein's birthday"

3. **"The Edge"** — "No other coin has a built-in global holiday. Annual catalyst. Infinite meme potential. The number that never ends, on the coin that never dies."
   - Gold flare: "the coin that never dies"

#### Right-Side Ambient Element

A large-scale visualization on the right side (behind text at low opacity on mobile): **digits of Pi arranged in an expanding Archimedean spiral**. Starts tight at center, slowly unwinds outward. Gold digits at ~0.06 opacity. Continuously expanding as user reads. Visual representation of infinity.

#### Scroll Transition → Market Data

The spiral accelerates its expansion, filling the viewport with a wash of faint digits, then contracts and collapses into a concentrated horizontal band — becoming the border of the next section's panel.

---

### 4.4 Section D — Market Data: "The Circle Is Live"

**Purpose:** Social proof through data. Custom-styled stats block replacing DexScreener iframe.

#### Section Header

"The Circle Is Live" — Space Grotesk 600, 36px, centered. The word "Live" has a small green (#22C55E) dot with subtle pulse animation — the only green on the entire page.

#### Layout

A wide cinematic panel, full content width. Dark surface background. Single thin gold border with **sacred geometry corner ornaments** — small circular/angular SVG constructions at each corner, drawn with stroke animation on entrance. Like the decorative corners of an ancient astronomical chart.

#### Stats Row

Four metrics in a horizontal row inside the panel (2x2 grid on mobile):

| Label (top)  | PRICE       | MARKET CAP | HOLDERS | 24H VOLUME |
|-------------|-------------|------------|---------|------------|
| Value (big) | $0.000314   | $985.2K    | 1,592   | $127.4K    |

- Labels: JetBrains Mono, 12px, uppercase, letter-spaced, muted slate
- Values: Pi Gold, JetBrains Mono, 32px, counting/odometer animation on entrance
- Thin gold vertical dividers between metrics (~40% height, centered)

All values are placeholders — to be replaced with real data at launch.

#### The Portal CTA

Centered below stats: a **circular gateway** (~80px diameter). Gold circle border with tiny Pi digits rotating around its circumference (SVG text-on-path). Inside: minimal chart icon (three ascending bars) in white. Beside it: "View on DexScreener →" in muted slate.

Hover: digit-ring rotation accelerates, border brightens, icon shifts to cyan, text shifts to gold.

#### Ambient Detail

Behind the stats, a very faint grid of thin lines at ~0.03 opacity — graph paper. The panel feels like a data readout from an ancient instrument.

#### Scroll Transition → How to Buy

The panel's gold border deconstructs — top/bottom lines retract, side lines extend downward and split into three vertical paths that become the connecting lines between the next section's three steps.

---

### 4.5 Section E — How to Buy: "Join the Circle"

**Purpose:** Remove all friction for first-time Solana buyers. Three-step ritual.

#### Section Header

"Join the Circle" — Space Grotesk 600, 36px, centered.

#### Layout

Three steps in a horizontal row (stack vertically on mobile). Numbered with **Roman numerals** in thin gold stroke. A horizontal connecting line draws itself between them, linking all three like nodes in a geometric proof.

**Traveling light:** A small bright gold dot continuously moves from node I → II → III along the connecting line — a signal traveling through a circuit.

#### The Three Steps

**I. Prepare**
- Roman numeral "I" draws itself (single gold stroke, top-down)
- Small gold circular node at top (where connecting line meets), subtle pulse
- "Get a Wallet" — Space Grotesk 600, 24px, Ghost White
- "Download Phantom or Solflare. Fund it with SOL from any exchange." — Inter 16px, muted slate

**II. Inscribe**
- "II" draws itself (two parallel gold strokes)
- Same node treatment
- "Copy the Contract"
- "Tap the address above — or the one below. Paste it into Jupiter or Pump.fun."

**III. Enter**
- "III" draws itself (three strokes)
- Final node is larger with faint gold glow radiating outward — the destination
- "Swap for $PIDAY"
- "Set slippage to 3-5%. Confirm the swap. Welcome to the circle."

#### Conversion Block

Below the steps, separated by a thin gold horizontal rule:
- **CA bar** (same gold-bordered pill, click-to-copy) and **"Buy $PIDAY" CTA** side by side on desktop, stacked on mobile
- Fade in after the three steps fully construct

#### Scroll Transition → Community

The three nodes drift toward each other, merging into two — becoming the centers of the next section's two panels. The connecting line splits into two branches.

---

### 4.6 Section F — Community: "Enter the Inner Circle"

**Purpose:** Drive users into Telegram and X for long-term engagement.

#### Layout

Two large panels side by side (stack on mobile). Not cards — **gateways**. Each panel has a thin border **composed of tiny Pi digits arranged end-to-end** (SVG text-on-path along rectangle). Reads as solid line from normal distance; digits visible on inspection.

**Between panels:** Thin vertical gold line with a small diamond at midpoint (horizontal + diamond on mobile).

#### X / Twitter Gateway

- X icon rendered in thin gold linework (strokes only, not filled — matches sacred geometry language)
- **"Follow @PiDayCoin"** — Space Grotesk 600, 24px
- *"Get memes. Get alpha. Get irrational."* — Inter, muted slate
- Ghost CTA: "Enter →" with thin gold border
- **Hover:** digit-border begins rotating (digits travel along the path like a conveyor belt), background shifts from void to barely perceptible deep navy warmth, CTA text shifts to gold. The gateway is opening

#### Telegram Gateway

- Telegram paper-plane icon, same thin gold linework
- **"Join the Circle"** — Space Grotesk 600, 24px
- *"3,141 degens and counting."* — Inter, muted slate. The number "3,141" is in Pi Gold with a slow counting-up animation (incrementing by 1 every few seconds)
- Same hover treatment as X gateway

#### Scroll Transition → Footer

Both panels drift downward and fade. The background's concentric digit rings begin converging toward a central point at the bottom. The rings tighten — everything collapsing toward a singularity.

---

### 4.7 Section G — Footer: "The Singularity"

**Purpose:** The final page of the proof. QED.

#### Layout

Minimal. Centered. 200px+ top padding. Almost entirely negative space.

#### Content (top to bottom)

1. **The π Logo** — The $PIDAY crest, ~120px. Already complete. Still. Permanent. Generous breathing room above and below

2. **The Epitaph** — *"Born on Pi Day 2026. Dies never."* — Space Grotesk 600, 28px, Ghost White. No animation. It simply *is*

3. **Social Links** — Row of small circular icons: X, Telegram, DexScreener, Pump.fun. Thin gold borders. Hover: fill gold, icon white

4. **Gold Rule** — Thin horizontal line, ~200px wide, centered

5. **Disclaimer** — *"$PIDAY is a meme coin with no intrinsic value. This is not financial advice."* — JetBrains Mono, 12px, muted slate at ~0.5 opacity

#### Closing Animation

The concentric digit rings (which converged to center) begin slowly expanding outward again. Infinitely. The rotation never stops. If the user sits on the footer, the rings keep breathing. The number that never ends.

No back-to-top button. No sitemap. No clutter. The page ends with a whisper.

---

## 5. Interaction Design

| Element              | Interaction                    | Feedback                                                                 |
|----------------------|-------------------------------|--------------------------------------------------------------------------|
| CA Address Bar       | Click/tap anywhere             | Copy to clipboard + "Copied! Now go ape. π" toast (2s) + gold checkmark |
| Buy CTA Button       | Click → new tab to Pump.fun   | Hover: inner light intensifies + gold ring ripple. Active: scale(0.98)   |
| Social Link Icons    | Click → new tab               | Hover: gold fill, white icon                                            |
| Community Gateways   | Click → new tab               | Hover: digit-border rotates, background warms, CTA text goes gold        |
| DexScreener Portal   | Click → new tab               | Hover: digit-ring accelerates, border brightens, icon shifts cyan        |
| Pi Digit Ticker      | Passive (hover pauses)         | Continuous left scroll                                                   |
| Scroll Indicator     | Click → scrolls to Section B  | Fades at 100px scroll offset                                            |
| Section Entrances    | Scroll-driven (GSAP)           | Geometric constructions, counting animations, staggered reveals          |

---

## 6. SEO & Social Meta

- `og:title` — "$PIDAY — The Infinite Meme Coin | piday.online"
- `og:description` — "Born on Pi Day. 3.14B supply. 3.14% burn. The only coin with a global holiday."
- `og:image` — `/images/og_card.png` (1200x630, pre-rendered)
- `twitter:card` — `summary_large_image`
- Favicon set in `/images/favicon_io/`

---

## 7. Responsive Breakpoints

| Breakpoint | Width     | Key Changes                                                              |
|------------|-----------|--------------------------------------------------------------------------|
| Mobile     | <=640px   | Stack all layouts vertically. Hero text 40-48px. CTAs full-width. Vertical connecting lines. Ambient visualizations move behind text at low opacity |
| Tablet     | 641-1024px| 2-column grids. Hero text 52px. Stats 2x2 grid                          |
| Desktop    | >=1025px  | Full horizontal layouts. Hero text 72-80px. Max content width 1200px     |

**Mobile rule:** Every scroll-driven animation still fires. Nothing is disabled. Timings compress slightly (faster constructions). The experience is the same ritual, reframed for a vertical canvas.

---

## 8. Assets

All provided in `public/images/`:

| Asset                | File                          | Notes                                    |
|----------------------|-------------------------------|------------------------------------------|
| Logo (Pepe x William Jones crest) | `logo.png`       | Used in hero, footer, loading states     |
| OG Social Card       | `og_card.png`                 | 1200x630, for X/Telegram/Discord         |
| Favicon 16x16        | `favicon_io/favicon-16x16.png`|                                          |
| Favicon 32x32        | `favicon_io/favicon-32x32.png`|                                          |
| Apple Touch Icon      | `favicon_io/apple-touch-icon.png` |                                      |
| Android Chrome 192    | `favicon_io/android-chrome-192x192.png` |                                |
| Android Chrome 512    | `favicon_io/android-chrome-512x512.png` |                                |
| Favicon ICO           | `favicon_io/favicon.ico`      |                                          |
| Web Manifest           | `favicon_io/site.webmanifest` | Needs path updates                       |

All other visual elements (sacred geometry, digit rings, constructions, connecting lines) are generated programmatically via SVG, Canvas, and CSS.

---

## 9. Placeholders (to be replaced at launch)

| Data Point       | Placeholder Value                          |
|------------------|--------------------------------------------|
| Contract Address | `PIDAY...XXXXX` (truncated display)        |
| Buy CTA Link     | `#` → Pump.fun or Jupiter URL             |
| X/Twitter Handle | `@PiDayCoin`                               |
| X/Twitter URL    | `#` → X profile URL                       |
| Telegram URL     | `#` → TG invite link                      |
| DexScreener URL  | `#` → DexScreener pair URL                |
| Price            | `$0.000314`                                |
| Market Cap       | `$985.2K`                                  |
| Holders          | `1,592`                                    |
| 24h Volume       | `$127.4K`                                  |

---

## 10. Dependencies (npm packages needed)

| Package            | Purpose                           |
|--------------------|-----------------------------------|
| `gsap`             | ScrollTrigger, timeline animations |
| `framer-motion`    | React component animations         |
| `next/font/google` | Font loading (built into Next.js)  |

No Three.js. No heavy 3D libraries. The wow comes from SVG, Canvas, and choreography.
