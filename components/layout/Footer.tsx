"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trees,
  PhoneCall,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  ArrowRight,
  Radio,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="bg-[#020603] text-slate-400 border-t border-emerald-500/15 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                <Trees className="w-5 h-5 stroke-[2.4]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wide text-white">
                  WILD <span className="text-emerald-400">MILES</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/70">
                  Dark Jungle & Overland Safaris
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Handcrafted 4x4 off-grid overland journeys, high-pass motorcycle tours, and secluded eco-sanctuary glamping across the globe’s most untamed wilderness.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400/90 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Wilderness First Responder Expeditions</span>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white">
              Wild Circuits
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#expeditions" className="hover:text-emerald-400 transition-colors">
                  Spiti High-Pass Loop (8D/7N)
                </a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-emerald-400 transition-colors">
                  Himalayan Moto Odyssey (9D/8N)
                </a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-emerald-400 transition-colors">
                  Sacred Moon Lake Camp (5D/4N)
                </a>
              </li>
              <li>
                <a href="#expeditions" className="hover:text-emerald-400 transition-colors">
                  Kinnaur Rainforest Trail (6D/5N)
                </a>
              </li>
            </ul>
          </div>

          {/* Expedition Desk & Newsletter (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white">
              Expedition Field Desk
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Base Camps: Shimla & Kaza, Himachal Pradesh</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Helpline: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>expeditions@wildmiles.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block mb-2">
                Wild Dispatch & Batch Openings
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#07130d] border border-emerald-500/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  ✓ Dispatch confirmed. Welcome to the convoy.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Wild Miles Expedition Co. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-emerald-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-emerald-400 transition-colors">Wilderness Terms</span>
            <span className="hover:text-emerald-400 transition-colors">Eco-Pledge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
