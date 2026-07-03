"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme set
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border-color-custom)] shadow-lg shadow-black/10"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo (Orlixa text in Bebas/Sans style) */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#b4fe1e] to-emerald-450 flex items-center justify-center font-black text-black text-sm shadow-md shadow-[#b4fe1e]/25 group-hover:scale-105 transition-transform duration-300">
            DA
          </span>
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">
            Design Agency
          </span>
        </a>

        {/* Right Section: Theme Toggle + CTA */}
        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle switch */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--border-color-custom)] bg-white/5 hover:bg-white/10 dark:hover:bg-neutral-800 text-slate-400 hover:text-[#b4fe1e] hover:border-[#b4fe1e]/30 transition-all duration-300 cursor-pointer shadow-md select-none"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-slate-700 hover:text-[#b4fe1e]" />
            )}
          </button>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-[#b4fe1e]/10 cursor-pointer"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

