import React from "react";
import { TravelProvider } from "@/components/shared/TravelContext";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ExpeditionGrid from "@/components/home/ExpeditionGrid";
import PrivatePackages from "@/components/home/PrivatePackages";
import UpcomingTrails from "@/components/home/UpcomingTrails";
import SafetyBanner from "@/components/home/SafetyBanner";
import ItineraryShowcase from "@/components/home/ItineraryShowcase";
import ReviewMasonry from "@/components/home/ReviewMasonry";
import WildernessCTA from "@/components/home/WildernessCTA";
import BookingModal from "@/components/home/BookingModal";
import ItineraryModal from "@/components/home/ItineraryModal";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

export default function Home() {
  return (
    <TravelProvider>
      <main className="min-h-screen bg-[#030705] text-[#e2f0e8] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
        <Navbar />
        <Hero />
        <ExpeditionGrid />
        <ItineraryShowcase />
        <PrivatePackages />
        <UpcomingTrails />
        <SafetyBanner />
        <ReviewMasonry />
        <WildernessCTA />
        <Footer />

        {/* Global Modals & Float */}
        <BookingModal />
        <ItineraryModal />
        <WhatsAppFloat />
      </main>
    </TravelProvider>
  );
}
