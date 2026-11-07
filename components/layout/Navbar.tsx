"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  PhoneCall,
  Mail,
  ArrowRight,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useTravel } from "@/components/shared/TravelContext";

export default function Navbar() {
  const { openBookingForExpedition } = useTravel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Expeditions", href: "#expeditions" },
    { name: "Spiti Route", href: "#circuit-highlights" },
    { name: "Private Packages", href: "#private-packages" },
    { name: "2027 Waitlist", href: "#upcoming-trails" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030705]/85 backdrop-blur-xl border-b border-emerald-500/15 py-3 shadow-2xl shadow-black/60"
            : "bg-[#030705]/40 backdrop-blur-md border-b border-white/5 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Clean Brand Logo */}
            <Logo size="md" />

            {/* Desktop Navigation - Minimal & Elegant */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase font-medium tracking-widest text-slate-300 hover:text-emerald-400 transition-colors py-1 relative group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Right Controls - Sleek & High Conversion */}
            <div className="hidden sm:flex items-center gap-5">
              {/* Subtle Direct Contact */}
              <a
                href="tel:+918198089565"
                className="text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                title="24/7 Field Helpline"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 81980 89565</span>
              </a>

              {/* Single Primary Action Button */}
              <button
                onClick={() => openBookingForExpedition()}
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-emerald-500/15 flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - Clean Minimal Glass Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030705]/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 md:hidden animate-fade-in border-b border-emerald-500/20">
          <nav className="flex flex-col gap-2 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-base font-medium tracking-wide text-slate-200 hover:text-emerald-400 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400/60" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-auto">
            {/* Quick Contact Info */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-2 mb-2">
              <a
                href="mailto:Intothewildmiless@gmail.com"
                className="flex items-center gap-2 text-emerald-400"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Intothewildmiless@gmail.com</span>
              </a>
              <a
                href="tel:+918198089565"
                className="flex items-center gap-2 text-slate-300"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 81980 89565</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingForExpedition();
              }}
              className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <span>Book Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
