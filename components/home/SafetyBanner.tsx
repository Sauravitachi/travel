"use client";

import React from "react";
import {
  ShieldCheck,
  HeartPulse,
  Wrench,
  Trees,
  Radio,
  CheckCircle2,
} from "lucide-react";

const STANDARDS = [
  {
    icon: ShieldCheck,
    title: "Certified Wilderness Navigators",
    subtitle: "WFR & Alpine Certified Leaders",
    desc: "Every expedition is spearheaded by certified Wilderness First Responders (WFR) with over a decade of deep off-grid navigation experience in untamed terrains.",
  },
  {
    icon: HeartPulse,
    title: "Continuous Field Vitals & Medical O2",
    subtitle: "Mobile Trauma & Oximetry Grid",
    desc: "Medical-grade oxygen cylinders, daily altitude vitals monitoring, and emergency satellite SOS beacons onboard every expedition convoy.",
  },
  {
    icon: Wrench,
    title: "Dedicated Mechanic & 4x4 Chase Truck",
    subtitle: "Heavy Recovery & Spare Parts",
    desc: "A fully equipped 4x4 recovery vehicle follows each group with heavy-duty winches, tool chests, spare tires, and an experienced off-road technician.",
  },
  {
    icon: Trees,
    title: "Eco-Sanctuary & Leave No Trace",
    subtitle: "Preserving Pristine Habitats",
    desc: "Strict zero-single-use-plastic mandate, bio-degradable camps, and direct economic reinvestment in remote mountain and forest villages.",
  },
];

export default function SafetyBanner() {
  return (
    <section id="standards" className="py-28 bg-[#040c07] relative overflow-hidden border-t border-b border-emerald-500/10">
      {/* Subtle Jungle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Uncompromising Protocols</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            The Wilderness Standard
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            The untamed backcountry rewards preparation. Our zero-compromise safety grid is why hundreds of solo explorers and convoys trust us through the most remote gorges.
          </p>
        </div>

        {/* Clean 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARDS.map((std, i) => {
            const Icon = std.icon;
            return (
              <div
                key={std.title}
                className="rounded-2xl bg-[#07130d] border border-emerald-500/15 p-6 hover:border-emerald-400/35 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 block mb-1">
                    0{i + 1} • {std.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {std.title}
                  </h3>
                  <p className="text-xs text-slate-300/80 leading-relaxed font-light">
                    {std.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Standard on every departure</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
