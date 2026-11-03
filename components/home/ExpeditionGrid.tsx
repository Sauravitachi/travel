"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Clock,
  Star,
  Users,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Trees,
} from "lucide-react";
import { EXPEDITIONS, Expedition } from "@/data/expeditions";
import { useTravel } from "@/components/shared/TravelContext";

export default function ExpeditionGrid() {
  const {
    formatPrice,
    openBookingForExpedition,
    openItineraryForExpedition,
    filterDestination,
    setFilterDestination,
    filterCategory,
    setFilterCategory,
  } = useTravel();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    { label: "All Circuits", value: "All" },
    { label: "4x4 Overland Safaris", value: "4x4 Overlanding" },
    { label: "Moto Odysseys", value: "Moto Expedition" },
    { label: "Kinnaur Rainforest", value: "Shimla & Kinnaur" },
    { label: "Sacred Moon Lake", value: "Chandratal" },
  ];

  const filteredExpeditions = useMemo(() => {
    return EXPEDITIONS.filter((exp) => {
      // Tab filter
      if (activeTab !== "All") {
        if (activeTab === "4x4 Overlanding" || activeTab === "Moto Expedition") {
          if (exp.category !== activeTab) return false;
        } else if (exp.destination !== activeTab) {
          return false;
        }
      }

      // External Destination filter
      if (filterDestination !== "All" && exp.destination !== filterDestination) {
        return false;
      }

      // External Category filter
      if (filterCategory !== "All" && exp.category !== filterCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = exp.title.toLowerCase().includes(query);
        const matchesTagline = exp.tagline.toLowerCase().includes(query);
        const matchesDest = exp.destination.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesDest) return false;
      }

      return true;
    });
  }, [activeTab, filterDestination, filterCategory, searchQuery]);

  return (
    <section id="expeditions" className="py-28 bg-[#030705] relative overflow-hidden">
      {/* Subtle Dark Jungle Backdrops */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              <Trees className="w-3.5 h-3.5" />
              <span>Curated Wild Circuits</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Handcrafted Wilderness Odysseys
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2.5 max-w-xl font-light">
              Carefully scouted overland routes with dedicated 4x4 support, field medical O2, and high-altitude wild glamping.
            </p>
          </div>

          {/* Clean Search Input */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circuit, pass, or valley..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#07130d] border border-emerald-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        {/* Clean Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveTab(cat.value);
                setFilterDestination("All");
                setFilterCategory("All");
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat.value
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                  : "bg-[#07130d] text-slate-300 hover:text-white border border-emerald-500/15 hover:border-emerald-500/35"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExpeditions.map((exp) => (
            <div
              key={exp.id}
              className="group rounded-2xl overflow-hidden bg-[#07130d] border border-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-xl shadow-black/60"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={exp.heroImage}
                  alt={exp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07130d] via-[#07130d]/20 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#030705]/85 backdrop-blur-md border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
                    {exp.duration}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#030705]/85 backdrop-blur-md border border-emerald-500/20 text-xs font-bold text-white">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{exp.rating}</span>
                </div>

                {/* Destination Tag */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.destination}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed mb-6">
                    {exp.tagline}
                  </p>

                  {/* Clean Specs Row */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-emerald-500/10 text-xs text-slate-300 mb-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{exp.altitudePeak.split("(")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Max 12 Explorers</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Starting from</span>
                    <span className="font-display font-extrabold text-2xl text-white">
                      {formatPrice(exp.priceINR)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openItineraryForExpedition(exp)}
                      className="px-3.5 py-2.5 rounded-xl bg-black/40 hover:bg-emerald-950/60 text-slate-200 border border-emerald-500/20 text-xs font-bold tracking-wider hover:border-emerald-400 transition-all cursor-pointer"
                    >
                      Circuit
                    </button>
                    <button
                      onClick={() => openBookingForExpedition(exp.id)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
