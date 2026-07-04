"use client";

import { use, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BarChart3, ShieldAlert } from "lucide-react";

export default function ProjectPage({ params }) {
  const { id } = use(params);
  const [showSpecs, setShowSpecs] = useState(true); // Default open for interactive show

  // Find project
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex-grow min-h-screen bg-[#050508] text-slate-400 font-sans flex items-center justify-center pt-24">
          <div className="text-center px-6">
            <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-extrabold text-white mb-2 font-sans">Project Not Found</h1>
            <p className="text-slate-400 mb-8 max-w-md font-sans">The project you are looking for does not exist or has been removed.</p>
            <Link
              href="/#portfolio-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow min-h-screen bg-[#050508] text-slate-400 font-sans pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 mt-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href={`/#${project.id}`}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color-custom)] bg-white/5 hover:bg-[#9b87f5]/15 hover:border-[#9b87f5]/30 text-slate-400 hover:text-[#9b87f5] transition-all duration-300 cursor-pointer shadow-md select-none"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-xs font-bold uppercase tracking-wider">Back to Portfolio</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Left: Image Container (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-color-custom)] shadow-2xl bg-[var(--card)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right: Project Details (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              {/* Category */}
              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-[#9b87f5]/10 border border-[#9b87f5]/20 text-xs font-bold uppercase tracking-widest text-[#9b87f5]">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-slate-350 text-base leading-relaxed mb-8 font-medium">
                {project.description}
              </p>

              {/* Project Metadata Cards */}
              <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] mb-8 shadow-sm">
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Client</span>
                  <span className="text-sm font-semibold text-white">{project.details.client}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Year</span>
                  <span className="text-sm font-semibold text-white">{project.details.year}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Services</span>
                  <span className="text-sm font-semibold text-white truncate block" title={project.details.services}>
                    {project.details.services.split(",")[0]}
                  </span>
                </div>
              </div>

              {/* Spec Toggle Accordion */}
              <div className="border border-[var(--border-color-custom)] rounded-2xl overflow-hidden bg-[var(--card)] shadow-md mb-8">
                <button
                  onClick={() => setShowSpecs(!showSpecs)}
                  className="w-full flex items-center justify-between p-5 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer select-none text-left"
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4.5 w-4.5 text-[#9b87f5]" />
                    <span className="text-sm font-bold uppercase tracking-wider text-white">Project Case Study</span>
                  </div>
                  {showSpecs ? <ChevronUp className="h-4 w-4 text-[#9b87f5]" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </button>

                <AnimatePresence initial={false}>
                  {showSpecs && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-[var(--border-color-custom)]"
                    >
                      <div className="p-5 flex flex-col gap-6 text-sm">
                        <div>
                          <h4 className="font-bold text-[#9b87f5] mb-1.5 uppercase tracking-wide text-xs">The Challenge</h4>
                          <p className="text-slate-350 leading-relaxed font-medium">{project.details.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-[#9b87f5] mb-1.5 uppercase tracking-wide text-xs">Our Solution</h4>
                          <p className="text-slate-350 leading-relaxed font-medium">{project.details.solution}</p>
                        </div>

                        {/* Stats */}
                        <div>
                          <h4 className="font-bold text-white mb-3 uppercase tracking-wide text-xs">Project Impact</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {project.details.stats.map((stat, sIdx) => (
                              <div key={sIdx} className="p-3 rounded-xl bg-white/2 border border-white/5 text-center">
                                <span className="block text-lg font-black text-[#9b87f5]">{stat.value}</span>
                                <span className="text-[10px] text-slate-500 font-bold leading-tight block mt-1">{stat.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>



            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
