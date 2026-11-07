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
  CheckCircle2,
  XCircle,
  Car,
  Utensils,
  ShieldCheck,
  Flame,
  Music,
} from "lucide-react";
import { useTravel } from "@/components/shared/TravelContext";
import { EXPEDITIONS } from "@/data/expeditions";

// Route with pictures specified in requirement: Narkanda - Sangla - Kalpa - Tabo - Kaza - Langza - Chicham - returning back
const SPITI_ROUTE_STOPS = [
  {
    step: 1,
    name: "Narkanda",
    title: "Gateway to the High Ranges & Apple Orchards",
    elevation: "8,884 ft (2,708 m)",
    distance: "175 km from Delhi / Chandigarh / Shimla",
    highlight: "Apple orchards, pine canopy & Hatu Peak ridge view",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description:
      "Departing from Delhi / Chandigarh / Shimla, we ascend through dense deodar forests and terraced apple orchards to Narkanda. Settle in for acclimatization dinner with our local driver and expedition leader.",
    activities: ["Acclimatization briefing", "Welcome group dinner", "Sunset pine stroll"],
  },
  {
    step: 2,
    name: "Sangla",
    title: "Kinnaur Valley & The Cliff-Carved Tranda Dhank",
    elevation: "8,900 ft (2,713 m)",
    distance: "160 km from Narkanda",
    highlight: "Hindustan-Tibet cliff road & gushing Baspa River",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Navigate beneath the iconic hanging rock tunnels of Tranda Dhank. Emerge into the emerald Baspa river basin in Sangla, staying in traditional wood-carved Kinnauri homestays.",
    activities: ["Chitkul border visit", "Authentic riverside homestay", "Local Trout fishing spot"],
  },
  {
    step: 3,
    name: "Kalpa",
    title: "Golden Hour Sunset on Kinner Kailash Peak",
    elevation: "9,711 ft (2,960 m)",
    distance: "75 km from Sangla",
    highlight: "6,050m Sacred Kinner Kailash vista & Roghi Cliff",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description:
      "Kalpa offers an unhindered panoramic view of the 6,050m Kinner Kailash massif. Walk the thrilling edge of the Roghi vertical cliff ('Suicide Point') and explore heritage wooden temples.",
    activities: ["Roghi cliffwalk", "Stargazing over Kinner Kailash", "Kinnauri apple cider tasting"],
  },
  {
    step: 4,
    name: "Tabo",
    title: "Khab River Confluence, Gue Mummy & 1000-Year Caves",
    elevation: "10,760 ft (3,280 m)",
    distance: "150 km from Kalpa",
    highlight: "550-yr naturally preserved monk mummy & UNESCO Tabo Gompa",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cross into the rain-shadow desert of Spiti. Witness the turquoise Spiti and Sutlej rivers collide at Khab, pay homage to the intact Gue mummy, and walk through Tabo's 996 AD clay monastery.",
    activities: ["Khab Sangam stop", "Gue Mummy sanctuary", "Ancient cave fresco tour"],
  },
  {
    step: 5,
    name: "Kaza",
    title: "Heart of Spiti & Dhankar Clifftop Monastery",
    elevation: "12,470 ft (3,800 m)",
    distance: "90 km from Tabo",
    highlight: "Precipitous Dhankar monastery & Pin Valley basin",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hike up to Dhankar Gompa perched atop razor-sharp clay needles overlooking the river confluence. Settle into the Spitian sub-divisional capital of Kaza for warm homestay hospitality.",
    activities: ["Dhankar clifftop hike", "Pin Valley National Park", "Spitian café culture"],
  },
  {
    step: 6,
    name: "Langza",
    title: "Fossil Village & The Giant Buddha at 14,500 ft",
    elevation: "14,500 ft (4,420 m)",
    distance: "25 km from Kaza",
    highlight: "Marine fossils from Tethys Sea & World's Highest Post Office",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description:
      "Stand before the towering golden Buddha statue with Chau Chau Kang Nilda snow peak towering behind. Search for 200-million-year-old ammonite fossils in Langza and mail postcards from Hikkim at 14,567 ft.",
    activities: ["Marine fossil hunting", "Letter posting at Hikkim", "Komic monastery visit"],
  },
  {
    step: 7,
    name: "Chicham",
    title: "Asia's Highest Suspension Gorge Bridge & Key Gompa",
    elevation: "13,596 ft (4,144 m)",
    distance: "35 km from Kaza",
    highlight: "Suspension bridge over 1,000 ft chasm & fortress Key Monastery",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cross the marvel of Chicham Bridge spanning 1,000 feet above Samba Lamba gorge. Experience morning butter tea with monks inside the iconic 11th-century fort monastery of Key.",
    activities: ["Chicham bridge walk", "Key Monastery chambers", "Kibber wildlife spotting"],
  },
  {
    step: 8,
    name: "Returning Back",
    title: "Live Forest Camping, Zip Lining, Music Night & Return",
    elevation: "8,900 ft to Plains",
    distance: "Descent to Shimla / Chandigarh / Delhi",
    highlight: "Live camping in forest, zip lining, hiking, music night & games",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Our grand finale: exciting outdoor activities including live camping in pine forest, thrilling zip lining over mountain ravines, guided hiking, and evening music night with bonfire and games before returning home.",
    activities: ["Live camping in forest", "Zip lining & hiking", "Music night & fireside games"],
  },
];

export default function ItineraryShowcase() {
  const { openBookingForExpedition, openItineraryForExpedition, formatPrice } = useTravel();
  const [activeIdx, setActiveIdx] = useState(0);
  const [showInclusionsTab, setShowInclusionsTab] = useState(false);

  const currentStop = SPITI_ROUTE_STOPS[activeIdx];
  const spitiExp = EXPEDITIONS[0];

  const nextStop = () => {
    setActiveIdx((prev) => (prev + 1) % SPITI_ROUTE_STOPS.length);
  };

  const prevStop = () => {
    setActiveIdx((prev) => (prev - 1 + SPITI_ROUTE_STOPS.length) % SPITI_ROUTE_STOPS.length);
  };

  return (
    <section id="circuit-highlights" className="py-24 sm:py-32 bg-[#030705] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Route With Pictures (8 Nights / 9 Days)</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Spiti Valley: The Complete Circuit
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2.5 max-w-2xl font-light">
              Narkanda → Sangla → Kalpa → Tabo → Kaza → Langza → Chicham → Returning Back. Pickup from Delhi, Chandigarh, or Shimla.
            </p>
          </div>

          {/* Toggle between Route Stops & Inclusions/Exclusions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInclusionsTab(false)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !showInclusionsTab
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "bg-[#07130d] text-slate-300 border border-emerald-500/15 hover:text-white"
              }`}
            >
              Route With Pictures
            </button>
            <button
              onClick={() => setShowInclusionsTab(true)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                showInclusionsTab
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "bg-[#07130d] text-slate-300 border border-emerald-500/15 hover:text-white"
              }`}
            >
              Inclusions & Exclusions
            </button>
          </div>
        </div>

        {!showInclusionsTab ? (
          <>
            {/* Route Stops Horizontal Stepper Timeline */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
              {SPITI_ROUTE_STOPS.map((stop, idx) => (
                <button
                  key={stop.name}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    activeIdx === idx
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105"
                      : "bg-[#07130d] text-slate-300 hover:text-white border border-emerald-500/15 hover:border-emerald-500/40"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    activeIdx === idx ? "bg-slate-950 text-emerald-400" : "bg-emerald-500/20 text-emerald-300"
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{stop.name}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Spotlight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#07130d] border border-emerald-500/20 overflow-hidden shadow-2xl p-6 lg:p-8">
              {/* Photo Showcase */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden group">
                <Image
                  src={currentStop.image}
                  alt={currentStop.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07130d] via-transparent to-black/30 opacity-70" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#030705]/85 backdrop-blur-md border border-emerald-500/25 text-xs text-emerald-300 font-mono font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentStop.elevation}</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/20 text-xs text-white font-mono">
                    Stop 0{currentStop.step} of 08
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90 bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                  <span>{currentStop.distance}</span>
                  <span className="text-emerald-400">{currentStop.highlight}</span>
                </div>
              </div>

              {/* Stop Description & Activities */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-mono font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{currentStop.name} Circuit Stop</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-4 leading-snug">
                    {currentStop.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-light mb-6">
                    {currentStop.description}
                  </p>

                  {/* Highlights / Activities Pills */}
                  <div className="space-y-2 mb-8">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block">
                      Featured On This Stop:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentStop.activities.map((act) => (
                        <span
                          key={act}
                          className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{act}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Controls & Booking CTA */}
                <div className="pt-6 border-t border-emerald-500/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevStop}
                      className="w-9 h-9 rounded-full bg-black/40 hover:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous Stop"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextStop}
                      className="w-9 h-9 rounded-full bg-black/40 hover:bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Next Stop"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-slate-400 ml-1">
                      0{activeIdx + 1} / 0{SPITI_ROUTE_STOPS.length}
                    </span>
                  </div>

                  <button
                    onClick={() => openBookingForExpedition(spitiExp.id)}
                    className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Spiti (₹22,999)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* =========================================================================
             INCLUSIONS & EXCLUSIONS DIRECT FROM IMAGE 1
             ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl bg-[#07130d] border border-emerald-500/20 p-6 sm:p-10 shadow-2xl">
            {/* Inclusions (Image 1 items 1-7) */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">
                    Inclusions
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Everything Covered On Spiti Valley 8N/9D
                  </span>
                </div>
              </div>

              <div className="space-y-3.5">
                {[
                  "1. All 8 nights stays (handpicked authentic home stays & camping tents)",
                  "2. Dedicated vehicle with expert local Himalayan driver",
                  "3. Inclusive of breakfast, lunch & dinner",
                  "4. Medical grade throughout the expedition",
                  "5. Wilderness leader and tour guide",
                  "6. Exciting activities including live camping in forest, zip lining, hiking and many more",
                  "7. Fun activities like music night, games etc.",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-emerald-500/15"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusions (Image 1 items 1-4) & Departure Batches */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-white">
                      Exclusions
                    </h3>
                    <span className="text-[11px] font-mono text-rose-400">
                      Transparent & No Hidden Costs
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    "1. Travel cost to pickup location",
                    "2. Snacks and personal beverages",
                    "3. Emergency medical evacuation",
                    "4. Monastery entrance or museum entry tickets",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-rose-500/15"
                    >
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 font-light">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departure Batches Callout directly from Image 1 */}
              <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/20 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Departure Batches (2026 - 2027):
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-white font-bold">23rd Dec 2026 - 1st Jan 2027</span>
                    <span className="text-emerald-400 text-[10px] font-bold">Filling Fast</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-white font-bold">23rd Feb 2027 - 3rd Mar 2027</span>
                    <span className="text-emerald-400 text-[10px] font-bold">Available</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-white font-bold">21st April 2027 - 30th April 2027</span>
                    <span className="text-emerald-400 text-[10px] font-bold">Available</span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1 text-center font-mono">
                    Next date upcoming soon • Join the waitlist
                  </div>
                </div>

                <button
                  onClick={() => openBookingForExpedition(spitiExp.id)}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Reserve Spiti Seat (₹22,999)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
