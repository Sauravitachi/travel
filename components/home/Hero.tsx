"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Trees,
  Sparkles,
} from "lucide-react";
import { useTravel } from "@/components/shared/TravelContext";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=85",
    title: "Into The Untamed Jungle Canopy.",
    tag: "Deep Rainforest & River Gorges",
    location: "Misty Evergreen Ridge • Pristine Wilderness",
  },
  {
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85",
    title: "Where Sunbeams Pierce The Ancient Wild.",
    tag: "4x4 Off-Road Overland Safari",
    location: "Untamed Valley Corridors • Off-Grid Trails",
  },
  {
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=85",
    title: "Carve The Mountain Forest Passes.",
    tag: "High-Altitude Moto Expeditions",
    location: "Kinnaur to Spiti Canyon • Ancient Passes",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85",
    title: "Camp Beneath An Unbroken Galaxy.",
    tag: "Sacred Moon Lake Glamping",
    location: "Chandratal Basin • Bortle 1 Dark Sky",
  },
];

export default function Hero() {
  const { setFilterDestination, setFilterCategory } = useTravel();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Quick Finder state
  const [dest, setDest] = useState("All");
  const [tripType, setTripType] = useState("All");

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterDestination(dest);
    setFilterCategory(tripType);
    const element = document.getElementById("expeditions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen flex flex-col justify-between pt-20 sm:pt-28 lg:pt-32 pb-4 sm:pb-8 lg:pb-12 overflow-hidden bg-[#030705]">
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.location}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1400ms" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-center transform scale-105"
          />
          {/* Deep Dark Jungle Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-[#030705]/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030705]/95 via-[#030705]/50 to-transparent" />
          <div className="absolute inset-0 bg-jungle-mesh opacity-60" />
        </div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-1 sm:py-4">
        <div className="max-w-3xl">
          {/* Location & Tag Badge */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mb-2.5 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              <Trees className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{HERO_SLIDES[currentSlide].tag}</span>
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-slate-300/80 flex items-center gap-1.5">
              <span className="text-emerald-500 hidden sm:inline">•</span>
              <span className="truncate">{HERO_SLIDES[currentSlide].location}</span>
            </span>
          </div>

          {/* Punchy Editorial Headline */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-3 sm:mb-6">
            Journey Deep Into The{" "}
            <span className="text-emerald-400 text-glow-emerald">Untamed.</span>
          </h1>

          {/* Clean Subtitle */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-light mb-4 sm:mb-8 line-clamp-3 sm:line-clamp-none">
            Handcrafted 4x4 overland safaris, deep mountain rainforest trails, and secluded off-grid expeditions.
            Conquer the world’s most pristine wilderness with certified expedition captains and field trauma safety.
          </p>

          {/* Minimalist Action Buttons */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
            <a
              href="#expeditions"
              className="flex-1 sm:flex-initial px-3.5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 group text-center"
            >
              <span className="hidden sm:inline">Explore&nbsp;</span>
              <span>Expeditions</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <a
              href="#standards"
              className="flex-1 sm:flex-initial px-3 sm:px-6 py-2.5 sm:py-4 rounded-full glass-panel hover:bg-emerald-950/40 text-slate-200 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all border border-emerald-500/20 flex items-center justify-center gap-1.5 sm:gap-2 text-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Wilderness&nbsp;</span>
              <span>Standards</span>
            </a>
          </div>
        </div>

        {/* Sleek Minimal Quick Search Pill */}
        <div className="w-full max-w-3xl mt-2 sm:mt-4">
          <form
            onSubmit={handleFinderSubmit}
            className="glass-panel rounded-2xl p-2 sm:p-3 border border-emerald-500/20 shadow-2xl bg-[#06120c]/85 backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {/* Destination Filter */}
              <div className="flex flex-col px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/50 border border-emerald-500/15 focus-within:border-emerald-400 transition-colors overflow-hidden">
                <label className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-0.5 flex items-center gap-1 sm:gap-1.5">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">Wilderness Region</span>
                </label>
                <select
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  className="w-full max-w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
                >
                  <option value="All" className="bg-[#030705] text-white">All Circuits & Valleys</option>
                  <option value="Spiti Valley" className="bg-[#030705] text-white">Spiti High Canyon Loop</option>
                  <option value="Chandratal" className="bg-[#030705] text-white">Sacred Chandratal Lake</option>
                  <option value="Shimla & Kinnaur" className="bg-[#030705] text-white">Kinnaur Rainforest Trail</option>
                  <option value="Zanskar" className="bg-[#030705] text-white">Zanskar Deep Gorge</option>
                </select>
              </div>

              {/* Expedition Style */}
              <div className="flex flex-col px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/50 border border-emerald-500/15 focus-within:border-emerald-400 transition-colors overflow-hidden">
                <label className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-0.5 flex items-center gap-1 sm:gap-1.5">
                  <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">Expedition Style</span>
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full max-w-full bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-none cursor-pointer truncate"
                >
                  <option value="All" className="bg-[#030705] text-white">All Expedition Types</option>
                  <option value="4x4 Overlanding" className="bg-[#030705] text-white">4x4 Overland Safari</option>
                  <option value="Moto Expedition" className="bg-[#030705] text-white">Himalayan Moto Tour</option>
                  <option value="Group Departure" className="bg-[#030705] text-white">Curated Group Journey</option>
                  <option value="Winter Special" className="bg-[#030705] text-white">Winter Frozen Trail</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="col-span-2 sm:col-span-1 w-full py-2.5 sm:py-0 sm:h-full sm:min-h-[46px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Find Journey</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Clean Bottom Slide Controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2 sm:mt-6 flex items-center justify-between border-t border-emerald-500/10 pt-2.5 sm:pt-4">
        <div className="text-[11px] sm:text-xs text-slate-400 font-mono flex items-center gap-1.5 sm:gap-2">
          <span className="text-emerald-400 font-bold">0{currentSlide + 1}</span>
          <span className="text-emerald-800">/</span>
          <span>0{HERO_SLIDES.length}</span>
          <span className="text-slate-500 mx-1 sm:mx-2">•</span>
          <span className="text-slate-300 font-sans truncate max-w-[140px] sm:max-w-none">{HERO_SLIDES[currentSlide].title}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 pr-14 sm:pr-0">
          <button
            onClick={prevSlide}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-panel hover:bg-emerald-950/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors border-emerald-500/20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-panel hover:bg-emerald-950/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors border-emerald-500/20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
