"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme set deferred to avoid cascading render lint error
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("theme") || "dark";
      setTheme(savedTheme);
    }, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 z-50 py-5 bg-transparent"
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Logo (monogram DA image) */}
          <Link href="/#home" className="flex items-center group z-50 select-none">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-[var(--border-color-custom)] shadow-md group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.jpg"
                alt="DA Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>


          {/* Right Section: Theme Toggle + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3 z-50">
            {/* Light/Dark Toggle switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--border-color-custom)] bg-white/5 hover:bg-white/10 dark:hover:bg-neutral-800 text-slate-400 hover:text-[#b4fe1e] hover:border-[#b4fe1e]/30 transition-all duration-300 cursor-pointer shadow-md select-none"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-slate-700 hover:text-[#b4fe1e]" />
              )}
            </button>

            {/* Desktop CTA */}
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-[var(--border-color-custom)] bg-white/5 hover:bg-white/10 dark:hover:bg-neutral-800 text-slate-400 hover:text-[#b4fe1e] transition-all duration-300 md:hidden cursor-pointer shadow-md select-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--background)]/98 backdrop-blur-lg flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, idx) => (
                <Link key={link.name} href={link.href} passHref legacyBehavior>
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold font-bebas text-white hover:text-[#b4fe1e] tracking-wider uppercase transition-colors duration-300"
                  >
                    {link.name}
                  </motion.a>
                </Link>
              ))}
              <Link href="/#contact" passHref legacyBehavior>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.5 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#b4fe1e] text-black hover:bg-[#bef264] transition-all duration-300 shadow-md shadow-[#b4fe1e]/15 cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

