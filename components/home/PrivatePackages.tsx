"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  Users,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  HeartHandshake,
  Camera,
  Car,
  Utensils,
  MapPin,
  Clock,
  Trees,
  X,
  Send,
  Download,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PRIVATE_PACKAGES, PrivatePackage } from "@/data/expeditions";
import { useTravel } from "@/components/shared/TravelContext";

const PICKUP_OPTIONS = [
  "Delhi (Airport / City Center)",
  "Chandigarh (Airport / Station)",
  "Shimla (Expedition HQ)",
  "Manali Base",
  "Custom Location",
];

const DESTINATION_OPTIONS = [
  "Spiti Valley Circuit (Narkanda - Sangla - Kalpa - Tabo - Kaza - Chicham)",
  "Leh Ladakh High Passes & Pangong Tso",
  "Kashmir & Gurez Valley Trail",
  "Chandrataal Moon Lake Glacial Basin",
  "Bir Barot & Dhauladhar Valley",
  "7 Sisters North East Frontier",
  "Custom Himalayan Route",
];

export default function PrivatePackages() {
  const { formatPrice } = useTravel();

  // Builder State
  const [selectedPackageId, setSelectedPackageId] = useState<string>("couple");
  const [driverChoice, setDriverChoice] = useState<"with-driver" | "without-driver">("with-driver");
  const [stayEnabled, setStayEnabled] = useState(true);
  const [foodEnabled, setFoodEnabled] = useState(true);
  const [guideEnabled, setGuideEnabled] = useState(true);

  // Customised Days & Dates
  const [startDate, setStartDate] = useState("2026-12-23");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [customDays, setCustomDays] = useState(9);
  const [customNights, setCustomNights] = useState(8);

  // Location & Destination
  const [pickupLocation, setPickupLocation] = useState("Delhi (Airport / City Center)");
  const [customPickup, setCustomPickup] = useState("");
  const [destination, setDestination] = useState(
    "Spiti Valley Circuit (Narkanda - Sangla - Kalpa - Tabo - Kaza - Chicham)"
  );
  const [customDestination, setCustomDestination] = useState("");

  // Contact Details
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Submission State
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);
  const [charterSubmitted, setCharterSubmitted] = useState(false);
  const [charterRefId, setCharterRefId] = useState("");

  const currentPkg =
    PRIVATE_PACKAGES.find((p) => p.id === selectedPackageId) || PRIVATE_PACKAGES[0];

  // Recalculate duration when dates change
  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      const d1 = new Date(start);
      const d2 = new Date(end);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setCustomDays(diffDays + 1);
        setCustomNights(diffDays);
      }
    }
  };

  const handleSelectPackageCard = (pkg: PrivatePackage) => {
    setSelectedPackageId(pkg.id);
    const builderElement = document.getElementById("charter-configurator");
    if (builderElement) {
      builderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmitCharter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp || !email) return;

    const ref = "CHARTER-" + Math.floor(100000 + Math.random() * 900000);
    setCharterRefId(ref);
    setCharterSubmitted(true);
    setIsCharterModalOpen(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#34D399", "#059669", "#F59E0B"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const effectivePickup = pickupLocation === "Custom Location" ? customPickup : pickupLocation;
  const effectiveDestination =
    destination === "Custom Himalayan Route" ? customDestination : destination;

  const getWhatsAppCharterLink = () => {
    const text = encodeURIComponent(
      `Hello Wild Miles! 🌿\n\nI would like to commission a Private Charter:\n- Package: ${currentPkg.title} (${currentPkg.idealFor})\n- Driver: ${
        driverChoice === "with-driver" ? "With Expert Himalayan Driver" : "Without Driver (Self-Drive 4x4 SUV)"
      }\n- Stay Included: ${stayEnabled ? "Yes (Authentic Homestays & Camps)" : "No"}\n- Food Included: ${
        foodEnabled ? "Yes (Breakfast, Lunch & Dinner)" : "No"
      }\n- Travel Guide Included: ${guideEnabled ? "Yes (Certified Wilderness Leader)" : "No"}\n- Customised Days: ${customNights} Nights / ${customDays} Days (${startDate} to ${endDate})\n- Pickup Location: ${effectivePickup}\n- Destination: ${effectiveDestination}\n- Lead Explorer: ${fullName} (${whatsapp})\n\nPlease share the charter quotation and vehicle allocation details!`
    );
    return `https://wa.me/918198089565?text=${text}`;
  };

  const handleDownloadCharterVoucher = () => {
    const text = `WILD MILES - PRIVATE CHARTER BLUEPRINT & QUOTATION REQUEST
============================================================
Reference ID: ${charterRefId}
Package: ${currentPkg.title} (${currentPkg.idealFor})
Driver Option: ${driverChoice === "with-driver" ? "With Expert Driver" : "Without Driver (Self-Drive 4x4 SUV)"}
Inclusions:
  • Stay: ${stayEnabled ? "Included (Authentic Homestays & Tents)" : "Not requested"}
  • Food: ${foodEnabled ? "Included (Breakfast, Lunch & Dinner)" : "Not requested"}
  • Travel Guide: ${guideEnabled ? "Included (Wilderness Leader)" : "Not requested"}
Customised Duration: ${customNights} Nights / ${customDays} Days
Target Travel Dates: ${startDate} to ${endDate}
Pickup Location: ${effectivePickup}
Destination: ${effectiveDestination}

Lead Explorer: ${fullName}
WhatsApp: ${whatsapp}
Email: ${email}
Special Notes: ${specialRequests || "None"}

Expedition Support Desk:
Wild Miles Expeditions HQ • +91 81980 89565 • Intothewildmiless@gmail.com
Base Camps: Delhi, Chandigarh, Shimla, Spiti Valley
============================================================`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${charterRefId}_WildMiles_Charter.txt`;
    a.click();
  };

  return (
    <section id="private-packages" className="py-24 sm:py-32 bg-[#020604] relative overflow-hidden border-t border-emerald-500/10">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-emerald-950/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-jungle-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <Trees className="w-3.5 h-3.5" />
            <span>Private Packages & Bespoke Charters</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.12]">
            Private Packages <span className="text-emerald-400 text-glow-emerald">Bespoke Options.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Tailor-made expeditions for couples, families, friends groups, and tourists. Choose with or without driver, select your customised days via calendar, specify your pickup and destination, and commission your private Himalayan charter.
          </p>
        </div>

        {/* 4 Core Private Package Cards from Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRIVATE_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackageCard(pkg)}
                className={`group rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border relative overflow-hidden ${
                  isSelected
                    ? "bg-[#07180e] border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02]"
                    : "bg-[#06120c] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#07160d]"
                }`}
              >
                {/* Image Snapshot */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-black/20 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono text-[10px] uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-emerald-400 transition-colors mb-1">
                    {pkg.title}
                  </h3>
                  <div className="text-[11px] font-mono text-emerald-400 font-bold mb-2">
                    {pkg.groupSize}
                  </div>
                  <p className="text-slate-300 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* 4 Feature Badges from Requirement */}
                  <div className="space-y-1.5 pt-3 border-t border-emerald-500/10 mb-5 text-[11px] font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <Car className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>With / Without Driver</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trees className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Stay (Homestays / Tents)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Food (All Meals Included)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Travel Guide Included</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950"
                  }`}
                >
                  <span>{isSelected ? "Selected Charter" : "Configure This"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            CHARTER CONFIGURATOR & REQUEST BUILDER (IMAGE 2 REQUIREMENTS)
           ========================================================================= */}
        <div
          id="charter-configurator"
          className="rounded-3xl bg-[#06120c] border border-emerald-500/25 p-6 sm:p-10 shadow-2xl relative"
        >
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Charter Builder</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Configure Your Charter & Request Itinerary
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
              Select your options below. Our chief expedition navigator will review the route blueprint and coordinate vehicle dispatch.
            </p>
          </div>

          <form onSubmit={handleSubmitCharter} className="space-y-8">
            {/* 1. Charter Option Tier */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-3">
                1. Select Package Type Option *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRIVATE_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedPackageId === pkg.id
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-md shadow-emerald-500/10"
                        : "bg-black/40 border-emerald-500/15 text-slate-300 hover:border-emerald-500/40"
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{pkg.title}</div>
                    <div className="text-[10px] text-emerald-300 font-mono">{pkg.groupSize}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Driver Preference & Inclusions Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-black/40 border border-emerald-500/15">
              {/* Driver Option */}
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span>Driver Option (With / Without Driver) *</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDriverChoice("with-driver")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      driverChoice === "with-driver"
                        ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md"
                        : "bg-black/40 text-slate-300 border-emerald-500/15 hover:bg-emerald-950/30"
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${driverChoice === "with-driver" ? "text-slate-950" : "opacity-0"}`} />
                    <span>With Driver</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDriverChoice("without-driver")}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      driverChoice === "without-driver"
                        ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md"
                        : "bg-black/40 text-slate-300 border-emerald-500/15 hover:bg-emerald-950/30"
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${driverChoice === "without-driver" ? "text-slate-950" : "opacity-0"}`} />
                    <span>Without Driver (Self-Drive)</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-light mt-1.5">
                  {driverChoice === "with-driver"
                    ? "Dedicated expert local Himalayan driver navigating treacherous passes."
                    : "Fully prepped 4x4 SUV provided for self-drive enthusiasts with GPS blueprint."}
                </p>
              </div>

              {/* Inclusions Checkboxes */}
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-2">
                  Included Charter Privileges (Stay, Food, Guide)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30 border border-emerald-500/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stayEnabled}
                      onChange={(e) => setStayEnabled(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-xs text-white font-medium">
                      (Stay) Authentic Homestays & Swiss Camping Tents
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30 border border-emerald-500/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={foodEnabled}
                      onChange={(e) => setFoodEnabled(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-xs text-white font-medium">
                      (Food) Wholesome Mountain Breakfast, Lunch & Dinner
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30 border border-emerald-500/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guideEnabled}
                      onChange={(e) => setGuideEnabled(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-xs text-white font-medium">
                      (Travel Guide) Certified Wilderness Leader & Local Navigator
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Customised Days (Attach Calendar) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Select Your Customised Days (Attach Calendar) *</span>
                </label>
                <span className="text-xs font-mono font-bold text-emerald-300 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {customNights} Nights / {customDays} Days Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20">
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Start / Departure Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => handleDateChange(e.target.value, endDate)}
                    className="w-full bg-[#030705] border border-emerald-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20">
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Return / Completion Date
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => handleDateChange(startDate, e.target.value)}
                    className="w-full bg-[#030705] border border-emerald-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* 4. Pickup Location Option & Destination Option */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pickup Option */}
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Add Your Pickup Location Option *</span>
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#030705] border border-emerald-500/25 text-white text-xs font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer mb-2"
                >
                  {PICKUP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {pickupLocation === "Custom Location" && (
                  <input
                    type="text"
                    required
                    placeholder="Enter your exact pickup city / location..."
                    value={customPickup}
                    onChange={(e) => setCustomPickup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                )}
              </div>

              {/* Destination Option */}
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-2 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Add Your Destination Option *</span>
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#030705] border border-emerald-500/25 text-white text-xs font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer mb-2"
                >
                  {DESTINATION_OPTIONS.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
                {destination === "Custom Himalayan Route" && (
                  <input
                    type="text"
                    required
                    placeholder="Enter your custom destinations & stops..."
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                )}
              </div>
            </div>

            {/* 5. Lead Contact Details */}
            <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/15 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                5. Fill The Above Details & Request The Charter
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-300 block mb-1">
                    Lead Explorer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-300 block mb-1">
                    WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 81980 89565"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="explorer@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-300 block mb-1">
                  Special Notes / Vehicle Preferences / Diet (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thar 4x4 preferred, vegetarian food, photography stops, kid car seat..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero rigid timetable • 100% private 4x4 fleet • Certified WFR support</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request The Charter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation & Voucher Modal */}
      {isCharterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#06120c] border border-emerald-500/30 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsCharterModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                Charter Blueprint Dispatched!
              </h3>
              <p className="text-slate-300 text-xs font-light max-w-sm mx-auto mb-5">
                Thank you, <span className="text-emerald-400 font-semibold">{fullName}</span>. Your private charter request has been logged under reference{" "}
                <span className="font-mono text-emerald-400 font-bold">{charterRefId}</span>.
              </p>

              {/* Blueprint Summary Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/20 mb-6 text-left text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Package:</span>
                  <span className="text-white font-bold">{currentPkg.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Driver Mode:</span>
                  <span className="text-emerald-300 font-bold">
                    {driverChoice === "with-driver" ? "With Driver" : "Without Driver (Self-Drive)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Customised Days:</span>
                  <span className="text-white">
                    {customNights} Nights / {customDays} Days ({startDate} to {endDate})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pickup Location:</span>
                  <span className="text-emerald-300 truncate max-w-[200px]">{effectivePickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-white truncate max-w-[200px]">{effectiveDestination}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-emerald-500/10">
                  <span className="text-slate-400">Inclusions:</span>
                  <span className="text-emerald-400">
                    Stay: {stayEnabled ? "✓" : "✗"} • Food: {foodEnabled ? "✓" : "✗"} • Guide:{" "}
                    {guideEnabled ? "✓" : "✗"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <a
                  href={getWhatsAppCharterLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Chief Navigator on WhatsApp</span>
                </a>

                <button
                  onClick={handleDownloadCharterVoucher}
                  className="w-full py-3 rounded-xl bg-black/40 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/25 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Charter Blueprint Voucher</span>
                </button>

                <button
                  onClick={() => setIsCharterModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
