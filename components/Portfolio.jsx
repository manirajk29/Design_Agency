"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Link from "next/link";
import { projects } from "@/data/projects";

export default function Portfolio() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin on the client
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned scrolling and fullscreen transitions
      mm.add("(min-width: 1024px)", () => {
        const container = containerRef.current;
        const images = gsap.utils.toArray(".collage-img");
        if (!container || images.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        images.forEach((img, idx) => {
          const containerW = container.offsetWidth;
          const containerH = container.offsetHeight;
          const imgW = img.offsetWidth;
          const imgH = img.offsetHeight;
          const imgL = img.offsetLeft;
          const imgT = img.offsetTop;

          const dx = (containerW / 2) - (imgL + imgW / 2);
          const dy = (containerH / 2) - (imgT + imgH / 2);

          const isMainImage = idx === 5;
          const targetScale = isMainImage ? 1.55 : 0.8;
          const targetOpacity = isMainImage ? 1 : 0;
          const targetRotation = isMainImage ? 0 : (idx % 2 === 0 ? -12 : 12);

          tl.to(img, {
            x: dx,
            y: dy,
            rotation: targetRotation,
            scale: targetScale,
            opacity: targetOpacity,
            ease: "power2.inOut",
          }, 0);
        });

        tl.to(".collage-title", {
          opacity: 0,
          scale: 0.9,
          ease: "power2.inOut",
        }, 0);

        // Phase 2: Expand main image (collage6) to cover the entire screen viewport dynamically
        const mainImg = images[5];
        if (mainImg) {
          const mainImgW = mainImg.offsetWidth;
          const mainImgH = mainImg.offsetHeight;
          const scaleX = window.innerWidth / mainImgW;
          const scaleY = window.innerHeight / mainImgH;
          const coverScale = Math.max(scaleX, scaleY) * 1.05;

          tl.to(mainImg, {
            scale: coverScale,
            borderRadius: 0,
            borderWidth: 0,
            boxShadow: "none",
            zIndex: 60, // Ensure it covers the z-50 Navbar during expand
            ease: "power2.inOut",
          }, 1);
        }

        // Slide up and fade out the header navigation bar during the zoom
        tl.to("header", {
          y: -120,
          opacity: 0,
          pointerEvents: "none",
          duration: 0.4,
          ease: "power2.inOut",
        }, 1);

        // Fade in the fullscreen overlay text matching the reference image layout
        tl.to(".portfolio-fullscreen-overlay", {
          opacity: 1,
          ease: "power2.inOut",
        }, 1.15);

        // Draw horizontal reveal line
        tl.to(".portfolio-line", {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.inOut",
        }, 1.25);

        // Expand text from the line
        tl.to(".portfolio-title", {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power2.out",
        }, 1.55);

        // Fade out/retract the line slightly
        tl.to(".portfolio-line", {
          opacity: 0,
          scaleX: 0.8,
          duration: 0.4,
          ease: "power2.in",
        }, 1.95);

        // Fade in the subtitle text
        tl.to(".portfolio-desc", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, 1.75);
      });

      // Mobile/Tablet: Disable pinning/scaling. Let images load naturally.
      mm.add("(max-width: 1023px)", () => {
        const images = gsap.utils.toArray(".collage-img");
        images.forEach((img, idx) => {
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 0.95, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              delay: 0.1 * idx,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      });
    }, triggerRef);

    // Initial timeout to ensure heights are ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const track = horizontalTrackRef.current;
      const section = horizontalSectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      gsap.fromTo(track,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount())}`,
            invalidateOnRefresh: true,
          }
        }
      );
    }, horizontalSectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div id="portfolio">
      {/* 1. CREATIVE PORTFOLIO Collage Transition Banner (GSAP Pinned Scroll Trigger on Desktop) */}
      <div ref={triggerRef} className="relative w-full bg-[var(--collage-bg)] border-b border-[var(--border-color-custom)]">
        <section className="relative min-h-[75vh] lg:h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden py-12 lg:py-0">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center justify-center relative py-10 lg:py-20">
            
            <div
              ref={containerRef}
              className="relative w-fit mx-auto text-center py-20"
            >
              {/* Giant Title in Bebas Neue (Text sits in front via relative z-20) */}
              <h2 className="collage-title relative z-20 text-[13vw] sm:text-[14vw] lg:text-[13vw] xl:text-[14vw] font-bold font-bebas leading-[0.8] tracking-tight uppercase select-none pointer-events-none">
                <span className="block text-[#9ca3af] tracking-normal">CREATIVE</span>
                <span className="block text-[var(--collage-text)] tracking-normal">PORTFOLIO</span>
              </h2>

              {/* collage1 (woman sideways): top-left of CREATIVE (z-10 to sit behind the z-20 text) */}
              <div className="collage-img absolute top-[2%] left-[-4%] w-[18vw] h-[12vw] min-w-[70px] min-h-[45px] lg:top-[4%] lg:left-[-4%] lg:w-[20vw] lg:h-[13vw] lg:min-w-[90px] lg:min-h-[60px] max-w-[280px] max-h-[180px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage1.png"
                  alt="Creative collage 1"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* collage2 (autumn leaves): top-right of CREATIVE */}
              <div className="collage-img absolute top-[-5%] left-[50%] w-[20vw] h-[13vw] min-w-[80px] min-h-[50px] lg:top-[-4%] lg:left-[45%] lg:w-[22vw] lg:h-[14vw] lg:min-w-[100px] lg:min-h-[65px] max-w-[300px] max-h-[200px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage2.png"
                  alt="Creative collage 2"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* collage3 (orange veins): middle-left of PORTFOLIO */}
              <div className="collage-img absolute top-[48%] left-[-10%] w-[20vw] h-[13vw] min-w-[80px] min-h-[50px] lg:top-[48%] lg:left-[-12%] lg:w-[22vw] lg:h-[14vw] lg:min-w-[100px] lg:min-h-[65px] max-w-[300px] max-h-[200px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage3.png"
                  alt="Creative collage 3"
                  fill
                  className="object-cover"
                />
              </div>

              {/* collage4 (coral): middle-right of CREATIVE / PORTFOLIO */}
              <div className="collage-img absolute top-[35%] right-[-10%] w-[20vw] h-[13vw] min-w-[80px] min-h-[50px] lg:top-[35%] lg:right-[-12%] lg:w-[22vw] lg:h-[14vw] lg:min-w-[100px] lg:min-h-[65px] max-w-[300px] max-h-[200px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage4.png"
                  alt="Creative collage 4"
                  fill
                  className="object-cover"
                />
              </div>

              {/* collage5 (concrete perspective): bottom-left of PORTFOLIO */}
              <div className="collage-img absolute bottom-[-10%] left-[22%] w-[20vw] h-[14vw] min-w-[80px] min-h-[55px] lg:bottom-[-15%] lg:left-[20%] lg:w-[22vw] lg:h-[15vw] lg:min-w-[100px] lg:min-h-[70px] max-w-[300px] max-h-[210px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage5.png"
                  alt="Creative collage 5"
                  fill
                  className="object-cover"
                />
              </div>

              {/* collage6 (B&W eye): bottom-right of PORTFOLIO (z-30 to sit on top of the text and other images) */}
              <div className="collage-img absolute bottom-[-8%] right-[10%] w-[22vw] h-[12.5vw] min-w-[95px] min-h-[55px] lg:bottom-[-10%] lg:right-[8%] lg:w-[24vw] lg:h-[13.5vw] lg:min-w-[120px] lg:min-h-[67.5px] max-w-[320px] max-h-[180px] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-[var(--border-color-custom)] select-none z-30">
                <Image
                  src="/images/collage6.png"
                  alt="Creative collage 6"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

            </div>

          </div>

          {/* Desktop Fullscreen Overlay (Fades in on Desktop scroll) */}
          <div className="portfolio-fullscreen-overlay absolute inset-0 hidden lg:flex flex-col items-center justify-center z-[60] opacity-0 pointer-events-none bg-black/35">
            <div className="flex flex-col items-center justify-center text-center px-6 w-full max-w-7xl mx-auto relative">
              <div className="relative w-full flex flex-col items-center justify-center py-8">
                {/* Horizontal Line for text reveal */}
                <div 
                  className="portfolio-line w-full max-w-2xl h-[2px] bg-[#9b87f5] absolute z-20"
                  style={{ transform: "scaleX(0)" }}
                />
                
                <h2 
                  className="portfolio-title text-white font-bold leading-[0.8] tracking-[0.1px] uppercase font-bebas text-[9vw] select-none text-center z-10"
                  style={{
                    clipPath: "inset(50% 0% 50% 0%)",
                    opacity: 0
                  }}
                >
                  <span className="block">CREATIVITY</span>
                  <span className="block">TECHNOLOGY</span>
                  <span className="block">AND</span>
                  <span className="block">STRATEGY</span>
                </h2>
              </div>

              <p 
                className="portfolio-desc text-[#e2e8f0]/90 text-sm md:text-base max-w-lg sm:max-w-xl md:max-w-2xl leading-relaxed mt-4 px-4 font-sans font-medium text-center"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                We are a modern creative agency helping brands to transform ideas
                into impactful digital experiences from strategy to execution.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile/Tablet Content Block (Visible only below lg breakpoint) */}
        <div className="lg:hidden w-full flex flex-col items-center justify-center text-center px-6 mt-8 pb-12 border-b border-[var(--border-color-custom)]">
          <h2 className="text-[var(--text-black-custom)] font-bold leading-[0.85] tracking-tighter uppercase font-bebas text-[11vw] sm:text-[9vw] select-none text-center mb-6">
            <span className="block text-[var(--portfolio-creativity-color)]">CREATIVITY</span>
            <span className="block">TECHNOLOGY</span>
            <span className="block">AND</span>
            <span className="block text-slate-350">STRATEGY</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md sm:max-w-lg leading-relaxed font-sans font-medium text-center">
            We are a modern creative agency helping brands to transform ideas
            into impactful digital experiences from strategy to execution.
          </p>
        </div>
      </div>

      {/* 2. Portfolio Project Horizontal Scroll (Dark Mode - Visual Alignment) */}
      <section 
        ref={horizontalSectionRef} 
        id="portfolio-grid" 
        className="relative h-screen bg-[var(--background)] overflow-hidden border-b border-[var(--border-color-custom)] flex flex-col justify-center py-10"
      >
        {/* Background glow overlay */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.015] blur-[150px] pointer-events-none" />

        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 mb-8 md:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--card-border)] mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Featured Projects
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-black-custom)] leading-tight">
              Where Strategy Meets Beautiful Design
            </h3>
          </div>
        </div>
 
        {/* Horizontal Scroll Track */}
        <div className="relative w-full z-10 overflow-hidden">
          <div 
            ref={horizontalTrackRef} 
            className="flex flex-row gap-8 md:gap-12 pl-[15vw] md:pl-[25vw] lg:pl-[35vw] pr-6 md:pr-12 lg:pr-16 w-max"
          >
            {projects.map((project, idx) => (
              <motion.div
                id={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                key={project.title}
                className="group relative rounded-2xl overflow-hidden bg-[var(--card)] w-[75vw] sm:w-[50vw] lg:w-[35vw] h-[40vh] sm:h-[45vh] lg:h-[50vh] border border-[var(--card-border)] hover:border-[#9b87f5]/20 hover:shadow-2xl hover:shadow-[#9b87f5]/5 flex flex-col justify-end flex-shrink-0 scroll-mt-24"
              >
                {/* Image Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 35vw"
                    className="object-cover opacity-85 group-hover:opacity-55 transition-opacity duration-500 ease-in-out"
                    priority={idx < 3}
                  />
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-500 ease-in-out group-hover:from-black/98 group-hover:via-black/60" />

                {/* Content Overlay */}
                <div className="relative z-20 p-6 sm:p-8 flex flex-col items-start translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-350 mb-3 border border-white/5">
                    {project.category}
                  </span>

                  <h4 className="text-xl font-bold text-white mb-2 transition-colors duration-300">
                    {project.title}
                  </h4>

                  {/* Descriptions */}
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-75 font-medium">
                    {project.description}
                  </p>

                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-450 hover:text-[#9b87f5] transition-all duration-300"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
