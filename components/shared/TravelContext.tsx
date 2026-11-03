"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Expedition, EXPEDITIONS } from "@/data/expeditions";

interface TravelContextType {
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  formatPrice: (amountINR: number) => string;
  theme: "dark" | "light";
  toggleTheme: () => void;
  selectedExpedition: Expedition | null;
  setSelectedExpedition: (e: Expedition | null) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isItineraryOpen: boolean;
  setIsItineraryOpen: (open: boolean) => void;
  openBookingForExpedition: (expeditionId?: string) => void;
  openItineraryForExpedition: (expedition: Expedition) => void;
  filterDestination: string;
  setFilterDestination: (dest: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(EXPEDITIONS[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [filterDestination, setFilterDestination] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    // Sync with HTML class
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const formatPrice = (amountINR: number): string => {
    if (currency === "USD") {
      // Approximate 1 USD = 80 INR
      const usdAmount = Math.round(amountINR / 80);
      return `$${usdAmount.toLocaleString()}`;
    }
    return `₹${amountINR.toLocaleString("en-IN")}`;
  };

  const openBookingForExpedition = (expeditionId?: string) => {
    if (expeditionId) {
      const found = EXPEDITIONS.find((e) => e.id === expeditionId);
      if (found) setSelectedExpedition(found);
    }
    setIsBookingOpen(true);
  };

  const openItineraryForExpedition = (expedition: Expedition) => {
    setSelectedExpedition(expedition);
    setIsItineraryOpen(true);
  };

  return (
    <TravelContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        theme,
        toggleTheme,
        selectedExpedition,
        setSelectedExpedition,
        isBookingOpen,
        setIsBookingOpen,
        isItineraryOpen,
        setIsItineraryOpen,
        openBookingForExpedition,
        openItineraryForExpedition,
        filterDestination,
        setFilterDestination,
        filterCategory,
        setFilterCategory,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
}
