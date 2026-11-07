"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Users,
  Compass,
  CheckCircle2,
  PhoneCall,
  Mail,
  User,
  MapPin,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Flame,
  Download,
  Trees,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTravel } from "@/components/shared/TravelContext";
import { EXPEDITIONS, Expedition } from "@/data/expeditions";

export default function BookingModal() {
  const {
    isBookingOpen,
    setIsBookingOpen,
    selectedExpedition,
    setSelectedExpedition,
    formatPrice,
  } = useTravel();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedPickup, setSelectedPickup] = useState<string>("Delhi");
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [vehiclePreference, setVehiclePreference] = useState<string>("Dedicated Vehicle with Expert Local Driver");

  // Contact details
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [city, setCity] = useState("");

  // Payment choice
  const [paymentMode, setPaymentMode] = useState<"token" | "full">("token");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReferenceId, setBookingReferenceId] = useState("");

  const expedition: Expedition = selectedExpedition || EXPEDITIONS[0];

  useEffect(() => {
    if (isBookingOpen && expedition) {
      if (expedition.batches && expedition.batches.length > 0) {
        setSelectedBatch(expedition.batches[0].date);
      }
      setStep(1);
      setBookingConfirmed(false);
    }
  }, [isBookingOpen, expedition]);

  if (!isBookingOpen) return null;

  const tokenPerPerson = expedition.tokenAdvanceINR;
  const fullPricePerPerson = expedition.priceINR;

  const totalPayable =
    paymentMode === "token"
      ? tokenPerPerson * travelersCount
      : fullPricePerPerson * travelersCount;

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsappNumber || !emailAddress) return;
    setStep(3);
  };

  const handleCompleteBooking = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setBookingConfirmed(true);
      const randomRef = "WM-" + Math.floor(100000 + Math.random() * 900000);
      setBookingReferenceId(randomRef);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#34D399", "#059669", "#F59E0B"],
        });
      } catch (err) {
        // ignore in test
      }
    }, 1100);
  };

  const handleDownloadConfirmation = () => {
    const text = `WILD MILES - EXPEDITION SEAT CONFIRMATION
======================================================
Booking Reference: ${bookingReferenceId}
Expedition: ${expedition.title} (Spiti Valley)
Duration: ${expedition.duration}
Pickup Location: ${selectedPickup} (Delhi / Chandigarh / Shimla)
Max Capacity: 25 Explorers per batch
Departure Batch: ${selectedBatch}
Explorers: ${travelersCount} Person(s)
Mode: ${vehiclePreference}
Lead Explorer: ${fullName}
WhatsApp: ${whatsappNumber}
Email: ${emailAddress}
Package Cost: ₹${expedition.originalPriceINR.toLocaleString("en-IN")}
Discounted Price: ₹${expedition.priceINR.toLocaleString("en-IN")} (Save ₹${(expedition.originalPriceINR - expedition.priceINR).toLocaleString("en-IN")})
Deposit Paid: CONFIRMED (₹${totalPayable.toLocaleString("en-IN")})

Inclusions Covered:
1. All 8 nights stays (handpicked authentic home stays & camping tents)
2. Dedicated vehicle with expert local Himalayan driver
3. Inclusive of breakfast, lunch & dinner
4. Medical grade throughout the expedition
5. Wilderness leader and tour guide
6. Exciting activities including live camping in forest, zip lining, hiking and many more
7. Fun activities like music night, games etc.

Wilderness Operations Base:
Delhi • Chandigarh • Shimla • Kaza (Spiti Valley)
Phone: +91 81980 89565
Email: Intothewildmiless@gmail.com
======================================================`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bookingReferenceId}_Expedition_Voucher.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/20 bg-[#07130d] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-emerald-500/15 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Expedition Reservation
              </span>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-white truncate max-w-xs sm:max-w-md">
                {expedition.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsBookingOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-950/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer border border-emerald-500/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        {!bookingConfirmed && (
          <div className="px-6 py-3 bg-black/30 border-b border-emerald-500/10 flex items-center justify-between text-xs font-mono">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">1</span>
              <span>Batch & Mode</span>
            </div>
            <div className="h-px w-8 bg-emerald-500/20" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">2</span>
              <span>Explorer Details</span>
            </div>
            <div className="h-px w-8 bg-emerald-500/20" />
            <div className={`flex items-center gap-2 ${step === 3 ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">3</span>
              <span>Payment Deposit</span>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {bookingConfirmed ? (
            /* Confirmation View */
            <div className="text-center py-6 animate-fade-in space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Seat Slot Reserved!
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Welcome To Wild Miles, {fullName}!
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mt-2 font-light">
                  Your seat deposit of{" "}
                  <strong className="text-emerald-400 font-mono">₹{totalPayable.toLocaleString("en-IN")}</strong> is confirmed.
                  Reference ID: <strong className="text-white font-mono">{bookingReferenceId}</strong>.
                </p>
              </div>

              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/15 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Circuit:</span>
                  <span className="text-white font-semibold">{expedition.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Departure:</span>
                  <span className="text-emerald-400 font-mono font-semibold">{selectedBatch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Explorers:</span>
                  <span className="text-white font-semibold">{travelersCount} Person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mode:</span>
                  <span className="text-white font-semibold">{vehiclePreference}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadConfirmation}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Voucher</span>
                </button>

                <a
                  href={`https://wa.me/918198089565?text=Hi%20Wild%20Miles,%20I%20just%20reserved%20booking%20${bookingReferenceId}%20for%20${encodeURIComponent(
                    expedition.title
                  )}.%20Please%20connect%20me%20with%20our%20lead%20expedition%20director!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#07130d] hover:bg-emerald-950/60 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-emerald-500/25"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Batch & Traveler Count */
            <form onSubmit={handleStep1Next} className="space-y-6">
              {/* Pricing & Max Explorers Banner */}
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black font-display text-white">
                      ₹{expedition.priceINR.toLocaleString("en-IN")}/-
                    </span>
                    <span className="text-xs line-through text-slate-500 font-mono">
                      ₹{expedition.originalPriceINR.toLocaleString("en-IN")}/-
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      After Discount
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Duration: <span className="text-white font-medium">{expedition.duration}</span> • Max <span className="text-emerald-300 font-bold">25 Explorers</span>
                  </div>
                </div>

                <div className="text-right sm:text-right text-[11px] font-mono text-emerald-400">
                  <span className="block font-bold">Route with pictures:</span>
                  <span className="text-[10px] text-slate-300 truncate max-w-xs block">
                    Narkanda - Sangla - Kalpa - Tabo - Kaza - Langza - Chicham - returning back
                  </span>
                </div>
              </div>

              {/* Pickup Location Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Pickup Location (Delhi / Chandigarh / Shimla) *</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {["Delhi", "Chandigarh", "Shimla"].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedPickup(loc)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer text-center ${
                        selectedPickup === loc
                          ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md"
                          : "bg-black/40 text-slate-300 border-emerald-500/15 hover:bg-emerald-950/40"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Departure Batches */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Departure Batch (2026 - 2027)</span>
                </label>
                <div className="space-y-2">
                  {expedition.batches.map((batch) => (
                    <div
                      key={batch.date}
                      onClick={() => setSelectedBatch(batch.date)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        selectedBatch === batch.date
                          ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md"
                          : "bg-black/30 border-emerald-500/10 text-slate-300 hover:bg-emerald-950/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedBatch === batch.date ? "border-emerald-500 bg-emerald-500" : "border-slate-500"
                          }`}
                        >
                          {selectedBatch === batch.date && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-mono">{batch.date}</div>
                          <div className="text-[10px] text-slate-400">{batch.seasonBadge}</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                        {batch.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travelers Count */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Number of Explorers (Max 25 per batch)</span>
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelersCount(num)}
                      className={`w-12 h-10 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                        travelersCount === num
                          ? "bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                          : "bg-black/40 text-slate-300 border border-emerald-500/15 hover:border-emerald-400"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Traveler Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : step === 2 ? (
            /* STEP 2: Traveler Details */
            <form onSubmit={handleStep2Next} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1.5">
                  Lead Explorer Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Liam Vance"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+91 81980 89565"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="explorer@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1.5">
                  Departure City / State
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai, Bangalore, Delhi"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full bg-black/40 hover:bg-emerald-950/60 text-slate-300 text-xs uppercase font-bold cursor-pointer border border-emerald-500/15"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment Deposit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 3: Payment Split & Token */
            <div className="space-y-6">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-3">
                  Choose Payment Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMode("token")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMode === "token"
                        ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md"
                        : "bg-black/30 border-emerald-500/10 text-slate-300 hover:bg-emerald-950/30"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Token Advance</span>
                    </div>
                    <div className="text-xl font-black font-display text-white">
                      ₹{(tokenPerPerson * travelersCount).toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Hold {travelersCount} seat(s). Balance payable 15 days before departure.
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMode("full")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMode === "full"
                        ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md"
                        : "bg-black/30 border-emerald-500/10 text-slate-300 hover:bg-emerald-950/30"
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-1">Full Payment</div>
                    <div className="text-xl font-black font-display text-white">
                      ₹{(fullPricePerPerson * travelersCount).toLocaleString("en-IN")}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Complete advance payment with free wilderness gear waiver.
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-2">
                  Select Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "bg-emerald-500 text-slate-950 border-emerald-500"
                        : "bg-black/30 text-slate-300 border-emerald-500/15 hover:bg-emerald-950/40"
                    }`}
                  >
                    Instant UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-emerald-500 text-slate-950 border-emerald-500"
                        : "bg-black/30 text-slate-300 border-emerald-500/15 hover:bg-emerald-950/40"
                    }`}
                  >
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                      paymentMethod === "netbanking"
                        ? "bg-emerald-500 text-slate-950 border-emerald-500"
                        : "bg-black/30 text-slate-300 border-emerald-500/15 hover:bg-emerald-950/40"
                    }`}
                  >
                    Net Banking
                  </button>
                </div>
              </div>

              {/* Security Banner */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/15 flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-[11px] leading-relaxed">
                  256-bit encrypted reservation. Full refund guarantee if batch is cancelled due to extreme weather or road blockades.
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-full bg-black/40 hover:bg-emerald-950/60 text-slate-300 text-xs uppercase font-bold cursor-pointer border border-emerald-500/15"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteBooking}
                  className="flex-1 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Securing Expedition Slot...</span>
                  ) : (
                    <>
                      <span>Pay ₹{totalPayable.toLocaleString("en-IN")} & Confirm Seat</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
