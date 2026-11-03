"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  Trees,
} from "lucide-react";
import { useTravel } from "@/components/shared/TravelContext";
import { EXPEDITIONS } from "@/data/expeditions";

const CIRCUIT_WAYPOINTS = [
  {
    title: "Kinnaur Rainforest Gorges & Cliff Overhangs",
    location: "Tranda Dhank & Sangla Valley",
    elevation: "8,900 ft (2,713 m)",
    terrain: "Cliff-Carved Rainforest Road",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description:
      "Wind through ancient deodar pine forests and sheer cliff cuts along the roaring Baspa river gorge. Watch the lush subtropical greenery transition into rugged granite monoliths.",
  },
  {
    title: "The Clifftop Monasteries of the Moonscape",
    location: "Key Gompa & Dhankar Pinnacles",
    elevation: "12,470 ft (3,800 m)",
    terrain: "High Plateau & Clay Pinnacles",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Perched precariously over a sheer drop above the Spiti river, these ancient thousand-year-old fortresses house sacred murals, ancient scripture, and monk meditation chambers.",
  },
  {
    title: "Asia's Highest Suspension Gorge Bridge",
    location: "Chicham Bridge & Kibber Plateau",
    elevation: "13,596 ft (4,144 m)",
    terrain: "Alpine Chasm Crossing",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cross the vertigo-inducing suspension bridge spanning over 1,000 feet above the Samba Lamba nallah, connecting the high-altitude shepherd hamlets of Kibber and Chicham.",
  },
  {
    title: "Sacred Moon Lake Glacial Basin",
    location: "Chandratal Lake Sanctuary",
    elevation: "14,100 ft (4,300 m)",
    terrain: "Glacial Moraine & Moon Lake",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "A turquoise crescent lake surrounded by glacier massifs. Settle into insulated dome camps under a Bortle Class 1 night sky where the Milky Way illuminates the water in silence.",
  },
];

export default function ItineraryShowcase() {
  const { openItineraryForExpedition } = useTravel();
  const [activeIdx, setActiveIdx] = useState(0);

  const current = CIRCUIT_WAYPOINTS[activeIdx];

  const nextWaypoint = () => {
    setActiveIdx((prev) => (prev + 1) % CIRCUIT_WAYPOINTS.length);
  };

  const prevWaypoint = () => {
    setActiveIdx((prev) => (prev - 1 + CIRCUIT_WAYPOINTS.length) % CIRCUIT_WAYPOINTS.length);
  };

  return (
    <section id="circuit-highlights" className="py-28 bg-[#030705] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Waypoints Of The Wild</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Iconic Trail Highlights
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2.5 max-w-xl font-light">
              Glimpses into the untamed terrain you conquer on each circuit.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevWaypoint}
              className="w-10 h-10 rounded-full bg-[#07130d] border border-emerald-500/20 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
              aria-label="Previous Highlight"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextWaypoint}
              className="w-10 h-10 rounded-full bg-[#07130d] border border-emerald-500/20 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
              aria-label="Next Highlight"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#07130d] border border-emerald-500/15 overflow-hidden shadow-2xl p-6 lg:p-8">
          {/* Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07130d] via-transparent to-transparent opacity-60" />

            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#030705]/85 backdrop-blur-md border border-emerald-500/25 text-xs text-emerald-300 font-medium flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{current.elevation}</span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{current.location}</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4 leading-snug">
                {current.title}
              </h3>

              <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono mb-5">
                Terrain: {current.terrain}
              </div>

              <p className="text-sm text-slate-300/90 leading-relaxed font-light mb-8">
                {current.description}
              </p>
            </div>

            {/* Quick Waypoint Selector Dots */}
            <div className="flex items-center justify-between pt-6 border-t border-emerald-500/10">
              <div className="flex items-center gap-2">
                {CIRCUIT_WAYPOINTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === activeIdx ? "w-8 bg-emerald-500" : "w-2 bg-emerald-500/20 hover:bg-emerald-500/40"
                    }`}
                    aria-label={`Select waypoint ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => openItineraryForExpedition(EXPEDITIONS[0])}
                className="text-xs uppercase font-bold tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Full Day-Wise Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
