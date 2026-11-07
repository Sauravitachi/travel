"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  TrendingUp,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  Car,
  ShieldCheck,
  ArrowRight,
  Trees,
} from "lucide-react";
import { useTravel } from "@/components/shared/TravelContext";
import { Expedition } from "@/data/expeditions";

export default function ItineraryModal() {
  const { isItineraryOpen, setIsItineraryOpen, selectedExpedition, openBookingForExpedition, formatPrice } = useTravel();
  const [activeTab, setActiveTab] = useState<"days" | "inclusions" | "gallery">("days");

  if (!isItineraryOpen || !selectedExpedition) return null;

  const exp: Expedition = selectedExpedition;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl border border-emerald-500/20 bg-[#07130d] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Hero Header with Image */}
        <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden">
          <Image src={exp.heroImage} alt={exp.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130d] via-[#07130d]/50 to-black/60" />

          {/* Close button */}
          <button
            onClick={() => setIsItineraryOpen(false)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer border border-emerald-500/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider font-mono">
                  {exp.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/20 text-[10px] font-mono font-bold">
                  {exp.duration}
                </span>
                {exp.pickup && (
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/20 text-[10px] font-mono font-bold">
                    Pickup: {exp.pickup}
                  </span>
                )}
                {exp.maxExplorers && (
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                    Max {exp.maxExplorers} Explorers
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-slate-300 border border-emerald-500/20 text-[10px] font-mono">
                  Peak: {exp.altitudePeak}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white leading-tight">
                {exp.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">After Discount</span>
                  {exp.originalPriceINR > exp.priceINR && (
                    <span className="text-[10px] text-slate-500 line-through font-mono">
                      ₹{exp.originalPriceINR.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="text-xl font-black font-display text-white">{formatPrice(exp.priceINR)}</span>
              </div>
              <button
                onClick={() => {
                  setIsItineraryOpen(false);
                  openBookingForExpedition(exp.id);
                }}
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 py-3 border-b border-emerald-500/10 bg-black/30 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("days")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "days"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Day-Wise Stops ({exp.dayWiseItinerary.length})
          </button>
          <button
            onClick={() => setActiveTab("inclusions")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "inclusions"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Inclusions & Exclusions
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "gallery"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Expedition Gallery
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === "days" && (
            <div className="space-y-4">
              {exp.dayWiseItinerary.map((day) => (
                <div key={day.day} className="p-5 rounded-2xl bg-black/40 border border-emerald-500/15 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
                        {day.day}
                      </span>
                      <h4 className="font-display font-bold text-base text-white">{day.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{day.elevation}</span>
                      {day.distanceKm > 0 && <span>• {day.distanceKm} km</span>}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{day.route}</span>
                  </div>

                  <p className="text-slate-300 text-xs font-light leading-relaxed">{day.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    {day.acclimatizationAlert && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span>{day.acclimatizationAlert}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-emerald-500/10">
                      <Car className="w-3 h-3 text-emerald-400" />
                      <span>{day.roadCondition}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "inclusions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20">
                <h4 className="font-display font-black text-sm uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Everything Included In Package</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {exp.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="p-5 rounded-2xl bg-black/40 border border-rose-500/20">
                <h4 className="font-display font-black text-sm uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  <span>Not Included / Optional</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {exp.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {exp.gallery.map((img, i) => (
                <div key={i} className="relative h-40 rounded-xl overflow-hidden border border-emerald-500/15 group">
                  <Image src={img} alt={`${exp.title} photo ${i}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-emerald-500/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Includes field medical O2, pulse vitals & certified wilderness leaders</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsItineraryOpen(false)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-black/40 hover:bg-emerald-950/60 text-slate-300 text-xs uppercase font-bold cursor-pointer border border-emerald-500/15"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsItineraryOpen(false);
                openBookingForExpedition(exp.id);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Reserve Seat ({formatPrice(exp.priceINR)})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
