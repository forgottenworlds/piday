"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollOrchestrator — master scroll-driven animation choreographer.
 *
 * Animation ownership rules:
 * - GSAP owns ALL scroll-driven animations (this file)
 * - Framer Motion handles ONLY non-scroll transitions (toast, mount/unmount)
 * - CSS handles ambient loops (ticker, pulse, portal rotation)
 *
 * Note: Several sections use Framer Motion whileInView for fade/y. GSAP layers
 * on top with stroke-draw animations and x-axis entrance effects that Framer
 * Motion cannot handle. They target different properties so there is no conflict.
 */
export default function ScrollOrchestrator() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, set everything to final visible state immediately
    if (reducedMotion) {
      gsap.set("[data-animate]", { opacity: 1, y: 0, x: 0 });

      // Reveal all SVG strokes instantly
      const allStrokes = gsap.utils.toArray<SVGGeometryElement>(
        "[data-section] circle[stroke-dashoffset], [data-section] path[stroke-dashoffset], [data-section] line[stroke-dashoffset]"
      );
      allStrokes.forEach((el) => {
        gsap.set(el, { strokeDashoffset: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // ================================================================
      // SECTION B — Tokenomics
      // Stroke-draw the GeometricShape SVG paths when section enters view
      // ================================================================
      const tokenomicsSection = document.querySelector(
        '[data-section="tokenomics"]'
      );
      if (tokenomicsSection) {
        // Each stat card is a [data-animate] element containing an SVG shape
        const shapeEls = gsap.utils.toArray<SVGGeometryElement>(
          '[data-section="tokenomics"] [data-animate] svg circle, [data-section="tokenomics"] [data-animate] svg path'
        );

        shapeEls.forEach((el, i) => {
          // strokeDasharray is already set on the element; read the offset to animate to 0
          const dasharray = el.getAttribute("strokeDasharray");
          if (!dasharray) return;
          const totalLength = parseFloat(dasharray);

          // Ensure starting from hidden state
          gsap.set(el, { strokeDashoffset: totalLength });

          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: tokenomicsSection,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // ================================================================
      // SECTION C — Story
      // Gold flare on .gold-flare-target spans when paragraphs enter view
      // ================================================================
      const storyParas = gsap.utils.toArray<HTMLElement>(
        '[data-section="story"] [data-animate]'
      );

      storyParas.forEach((para) => {
        const flareTargets = para.querySelectorAll<HTMLElement>(
          ".gold-flare-target"
        );

        ScrollTrigger.create({
          trigger: para,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            flareTargets.forEach((span, idx) => {
              // Add the CSS gold-flare animation class with a stagger
              gsap.delayedCall(idx * 0.25, () => {
                span.classList.add("gold-flare");
              });
            });
          },
        });
      });

      // ================================================================
      // SECTION E — How to Buy
      // RomanNumeral stroke-draw + ConnectingLine stroke (if applicable)
      // ================================================================
      const howToBuySection = document.querySelector(
        '[data-section="how-to-buy"]'
      );
      if (howToBuySection) {
        const htbStrokes = gsap.utils.toArray<SVGGeometryElement>(
          '[data-section="how-to-buy"] line[stroke-dashoffset]'
        );

        htbStrokes.forEach((el, i) => {
          const dasharray = el.getAttribute("strokeDasharray");
          if (!dasharray) return;
          const totalLength = parseFloat(dasharray);
          gsap.set(el, { strokeDashoffset: totalLength });

          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power1.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: howToBuySection,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // ================================================================
      // SECTION F — Community
      // Gateway panels slide in from sides
      // GatewayCard already has Framer Motion whileInView for opacity/y,
      // so GSAP only adds the x-axis entrance on the wrapper divs.
      // ================================================================
      const communitySection = document.querySelector(
        '[data-section="community"]'
      );
      if (communitySection) {
        // The two gateway card wrappers are the first and last flex children
        // within the gateway panels container (data-animate-gateway)
        const gatewayWrappers = gsap.utils.toArray<HTMLElement>(
          '[data-section="community"] [data-animate-gateway]'
        );

        if (gatewayWrappers.length >= 2) {
          // Left panel slides from left
          gsap.fromTo(
            gatewayWrappers[0],
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: communitySection,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );

          // Right panel slides from right
          gsap.fromTo(
            gatewayWrappers[1],
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.inOut",
              delay: 0.1,
              scrollTrigger: {
                trigger: communitySection,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // ================================================================
      // SECTION G — Footer
      // Simple fade in for footer content
      // ================================================================
      const footerSection = document.querySelector('[data-section="footer"]');
      if (footerSection) {
        const footerContent = footerSection.querySelector("div");
        if (footerContent) {
          gsap.fromTo(
            footerContent,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power1.out",
              scrollTrigger: {
                trigger: footerSection,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    });

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  // Render nothing — purely orchestrates animations
  return null;
}
