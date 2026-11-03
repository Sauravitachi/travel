"use client";

import React, { useState } from "react";
import {
  FileText,
  ThermometerSnowflake,
  ShieldAlert,
  Download,
  CheckCircle2,
  Layers,
  HeartPulse,
  Compass,
  Sparkles,
} from "lucide-react";

export default function HimalayanPrepGuide() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Create a mock downloadable blob or simulated download
    const element = document.createElement("a");
    const file = new Blob(
      [
        `INTO THE WILD MILES - OFFICIAL HIMALAYAN EXPEDITION PREPARATION GUIDE
====================================================================
Expedition Desk: Shimla & Kaza Base Camps
Helpline: +91 98765 43210

1. ALTITUDE ACCLIMATIZATION PROTOCOL:
- High Altitude Rule: "Climb High, Sleep Low".
- Minimum 3.5 to 4 Liters of warm fluids daily (water, kahwa, garlic broth).
- Avoid sleeping during daytime transit; engage in light strolling.
- Diamox (Acetazolamide): Take only after consulting your physician.
- Avoid smoking and alcohol above 8,000 ft as it accelerates dehydration and hypoxia.

2. THE 3-LAYER HIMALAYAN CLOTHING SYSTEM:
- Base Layer: Thermal merino wool or synthetic top + bottom.
- Mid Layer: 700+ fill power down jacket or polar fleece pullover.
- Outer Shell: Windproof & waterproof jacket with hood (Gore-Tex or equivalent).
- Head & Feet: Fleece balaclava, UV400 polarized sunglasses (essential against snow blindness), wool hiking socks, ankle-support trekking boots.

3. MANDATORY DOCUMENTS:
- Original Government Photo ID (Aadhaar Card / Voter ID / Passport for Foreign Nationals).
- Valid Two-Wheeler / LMV Driving License (Original + 2 photocopies).
- 4 Passport size photographs for Inner Line Permit validation at Khab and Kaza.

4. 24/7 EXPEDITION DESK EMERGENCY:
Emergency Satellite InReach: ITWM-CONVOY-01
Base Coordinator Tenzin: +91 98765 43210
====================================================================`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "IntoTheWildMiles_Expedition_Handbook_2026.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <section id="prep-guide" className="py-24 bg-[#080B0E] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Preparation & Wilderness Science</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Himalayan Packing & Acclimatization
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Preparation turns an intimidating mountain wilderness into the journey of a lifetime.
            Here is our battle-tested guide to high altitudes, extreme weather, and mountain survival.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: 3-Layer System */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                Thermal Defense
              </span>
              <h3 className="font-display font-black text-xl text-white mb-3">
                The 3-Layer Alpine System
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed mb-5">
                Temperatures fluctuate wildly from +22°C in daytime sun to -15°C at Chandratal camp. Never rely on one heavy coat; use the three-layer method:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">1. Base Layer (Wicking)</strong>
                  <span className="text-slate-400 text-[11px]">Merino wool or synthetic thermals to draw moisture away from skin.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">2. Mid Layer (Insulation)</strong>
                  <span className="text-slate-400 text-[11px]">700-fill power down jacket or thick 200gsm polar fleece.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">3. Outer Shell (Weather Shield)</strong>
                  <span className="text-slate-400 text-[11px]">Gore-Tex windproof & waterproof hardshell with hood.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AMS Science */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block mb-1">
                Hypoxia Mitigation
              </span>
              <h3 className="font-display font-black text-xl text-white mb-3">
                AMS Science & Hydration
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed mb-5">
                At 15,000 ft, atmospheric pressure is halved and effective oxygen drops to ~12%. Our protocol guarantees gradual acclimatization:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">The Kinnaur Rule</strong>
                  <span className="text-slate-400 text-[11px]">We never rush up via Rohtang; we climb slowly through Shimla & Sangla gorges.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">4-Liter Daily Hydration</strong>
                  <span className="text-slate-400 text-[11px]">Active hydration keeps blood viscous and oxygen-carrying capacity optimal.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">Twice-Daily Vitals Checks</strong>
                  <span className="text-slate-400 text-[11px]">We log every explorer’s SpO2 levels morning and evening with pulse oximeters.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Permits & Gear */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Zero Friction
              </span>
              <h3 className="font-display font-black text-xl text-white mb-3">
                Permits & Essential Gear
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed mb-5">
                We handle the bureaucracy so you can focus on the ride. Everything you must carry in your mountain daypack:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">Inner Line Permits (ILP)</strong>
                  <span className="text-slate-400 text-[11px]">Processed in advance for Reckong Peo, Kaza, and Pangong Tso checkpoints.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">Eye Protection</strong>
                  <span className="text-slate-400 text-[11px]">Category 3 or 4 UV400 polarized shades to block intense high-altitude reflection.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <strong className="text-white block font-bold">Footwear & Power</strong>
                  <span className="text-slate-400 text-[11px]">Waterproof high-ankle boots & 20,000mAh cold-resistant power banks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Handbook Card */}
        <div className="glass-card-amber rounded-3xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Complimentary Expedition Resource
            </span>
            <h3 className="font-display font-black text-2xl text-white mb-2">
              Download The 2026 Himalayan Explorer Handbook
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Includes day-by-day packing checklist, recommended pharmacy kit, high-altitude nutrition guide,
              and offline emergency contacts for ITBP posts.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleDownload}
              className="px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? "Downloaded Successfully!" : "Download PDF Handbook"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
