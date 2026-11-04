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
  Flame,
  PhoneCall,
  Clock,
  Trees,
  X,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PRIVATE_PACKAGES, PrivatePackage } from "@/data/expeditions";
import { useTravel } from "@/components/shared/TravelContext";

export default function PrivatePackages() {
  const { formatPrice } = useTravel();

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPackage, setSelectedPackage] = useState<PrivatePackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelersCount, setTravelersCount] = useState("2 - 4 Explorers");
  const [customNotes, setCustomNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const filters = [
    { label: "All Charters", value: "All" },
    { label: "Couples & VIP", value: "private-connoisseur-duo" },
    { label: "Family & Convoy", value: "clan-convoy-family" },
    { label: "Moto Crew", value: "moto-squadron-charter" },
    { label: "Extreme Wildlife", value: "extreme-wildlife-photographer" },
  ];

  const filteredPackages =
    activeFilter === "All"
      ? PRIVATE_PACKAGES
      : PRIVATE_PACKAGES.filter((pkg) => pkg.id === activeFilter);

  const handleOpenInquiry = (pkg: PrivatePackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const generatedRef = "WM-PVT-" + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRef);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  const getWhatsAppLink = (pkgTitle: string) => {
    const text = encodeURIComponent(
      `Hello Wild Miles! 🌿 I am interested in booking a Private Expedition Charter: "${pkgTitle}". Can you share bespoke itinerary options and private vehicle convoy pricing for our group?`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <section id="private-packages" className="py-24 sm:py-32 bg-[#020604] relative overflow-hidden border-t border-emerald-500/10">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-emerald-950/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-jungle-mesh opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              <Trees className="w-3.5 h-3.5" />
              <span>Bespoke Private Expeditions</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.12]">
              Commission Your Private <span className="text-emerald-400 text-glow-emerald">4x4 Convoy.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
              No strangers, zero rigid group schedules. Handpick your departure date, travel with your private inner circle, and explore untamed Himalayan corridors at your own rhythm.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === f.value
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 scale-105"
                    : "bg-[#07130d] text-slate-300 hover:text-white border border-emerald-500/15 hover:border-emerald-500/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Private Charter Privileges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14">
          {[
            {
              icon: Calendar,
              title: "Choose Any Date",
              desc: "Depart on any date throughout the operating season. No fixed batch deadlines.",
            },
            {
              icon: Compass,
              title: "100% Private Fleet",
              desc: "Dedicated 4x4 Thar / Fortuner / Moto fleet exclusively reserved for your crew.",
            },
            {
              icon: Camera,
              title: "Your Own Rhythm",
              desc: "Pause for golden hour photography, impromptu river hikes, or relaxed starts.",
            },
            {
              icon: ShieldCheck,
              title: "Personal Captain & Medic",
              desc: "Senior Trail Navigator, dedicated O2 concentrator, and satellite SOS protection.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-4 sm:p-5 rounded-2xl bg-[#06120c]/70 border border-emerald-500/15 backdrop-blur-md"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Private Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group rounded-3xl bg-[#06120c] border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-[#06120c]/40 to-black/30" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-extrabold text-[10px] uppercase font-mono tracking-widest shadow-lg backdrop-blur-md">
                      {pkg.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 text-emerald-300 font-mono text-[10px] uppercase tracking-wider border border-emerald-500/30 backdrop-blur-md">
                      {pkg.idealFor}
                    </span>
                  </div>

                  {/* Price Tag in Bottom Corner */}
                  <div className="absolute bottom-4 right-4 z-10 text-right bg-[#030705]/85 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 backdrop-blur-md">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Starting from</span>
                    <span className="font-display font-extrabold text-base sm:text-lg text-emerald-400">
                      {formatPrice(pkg.startingPriceINR)}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-5">
                    {pkg.tagline}
                  </p>

                  {/* Quick Specs Bar */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-black/40 border border-emerald-500/10 mb-6 text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{pkg.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{pkg.duration}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-slate-300 pt-1 border-t border-emerald-500/10">
                      <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate text-emerald-300">{pkg.vehicleFleet}</span>
                    </div>
                  </div>

                  {/* Curated Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">
                      Expedition Inclusions & Exclusives
                    </span>
                    {pkg.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-xs text-slate-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Route Options Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-emerald-500/10 mb-2">
                    <span className="text-[10px] font-mono uppercase text-slate-500 mr-1">Routes:</span>
                    {pkg.routeOptions.map((r) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300/90 text-[10px] font-mono border border-emerald-500/15"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleOpenInquiry(pkg)}
                  className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Private Charter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink(pkg.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#07130d] hover:bg-emerald-950/50 text-slate-200 hover:text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all border border-emerald-500/20 flex items-center justify-center gap-1.5 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Inquire</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Bespoke Callout Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#07180f] via-[#05140d] to-[#030a06] border border-emerald-500/25 p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">
                Looking For A 100% Custom Himalayan Route?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm font-light mt-0.5">
                Have a unique circuit in mind (Zanskar, Pangi Valley, or Sach Pass)? Our senior trail navigators design custom blueprints tailored to your endurance and travel goals.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20Wild%20Miles!%20I%20would%20like%20to%20design%20a%20100%25%20custom%20private%20expedition%20circuit."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Consult Chief Navigator</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Interactive Bespoke Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#06120c] border border-emerald-500/30 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
                  <Trees className="w-3 h-3" />
                  <span>Private Charter Blueprint</span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-1">
                  Commission {selectedPackage?.title}
                </h3>
                <p className="text-slate-400 text-xs font-light mb-6">
                  Fill in your preferred travel dates and group preferences. Our lead expedition desk will craft a customized quote within 4 hours.
                </p>

                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        WhatsApp Contact *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="explorer@wildmiles.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        Estimated Group Size
                      </label>
                      <select
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
                      >
                        <option value="2 Explorers (Duo / Couple)">2 Explorers (Duo / Couple)</option>
                        <option value="3 - 4 Explorers (1 Vehicle)">3 - 4 Explorers (1 Vehicle)</option>
                        <option value="5 - 8 Explorers (Convoy)">5 - 8 Explorers (Convoy)</option>
                        <option value="8+ Explorers (VIP Crew)">8+ Explorers (VIP Crew)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        Target Travel Dates
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. July 2026 / 15-22 Aug"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                      Special Requests / Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Drone shooting spots, luxury dome glamping, vegetarian meals, slow acclimatization..."
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Private Charter Request</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                  Charter Request Dispatched!
                </h3>
                <p className="text-slate-300 text-xs font-light max-w-sm mx-auto mb-4">
                  Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. Your private expedition request has been logged under reference{" "}
                  <span className="font-mono text-emerald-400 font-bold">{refId}</span>.
                </p>
                <div className="p-3.5 rounded-2xl bg-black/50 border border-emerald-500/20 mb-6 text-left text-xs font-mono space-y-1">
                  <div className="text-slate-400">Package: <span className="text-white font-bold">{selectedPackage?.title}</span></div>
                  <div className="text-slate-400">Target: <span className="text-emerald-300">{travelDates || "Flexible 2026"}</span></div>
                  <div className="text-slate-400">Group: <span className="text-white">{travelersCount}</span></div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20Wild%20Miles!%20I%20just%20submitted%20Private%20Charter%20Request%20%23${refId}%20for%20${selectedPackage?.title}.%20Can%20we%20connect?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant Chat on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

