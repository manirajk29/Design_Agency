"use client";

import { motion } from "framer-motion";
import { Layers, Code2, Compass, TrendingUp, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "UI/UX Design",
    description: "Designing beautiful, intuitive interfaces optimized for seamless user journeys, high engagement, and polished brand alignment.",
    color: "group-hover:text-[#b4fe1e]",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Building fast, SEO-friendly, and secure web applications utilizing modern stacks like Next.js, React, and Tailwind CSS.",
    color: "group-hover:text-[#b4fe1e]",
  },
  {
    icon: Compass,
    title: "Branding",
    description: "Crafting memorable visual identities, logos, style guides, and design languages that communicate your mission and values.",
    color: "group-hover:text-[#b4fe1e]",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Scaling your online presence through data-driven campaigns, conversion rate optimization, and growth strategy.",
    color: "group-hover:text-[#b4fe1e]",
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="services" className="relative py-24 sm:py-32 bg-[#050508] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#b4fe1e]/[0.012] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-350">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            We Design Products That Shape The Future
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed"
          >
            From high-fidelity UI/UX design to robust code development and growth marketing, we provide full-lifecycle digital agency support.
          </motion.p>
        </div>

        {/* Services Grid (4 Cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative rounded-2xl bg-[#0b0f19]/35 p-8 border border-white/5 hover:border-[#b4fe1e]/20 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#b4fe1e]/5 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container */}
                  <div className="relative h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <IconComponent className={`h-6 w-6 text-slate-350 transition-colors duration-300 ${service.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-450 text-sm leading-relaxed mb-6 font-medium transition-colors duration-350 group-hover:text-slate-300">
                    {service.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors duration-300 cursor-pointer pt-4 border-t border-white/5">
                  Explore Service
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
