"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  ArrowRight,
  Clock,
  Compass,
  MessageSquare,
} from "lucide-react";
import Logo from "@/components/shared/Logo";

// Custom Vector SVG Icons for Social Accounts
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

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
    }, 4000);
  };

  const socialAccounts = [
    {
      name: "Instagram",
      handle: "@wildmilesexpeditions",
      url: "https://instagram.com/wildmilesexpeditions",
      icon: InstagramIcon,
      followers: "42.8K Explorers",
      color: "hover:text-pink-400",
    },
    {
      name: "YouTube",
      handle: "@wildmilesexpeditions",
      url: "https://youtube.com/@wildmilesexpeditions",
      icon: YoutubeIcon,
      followers: "18.2K Subscribers",
      color: "hover:text-red-400",
    },
    {
      name: "WhatsApp Community",
      handle: "+91 81980 89565",
      url: "https://wa.me/918198089565",
      icon: MessageSquare,
      followers: "24/7 Field Support",
      color: "hover:text-emerald-400",
    },
    {
      name: "Facebook",
      handle: "Wild Miles Expeditions",
      url: "https://facebook.com/wildmilesexpeditions",
      icon: FacebookIcon,
      followers: "Overland Community",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter / X",
      handle: "@wildmilesexp",
      url: "https://x.com/wildmilesexp",
      icon: TwitterIcon,
      followers: "Daily Road Reports",
      color: "hover:text-sky-400",
    },
  ];

  return (
    <footer id="contact" className="bg-[#020503] text-slate-400 border-t border-emerald-500/15 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-10 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Community Banner: Social Media & Contacts Mention */}
        <div className="rounded-3xl bg-[#06120c] border border-emerald-500/20 p-6 sm:p-8 mb-14 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                Connect With Our Wild Community
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                Follow Daily High-Pass Reports & Live Dispatches
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl font-light">
                Follow our official social accounts for live road status, Kunzum Pass clearance updates, snow conditions, and raw expedition footage.
              </p>
            </div>

            {/* Social Media Links Grid */}
            <div className="flex flex-wrap items-center gap-3">
              {socialAccounts.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/50 border border-emerald-500/15 text-slate-300 ${soc.color} transition-all hover:border-emerald-400 hover:scale-105`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold leading-tight text-white">{soc.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400/80">{soc.handle}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Footer Links & Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" layout="horizontal" />

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Handcrafted 4x4 overland safaris, high-altitude Spiti Valley circuits, and bespoke private charters across the globe’s most untamed wilderness.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400/90 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified Wilderness First Responder Expeditions</span>
            </div>

            <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
              <div>Pickup Hubs: <span className="text-white">Delhi • Chandigarh • Shimla</span></div>
              <div>Flagship Circuit: <span className="text-emerald-300 font-bold">Spiti Valley (8N/9D)</span></div>
            </div>
          </div>

          {/* Quick Links & Circuits (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white">
              Expedition Circuits
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#expeditions" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Spiti Valley Circuit (8N/9D)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">₹22,999/-</span>
                </a>
              </li>
              <li>
                <a href="#private-packages" className="hover:text-emerald-400 transition-colors">
                  Couple Private Charter (With / Without Driver)
                </a>
              </li>
              <li>
                <a href="#private-packages" className="hover:text-emerald-400 transition-colors">
                  Family Private Convoy (Stay + Food + Guide)
                </a>
              </li>
              <li>
                <a href="#private-packages" className="hover:text-emerald-400 transition-colors">
                  Friends Group Adventure Charter
                </a>
              </li>
              <li>
                <a href="#upcoming-trails" className="hover:text-emerald-400 transition-colors text-emerald-300">
                  Upcoming 2027 Trails (Join Waitlist)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Official Emails (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-white flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Expedition Desk & Official Contacts</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              {/* Pickup and Base Camp Locations */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="text-white font-semibold block">Base Camps & Pickup Lounges:</span>
                  <span className="text-slate-400 text-[11px]">
                    • Delhi Hub: Aerocity & New Delhi Railway Lounge<br />
                    • Chandigarh Base: Sector 17 & Airport Reception<br />
                    • Shimla HQ: The Mall & Kufri Ridge<br />
                    • High Spiti Camp: Kaza Sub-Divisional Base (12,470 ft)
                  </span>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-white font-semibold">24/7 Field Operations Helpline: </span>
                  <a href="tel:+918198089565" className="text-emerald-300 hover:underline font-mono">
                    +91 81980 89565
                  </a>
                </div>
              </div>

              {/* Official Emails */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="text-white font-semibold block">Official Expedition Email:</span>
                  <div className="space-y-0.5 mt-0.5 font-mono text-[11px]">
                    <div>
                      <a href="mailto:Intothewildmiless@gmail.com" className="text-emerald-400 hover:underline">
                        Intothewildmiless@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Operating Hours: 24/7 Field Dispatch & 09:00 - 21:00 IST Concierge</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block mb-2">
                Wild Dispatch & Batch Opening Alerts
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for batch alerts"
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

        {/* Bottom Bar with Social Media Mention and Copyright */}
        <div className="pt-8 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 - 2027 Wild Miles Expeditions Co. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="text-slate-400">Instagram: @wildmilesexpeditions</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">YouTube: @wildmilesexpeditions</span>
            <span className="text-slate-600">•</span>
            <a href="mailto:Intothewildmiless@gmail.com" className="text-emerald-400 hover:underline">
              Intothewildmiless@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
