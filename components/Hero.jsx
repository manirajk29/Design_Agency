"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);
  const avatarRefs = useRef([]);
  const placeholderRefs = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger plugin on the client
    gsap.registerPlugin(ScrollTrigger);

    const refreshHandler = () => {
      avatarRefs.current.forEach((avatar) => {
        if (avatar) {
          gsap.set(avatar, { clearProps: "x,y,scale,borderWidth,borderColor" });
        }
      });
    };

    ScrollTrigger.addEventListener("refreshInit", refreshHandler);

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Helper to calculate page-relative offset of an element
      const getPageOffset = (el) => {
        let top = 0;
        let left = 0;
        let current = el;
        while (current) {
          top += current.offsetTop || 0;
          left += current.offsetLeft || 0;
          current = current.offsetParent;
        }
        return { top, left };
      };

      // Desktop: Morph avatars to their bottom row placeholders on scroll
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%", // Pin and animate over 100% viewport scroll height
            scrub: 1, // Smooth scrub linked directly to scroll bar
            pin: true, // Pin the Hero element in the viewport
            invalidateOnRefresh: true, // Recalculate offsets on resize
          },
        });

        [0, 1, 2, 3].forEach((idx) => {
          const avatar = avatarRefs.current[idx];
          const placeholder = placeholderRefs.current[idx];
          if (!avatar || !placeholder) return;

          tl.to(
            avatar,
            {
              x: () => {
                const aPos = getPageOffset(avatar);
                const pPos = getPageOffset(placeholder);
                return pPos.left - aPos.left;
              },
              y: () => {
                const aPos = getPageOffset(avatar);
                const pPos = getPageOffset(placeholder);
                return pPos.top - aPos.top;
              },
              scale: () => {
                return placeholder.offsetWidth / avatar.offsetWidth;
              },
              borderWidth: "2px",
              borderColor: "var(--background)",
              ease: "power1.inOut",
            },
            0
          );
        });
      });

      // Mobile/Tablet: Disable pinning and morphing, show a simple entry animation
      mm.add("(max-width: 767px)", () => {
        [0, 1, 2, 3].forEach((idx) => {
          const avatar = avatarRefs.current[idx];
          if (!avatar) return;
          gsap.fromTo(
            avatar,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              delay: 0.15 * idx,
              ease: "power2.out",
            }
          );
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.removeEventListener("refreshInit", refreshHandler);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[100dvh] w-full flex flex-col items-center justify-between pt-24 pb-8 overflow-hidden bg-[var(--background)] border-b border-[var(--border-color-custom)]"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.015] blur-[155px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center items-center relative z-10 select-none gap-6 md:gap-10">
        
        {/* Main centered text block with absolute positioned avatars and seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-fit mx-auto text-center z-20"
        >
          {/* Giant Header Title in Bebas Neue */}
          <h1 className="text-[13.5vw] md:text-[14.5vw] font-bold font-bebas leading-[0.8] tracking-tight uppercase select-none">
            <span className="block text-[var(--hero-creative-color)] tracking-normal">CREATIVE</span>
            <span className="block text-[var(--hero-strategy-color)] tracking-normal">STRATEGY</span>
          </h1>

          {/* Avatar 1: Placed Outside Left side of C */}
          <div
            ref={(el) => (avatarRefs.current[0] = el)}
            className="absolute top-[-10%] left-[-15%] w-[14vw] h-[14vw] min-w-[40px] min-h-[40px] max-w-[70px] max-h-[70px] rounded-full overflow-hidden border-[3px] border-[var(--background)] shadow-2xl z-20 select-none md:top-[6%] md:left-[-15%] md:w-[11.5vw] md:h-[11.5vw] md:min-w-[55px] md:min-h-[55px] md:border-[5px]"
          >
            <Image
              src="/images/avatar1.png"
              alt="Creative portrait 1"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Avatar 2: Placed Outside Top right area */}
          <div
            ref={(el) => (avatarRefs.current[1] = el)}
            className="absolute top-[-10%] left-[95%] w-[14vw] h-[14vw] min-w-[40px] min-h-[40px] max-w-[70px] max-h-[70px] rounded-full overflow-hidden border-[3px] border-[var(--background)] shadow-2xl z-20 select-none md:top-[6%] md:left-[103%] md:w-[11.5vw] md:h-[11.5vw] md:min-w-[55px] md:min-h-[55px] md:border-[5px]"
          >
            <Image
              src="/images/avatar2.png"
              alt="Creative portrait 2"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Avatar 3: Placed Outside Bottom Left area */}
          <div
            ref={(el) => (avatarRefs.current[2] = el)}
            className="absolute bottom-[-8%] left-[-10%] w-[14vw] h-[14vw] min-w-[40px] min-h-[40px] max-w-[70px] max-h-[70px] rounded-full overflow-hidden border-[3px] border-[var(--background)] shadow-2xl z-20 select-none md:bottom-[8%] md:left-[-12%] md:w-[11.5vw] md:h-[11.5vw] md:min-w-[55px] md:min-h-[55px] md:border-[5px]"
          >
            <Image
              src="/images/avatar3.png"
              alt="Creative portrait 3"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Avatar 4: Placed Outside Bottom Right area */}
          <div
            ref={(el) => (avatarRefs.current[3] = el)}
            className="absolute bottom-[10%] left-[95%] w-[14vw] h-[14vw] min-w-[40px] min-h-[40px] max-w-[70px] max-h-[70px] rounded-full overflow-hidden border-[3px] border-[var(--background)] shadow-2xl z-20 select-none md:bottom-[22%] md:left-[101%] md:w-[11.5vw] md:h-[11.5vw] md:min-w-[55px] md:min-h-[55px] md:border-[5px]"
          >
            <Image
              src="/images/avatar4.png"
              alt="Creative portrait 4"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Spinning SVG Text Seal: Overlaps bottom-left area of S/T in the left corner */}
          <div className="absolute bottom-[-15%] left-[-5%] w-[18vw] h-[18vw] min-w-[65px] min-h-[65px] max-w-[100px] max-h-[100px] select-none pointer-events-auto z-30 md:bottom-[-8%] md:left-[-6%] md:w-[13.5vw] md:h-[13.5vw] md:min-w-[80px] md:min-h-[80px] md:max-w-[170px] md:max-h-[170px]">
            <a href="#portfolio" className="relative group flex items-center justify-center h-full w-full">
              {/* Spinning Text */}
              <svg className="absolute inset-0 h-full w-full animate-spin-slow origin-center" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="transparent"
                  />
                </defs>
                <text className="text-[7.5px] fill-[var(--hero-spin-color)] font-bold font-sans uppercase tracking-[2px]">
                  <textPath href="#circlePath">
                    WE CRAFT UNIQUE BRAND IDENTITIES • UNIQUE VALUES •
                  </textPath>
                </text>
              </svg>
              {/* Center Arrow */}
              <div className="h-7 w-7 sm:h-9 sm:w-9 md:h-14 md:w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowRight className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 transform group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>

        </motion.div>

        {/* Bottom Elements: Description & Stats stacked vertically */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center justify-center text-center font-medium relative z-10"
        >
          {/* Description text in Inter */}
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl leading-relaxed mb-8 px-4 font-medium">
            We are a modern creative agency helping brands to transform ideas into impactful digital experiences from strategy to execution.
          </p>

          {/* Overlapping Client Avatars stack & 10K+ stats */}
          <div className="flex flex-row items-start gap-10">
            {/* Avatars Stack Placeholders for landing target on desktop, static images on mobile */}
            <div className="flex -space-x-3 select-none -mt-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  ref={(el) => (placeholderRefs.current[idx] = el)}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-[var(--background)] bg-[var(--background)] relative overflow-hidden md:bg-transparent md:border-transparent md:opacity-0"
                >
                  <Image
                    src={`/images/avatar${idx + 1}.png`}
                    alt={`Client portrait ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Stats description text */}
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-2xl sm:text-3xl font-bold font-sans text-[var(--text-black-custom)] tracking-tight">
                10K+
              </span>
              <span className="text-[10px] sm:text-xs text-slate-450 mt-1 uppercase font-bold tracking-wide">
                Global clients work with us
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
