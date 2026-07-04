"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "BRANDING",
    image: "/images/services_1.png",
    fallbackImage: "/images/collage1.png",
  },
  {
    title: "MARKETING",
    image: "/images/services_2.png",
    fallbackImage: "/images/collage2.png",
  },
  {
    title: "DESIGN",
    image: "/images/services_3.png",
    fallbackImage: "/images/collage3.png",
  },
  {
    title: "WEBSITE",
    image: "/images/services_4.png",
    fallbackImage: "/images/collage4.png",
  },
  {
    title: "APPLICATION",
    image: "/images/services_5.png",
    fallbackImage: "/images/collage5.png",
  },
];

const ServiceImage = ({ src, fallback, index }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <div
      className="service-image absolute inset-0 w-full h-full transition-opacity duration-300"
      style={{ zIndex: index === 0 ? 1 : 0 }}
    >
      <Image
        src={imgSrc}
        alt={`Service Image ${index + 1}`}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => setImgSrc(fallback)}
        priority={index === 0}
      />
      {/* Dark overlay to match the premium theme */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/25 pointer-events-none" />
    </div>
  );
};

export default function Services() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titlesListRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin on the client
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pin and run sliding title highlights on scroll
      mm.add("(min-width: 1024px)", () => {
        const titles = gsap.utils.toArray(".service-title-text");
        const images = gsap.utils.toArray(".service-image");
        const titleItems = gsap.utils.toArray(".service-title-item");
        const titlesList = titlesListRef.current;

        if (!titlesList || titles.length === 0 || images.length === 0) return;

        // Set initial state
        gsap.set(images, { opacity: 0 });
        gsap.set(images[0], { opacity: 1 });
        
        gsap.set(titles, { opacity: 0.15 });
        gsap.set(titles[0], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", // 300% of viewport height scroll distance
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Loop through services to create steps
        for (let i = 0; i < services.length - 1; i++) {
          const nextIdx = i + 1;
          const label = `step-${i}`;
          tl.addLabel(label);

          // 1. Crossfade images
          tl.to(images[i], { opacity: 0, duration: 1 }, label);
          tl.to(images[nextIdx], { opacity: 1, duration: 1 }, label);

          // 2. Animate text highlight
          tl.to(titles[i], { opacity: 0.15, duration: 1 }, label);
          tl.to(titles[nextIdx], { opacity: 1, duration: 1 }, label);

          // 3. Slide the titles container up
          tl.to(titlesList, {
            y: () => {
              const itemHeight = titleItems[0].offsetHeight;
              return -itemHeight * nextIdx;
            },
            duration: 1,
            ease: "power2.inOut",
          }, label);
        }
      });

      // Mobile/Tablet: No pinning/custom timeline transitions
      mm.add("(max-width: 1023px)", () => {
        // Services will fade in simple cards smoothly on scroll
        const cards = gsap.utils.toArray(".mobile-service-card");
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: idx * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      });
    }, sectionRef);

    // Initial timeout to ensure heights are ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative w-full bg-[var(--background)] overflow-hidden py-24 sm:py-32 lg:py-0 border-b border-[var(--border-color-custom)]"
    >
      {/* Desktop Animated Services Section */}
      <div 
        ref={containerRef} 
        className="hidden lg:flex h-screen w-full items-center justify-center relative py-12 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Left Column: Image Panel */}
          <div className="col-span-1 md:col-span-5 flex justify-center items-center">
            <div className="relative w-full aspect-[4/3] max-w-[450px] md:max-w-none rounded-2xl overflow-hidden border border-[var(--border-color-custom)] shadow-2xl bg-[var(--card)]">
              {services.map((service, index) => (
                <ServiceImage
                  key={index}
                  src={service.image}
                  fallback={service.fallbackImage}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Titles */}
          <div className="col-span-1 md:col-span-7 flex flex-col justify-center pl-0 md:pl-12">
            {/* Category Marker */}
            <span className="text-[#b4fe1e] italic text-sm md:text-base font-semibold mb-4 block select-none">
              services
            </span>
            
            {/* Window Container with Bottom Fade Mask */}
            <div 
              className="relative h-[300px] md:h-[450px] lg:h-[480px] xl:h-[550px] overflow-hidden flex items-start w-full"
              style={{
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            >
              <div 
                ref={titlesListRef} 
                className="service-titles-list flex flex-col w-full"
              >
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="service-title-item flex items-center h-[60px] md:h-[90px] lg:h-[130px] xl:h-[160px] w-full"
                  >
                    <h3 className="service-title-text text-5xl md:text-8xl lg:text-[7vw] xl:text-[8vw] font-black font-bebas tracking-wide uppercase select-none leading-none text-[var(--text-black-custom)]">
                      {service.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile/Tablet Services List (Visible below lg breakpoint) */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 relative z-10">
        <span className="text-[#b4fe1e] italic text-sm font-semibold mb-3 block select-none">
          our services
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-black-custom)] mb-12 leading-tight">
          Creative Solutions That Drive Real Growth
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="mobile-service-card group relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] border border-[var(--border-color-custom)] bg-[var(--card)] hover:border-[#b4fe1e]/20 hover:shadow-xl hover:shadow-[#b4fe1e]/5 transition-all duration-300 flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Background Service Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>
              
              {/* Card Text */}
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-black font-bebas tracking-wide uppercase text-white leading-none">
                  {service.title}
                </h3>
                <p className="text-slate-350 text-xs sm:text-sm font-sans mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 font-medium">
                  We create tailored {service.title.toLowerCase()} strategies that engage audiences, elevate brand equity, and drive high-performance business results.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
