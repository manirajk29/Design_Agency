"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "15K", label: "Successful projects" },
  { value: "98%", label: "Client satisfaction rate" },
  { value: "10+", label: "Design awards won" },
  { value: "10K", label: "Global client network" },
];

export default function About() {
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
    <section id="about" className="relative py-24 sm:py-32 bg-[var(--about-bg)] text-[var(--about-text)] overflow-hidden select-none border-b border-[var(--border-color-custom)]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Title: ABOUT in giant Bebas Neue */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <h2 className="text-[100px] sm:text-[130px] md:text-[150px] lg:text-[170px] xl:text-[180px] font-bold font-bebas leading-[0.8] text-[var(--text-black-custom)] tracking-normal select-none uppercase">
              ABOUT
            </h2>
          </motion.div>

          {/* Right Statement: giant uppercase statement in Bebas Neue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <p className="text-3xl sm:text-4xl md:text-[42px] font-bold font-bebas leading-[0.98] text-[var(--text-black-custom)] uppercase max-w-2xl lg:mt-4 tracking-tight select-none">
              WE’RE A PASSIONATE CREATIVE AGENCY BLENDING DESIGN AND TECHNOLOGY THAT INSPIRE, ENGAGE, AND ELEVATE BRANDS WORLDWIDE.
            </p>
          </motion.div>
        </div>

        {/* Stats Row Cards: Light gray bg, black Bebas Neue numbers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-[var(--stat-card)] p-5 sm:p-10 rounded-xl flex flex-col items-center justify-center text-center border border-[var(--border-color-custom)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none shadow-sm"
            >
              <h3 className="text-[40px] sm:text-[65px] md:text-[75px] font-bold font-bebas text-[var(--stat-text)] leading-none mb-1 sm:mb-3 select-none">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[var(--foreground)] font-sans tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
