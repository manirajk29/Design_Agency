"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 8-point star SVG component with custom overlap
const StarGroup = () => (
  <div className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center mx-4 md:mx-8">
    {/* Large Star */}
    <svg
      viewBox="0 0 100 100"
      className="w-[75%] h-[75%] text-[#d1d1cf] fill-current translate-x-1.5 translate-y-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
    >
      <path d="M 50 10 L 53 40 L 78 22 L 60 48 L 90 50 L 60 52 L 78 78 L 53 60 L 50 90 L 47 60 L 22 78 L 40 52 L 10 50 L 40 48 L 22 22 L 47 40 Z" />
    </svg>
    {/* Small Star */}
    <svg
      viewBox="0 0 100 100"
      className="absolute top-[10%] left-[10%] w-[35%] h-[35%] text-[#9b87f5] fill-current drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]"
    >
      <path d="M 50 10 L 53 40 L 78 22 L 60 48 L 90 50 L 60 52 L 78 78 L 53 60 L 50 90 L 47 60 L 22 78 L 40 52 L 10 50 L 40 48 L 22 22 L 47 40 Z" />
    </svg>
  </div>
);

export default function TransitionMarquee() {
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Set initial position to -50% for left-to-right translation
    gsap.set(marquee, { xPercent: -50 });

    // Linear translation timeline for infinite loop scroll (scrolling left-to-right)
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    tl.to(marquee, {
      xPercent: 0,
      duration: 25, // Time in seconds for one full loop
    });

    // Create ScrollTrigger to alter the marquee speed based on user scrolling (always forward)
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Speed factor scaled with velocity, capped at 7x default speed for good UX
        const speedFactor = 1 + Math.min(Math.abs(velocity) * 0.0035, 6);

        gsap.to(tl, {
          timeScale: speedFactor, // always positive to keep moving left-to-right without reversing/stopping
          duration: 0.15,
          overwrite: "auto",
        });

        // Smoothly decay back to standard speed (timeScale = 1) after user stops scrolling
        gsap.to(tl, {
          timeScale: 1,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    return () => {
      tl.kill();
      trigger.kill();
    };
  }, []);

  // Single marquee item unit: [StarGroup] [WORKS] [Creative projects (stacked)] [WORKS]
  const renderMarqueeBlock = () => (
    <div className="flex items-center flex-shrink-0">
      <StarGroup />
      <span className="text-[#d1d1cf] font-bebas text-6xl md:text-[8rem] font-bold tracking-tight uppercase leading-none select-none">
        WORKS
      </span>
      <div className="flex flex-col justify-center items-start leading-[0.85] text-left mx-6 md:mx-12 select-none">
        <span className="text-[#9b87f5] font-sans text-lg md:text-3xl font-extrabold italic tracking-tight uppercase">
          Creative
        </span>
        <span className="text-[#9b87f5] font-sans text-lg md:text-3xl font-extrabold italic tracking-tight uppercase">
          projects
        </span>
      </div>
      <span className="text-[#d1d1cf] font-bebas text-6xl md:text-[8rem] font-bold tracking-tight uppercase leading-none select-none">
        WORKS
      </span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050508] border-y border-[var(--border-color-custom)] py-6 md:py-8 overflow-hidden z-20"
    >
      <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
        {/* First set of blocks */}
        <div className="flex items-center">
          {renderMarqueeBlock()}
          {renderMarqueeBlock()}
          {renderMarqueeBlock()}
          {renderMarqueeBlock()}
        </div>
        {/* Second identical set of blocks for seamless duplication scroll */}
        <div className="flex items-center">
          {renderMarqueeBlock()}
          {renderMarqueeBlock()}
          {renderMarqueeBlock()}
          {renderMarqueeBlock()}
        </div>
      </div>
    </div>
  );
}
