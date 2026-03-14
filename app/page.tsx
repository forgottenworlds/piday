import PiDigitTicker from "@/components/PiDigitTicker";
import PiDigitRings from "@/components/canvas/PiDigitRings";
import BackgroundEffects from "@/components/BackgroundEffects";
import Hero from "@/components/sections/Hero";
import Tokenomics from "@/components/sections/Tokenomics";
import Story from "@/components/sections/Story";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Community } from "@/components/sections/Community";
import { Footer } from "@/components/sections/Footer";
import ScrollOrchestrator from "@/components/ScrollOrchestrator";

/** Decorative section divider — gold gradient line, centered. */
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        pointerEvents: "none",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "200px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.5) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <PiDigitRings />
      <BackgroundEffects />
      <PiDigitTicker />
      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Tokenomics />
        <SectionDivider />
        <Story />
        <SectionDivider />
        <HowToBuy />
        <SectionDivider />
        <Community />
        <SectionDivider />
        <Footer />
      </main>
      <ScrollOrchestrator />
    </>
  );
}
