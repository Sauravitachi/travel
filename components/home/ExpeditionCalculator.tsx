"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Compass,
  Users,
  ShieldAlert,
  Sparkles,
  Camera,
  HeartPulse,
  Flame,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Calendar,
} from "lucide-react";
import { EXPEDITIONS } from "@/data/expeditions";
import { useTravel } from "@/components/shared/TravelContext";

export default function ExpeditionCalculator() {
  const { formatPrice, openBookingForExpedition } = useTravel();

  const [selectedCircuitId, setSelectedCircuitId] = useState(EXPEDITIONS[0].id);
  const [travelers, setTravelers] = useState(2);
  const [vehicleType, setVehicleType] = useState<"thar_seat" | "re_solo" | "re_pillion" | "private_4x4">("thar_seat");
  const [stayTier, setStayTier] = useState<"homestay" | "glamping">("homestay");

  // Add-ons
  const [addons, setAddons] = useState({
    o2Kit: true,
    goproKit: false,
    sleepingBag: false,
    heliInsurance: true,
  });

  const selectedExpedition = EXPEDITIONS.find((e) => e.id === selectedCircuitId) || EXPEDITIONS[0];

  const vehicleOptions = [
    { id: "thar_seat", name: "Mahindra Thar 4x4 Seat", surcharge: 0, desc: "Shared seat in dedicated 4x4 expedition convoy" },
    { id: "re_solo", name: "Royal Enfield Himalayan 450 (Solo)", surcharge: 12000, desc: "Includes machine, fuel, backup mechanic truck" },
    { id: "re_pillion", name: "RE Himalayan 450 (with Pillion)", surcharge: 16000, desc: "Machine + fuel for rider and pillion passenger" },
    { id: "private_4x4", name: "Private 4x4 Isuzu / Thar (Exclusive)", surcharge: 25000, desc: "Private vehicle & personal mountain chauffeur" },
  ];

  const calculatedTotals = useMemo(() => {
    let basePricePerPerson = selectedExpedition.priceINR;

    // Vehicle modifier
    const selectedVeh = vehicleOptions.find((v) => v.id === vehicleType);
    const vehicleCostPerPerson = selectedVeh ? selectedVeh.surcharge / (vehicleType === "re_pillion" ? 2 : 1) : 0;

    // Stay modifier
    const stayCostPerPerson = stayTier === "glamping" ? 4500 : 0;

    // Add-on totals per person
    let addonCostPerPerson = 0;
    if (addons.o2Kit) addonCostPerPerson += 1499;
    if (addons.goproKit) addonCostPerPerson += 2499;
    if (addons.sleepingBag) addonCostPerPerson += 1199;
    if (addons.heliInsurance) addonCostPerPerson += 1999;

    const singlePersonTotal = basePricePerPerson + vehicleCostPerPerson + stayCostPerPerson + addonCostPerPerson;
    const grandTotal = singlePersonTotal * travelers;
    const tokenDeposit = Math.round(grandTotal * 0.2);

    return {
      basePricePerPerson,
      singlePersonTotal,
      grandTotal,
      tokenDeposit,
    };
  }, [selectedExpedition, vehicleType, stayTier, addons, travelers]);

  const handleWhatsAppQuote = () => {
    const selectedVeh = vehicleOptions.find((v) => v.id === vehicleType)?.name;
    const stayName = stayTier === "glamping" ? "Boutique Alpine Glamping" : "Local Mountain Homestays";
    const text = encodeURIComponent(
      `Hello Into The Wild Miles team! 🏔️\n\nI just configured a custom Himalayan Expedition quote on your website:\n- Circuit: ${selectedExpedition.title}\n- Duration: ${selectedExpedition.duration}\n- Travelers: ${travelers} Explorer(s)\n- Vehicle: ${selectedVeh}\n- Stays: ${stayName}\n- Estimated Investment: ₹${calculatedTotals.grandTotal.toLocaleString("en-IN")} (Token: ₹${calculatedTotals.tokenDeposit.toLocaleString("en-IN")})\n\nPlease share the upcoming batch dates and confirm seat availability!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-[#0B0F12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Real-Time Pricing & Customization</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Expedition Cost Estimator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Customize your Himalayan journey based on your riding style, comfort preference, and group size.
            100% transparent pricing with zero surprise charges.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configuration Form (Left 7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-7 bg-[#0E141B]/90 shadow-2xl">
            {/* Step 1: Select Circuit */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-3 flex items-center gap-2">
                <span>01.</span>
                <span>Select Your Circuit</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXPEDITIONS.map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setSelectedCircuitId(exp.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedCircuitId === exp.id
                        ? "bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10"
                        : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold text-xs truncate text-white">{exp.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>{exp.duration}</span>
                      <span className="font-mono text-amber-400 font-semibold">{formatPrice(exp.priceINR)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Travelers Count */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                  <span>02.</span>
                  <span>Number of Explorers</span>
                </label>
                <span className="text-xs font-bold text-white font-mono bg-white/10 px-3 py-1 rounded-full">
                  {travelers} {travelers === 1 ? "Person" : "Travelers"}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTravelers(num)}
                    className={`py-2.5 rounded-xl font-bold text-xs font-mono transition-all cursor-pointer ${
                      travelers === num
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Vehicle Preference */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-3 flex items-center gap-2">
                <span>03.</span>
                <span>Expedition Ride / Transport Mode</span>
              </label>
              <div className="space-y-2">
                {vehicleOptions.map((veh) => (
                  <div
                    key={veh.id}
                    onClick={() => setVehicleType(veh.id as any)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      vehicleType === veh.id
                        ? "bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10"
                        : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          vehicleType === veh.id ? "border-amber-500 bg-amber-500" : "border-slate-500"
                        }`}
                      >
                        {vehicleType === veh.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{veh.name}</div>
                        <div className="text-[11px] text-slate-400 font-light">{veh.desc}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-amber-400 font-bold">
                      {veh.surcharge === 0 ? "Standard" : `+${formatPrice(veh.surcharge)}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Accommodation Category */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-3 flex items-center gap-2">
                <span>04.</span>
                <span>Stay Category</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStayTier("homestay")}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    stayTier === "homestay"
                      ? "bg-amber-500/15 border-amber-500 text-white shadow-md"
                      : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold text-xs text-white">Authentic Village Homestays</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Warm wooden bukhari stoves, local cuisine, organic hospitality (Included)
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setStayTier("glamping")}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    stayTier === "glamping"
                      ? "bg-amber-500/15 border-amber-500 text-white shadow-md"
                      : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <div className="font-bold text-xs text-white">Boutique Swiss Alpine Tents</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Attached modern bathrooms, electric heat blankets (+₹4,500 / person)
                  </div>
                </button>
              </div>
            </div>

            {/* Step 5: Wilderness Safety & Gear Add-ons */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-3 flex items-center gap-2">
                <span>05.</span>
                <span>Wilderness Gear & Safety Upgrades</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* O2 Kit */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-white">
                    <input
                      type="checkbox"
                      checked={addons.o2Kit}
                      onChange={(e) => setAddons({ ...addons, o2Kit: e.target.checked })}
                      className="rounded accent-amber-500 cursor-pointer"
                    />
                    <span>Personal O2 Canister Kit</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">+₹1,499</span>
                </label>

                {/* GoPro Kit */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-white">
                    <input
                      type="checkbox"
                      checked={addons.goproKit}
                      onChange={(e) => setAddons({ ...addons, goproKit: e.target.checked })}
                      className="rounded accent-amber-500 cursor-pointer"
                    />
                    <span>GoPro 4K Action Cam Rental</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">+₹2,499</span>
                </label>

                {/* Sleeping bag */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-white">
                    <input
                      type="checkbox"
                      checked={addons.sleepingBag}
                      onChange={(e) => setAddons({ ...addons, sleepingBag: e.target.checked })}
                      className="rounded accent-amber-500 cursor-pointer"
                    />
                    <span>Sub-Zero Sleeping Bag (-20°C)</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">+₹1,199</span>
                </label>

                {/* Heli insurance */}
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-white">
                    <input
                      type="checkbox"
                      checked={addons.heliInsurance}
                      onChange={(e) => setAddons({ ...addons, heliInsurance: e.target.checked })}
                      className="rounded accent-amber-500 cursor-pointer"
                    />
                    <span>Heli-Rescue Adventure Cover</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">+₹1,999</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Summary Card (Right 5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-card-amber rounded-3xl p-6 sm:p-8 border shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                    Estimated Investment
                  </span>
                  <h3 className="font-display font-black text-xl text-white">
                    {selectedExpedition.title.split(":")[0]}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider font-mono">
                  {selectedExpedition.duration.split(" / ")[0]}
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 text-xs mb-6 font-light">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Base Package ({travelers} person{travelers > 1 ? "s" : ""})</span>
                  <span className="font-mono text-white font-medium">
                    {formatPrice(calculatedTotals.basePricePerPerson * travelers)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Vehicle Mode ({vehicleOptions.find((v) => v.id === vehicleType)?.name})</span>
                  <span className="font-mono text-white font-medium">
                    {formatPrice((vehicleOptions.find((v) => v.id === vehicleType)?.surcharge || 0) * (vehicleType === "re_pillion" ? 1 : travelers > 1 && vehicleType === "re_solo" ? travelers : 1))}
                  </span>
                </div>

                {stayTier === "glamping" && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Boutique Glamping Upgrade</span>
                    <span className="font-mono text-white font-medium">
                      +{formatPrice(4500 * travelers)}
                    </span>
                  </div>
                )}

                {(addons.o2Kit || addons.goproKit || addons.sleepingBag || addons.heliInsurance) && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Wilderness Gear & Safety Add-ons</span>
                    <span className="font-mono text-amber-400 font-medium">
                      Included
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-white/5">
                  <span>Per Person Breakdown:</span>
                  <span className="font-mono text-slate-300">
                    ~{formatPrice(calculatedTotals.singlePersonTotal)} / person
                  </span>
                </div>
              </div>

              {/* Total Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                    Total Estimated Trip Cost
                  </span>
                  <span className="text-3xl font-black font-display text-white">
                    {formatPrice(calculatedTotals.grandTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 mt-2">
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>20% Seat Token Advance:</span>
                  </span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatPrice(calculatedTotals.tokenDeposit)}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => openBookingForExpedition(selectedExpedition.id)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lock Batch Seat with Token Deposit</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3 rounded-full glass-panel hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Send Custom Quote To WhatsApp</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                <span>100% Refundable token up to 30 days prior to departure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
