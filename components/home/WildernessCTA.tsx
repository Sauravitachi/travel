"use client";

import React from "react";
import { ArrowRight, MessageSquare, PhoneCall, ShieldCheck, Trees } from "lucide-react";
import { useTravel } from "@/components/shared/TravelContext";

export default function WildernessCTA() {
  const { openBookingForExpedition } = useTravel();

  return (
    <section className="py-24 bg-[#030705] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#071a10] via-[#05140d] to-[#020804] border border-emerald-500/20 p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-4">
              <Trees className="w-3.5 h-3.5" />
              <span>Private & Group Departures</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
              Step Beyond The Edge of the Map.
            </h2>

            <p className="text-slate-300/90 text-sm sm:text-base font-light leading-relaxed mb-8">
              Whether you wish to join an intimate group departure or commission a bespoke private 4x4 convoy with our lead navigators, our expedition desk is at your disposal.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBookingForExpedition()}
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Reserve 2026 Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919876543210?text=Hi%20Wild%20Miles,%20I%20would%20like%20to%20plan%20an%20expedition."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-full bg-[#07130d] hover:bg-emerald-950/60 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all border border-emerald-500/25 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Expedition Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

