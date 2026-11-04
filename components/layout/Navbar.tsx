"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Menu,
  X,
  Sun,
  Moon,
  Trees,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useTravel } from "@/components/shared/TravelContext";

export default function Navbar() {
  const { currency, setCurrency, theme, toggleTheme, openBookingForExpedition } = useTravel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Expeditions", href: "#expeditions" },
    { name: "Private Packages", href: "#private-packages" },
    { name: "Wild Standards", href: "#standards" },
    { name: "Circuit Highlights", href: "#circuit-highlights" },
    { name: "Explorer Stories", href: "#reviews" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030705]/90 backdrop-blur-xl border-b border-emerald-500/15 py-2.5 sm:py-3.5 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-[#030705]/90 via-[#030705]/50 to-transparent py-3 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                <Trees className="w-5 h-5 text-slate-950 stroke-[2.4]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wide text-white leading-none">
                  WILD <span className="text-emerald-400">MILES</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300/70 mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Dark Jungle & Overland Safaris
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase font-medium tracking-wider text-slate-300 hover:text-emerald-400 transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="hidden sm:flex items-center gap-3">             
        
              {/* Booking CTA Button */}
              <button
                onClick={() => openBookingForExpedition()}
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <span>Book Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-200 border-emerald-500/20"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#030705]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 md:hidden animate-fade-in border-b border-emerald-500/20">
          <nav className="flex flex-col gap-4 text-base font-semibold mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-slate-200 hover:text-emerald-400 border-b border-emerald-500/10 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingForExpedition();
              }}
              className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>Book Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="w-full py-3 rounded-full bg-[#07130d] border border-emerald-500/20 flex items-center justify-center gap-2 text-slate-300 hover:text-emerald-400 text-xs font-semibold uppercase tracking-wider"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-400" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
