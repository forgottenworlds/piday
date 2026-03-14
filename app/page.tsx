import PiDigitTicker from "@/components/PiDigitTicker";
import PiDigitRings from "@/components/canvas/PiDigitRings";
import Hero from "@/components/sections/Hero";
import Tokenomics from "@/components/sections/Tokenomics";
import Story from "@/components/sections/Story";
import { MarketData } from "@/components/sections/MarketData";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Community } from "@/components/sections/Community";
import { Footer } from "@/components/sections/Footer";

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
      {/* ScrollOrchestrator added in Task 22 */}
    </>
  );
}
