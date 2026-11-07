"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle2,
  BellRing,
  ArrowRight,
  X,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UPCOMING_TRAILS, UpcomingTrail } from "@/data/upcomingTrails";

export default function UpcomingTrails() {
  const [selectedTrail, setSelectedTrail] = useState<UpcomingTrail | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState("2 Explorers");
  const [preferredMonth, setPreferredMonth] = useState("Flexible in 2027");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistId, setWaitlistId] = useState("");

  const handleOpenWaitlist = (trail?: UpcomingTrail) => {
    setSelectedTrail(trail || UPCOMING_TRAILS[0]);
    setIsWaitlistOpen(true);
    setWaitlistSuccess(false);
  };

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !email) return;

    const id = "WL-2027-" + Math.floor(10000 + Math.random() * 90000);
    setWaitlistId(id);
    setWaitlistSuccess(true);

    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#10B981", "#34D399", "#F59E0B", "#38BDF8"],
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <section id="upcoming-trails" className="py-24 sm:py-32 bg-[#020704] relative overflow-hidden border-t border-emerald-500/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-emerald-950/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-jungle-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>2027 Frontier Expeditions</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.12]">
              Upcoming 2027 <span className="text-emerald-400 text-glow-emerald">Expedition Trails.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
              We scout uncharted routes 12 months in advance. Join the priority waitlist to secure launch dates, confidential route itineraries, and exclusive early-bird batch pricing.
            </p>
          </div>

          <button
            onClick={() => handleOpenWaitlist()}
            className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <BellRing className="w-4 h-4" />
            <span>Join 2027 Waitlist</span>
          </button>
        </div>

        {/* 10 Trails Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {UPCOMING_TRAILS.map((trail) => (
            <div
              key={trail.id}
              className="group rounded-3xl bg-[#06120c] border border-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={trail.image}
                    alt={trail.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-[#06120c]/35 to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wider shadow-md">
                      2027 Trail
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 font-mono text-[10px] border border-emerald-500/20">
                      {trail.duration}
                    </span>
                  </div>

                  {/* Waitlist count */}
                  <div className="absolute bottom-3 right-3 z-10 text-[10px] font-mono text-emerald-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/25 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <span>{trail.waitlistCount} On Waitlist</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-mono mb-1">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{trail.region}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {trail.name}
                  </h3>

                  <p className="text-slate-300 text-xs font-light leading-relaxed mb-4">
                    {trail.tagline}
                  </p>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-emerald-500/10 mb-4 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300 truncate">
                      <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{trail.elevation}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 truncate">
                      <Calendar className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{trail.season}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-2">
                    {trail.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300 font-light">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => handleOpenWaitlist(trail)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs uppercase tracking-wider border border-emerald-500/30 hover:border-emerald-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <BellRing className="w-3.5 h-3.5" />
                  <span>Join {trail.name} Waitlist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#06120c] border border-emerald-500/30 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setIsWaitlistOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!waitlistSuccess ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>2027 Priority Access</span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-white mb-1">
                  Join 2027 Trail Waitlist
                </h3>
                <p className="text-slate-400 text-xs font-light mb-5">
                  Select your desired expedition circuit. Waitlist members get private route dossiers and 48-hour head-start before public booking opens.
                </p>

                <form onSubmit={handleSubmitWaitlist} className="space-y-4">
                  {/* Trail selector */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                      Target Expedition Trail *
                    </label>
                    <select
                      value={selectedTrail?.id || UPCOMING_TRAILS[0].id}
                      onChange={(e) => {
                        const found = UPCOMING_TRAILS.find((t) => t.id === e.target.value);
                        if (found) setSelectedTrail(found);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/25 text-white text-xs font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer"
                    >
                      {UPCOMING_TRAILS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.region})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 81980 89565"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="explorer@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        Number of Explorers
                      </label>
                      <select
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#030705] border border-emerald-500/20 text-white text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
                      >
                        <option value="1 Solo Explorer">1 Solo Explorer</option>
                        <option value="2 Explorers (Duo / Couple)">2 Explorers (Duo / Couple)</option>
                        <option value="3 - 5 Explorers (Small Crew)">3 - 5 Explorers (Small Crew)</option>
                        <option value="6+ Explorers (Group Convoy)">6+ Explorers (Group Convoy)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-1">
                        Preferred 2027 Season / Month
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Spring 2027 / July 2027"
                        value={preferredMonth}
                        onChange={(e) => setPreferredMonth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-500/20 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Priority Waitlist Placement</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                  You’re on the 2027 Priority Waitlist!
                </h3>
                <p className="text-slate-300 text-xs font-light max-w-sm mx-auto mb-4">
                  Welcome aboard, <span className="text-emerald-400 font-semibold">{name}</span>! Your waitlist reservation for{" "}
                  <strong className="text-white">{selectedTrail?.name}</strong> has been assigned Priority ID{" "}
                  <span className="font-mono text-emerald-400 font-bold">{waitlistId}</span>.
                </p>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-emerald-500/20 mb-6 text-left text-xs font-mono space-y-1">
                  <div className="text-slate-400">Trail: <span className="text-white font-bold">{selectedTrail?.name}</span></div>
                  <div className="text-slate-400">Target Season: <span className="text-emerald-300">{preferredMonth}</span></div>
                  <div className="text-slate-400">Seats Reserved: <span className="text-white">{seats}</span></div>
                  <div className="text-slate-400">Notification: <span className="text-white">{whatsapp} & {email}</span></div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/918198089565?text=Hi%20Wild%20Miles!%20I%20just%20joined%20the%202027%20Waitlist%20for%20${selectedTrail?.name}%20(ID:%20${waitlistId}).%20Looking%20forward%20to%20the%20launch!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Join 2027 VIP WhatsApp Dispatch</span>
                  </a>
                  <button
                    onClick={() => setIsWaitlistOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
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

