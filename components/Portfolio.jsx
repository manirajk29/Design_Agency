"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ["All", "Design", "Development", "Branding"];

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Design",
    image: "/images/fintech.png",
    description: "Futuristic dashboard showcasing complex real-time trading metrics.",
    link: "#",
  },
  {
    title: "E-Commerce Platform",
    category: "Development",
    image: "/images/ecommerce.png",
    description: "Next-gen headless retail platform optimized for speed.",
    link: "#",
  },
  {
    title: "Restaurant Brand Identity",
    category: "Branding",
    image: "/images/restaurant.png",
    description: "Complete visual rebranding and upscale menu presentation.",
    link: "#",
  },
  {
    title: "Travel Booking App",
    category: "Design",
    image: "/images/travel.png",
    description: "Sleek iOS app designed for finding bespoke luxury stays.",
    link: "#",
  },
  {
    title: "Healthcare Website",
    category: "Development",
    image: "/images/healthcare.png",
    description: "Patient-first health dashboard and clinic booking portal.",
    link: "#",
  },
  {
    title: "Startup Landing Page",
    category: "Design",
    image: "/images/startup.png",
    description: "Conversion-optimized landing design for a SaaS startup.",
    link: "#",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;

    const initAnimation = () => {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
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
            ease: "power2.inOut",
          }, 1);
        }

        // Fade in the fullscreen overlay text matching the reference image layout
        tl.to(".portfolio-fullscreen-overlay", {
          opacity: 1,
          ease: "power2.inOut",
        }, 1.15);

      }, triggerRef);
    };

    const timer = setTimeout(() => {
      initAnimation();
      ScrollTrigger.refresh();
    }, 150);

    const handleResize = () => {
      initAnimation();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

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
      {/* 1. CREATIVE PORTFOLIO Collage Transition Banner (GSAP Pinned Scroll Trigger) */}
      <div ref={triggerRef} className="relative w-full bg-[var(--collage-bg)] border-b border-[var(--border-color-custom)]">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-center relative py-20">
            
            <div
              ref={containerRef}
              className="relative w-fit mx-auto text-center py-20"
            >
              {/* Giant Title in Bebas Neue (Text sits in front via relative z-20) */}
              <h2 className="collage-title relative z-20 text-[13.5vw] md:text-[14.5vw] font-bold font-bebas leading-[0.8] tracking-tight uppercase select-none pointer-events-none">
                <span className="block text-[#9ca3af] tracking-normal">CREATIVE</span>
                <span className="block text-[var(--collage-text)] tracking-normal">PORTFOLIO</span>
              </h2>

              {/* collage1 (woman sideways): top-left of CREATIVE (z-10 to sit behind the z-20 text) */}
              <div className="collage-img absolute top-[4%] left-[-4%] w-[20vw] h-[13vw] max-w-[280px] max-h-[180px] min-w-[90px] min-h-[60px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage1.png"
                  alt="Creative collage 1"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* collage2 (autumn leaves): top-right of CREATIVE */}
              <div className="collage-img absolute top-[-4%] left-[45%] w-[22vw] h-[14vw] max-w-[300px] max-h-[200px] min-w-[100px] min-h-[65px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage2.png"
                  alt="Creative collage 2"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* collage3 (orange veins): middle-left of PORTFOLIO */}
              <div className="collage-img absolute top-[48%] left-[-12%] w-[22vw] h-[14vw] max-w-[300px] max-h-[200px] min-w-[100px] min-h-[65px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage3.png"
                  alt="Creative collage 3"
                  fill
                  className="object-cover"
                />
              </div>

              {/* collage4 (coral): middle-right of CREATIVE / PORTFOLIO */}
              <div className="collage-img absolute top-[35%] right-[-12%] w-[22vw] h-[14vw] max-w-[300px] max-h-[200px] min-w-[100px] min-h-[65px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage4.png"
                  alt="Creative collage 4"
                  fill
                  className="object-cover"
                />
              </div>

              {/* collage5 (concrete perspective): bottom-left of PORTFOLIO */}
              <div className="collage-img absolute bottom-[-15%] left-[20%] w-[22vw] h-[15vw] max-w-[300px] max-h-[210px] min-w-[100px] min-h-[70px] rounded-lg overflow-hidden shadow-2xl border border-[var(--border-color-custom)] select-none z-10">
                <Image
                  src="/images/collage5.png"
                  alt="Creative collage 5"
                  fill
                  className="object-cover"
                />
              </div>

              {/* collage6 (B&W eye): bottom-right of PORTFOLIO (z-30 to sit on top of the text and other images) */}
              <div className="collage-img absolute bottom-[-10%] right-[8%] w-[24vw] h-[13.5vw] max-w-[320px] max-h-[180px] min-w-[120px] min-h-[67.5px] rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-[var(--border-color-custom)] select-none z-30">
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

          {/* Fullscreen Overlay with reference image styling */}
          <div className="portfolio-fullscreen-overlay absolute inset-0 flex flex-col items-center justify-center z-40 opacity-0 pointer-events-none bg-black/30">
            <div className="flex flex-col items-center justify-center text-center px-6 w-full max-w-7xl mx-auto">
              <h2 className="text-white font-bold leading-[0.8] tracking-tighter uppercase font-bebas text-[11vw] md:text-[8vw] select-none flex flex-col items-center gap-1.5 md:gap-3">
                <span className="block">CREATIVITY</span>
                <span className="block">TECHNOLOGY</span>
                <span className="block">AND</span>
                <span className="block">STRATEGY</span>
              </h2>

              <p className="text-[#e2e8f0] text-xs sm:text-sm md:text-base max-w-lg sm:max-w-xl md:max-w-2xl leading-relaxed mt-10 sm:mt-12 md:mt-16 px-4 font-sans font-medium">
                We are a modern creative agency helping brands to transform ideas
                into impactful digital experiences from strategy to execution.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Portfolio Project Grid (Dark Mode - Visual Alignment) */}
      <section className="relative py-24 sm:py-32 bg-[var(--background)] overflow-hidden">
        {/* Background glow overlay */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.015] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-6 border-b border-[var(--border-color-custom)]">
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
 
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[var(--foreground)] mr-1.5 hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer border ${
                    activeCategory === category
                      ? "bg-[#b4fe1e] border-[#b4fe1e] text-black shadow-sm"
                      : "bg-[var(--card)] border-[var(--card-border)] text-[var(--foreground)] hover:bg-[#b4fe1e]/10 hover:border-[#b4fe1e]/20 hover:text-[#b4fe1e]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
 
          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={project.title}
                  className="group relative rounded-2xl overflow-hidden bg-[var(--card)] aspect-[4/3] border border-[var(--card-border)] hover:border-[#b4fe1e]/20 hover:shadow-2xl hover:shadow-[#b4fe1e]/5 flex flex-col justify-end"
                >
                  {/* Image Zoom */}
                  <div className="absolute inset-0 z-0 overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-85 group-hover:opacity-55 transition-opacity duration-500 ease-in-out"
                      priority={idx < 3}
                    />
                  </div>

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 transition-opacity duration-500 ease-in-out group-hover:from-black/98 group-hover:via-black/60" />

                  {/* Content Overlay */}
                  <div className="relative z-20 p-6 sm:p-8 flex flex-col items-start translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-3 border border-white/5">
                      {project.category}
                    </span>

                    <h4 className="text-xl font-bold text-white mb-2 transition-colors duration-300">
                      {project.title}
                    </h4>

                    {/* Descriptions */}
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-75 font-medium">
                      {project.description}
                    </p>

                    <a
                      href={project.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-450 hover:text-[#b4fe1e] transition-all duration-300"
                    >
                      View Project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
