"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[100dvh] min-h-[600px] flex flex-col items-center justify-between pt-24 pb-8 overflow-hidden bg-[#050508]"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.015] blur-[155px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center items-center relative z-10 select-none gap-6 md:gap-10">
        
        {/* Main centered text block with absolute positioned avatars and seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-fit mx-auto text-center"
        >
          {/* Giant Header Title in Bebas Neue */}
          <h1 className="text-[13.5vw] md:text-[14.5vw] font-bold font-bebas leading-[0.8] tracking-tight uppercase select-none">
            <span className="block text-[#b4fe1e] tracking-normal">CREATIVE</span>
            <span className="block text-[#d4cfc9] tracking-normal">STRATEGY</span>
          </h1>

          {/* Avatar 1: Overlaps Left side of C */}
          <div className="absolute top-[6%] left-[-4%] w-[11.5vw] h-[11.5vw] max-w-[150px] max-h-[150px] min-w-[55px] min-h-[55px] rounded-full overflow-hidden border-[0.3vw] md:border-[5px] border-[#050508] shadow-2xl z-20 select-none">
            <Image
              src="/images/avatar1.png"
              alt="Creative portrait 1"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Avatar 2: Overlaps Top right area of I */}
          <div className="absolute top-[6%] left-[67%] w-[11.5vw] h-[11.5vw] max-w-[150px] max-h-[150px] min-w-[55px] min-h-[55px] rounded-full overflow-hidden border-[0.3vw] md:border-[5px] border-[#050508] shadow-2xl z-20 select-none">
            <Image
              src="/images/avatar2.png"
              alt="Creative portrait 2"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Avatar 3: Overlaps Bottom Left area of S */}
          <div className="absolute bottom-[8%] left-[8%] w-[11.5vw] h-[11.5vw] max-w-[150px] max-h-[150px] min-w-[55px] min-h-[55px] rounded-full overflow-hidden border-[0.3vw] md:border-[5px] border-[#050508] shadow-2xl z-20 select-none">
            <Image
              src="/images/avatar3.png"
              alt="Creative portrait 3"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Avatar 4: Overlaps Bottom Right area of Y */}
          <div className="absolute bottom-[22%] left-[84%] w-[11.5vw] h-[11.5vw] max-w-[150px] max-h-[150px] min-w-[55px] min-h-[55px] rounded-full overflow-hidden border-[0.3vw] md:border-[5px] border-[#050508] shadow-2xl z-20 select-none">
            <Image
              src="/images/avatar4.png"
              alt="Creative portrait 4"
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Spinning SVG Text Seal: Overlaps bottom-right area of Y */}
          <div className="absolute bottom-[-8%] right-[-6%] w-[13.5vw] h-[13.5vw] max-w-[170px] max-h-[170px] min-w-[80px] min-h-[80px] select-none pointer-events-auto z-30">
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
                <text className="text-[7.5px] fill-[#8a8a8a] font-bold font-sans uppercase tracking-[2px]">
                  <textPath href="#circlePath">
                    WE CRAFT UNIQUE BRAND IDENTITIES • UNIQUE VALUES •
                  </textPath>
                </text>
              </svg>
              {/* Center Arrow */}
              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>

        </motion.div>

        {/* Bottom Elements: Description & Stats stacked vertically */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center justify-center text-center"
        >
          {/* Description text in Inter */}

          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl leading-relaxed mb-8 px-4 font-medium">
            We are a modern creative agency helping brands to transform ideas into impactful digital experiences from strategy to execution.
          </p>

          {/* Overlapping Client Avatars stack & 10K+ stats */}
          <div className="flex flex-row items-center gap-4">
            {/* Avatars Stack */}
            <div className="flex -space-x-3 select-none">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-[#050508] shadow-md">
                <Image
                  src="/images/avatar1.png"
                  alt="Client partner 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-[#050508] shadow-md">
                <Image
                  src="/images/avatar2.png"
                  alt="Client partner 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-[#050508] shadow-md">
                <Image
                  src="/images/avatar3.png"
                  alt="Client partner 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border-2 border-[#050508] shadow-md">
                <Image
                  src="/images/avatar4.png"
                  alt="Client partner 4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Stats description text */}
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
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
