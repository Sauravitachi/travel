"use client";

import React, { useState } from "react";
import { MessageSquare, X, PhoneCall, Trees } from "lucide-react";

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello Wild Miles! 🌿 I am inquiring about upcoming 2026 jungle & overland expeditions. Can you share route availability and private convoy options?"
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl border border-emerald-500/25 p-4 shadow-2xl bg-[#07130d] animate-fade-in backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/10 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs border border-emerald-500/40">
                WM
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#07130d] animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Wild Miles Concierge</div>
                <div className="text-[10px] text-emerald-400 font-mono">Lead Trail Navigator • Online</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
            "Welcome to the wild! Planning a 4x4 overland safari or moto expedition? Have questions on convoy gear or terrain? We're here to assist!"
          </p>

          <a
            href={`https://wa.me/919876543210?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Chat with Expedition Concierge on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <span className="hidden sm:inline font-mono tracking-wider uppercase text-[11px] text-slate-950 font-bold">
          Wild Concierge
        </span>
        <MessageSquare className="w-4 h-4 text-slate-950" />
      </button>
    </div>
  );
}
