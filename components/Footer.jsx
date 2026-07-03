"use client";

import { ArrowUp } from "lucide-react";

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const DribbbleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About us", href: "#about" },
  { name: "Service", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Licenses", href: "#" },
];

const socials = [
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "Twitter", href: "#", icon: TwitterIcon },
  { name: "LinkedIn", href: "#", icon: LinkedinIcon },
  { name: "Dribbble", href: "#", icon: DribbbleIcon },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--background)] border-t border-[var(--border-color-custom)] pt-20 pb-12 overflow-hidden select-none">
      
      {/* Light glow at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[150px] rounded-full bg-[#b4fe1e]/[0.01] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Upper Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-16">
          
          {/* Column 1: Ready heading and socials */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase max-w-md tracking-tight">
              Ready to become our <span className="bg-gradient-to-r from-[#b4fe1e] to-emerald-400 bg-clip-text text-transparent">next success story?</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Let’s create measurable growth, stronger brand presence, and real business impact with a strategy tailored to your goals.
            </p>
            {/* Socials follow row */}
            <div className="flex flex-col gap-3 mt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Follow us</span>
              <div className="flex items-center gap-2.5">
                {socials.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-label={`Visit our ${item.name}`}
                      className="h-10 w-10 rounded-full bg-white/5 border border-white/5 hover:border-[#b4fe1e]/30 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-[#b4fe1e] transition-all duration-300 cursor-pointer"
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation map */}
          <div className="md:col-span-3 flex flex-col gap-4 md:pl-10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Location */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</h4>
            <p className="text-sm font-semibold text-slate-400 leading-relaxed max-w-xs">
              123 Riverbend,<br />
              California 94025, USA
            </p>
          </div>
        </div>

        {/* Bottom copyright & Scroll to top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left font-medium">
            &copy; {new Date().getFullYear()} PixelCraft Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-550 hover:text-slate-350 transition-colors font-semibold">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-550 hover:text-slate-350 transition-colors font-semibold">
              Terms of Service
            </a>
            
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="h-8 w-8 rounded-full bg-white/5 border border-white/5 hover:border-[#b4fe1e]/35 flex items-center justify-center text-slate-400 hover:text-[#b4fe1e] cursor-pointer hover:bg-white/10 transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
