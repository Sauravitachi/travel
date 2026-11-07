"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "stacked";
  className?: string;
}

export default function Logo({
  size = "md",
  layout = "horizontal",
  className = "",
}: LogoProps) {
  const isStacked = layout === "stacked";

  const heightClass =
    size === "sm"
      ? isStacked
        ? "h-12"
        : "h-7"
      : size === "lg"
      ? isStacked
        ? "h-20"
        : "h-11"
      : isStacked
      ? "h-16"
      : "h-9";

  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none ${className}`}
      title="Into The Wild Miles"
    >
      {/* Official White Brand Logo Badge from Identity Guidelines */}
      <div className="bg-white hover:bg-slate-50 transition-all rounded-xl p-1 sm:p-1.5 shadow-md shadow-black/30 flex items-center justify-center">
        <Image
          src={
            isStacked
              ? "/images/logo-white-stacked.png"
              : "/images/logo-white-horizontal.png"
          }
          alt="Into The Wild Miles - Travel, Tours & Packages"
          width={isStacked ? 220 : 320}
          height={isStacked ? 220 : 100}
          priority
          className={`${heightClass} w-auto object-contain group-hover:scale-[1.02] transition-transform`}
        />
      </div>
    </Link>
  );
}
